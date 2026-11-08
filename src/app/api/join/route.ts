import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // In a dynamic production app, this stores in Supabase/PostgreSQL or sends a Discord/Slack webhook
    console.log("New recruitment application received:", body);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully! Check your email for next steps.",
      data: {
        id: `app_${Date.now()}`,
        name: body.fullName,
        email: body.email,
        track: body.track,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid application submission." },
      { status: 400 }
    );
  }
}

