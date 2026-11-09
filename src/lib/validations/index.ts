import { z } from "zod";

export const memberApplicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(150, "Email cannot exceed 150 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9\s\-()]{7,20}$/, "Please provide a valid phone number")
    .optional()
    .or(z.literal("")),
  studentId: z
    .string()
    .trim()
    .min(3, "Student / Roll ID must be at least 3 characters")
    .max(30, "Student ID cannot exceed 30 characters"),
  year: z.enum([
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
    "Postgraduate",
  ]),
  branch: z.enum([
    "CSE",
    "IT",
    "CyberSec",
    "DataScience",
    "ECE",
    "Other",
  ]),
  track: z.enum([
    "DevOps & CI/CD",
    "Cloud Computing",
    "Networking & SysAdmin",
    "DevSecOps",
    "Outreach & Design",
  ]),
  experienceLevel: z.enum([
    "Curious Beginner",
    "Basic Git & Linux",
    "Used Docker/Cloud",
    "Experienced",
  ]),
  githubUrl: z
    .string()
    .trim()
    .url("GitHub/Portfolio URL must be a valid URL")
    .optional()
    .or(z.literal("")),
  motivation: z
    .string()
    .trim()
    .min(10, "Please explain why you want to join (at least 10 characters)")
    .max(3000, "Motivation cannot exceed 3000 characters"),
  turnstileToken: z.string().optional(),
});

export const eventRegistrationSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  eventTitle: z.string().min(1, "Event title is required").max(200),
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100),
  email: z.string().trim().email("Please provide a valid email address"),
  studentId: z.string().trim().min(3).max(30),
  branch: z.enum([
    "CSE",
    "IT",
    "CyberSec",
    "DataScience",
    "ECE",
    "Other",
  ]),
  turnstileToken: z.string().optional(),
});

export const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100),
  email: z.string().trim().email("Please provide a valid email address"),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(200),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
  turnstileToken: z.string().optional(),
});

export const adminLoginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export type MemberApplicationInput = z.infer<typeof memberApplicationSchema>;
export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>;
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

