import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("New contact message received:", body);

    return NextResponse.json({
      success: true,
      message: "Message received! A club coordinator will reply within 24 hours.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid contact submission." },
      { status: 400 }
    );
  }
}

