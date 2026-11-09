import { test, describe } from "node:test";
import assert from "node:assert";
import {
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "../src/lib/auth.js";

describe("Admin Session Authentication (HMAC SHA-256)", () => {
  test("generates and verifies a valid admin token", async () => {
    const token = await createAdminSessionToken();
    assert.ok(token);
    assert.strictEqual(typeof token, "string");
    assert.strictEqual(token.includes("."), true);

    const isValid = await verifyAdminSessionToken(token);
    assert.strictEqual(isValid, true);
  });

  test("rejects null, empty, or malformed tokens", async () => {
    assert.strictEqual(await verifyAdminSessionToken(null), false);
    assert.strictEqual(await verifyAdminSessionToken(""), false);
    assert.strictEqual(await verifyAdminSessionToken("invalid-token-without-dot"), false);
  });

  test("rejects tampered tokens with invalid signature", async () => {
    const token = await createAdminSessionToken();
    const [, signature] = token.split(".");
    // Tamper with payload
    const tamperedPayload = Buffer.from(JSON.stringify({ role: "admin", exp: Date.now() + 9999999 })).toString("base64url");
    const tamperedToken = `${tamperedPayload}.${signature}`;

    const isValid = await verifyAdminSessionToken(tamperedToken);
    assert.strictEqual(isValid, false);
  });
});

