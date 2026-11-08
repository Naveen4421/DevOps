import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with sample records...");

  // Seed sample applications
  await prisma.memberApplication.createMany({
    data: [
      {
        fullName: "Rahul Varma",
        email: "rahul.varma@college.edu",
        phone: "+91 98450 11223",
        studentId: "23BCSE042",
        year: "2nd Year",
        branch: "CSE",
        track: "DevOps & CI/CD",
        experienceLevel: "Basic Git & Linux",
        githubUrl: "https://github.com/rahulv",
        motivation: "I want to master container orchestration and set up automated deployment pipelines for campus projects.",
        status: "pending",
      },
      {
        fullName: "Ananya Deshmukh",
        email: "ananya.d@college.edu",
        phone: "+91 97410 99887",
        studentId: "24BIT105",
        year: "1st Year",
        branch: "IT",
        track: "Cloud Computing",
        experienceLevel: "Curious Beginner",
        githubUrl: "https://github.com/ananya-d",
        motivation: "Excited to learn AWS and distributed cloud infrastructure from seniors and build resilient backend services.",
        status: "reviewing",
      },
    ],
  });

  // Seed sample event registration
  await prisma.eventRegistration.createMany({
    data: [
      {
        eventId: "evt-01",
        eventTitle: "Kubernetes Zero to Production: Hands-on Cluster Architecture",
        fullName: "Praveen Kumar",
        email: "praveen.k@college.edu",
        studentId: "22BCSE210",
        branch: "CSE",
        status: "confirmed",
      },
      {
        eventId: "evt-01",
        eventTitle: "Kubernetes Zero to Production: Hands-on Cluster Architecture",
        fullName: "Divya Nambiar",
        email: "divya.n@college.edu",
        studentId: "23BIT078",
        branch: "IT",
        status: "confirmed",
      },
    ],
  });

  // Seed sample message
  await prisma.contactMessage.create({
    data: {
      name: "Suresh Menon",
      email: "suresh.menon@techcorp.io",
      subject: "Hackathon Sponsorship & Cloud Credits Proposal",
      message: "Hello DevOps Club Leads, we represent TechCorp Cloud and would love to sponsor $2,000 in cloud credits and prizes for your upcoming CTF.",
      status: "unread",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
