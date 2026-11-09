import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eventRegistrationSchema } from "@/lib/validations";
import { emailService } from "@/lib/mail";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = eventRegistrationSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please verify your details.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { eventId, eventTitle, fullName, email, studentId, branch } = result.data;

    // Check duplicate RSVP
    const existing = await prisma.eventRegistration.findUnique({
      where: {
        eventId_email: {
          eventId,
          email,
        },
      },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "You are already registered for this event!",
        alreadyRegistered: true,
      });
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        eventTitle,
        fullName,
        email,
        studentId,
        branch,
        status: "confirmed",
      },
    });

    // Sanitized server log
    const domain = email.split("@")[1] || "unknown";
    console.log(`[API:Events] RSVP recorded for event: ${eventId} | Domain: @${domain}`);

    // Trigger confirmation notification
    await emailService.sendEventRsvpConfirmation(email, fullName, eventTitle);

    return NextResponse.json({
      success: true,
      message: "RSVP confirmed successfully!",
      data: { id: registration.id },
    });
  } catch (error) {
    console.error("[API:Events] Registration error:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { success: false, message: "Failed to record event registration." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const authorized = await isAuthorizedAdmin(request);
    if (!authorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");
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
    console.error("[API:Events] Query error:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { success: false, message: "Failed to fetch event registrations." },
      { status: 500 }
    );
  }
}
