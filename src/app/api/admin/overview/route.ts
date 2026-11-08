import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    // Check optional admin secret if configured
    if (process.env.ADMIN_SECRET_KEY && secret && secret !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: "Invalid admin key." },
        { status: 401 }
      );
    }

    const [applications, registrations, messages] = await Promise.all([
      prisma.memberApplication.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
      prisma.eventRegistration.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
      prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalApplications: applications.length,
        totalRegistrations: registrations.length,
        totalMessages: messages.length,
      },
      data: {
        applications,
        registrations,
        messages,
      },
    });
  } catch (error) {
    console.error("Error fetching admin overview:", error);
    return NextResponse.json(
      { success: false, message: "Database query error." },
      { status: 500 }
    );
  }
}

