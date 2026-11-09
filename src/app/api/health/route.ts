import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const start = performance.now();
  let dbStatus = "ok";
  let latencyMs = 0;

  try {
    // Quick probe
    await prisma.$queryRawUnsafe("SELECT 1;");
    latencyMs = Math.round((performance.now() - start) * 10) / 10;
  } catch (err) {
    dbStatus = "error";
    console.error("[Health] Database check failed:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      {
        status: "degraded",
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        database: { status: "unhealthy", latencyMs },
      },
      { status: 503 }
    );
  }

  return NextResponse.json(
    {
      status: "healthy",
      service: "nexops-portal",
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      database: { status: dbStatus, latencyMs },
      memory: {
        rssMb: Math.round(process.memoryUsage().rss / 1024 / 1024),
        heapUsedMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      },
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

