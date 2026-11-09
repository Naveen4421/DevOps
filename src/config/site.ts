export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  college: {
    name: string;
    department: string;
    campus: string;
    city: string;
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
  name: "NexOps",
  shortName: "NexOps",
  tagline: "Build it. Connect it. Deploy it.",
  description:
    "The premier student-led technical society for Cloud Computing, Computer Networking, Systems Engineering, and modern DevOps practices at SIET Tumakuru.",
  college: {
    name: "Shridevi Institute of Engineering and Technology (SIET)",
    department: "Department of Computer Science & Engineering",
    campus: "NH-4, Sira Road",
    city: "Tumakuru, Karnataka 572106",
  },
  contact: {
    email: "nexops.siet@gmail.com",
    discord: "https://discord.gg/nexops-siet",
    whatsapp: "https://chat.whatsapp.com/nexops-community",
    linkedin: "https://linkedin.com/company/nexops-siet",
    github: "https://github.com/Naveen4421/DevOps",
    instagram: "https://instagram.com/nexops_siet",
    x: "https://x.com/nexops_siet",
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
    { label: "Active Members", value: "250+", description: "Students actively learning & building" },
    { label: "Workshops & CTFs", value: "18+", description: "Hands-on labs and technical sessions" },
    { label: "Open-Source Projects", value: "10+", description: "Production tools built by members" },
    { label: "Placements & Interns", value: "35+", description: "In Cloud, SRE, and Infrastructure roles" },
  ],
};
