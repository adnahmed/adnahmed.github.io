export const profile = {
	name: "Adnan Ahmed",
	role: "Full-Stack & Mobile Lead",
	email: "khanadnanahmed01@gmail.com",
	socials: {
		linkedin: "https://linkedin.com/in/adnahmed",
		github: "https://github.com/adnahmed",
	},
	about:
		"Full-Stack & Mobile Lead with 5 years of experience specializing in distributed systems, high-performance backend engineering, and cloud-native architectures. Proven record of transforming monolithic systems for horizontal scalability and reducing critical API latency by up to 96%. Expert in leading cross-functional teams and modernizing CI/CD pipelines for production-grade cloud infrastructures.",
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
					"Lead a cross-functional team of 7 developers, driving architectural decisions and the delivery of high-availability cloud services on AWS.",
					"Modernized CI/CD pipelines using Terraform and GitHub Actions to support daily deployments and automated infrastructure provisioning.",
					"Reduced production hotfix frequency by establishing automated testing, static analysis, and strict code review standards.",
					"Mentor junior engineers in clean architecture and distributed system thinking, improving team output consistency.",
				],
			},
			{
				title: "Full Stack Developer",
				start: "Apr 2023",
				end: "Sep 2024",
				description: [
					"Built a dynamic Node.js query builder that reduced critical API latency from 30s+ to <1s by optimizing complex PostgreSQL operations.",
					"Re-architected a monolithic backend into horizontally scalable microservices using Docker and AWS EKS, handling millions of records.",
					"Implemented hardened API security with JWT, layered validation, and AWS WAF to protect sensitive data.",
				],
			},
		],
		tech: [
			"TypeScript",
			"Node.js",
			"Nest.js",
			"AWS",
			"EKS",
			"Lambda",
			"S3",
			"Terraform",
			"Postgres",
			"Redis",
			"Docker",
			"CI/CD",
		],
	},
	{
		company: "Creative IT Park",
		location: "Islamabad, Pakistan",
		link: "https://creativeitpark.org/",
		roles: [
			{
				title: "Software Engineer",
				start: "Feb 2021",
				end: "Mar 2023",
				description: [
					"Scaled 10+ diverse products (SaaS, Portals, E-commerce) by implementing a robust backend architecture using Node.js, Python, and AWS (ECS, RDS).",
					"Improved search performance and data retrieval speed by 70% through the integration of ElasticSearch and ElastiCache (Redis).",
					"Architected high-concurrency event-driven systems using Kafka and Serverless functions to handle real-time data processing for AI-driven applications.",
					"Developed secure healthcare and fintech integrations using FHIR standards and OAuth 2.0, ensuring industry-grade compliance.",
					"Established a component-driven frontend workflow with React, Redux Toolkit, and Storybook, reducing UI development time by 40%.",
				],
			},
		],
		tech: [
			"React.js",
			"TypeScript",
			"Node.js",
			"Python",
			"AWS",
			"ECS",
			"Kafka",
			"Docker",
			"Kubernetes",
			"PostgreSQL",
			"MongoDB",
			"FHIR",
			"Jest",
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
					"Integrated Stripe for secure payments and connected endpoints seamlessly with a React frontend.",
					"Implemented authentication using Passport.js and strengthened reliability through Jest-based unit testing.",
					"Designed RESTful APIs with Express.js & MongoDB to support dynamic customer workflows.",
				],
			},
		],
		tech: [
			"Node.js",
			"Express.js",
			"MongoDB",
			"React",
			"Passport.js",
			"Stripe API",
			"Jest",
		],
	},
];

export const staticProjects = [
	{
		title: "Vidx",
		description:
			"Architected a distributed video-rendering platform using FastAPI and React, supporting 50+ cinematic transitions. Built a non-blocking parallel pipeline using RabbitMQ + Celery, dynamically scaling workers based on CPU/GPU availability. Compiled a custom FFmpeg build with GL-Transitions to enable 4K rendering while reducing memory overhead.",
		tech: [
			"FastAPI",
			"React",
			"RabbitMQ",
			"Celery",
			"Docker",
			"MongoDB",
			"Traefik",
			"FFmpeg",
		],
		links: {
			github: "https://github.com/adnahmed/vidx-infra",
			live: "https://clipifie.com/",
		},
		date: "May 2025 -- Oct 2025",
	},
	{
		title: "pdf-annotate.js",
		description:
			"Added a remote StoreAdapter enabling real-time annotation sync with a central API. Optimized SVG/TypeScript rendering logic to prevent annotation overlap and improve interactive performance.",
		tech: ["PDF.js", "TypeScript", "SVG"],
		links: { github: "https://github.com/adnahmed/pdf-annotate.js" },
		date: "Mar 2024 -- Apr 2024",
	},
	{
		title: "REPS",
		description: "Remote Exam Proctoring System with real-time monitoring.",
		tech: ["TypeScript", "Live Streaming", "WebRTC"],
		links: { github: "https://github.com/adnahmed/reps" },
	},
	{
		title: "Crackq.me",
		description:
			"Built a SaaS platform for distributed cryptographic hash cracking using Next.js and containerized workers. Leveraged Fitcrack (BOINC) to orchestrate a global grid of GPU nodes, enabling on-demand scaling without downtime.",
		tech: ["Next.js", "TypeScript", "Docker", "Hashcat", "Fitcrack/BOINC"],
		links: {
			github: "https://github.com/adnahmed/hashcrack",
			live: "https://hashcrack-git-dev-adnan-repo.vercel.app/",
		},
		date: "Feb 2023 -- Dec 2023",
	},
];
