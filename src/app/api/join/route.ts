import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      studentId,
      year,
      branch,
      track,
      experienceLevel,
      githubUrl,
      motivation,
    } = body;

    if (!fullName || !email || !studentId || !motivation) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Save directly to live database
    const application = await prisma.memberApplication.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        studentId,
        year: year || "1st Year",
        branch: branch || "CSE",
        track: track || "DevOps & CI/CD",
        experienceLevel: experienceLevel || "Curious Beginner",
        githubUrl: githubUrl || null,
        motivation,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully! Your application is in the queue.",
      data: application,
    });
  } catch (error) {
    console.error("Error creating member application:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error while saving application." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    // Optional admin access check
    if (process.env.ADMIN_SECRET_KEY && secret !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
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
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch applications." },
      { status: 500 }
    );
  }
}
