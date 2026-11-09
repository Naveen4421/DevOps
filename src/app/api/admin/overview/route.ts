import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const authorized = await isAuthorizedAdmin(request);
    if (!authorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Valid admin session cookie required." },
        { status: 401 }
      );
    }

    const [applications, registrations, messages] = await Promise.all([
      prisma.memberApplication.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
      prisma.eventRegistration.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
      prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
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
    console.error("[API:AdminOverview] Query error:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { success: false, message: "Failed to retrieve dashboard records." },
      { status: 500 }
    );
  }
}
