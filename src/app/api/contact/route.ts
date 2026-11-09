import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactMessageSchema } from "@/lib/validations";
import { emailService } from "@/lib/mail";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = contactMessageSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please verify your message details.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    const saved = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
        status: "unread",
      },
    });

    const domain = email.split("@")[1] || "unknown";
    console.log(`[API:Contact] Message received | Subject length: ${subject.length} | Domain: @${domain}`);

    await emailService.sendContactAck(email, name, subject);

    return NextResponse.json({
      success: true,
      message: "Message received! A NexOps coordinator will reply within 24 hours.",
      data: { id: saved.id },
    });
  } catch (error) {
    console.error("[API:Contact] Submission error:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { success: false, message: "Failed to submit contact message." },
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

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("[API:Contact] Query error:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { success: false, message: "Failed to fetch contact messages." },
      { status: 500 }
    );
  }
}
