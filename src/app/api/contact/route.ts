import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const savedMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || "General Inquiry",
        message,
        status: "unread",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Message received! A club coordinator will reply within 24 hours.",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit contact message." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (process.env.ADMIN_SECRET_KEY && secret !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
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
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch contact messages." },
      { status: 500 }
    );
  }
}
