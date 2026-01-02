"use client";

import { FolderGit2, Loader2 } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";

interface Repo {
	name: string;
	url: string;
	description: string;
	category: string;
}

const INITIAL_LOAD_SIZE = 60; // Enough to fill the screen twice
const BATCH_SIZE = 40; // Add in larger chunks
const BATCH_INTERVAL = 15000; // 15 seconds between updates to minimize jitter
const MAX_DOM_ITEMS = 1000; // Limit total items to protect memory/CPU

// Helper to slugify category names for GitHub URLs
const slugify = (text: string) => {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "") // Remove emojis/special chars
		.replace(/\s+/g, "-") // Spaces to hyphens
		.replace(/-+/g, "-"); // Collapse double hyphens
};

// Fisher-Yates shuffle to randomize repo order per visit
const shuffle = <T,>(arr: T[]) => {
	const copy = [...arr];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
};

// Take a random batch without replacement from a mutable array
const takeRandomBatch = <T,>(source: T[], size: number) => {
	const batch: T[] = [];
	for (let i = 0; i < size && source.length > 0; i++) {
		const idx = Math.floor(Math.random() * source.length);
		batch.push(source[idx]);
		source.splice(idx, 1);
	}
	return batch;
};

export function ToolsAndInterests() {
	const [repos, setRepos] = useState<Repo[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Storage for everything we've parsed but haven't shown yet
	const allParsedRepos = useRef<Repo[]>([]);

	const parseEntireFile = useCallback((text: string) => {
		const lines = text.split("\n");
		let currentCategory = "General";
		let inTable = false;
		let inTOC = false;

		const parsedRepos: Repo[] = [];
		const foundCategories: string[] = [];

		const categoryRegex = /^##\s+(.+)$/;
		const tableSeparatorRegex = /^\|[-\s|]+\|$/;
		const tableRowRegex =
			/^\|\s*\[([^\]]+)\]\(([^)]+)\)\s*\|\s*([^|]*)\s*\|\s*⭐\s*[\d,]+\s*\|$/;
		const tocItemRegex = /^-\s+\[(.+?)\s*\(\d+\)\]\(#.+\)$/;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();

			// 1. TOC Parsing (for categories)
			if (line === "## TOC") {
				inTOC = true;
				continue;
			}
			if (inTOC) {
				if (line.startsWith("##") && line !== "## TOC") {
					inTOC = false;
				} else {
					const match = line.match(tocItemRegex);
					if (match) {
						const catName = match[1].trim();
						if (catName !== "Uncategorized Repositories") {
							foundCategories.push(catName);
						}
					}
					continue;
				}
			}

			// 2. Repo Parsing
			const catMatch = line.match(categoryRegex);
			if (catMatch) {
				currentCategory = catMatch[1].trim();
				inTable = false;
				continue;
			}

			if (tableSeparatorRegex.test(line)) {
				inTable = true;
				continue;
			}

			if (inTable) {
				const tableMatch = line.match(tableRowRegex);
				if (tableMatch) {
					parsedRepos.push({
						name: tableMatch[1].trim(),
						url: tableMatch[2].trim(),
						description: tableMatch[3].trim() || "",
						category: currentCategory,
					});
				}
			}
		}

		// Set categories immediately
		setCategories(foundCategories.sort());

		// Shuffle repos so every visit feels fresh
		allParsedRepos.current = shuffle(parsedRepos);

		// Load initial randomized set for the marquee, removing them from the pool
		const initial = takeRandomBatch(allParsedRepos.current, INITIAL_LOAD_SIZE);
		setRepos(initial);
		setIsLoading(false);
	}, []);

	useEffect(() => {
		const fetchStars = async () => {
			try {
				const response = await fetch("/stars.md");
				if (!response.ok) throw new Error("Could not find stars.md");
				const text = await response.text();
				parseEntireFile(text);
			} catch (err) {
				console.error("Error loading stars:", err);
				setIsLoading(false);
			}
		};

		fetchStars();
	}, [parseEntireFile]);

	// Lazy loading logic: Add more items from the ref to the state in large, rare chunks
	useEffect(() => {
		if (isLoading) return;

		const interval = setInterval(() => {
			const remaining = allParsedRepos.current.length;

			if (remaining > 0 && repos.length < MAX_DOM_ITEMS) {
				const newBatch = takeRandomBatch(allParsedRepos.current, BATCH_SIZE);
				setRepos((prev) => [...prev, ...newBatch]);
			} else if (remaining === 0 || repos.length >= MAX_DOM_ITEMS) {
				clearInterval(interval);
			}
		}, BATCH_INTERVAL);

		return () => clearInterval(interval);
	}, [isLoading, repos.length]);

	return (
		<div className="w-full py-20 bg-neutral-900/50 relative overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 mb-10">
				<div className="flex items-center justify-center gap-4 mb-2">
					<h2 className="text-3xl font-bold text-center text-neutral-200">
						Tools & Ecosystems
					</h2>
					{isLoading && (
						<Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
					)}
				</div>

				{/* Tech Cloud */}
				<div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto min-h-[40px]">
					{categories.map((cat, idx) => (
						<a
							key={idx}
							href={`https://github.com/stars/adnahmed/lists/${slugify(cat)}`}
							target="_blank"
							rel="noopener noreferrer"
							className="px-4 py-2 bg-neutral-800/80 border border-neutral-700 rounded-full text-neutral-300 text-sm hover:bg-neutral-700 hover:border-blue-500/50 transition-all cursor-pointer animate-in fade-in zoom-in duration-300"
						>
							{cat}
						</a>
					))}
				</div>
			</div>

			{/* Marquee */}
			<div className="relative border-y border-neutral-800 bg-black/20 backdrop-blur-sm py-8 h-[220px]">
				<div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-transparent to-neutral-900 z-10 pointer-events-none" />

				{repos.length > 0 ? (
					<Marquee gradient={false} speed={35} pauseOnHover>
						{repos.map((repo, idx) => (
							<a
								key={`${repo.url}-${idx}`}
								href={repo.url}
								target="_blank"
								rel="noopener noreferrer"
								className="mx-6 w-72 flex flex-col gap-2 p-4 rounded-lg bg-neutral-900/40 border border-white/[0.05] hover:border-white/[0.2] transition group"
							>
								<div className="flex items-center justify-between">
									<span className="font-semibold text-neutral-200 truncate group-hover:text-blue-400 transition-colors max-w-[90%] text-sm">
										{repo.name}
									</span>
									<FolderGit2 className="w-4 h-4 text-neutral-600" />
								</div>
								<p className="text-[11px] text-neutral-500 line-clamp-2 min-h-[2.5em] leading-relaxed">
									{repo.description}
								</p>
								<div className="flex items-center gap-2 mt-auto pt-2 justify-between">
									<span className="text-[9px] text-neutral-600 uppercase tracking-widest font-medium">
										GitHub
									</span>
									<span className="text-[9px] px-1.5 py-0.5 bg-blue-900/30 text-blue-300 rounded border border-blue-800/50 font-medium">
										{repo.category}
									</span>
								</div>
							</a>
						))}
					</Marquee>
				) : (
					<div className="flex items-center justify-center h-full text-neutral-600 font-medium italic">
						{isLoading ? "Fetching curated tools..." : "No repositories found"}
					</div>
				)}
			</div>
		</div>
	);
}
