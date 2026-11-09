import { test, describe } from "node:test";
import assert from "node:assert";
import {
  memberApplicationSchema,
  eventRegistrationSchema,
  contactMessageSchema,
  adminLoginSchema,
} from "../src/lib/validations/index.js";

describe("Zod Validation Schemas", () => {
  test("memberApplicationSchema accepts valid candidate submission", () => {
    const valid = {
      fullName: "Naveen Kumar",
      email: "naveen@siet.edu",
      phone: "+91 9876543210",
      studentId: "1SI23CS045",
      year: "2nd Year",
      branch: "CSE",
      track: "DevOps & CI/CD",
      experienceLevel: "Basic Git & Linux",
      githubUrl: "https://github.com/Naveen4421",
      motivation: "Excited to contribute to NexOps campus homelab and learn Kubernetes.",
    };
    const result = memberApplicationSchema.safeParse(valid);
    assert.strictEqual(result.success, true);
  });

  test("memberApplicationSchema rejects invalid email and short motivation", () => {
    const invalid = {
      fullName: "N",
      email: "not-an-email",
      studentId: "12",
      year: "1st Year",
      branch: "CSE",
      track: "DevOps & CI/CD",
      experienceLevel: "Curious Beginner",
      motivation: "short",
    };
    const result = memberApplicationSchema.safeParse(invalid);
    assert.strictEqual(result.success, false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      assert.ok(errors.email);
      assert.ok(errors.fullName);
      assert.ok(errors.studentId);
      assert.ok(errors.motivation);
    }
  });

  test("eventRegistrationSchema validates required event parameters", () => {
    const validRsvp = {
      eventId: "evt-01",
      eventTitle: "Kubernetes Zero to Production",
      fullName: "Pooja Hegde",
      email: "pooja@siet.edu",
      studentId: "1SI22CS102",
      branch: "CyberSec",
    };
    const result = eventRegistrationSchema.safeParse(validRsvp);
    assert.strictEqual(result.success, true);
  });

  test("contactMessageSchema validates minimum message length", () => {
    const shortMessage = {
      name: "Suresh",
      email: "suresh@company.io",
      subject: "Hi",
      message: "Too short",
    };
    const result = contactMessageSchema.safeParse(shortMessage);
    assert.strictEqual(result.success, false);
  });

  test("adminLoginSchema checks password presence", () => {
    assert.strictEqual(adminLoginSchema.safeParse({ password: "" }).success, false);
    assert.strictEqual(adminLoginSchema.safeParse({ password: "secure-passkey" }).success, true);
  });
});

