import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/contexts/MotionContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.college.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "NexOps",
    "DevOps",
    "Cloud Computing",
    "Kubernetes",
    "Docker",
    "Computer Networks",
    "CI/CD",
    "Terraform",
    "SIET Tumakuru",
    "Student Tech Club",
  ],
  authors: [{ name: `${siteConfig.name} - ${siteConfig.college.name}` }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexops-siet.edu",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950">
        <MotionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
