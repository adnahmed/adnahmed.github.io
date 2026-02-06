export const profile = {
	name: "Adnan Ahmed",
	role: "Senior Backend & Platform Engineer",
	email: "khanadnanahmed01@gmail.com",
	socials: {
		linkedin: "https://linkedin.com/in/adnahmed",
		github: "https://github.com/adnahmed",
	},
	about:
		"Senior Backend & Platform Engineer specializing in distributed systems, Kubernetes, and SRE. 5+ years of experience building scalable cloud-native architectures on AWS. Proven track record decomposing monoliths into microservices, reducing API latency from 30s+ to <1s, cutting deployment times from hours to minutes, and achieving 99.9% availability. Expert in observability, infrastructure-as-code, and leading high-performance teams.",
};

export const experience = [
	{
		company: "HackOnTech",
		location: "Islamabad, Pakistan",
		link: "https://hackontech.com/",
		roles: [
			{
				title: "Senior Software Engineer (Backend & Platform)",
				start: "2023",
				end: "Present",
				description: [
					"Decomposed a monolith into 6 Docker/EKS microservices, cutting deployment time from hours to minutes with zero-downtime releases.",
					"Instrumented Jaeger tracing and Prometheus/Grafana dashboards to cut MTTR from ~45 minutes to under 10 minutes by isolating cross-service latency.",
					"Implemented Temporal workflows with idempotency and compensation to reduce failed cross-service operations by ~80% (from 150/day to <30).",
					"Reduced core query latency from 30s+ to under 1s through indexing, connection pooling, and service decomposition (Postgres/Redis).",
					"Built GitHub Actions + ArgoCD CI/CD pipelines with security gates, canary releases, and blue-green deployments supporting 99.9% availability.",
					"Reduced AWS spend by ~25% via EKS node rightsizing, autoscaling tuning, and spot instances without SLO impact.",
					"Stabilized 500-800 RPS burst windows with rate limiting, queue-based smoothing, and graceful degradation across 100k+ DAU platform.",
				],
			},
		],
		tech: [
			"AWS",
			"EKS",
			"Lambda",
			"S3",
			"Terraform",
			"Helm",
			"GitHub Actions",
			"ArgoCD",
			"TypeScript",
			"Node.js",
			"Nest.js",
			"FastAPI",
			"Python",
			"Postgres",
			"Redis",
			"Docker",
			"Prometheus",
			"Grafana",
			"Jaeger",
			"Temporal",
			"Step Functions",
		],
	},
	{
		company: "Creative IT Park",
		location: "Islamabad, Pakistan",
		link: "https://creativeitpark.org/",
		roles: [
			{
				title: "Backend Developer",
				start: "2021",
				end: "2023",
				description: [
					"Delivered backend services for School Management System, Rawalpindi Women University, and Capital Development Authority portal.",
					"Cut search latency by eliminating N+1 queries and implementing aggregated queries with Elasticsearch and Redis caching.",
					"Maintained notification delivery during downstream failures by implementing a Kafka-based pipeline with retries and circuit breakers.",
					"Prevented traffic to degraded pods by operating Kubernetes/Helm deployments with readiness probes and health gating.",
				],
			},
		],
		tech: [
			"Node.js",
			"Python",
			"FastAPI",
			"React",
			"TypeScript",
			"AWS",
			"ECS",
			"RDS",
			"DynamoDB",
			"Kafka",
			"Elasticsearch",
			"Redis",
			"Kubernetes",
			"Helm",
			"PostgreSQL",
			"MongoDB",
			"Docker",
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
				start: "2020",
				end: "2021",
				description: [
					"Designed payment APIs with Express.js and MongoDB, integrating Stripe checkout with webhook reconciliation for production use.",
					"Hardened authentication with Passport.js strategies and Jest tests to stabilize login flows.",
					"Built RESTful APIs supporting dynamic customer workflows.",
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
			"Built a 4K-capable distributed video-rendering platform with FastAPI backend, async task queues, and distributed GPU workers supporting 50+ GL-Transitions shaders. Compiled a custom FFmpeg build with GL-Transitions streaming pipelines to cut peak memory usage ~40%, enabling 4K rendering on mid-tier GPUs. Resolved GPU bottlenecks by autoscaling consumers on queue depth and adding priority queues, improving turnaround under burst load.",
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
			"Added a remote WebSocket StoreAdapter enabling real-time multi-user annotation sync with conflict resolution for synchronized sessions. Optimized SVG/TypeScript rendering logic to achieve smooth 60fps rendering under high annotation counts through spatial indexing and SVG optimizations, preventing annotation overlap and improving interactive performance.",
		tech: ["PDF.js", "TypeScript", "SVG", "WebSocket"],
		links: { github: "https://github.com/adnahmed/pdf-annotate.js" },
		date: "Mar 2024 -- Apr 2024",
	},
	{
		title: "Crackq.me",
		description:
			"Built a distributed hash-testing platform for authorized security research, integrating Hashcat with a BOINC-style volunteer GPU grid and secure job dispatch. Solved throughput bottlenecks by tuning kernel batch sizes and scheduling, increasing hashes/sec without adding hardware. Implemented capability-aware routing and priority queues to keep urgent jobs moving while maintaining fairness.",
		tech: ["Next.js", "TypeScript", "Docker", "Hashcat", "BOINC"],
		links: {
			github: "https://github.com/adnahmed/hashcrack",
			live: "https://hashcrack-git-dev-adnan-repo.vercel.app/",
		},
		date: "Feb 2023 -- Dec 2023",
	},
];
