import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId, eventTitle, fullName, email, studentId, branch } = body;

    if (!eventId || !fullName || !email || !studentId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Check if student is already registered for this event
    const existing = await prisma.eventRegistration.findFirst({
      where: {
        eventId,
        email,
      },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "You are already registered for this event!",
        data: existing,
        alreadyRegistered: true,
      });
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        eventTitle: eventTitle || "Club Workshop",
        fullName,
        email,
        studentId,
        branch: branch || "CSE",
        status: "confirmed",
      },
    });

    return NextResponse.json({
      success: true,
      message: "RSVP confirmed successfully!",
      data: registration,
    });
  } catch (error) {
    console.error("Error creating event registration:", error);
    return NextResponse.json(
      { success: false, message: "Failed to record event registration." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");
    const secret = searchParams.get("secret");

    if (process.env.ADMIN_SECRET_KEY && secret !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const where = eventId ? { eventId } : {};
    const registrations = await prisma.eventRegistration.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch event registrations." },
      { status: 500 }
    );
  }
}
