export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  college: {
    name: string;
    department: string;
    campus: string;
  };
  contact: {
    email: string;
    discord: string;
    whatsapp: string;
    linkedin: string;
    github: string;
    instagram: string;
    x: string;
  };
  nav: {
    title: string;
    href: string;
  }[];
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Cloud & DevOps Club",
  shortName: "CDC",
  tagline: "Bridging the gap between code and infrastructure.",
  description:
    "The premier student-led technical community focused on Cloud Computing, Computer Networking, Systems Engineering, and modern DevOps practices.",
  college: {
    name: "Apex Institute of Technology",
    department: "Department of Computer Science & Engineering",
    campus: "Main Campus, Innovation Wing",
  },
  contact: {
    email: "devops-club@college.edu",
    discord: "https://discord.gg/devops-club",
    whatsapp: "https://chat.whatsapp.com/sample-invite-code",
    linkedin: "https://linkedin.com/company/devops-club",
    github: "https://github.com/cloud-devops-club",
    instagram: "https://instagram.com/devops_club",
    x: "https://x.com/devops_club",
  },
  nav: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Events", href: "/events" },
    { title: "Projects", href: "/projects" },
    { title: "Roadmaps", href: "/resources" },
    { title: "Team", href: "/team" },
    { title: "Contact", href: "/contact" },
  ],
  stats: [
    { label: "Active Members", value: "350+", description: "Students actively learning & building" },
    { label: "Workshops & CTFs", value: "24+", description: "Hands-on labs and tech sessions" },
    { label: "Open-Source Projects", value: "12+", description: "Production-ready tools built by members" },
    { label: "Placements & Interns", value: "45+", description: "In Cloud, SRE, and Infrastructure roles" },
  ],
};

