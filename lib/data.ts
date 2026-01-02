export const profile = {
  name: "Adnan Ahmed",
  role: "Full-Stack & Mobile Lead",
  email: "khanadnanahmed01@gmail.com",
  socials: {
    linkedin: "https://linkedin.com/in/adnahmed",
    github: "https://github.com/adnahmed",
  },
  about:
    "Full-Stack & Mobile Lead with a strong focus on distributed systems and high-performance backend engineering. Proven record of transforming monolithic architectures for horizontal scalability and reducing critical API latency by 95–96%. Skilled at leading cross-functional teams, modernizing CI/CD pipelines, and delivering production-grade cloud infrastructures.",
};

export const experience = [
  {
    company: "HackOnTech",
    location: "Islamabad, Pakistan",
    link: "https://hackontech.com/",
    roles: [
      {
        title: "Team Lead",
        start: "Sep 2024",
        end: "Present",
        description: [
          "Lead a cross-functional team of 7 developers, driving sprint planning, architectural decision-making, and delivery of high-impact features.",
          "Modernized CI/CD pipelines to support daily deployments, reducing build times and improving release velocity.",
          "Reduced production hotfix frequency by establishing automated testing, static analysis, and strict code review standards.",
          "Mentor junior engineers in clean architecture and distributed-system thinking.",
        ],
      },
      {
        title: "Full Stack Developer",
        start: "Apr 2023",
        end: "Present",
        description: [
          "Built a dynamic Node.js query builder that reduced critical API latency from 30s+ timeouts to <1s.",
          "Re-architected a monolithic backend into stateless, horizontally scalable services.",
          "Engineered modules for PDF transformation, geometric calculations, and large dataset processing.",
          "Designed meteorological visualization dashboards using deck.gl.",
        ],
      },
    ],
    tech: [
      "TypeScript",
      "Node.js",
      "Nest.js",
      "Postgres",
      "Neo4j",
      "Redis",
      "Docker",
      "CI/CD",
      "Firebase",
      "GraphQL",
      "Python",
    ],
  },
  {
    company: "GeekGenix",
    location: "Islamabad, Pakistan",
    link: "https://www.geekgenix.com/",
    roles: [
      {
        title: "Backend Developer",
        start: "Dec 2020",
        end: "Feb 2021",
        description: [
          "Integrated Stripe for secure payments and connected endpoints seamlessely with React frontend.",
          "Implemented authentication using Passport.js and strengthened reliability through Jest-based unit testing.",
          "Designed RESTful APIs with Express.js & MongoDB.",
        ],
      },
    ],
    tech: ["Node.js", "Express.js", "MongoDB", "React", "Passport.js", "Stripe", "Jest"],
  },
];

export const staticProjects = [
  {
    title: "Vidx",
    description: "Distributed video-rendering platform supporting 50+ cinematic transitions.",
    tech: ["FastAPI", "React", "RabbitMQ", "Celery", "Docker", "FFmpeg"],
    links: { github: "https://github.com/adnahmed/vidx-infra", live: "https://clipifie.com/" },
  },
  {
    title: "Crackq.me",
    description: "SaaS platform for distributed cryptographic hash cracking using containerized workers.",
    tech: ["Next.js", "TypeScript", "Docker", "Hashcat", "BOINC"],
    links: { github: "https://github.com/adnahmed/hashcrack", live: "https://hashcrack-git-dev-adnan-repo.vercel.app/" },
  },
  {
    title: "pdf-annotate.js",
    description: "PDF annotation library with real-time sync and optimized SVG rendering.",
    tech: ["PDF.js", "TypeScript", "SVG"],
    links: { github: "https://github.com/adnahmed/pdf-annotate.js" },
  },
  {
    title: "REPS",
    description: "Remote Exam Proctoring System with real-time monitoring.",
    tech: ["TypeScript", "Live Streaming", "WebRTC"],
    links: { github: "https://github.com/adnahmed/reps" },
  },
];
