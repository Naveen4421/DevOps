import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { memberApplicationSchema } from "@/lib/validations";
import { emailService } from "@/lib/mail";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = memberApplicationSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please review your input.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check duplicate email
    const existing = await prisma.memberApplication.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "An application with this email address has already been submitted.",
          isDuplicate: true,
        },
        { status: 409 }
      );
    }

    const application = await prisma.memberApplication.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || null,
        studentId: data.studentId,
        year: data.year,
        branch: data.branch,
        track: data.track,
        experienceLevel: data.experienceLevel,
        githubUrl: data.githubUrl || null,
        motivation: data.motivation,
      },
    });

    // Sanitized server log (no full payload)
    const domain = data.email.split("@")[1] || "unknown";
    console.log(`[API:Join] Application received for track: ${data.track} | Domain: @${domain}`);

    // Trigger confirmation notification
    await emailService.sendApplicationConfirmation(data.email, data.fullName, data.track);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully! Check your email for next steps.",
      data: {
        id: application.id,
        track: application.track,
      },
    });
  } catch (error) {
    console.error("[API:Join] Submission error:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { success: false, message: "Internal server error while saving application." },
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

    const applications = await prisma.memberApplication.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("[API:Join] Query error:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { success: false, message: "Failed to fetch applications." },
      { status: 500 }
    );
  }
}
