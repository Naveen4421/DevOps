export const ADMIN_COOKIE_NAME = "nexops_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24; // 24 hours

function getSecretKey(): string {
  return process.env.ADMIN_SECRET_KEY || "nexops-default-insecure-dev-key-change-in-prod";
}

/**
 * Sign a payload using Web Crypto HMAC SHA-256
 */
async function sign(data: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Buffer.from(signature).toString("base64url");
}

/**
 * Create a secure HMAC-signed admin session token
 */
export async function createAdminSessionToken(): Promise<string> {
  const payload = JSON.stringify({
    role: "admin",
    exp: Date.now() + SESSION_TTL_SECONDS * 1000,
  });
  const b64Payload = Buffer.from(payload).toString("base64url");
  const signature = await sign(b64Payload, getSecretKey());
  return `${b64Payload}.${signature}`;
}

/**
 * Verify HMAC signature and expiration of an admin session token
 */
export async function verifyAdminSessionToken(token: string | null | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [b64Payload, signature] = parts;
  const expectedSignature = await sign(b64Payload, getSecretKey());
  if (signature !== expectedSignature) return false;

  try {
    const jsonStr = Buffer.from(b64Payload, "base64url").toString("utf-8");
    const data = JSON.parse(jsonStr);
    if (data.role !== "admin" || typeof data.exp !== "number" || Date.now() > data.exp) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Extract and verify admin session from Request headers (cookies)
 */
export async function isAuthorizedAdmin(request: Request): Promise<boolean> {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE_NAME}=([^;]+)`));
  const token = match ? match[1] : null;
  return verifyAdminSessionToken(token);
}

/**
 * Helper to get cookie options
 */
export function getAdminCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    name: ADMIN_COOKIE_NAME,
    httpOnly: true,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}
