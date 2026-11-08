import { ProjectItem } from "@/types";

export const projectsData: ProjectItem[] = [
  {
    id: "proj-01",
    title: "Campus Cloud Sandbox",
    description:
      "A self-service portal for college students to spin up ephemeral Kubernetes namespaces and isolated Docker containers with resource quotas for course assignments.",
    category: "Infrastructure",
    techStack: ["Kubernetes", "Go", "Next.js", "Traefik", "PostgreSQL"],
    githubUrl: "https://github.com/cloud-devops-club/campus-sandbox",
    demoUrl: "https://sandbox.devopsclub.edu",
    lead: "Vikramaditya Rao",
    featured: true,
    stars: 142,
  },
  {
    id: "proj-02",
    title: "AutoGitOps Engine",
    description:
      "A lightweight GitOps webhook receiver that synchronizes GitHub release tags with production Docker Swarm and Nomad clusters with automatic health checks and rollback.",
    category: "Automation",
    techStack: ["Python", "FastAPI", "Docker", "GitHub Actions", "Redis"],
    githubUrl: "https://github.com/cloud-devops-club/autogitops",
    lead: "Aditya Nair",
    featured: true,
    stars: 88,
  },
  {
    id: "proj-03",
    title: "Homelab Cluster Sentinel",
    description:
      "Real-time hardware monitoring, temperature alerting, and dynamic load balancing across the club's 6-node Raspberry Pi and x86 physical server rack in the department lab.",
    category: "Monitoring",
    techStack: ["Prometheus", "Grafana", "Node Exporter", "Ansible", "Linux"],
    githubUrl: "https://github.com/cloud-devops-club/homelab-sentinel",
    demoUrl: "https://grafana.devopsclub.edu",
    lead: "Karan Singhania",
    featured: true,
    stars: 95,
  },
  {
    id: "proj-04",
    title: "SecScan CI Linter",
    description:
      "A fast CLI tool that checks Dockerfiles for non-root users, unpinned dependencies, secrets leakage, and misconfigured Linux capabilities before merging pull requests.",
    category: "Developer Tools",
    techStack: ["Rust", "Trivy", "Docker API", "GitHub Action"],
    githubUrl: "https://github.com/cloud-devops-club/secscan-cli",
    lead: "Pooja Hegde",
    featured: false,
    stars: 64,
  },
];

