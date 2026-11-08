import { RoadmapItem } from "@/types";

export const roadmapsData: RoadmapItem[] = [
  {
    id: "linux",
    title: "Linux & Systems Engineering",
    duration: "4 - 6 Weeks",
    iconName: "Terminal",
    summary:
      "Master the operating system powering 95%+ of the world's cloud servers. From fundamental commands to systemd, bash scripting, and kernel internals.",
    steps: [
      {
        title: "1. Shell Navigation & Core Utilities",
        description: "File hierarchies, permissions (chmod/chown), pipe redirection, grep, sed, awk, find, and tar.",
        topics: ["POSIX filesystem hierarchy", "File permissions & umask", "Text processing pipelines", "Process signals & job control"],
        freeResources: [
          { name: "Linux Journey (Interactive)", url: "https://linuxjourney.com", type: "Lab" },
          { name: "The Linux Command Line (Book)", url: "https://linuxcommand.org/tlcl.php", type: "Book" },
        ],
      },
      {
        title: "2. System Administration & Services",
        description: "Managing systemd units, journalctl logs, cron jobs, user groups, and package managers (apt/dnf).",
        topics: ["systemd unit files", "Log analysis with journalctl", "Storage & LVM", "SSH key authentication & hardening"],
        freeResources: [
          { name: "Arch Linux Wiki (Systemd)", url: "https://wiki.archlinux.org/title/systemd", type: "Docs" },
          { name: "OverTheWire: Bandit (Wargame)", url: "https://overthewire.org/wargames/bandit/", type: "Lab" },
        ],
      },
      {
        title: "3. Bash Scripting & Automation",
        description: "Writing robust shell scripts with error handling (set -euo pipefail), arguments parsing, and environment variables.",
        topics: ["Conditionals & loops", "Functions & exit codes", "Automated backup scripts", "Environment management"],
        freeResources: [
          { name: "Google Shell Style Guide", url: "https://google.github.io/styleguide/shellguide.html", type: "Docs" },
        ],
      },
    ],
  },
  {
    id: "networking",
    title: "Computer Networking for SREs",
    duration: "3 - 5 Weeks",
    iconName: "Network",
    summary:
      "Understand packet journeys from browser to cloud server: OSI model, TCP/UDP, DNS resolution, TLS handshakes, reverse proxies, and firewalls.",
    steps: [
      {
        title: "1. The Network Protocol Stack",
        description: "TCP 3-way handshake, flow control, congestion avoidance, UDP semantics, and IP subnetting CIDR notation.",
        topics: ["OSI & TCP/IP layers", "IPv4/IPv6 CIDR math", "TCP flags (SYN, ACK, FIN, RST)", "ICMP & ping/traceroute"],
        freeResources: [
          { name: "Beej's Guide to Network Programming", url: "https://beej.us/guide/bgnet/", type: "Book" },
          { name: "Wireshark Packet Analysis Labs", url: "https://www.wireshark.org", type: "Lab" },
        ],
      },
      {
        title: "2. Application Layer & Security Protocols",
        description: "Deep dive into HTTP/1.1, HTTP/2, HTTP/3 (QUIC), DNS query resolution, and TLS 1.3 encryption handshakes.",
        topics: ["DNS record types (A, CNAME, MX, TXT)", "TLS certificates & Let's Encrypt", "WebSockets & gRPC", "Reverse proxies (NGINX/Caddy)"],
        freeResources: [
          { name: "Cloudflare Learning Center (Networking)", url: "https://www.cloudflare.com/learning/", type: "Docs" },
        ],
      },
    ],
  },
  {
    id: "docker",
    title: "Containers & Docker",
    duration: "3 - 4 Weeks",
    iconName: "Container",
    summary:
      "How Linux namespaces and cgroups turn code into portable, isolated containers. Writing production-grade Dockerfiles and multi-stage builds.",
    steps: [
      {
        title: "1. Container Primitives & Namespaces",
        description: "Why containers are not VMs. Linux chroot, cgroups, pid/net/mount namespaces, and copy-on-write union filesystems.",
        topics: ["Namespaces & Cgroups", "OCI Specifications", "Docker architecture (dockerd, containerd, runc)"],
        freeResources: [
          { name: "Docker Official Getting Started", url: "https://docs.docker.com/get-started/", type: "Docs" },
          { name: "Play with Docker (Free Browser Labs)", url: "https://labs.play-with-docker.com/", type: "Lab" },
        ],
      },
      {
        title: "2. Production Dockerfile Craftsmanship",
        description: "Multi-stage builds, non-root USER directives, caching optimizations, slim base images (Alpine/Distroless), and security scanning.",
        topics: ["Multi-stage builds", "Layer cache optimization", "Minimizing attack surface", "Trivy vulnerability scans"],
        freeResources: [
          { name: "Best practices for writing Dockerfiles", url: "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/", type: "Docs" },
        ],
      },
    ],
  },
  {
    id: "kubernetes",
    title: "Kubernetes & Cloud Orchestration",
    duration: "6 - 8 Weeks",
    iconName: "Server",
    summary:
      "Automate deployment, scaling, and operations of containerized applications across resilient distributed clusters.",
    steps: [
      {
        title: "1. Architecture & Control Plane",
        description: "kube-apiserver, etcd, kube-scheduler, kube-controller-manager, kubelet, and kube-proxy.",
        topics: ["Control plane vs Worker nodes", "Declarative YAML manifests", "kubectl essential workflow", "Namespaces & Contexts"],
        freeResources: [
          { name: "Kubernetes Official Interactive Tutorials", url: "https://kubernetes.io/docs/tutorials/", type: "Lab" },
          { name: "Kubernetes The Hard Way (Kelsey Hightower)", url: "https://github.com/kelseyhightower/kubernetes-the-hard-way", type: "Docs" },
        ],
      },
      {
        title: "2. Workloads & Networking",
        description: "Deployments, DaemonSets, StatefulSets, ClusterIP vs NodePort vs LoadBalancer, Ingress controllers, and CNI plugins.",
        topics: ["Rolling updates & Rollbacks", "Stateful applications & PVCs", "Ingress NGINX & Cert-Manager", "NetworkPolicies"],
        freeResources: [
          { name: "KinD (Kubernetes in Docker) Guide", url: "https://kind.sigs.k8s.io/", type: "Lab" },
        ],
      },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD & GitOps Automation",
    duration: "4 - 5 Weeks",
    iconName: "GitMerge",
    summary:
      "Build automated delivery pipelines: test, build, lint, scan, publish container images, and deploy safely to production environments.",
    steps: [
      {
        title: "1. GitHub Actions Workflows",
        description: "Writing declarative workflows, reusable actions, matrices, secrets management, and caching build artifacts.",
        topics: ["Workflow triggers & events", "Job dependencies & matrix builds", "GitHub Container Registry (GHCR)", "Security secrets & environments"],
        freeResources: [
          { name: "GitHub Actions Documentation", url: "https://docs.github.com/en/actions", type: "Docs" },
        ],
      },
      {
        title: "2. GitOps with ArgoCD & Flux",
        description: "Deploying applications where git commits trigger automatic reconciliations inside Kubernetes without developer cluster credentials.",
        topics: ["Pull-based vs push-based CI/CD", "ArgoCD sync and health checks", "Helm & Kustomize overlays", "Canary releases with Argo Rollouts"],
        freeResources: [
          { name: "ArgoCD Getting Started", url: "https://argo-cd.readthedocs.io/en/stable/", type: "Docs" },
        ],
      },
    ],
  },
];

