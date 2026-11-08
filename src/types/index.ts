export interface EventItem {
  id: string;
  title: string;
  slug: string;
  category: "Workshop" | "Bootcamp" | "Talk" | "Hackathon" | "CTF";
  status: "upcoming" | "past";
  date: string; // ISO date string or formatted date
  time: string;
  venue: string;
  posterImage?: string;
  description: string;
  highlights: string[];
  instructor?: {
    name: string;
    role: string;
    companyOrYear: string;
    avatarUrl?: string;
  };
  registrationOpen: boolean;
  registrationUrl?: string;
  calendarData: {
    title: string;
    description: string;
    location: string;
    startTime: string; // YYYYMMDDTHHmmssZ
    endTime: string;   // YYYYMMDDTHHmmssZ
  };
  prerequisites?: string[];
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "faculty" | "leads" | "core";
  track?: "Cloud" | "DevOps & CI/CD" | "Networking & SysAdmin" | "DevSecOps" | "Outreach";
  yearOrDesignation: string;
  bio: string;
  photoUrl: string;
  github?: string;
  linkedin?: string;
  email?: string;
  badges?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: "Infrastructure" | "Automation" | "Monitoring" | "Developer Tools";
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  lead: string;
  featured: boolean;
  stars?: number;
}

export interface RoadmapStep {
  title: string;
  description: string;
  topics: string[];
  freeResources: {
    name: string;
    url: string;
    type: "Docs" | "Video" | "Lab" | "Book";
  }[];
}

export interface RoadmapItem {
  id: string;
  title: string;
  duration: string;
  iconName: string;
  summary: string;
  steps: RoadmapStep[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "membership" | "events" | "tech";
}

