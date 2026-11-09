import { NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/validations";
import { createAdminSessionToken, getAdminCookieOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = adminLoginSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Invalid payload." },
        { status: 400 }
      );
    }

    const expectedPassword = process.env.ADMIN_SECRET_KEY || "devops-club-lead-2026";
    if (result.data.password !== expectedPassword) {
      // Artificial delay to mitigate brute force timing attacks
      await new Promise((r) => setTimeout(r, 400));
      return NextResponse.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = await createAdminSessionToken();
    const cookieOpts = getAdminCookieOptions();

    const response = NextResponse.json({
      success: true,
      message: "Authenticated successfully.",
    });

    response.cookies.set({
      ...cookieOpts,
      value: token,
    });

    return response;
  } catch (error) {
    console.error("[API:AdminLogin] Error during login:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

