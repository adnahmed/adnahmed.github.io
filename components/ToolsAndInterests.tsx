"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Marquee from "react-fast-marquee";
import { FolderGit2, Loader2 } from "lucide-react";

interface Repo {
  name: string;
  url: string;
  description: string;
  category: string;
}

const CHUNK_SIZE = 50; // Larger chunks for smoother marquee updates
const INITIAL_BATCH_SIZE = 30; // Load first batch quickly
const PARSE_DELAY = 150;

// Helper to slugify category names for GitHub URLs
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove emojis/specials
    .trim()
    .replace(/\s+/g, "-");
};

export function ToolsAndInterests() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDepleted, setIsDepleted] = useState(false);
  
  const categoriesCount = useRef<Map<string, number>>(new Map());

  const parseIncrementally = useCallback(async (text: string) => {
    const lines = text.split("\n");
    let currentCategory = "General";
    let inTable = false;
    let inTOC = false;
    let batch: Repo[] = [];
    let hasLoadedInitial = false;

    const categoryRegex = /^##\s+(.+)$/;
    const tableSeparatorRegex = /^\|[-\s|]+\|$/;
    const tableRowRegex = /^\|\s*\[([^\]]+)\]\(([^)]+)\)\s*\|\s*([^|]*)\s*\|\s*⭐\s*[\d,]+\s*\|$/;
    const tocItemRegex = /^-\s+\[(.+?)\s*\(\d+\)\]\(#.+\)$/;

    // 1. Immediate TOC Scan
    const immediateCategories: string[] = [];
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine === "## TOC") {
        inTOC = true;
        continue;
      }
      if (inTOC && trimmedLine.startsWith("##")) break; // End of TOC
      
      if (inTOC) {
        const match = trimmedLine.match(tocItemRegex);
        if (match) {
          const catName = match[1].trim();
          if (catName !== "Uncategorized Repositories") {
            immediateCategories.push(catName);
          }
        }
      }
    }
    if (immediateCategories.length > 0) {
      setCategories(immediateCategories.sort());
    }

    // 2. Incremental Repo Parsing
    inTOC = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      const catMatch = line.match(categoryRegex);
      if (catMatch) {
        const header = catMatch[1].trim();
        if (header.toLowerCase() === "toc") {
          inTOC = true;
          continue;
        }
        inTOC = false;
        currentCategory = header;
        inTable = false;
        continue;
      }

      if (inTOC) continue;

      if (tableSeparatorRegex.test(line)) {
        inTable = true;
        continue;
      }

      if (inTable) {
        const tableMatch = line.match(tableRowRegex);
        if (tableMatch) {
          const repo = {
            name: tableMatch[1].trim(),
            url: tableMatch[2].trim(),
            description: tableMatch[3].trim() || "",
            category: currentCategory,
          };
          
          batch.push(repo);

          // Update logic
          const shouldUpdate = !hasLoadedInitial 
            ? batch.length >= INITIAL_BATCH_SIZE 
            : batch.length >= CHUNK_SIZE;

          if (shouldUpdate) {
            const currentBatch = [...batch];
            setRepos(prev => [...prev, ...currentBatch]);
            batch = [];
            hasLoadedInitial = true;
            setIsLoading(false);
            await new Promise(resolve => setTimeout(resolve, PARSE_DELAY));
          }
        }
      }
    }

    if (batch.length > 0) {
      setRepos(prev => [...prev, ...batch]);
    }
    
    setIsLoading(false);
    setIsDepleted(true);
  }, []);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch("/stars.md");
        if (!response.ok) throw new Error("Could not find stars.md");
        const text = await response.text();
        await parseIncrementally(text);
      } catch (err) {
        console.error("Error loading stars:", err);
        setIsLoading(false);
      }
    };

    fetchStars();
  }, [parseIncrementally]);

  const displayRepos = repos.slice(-200);

  return (
    <div className="w-full py-20 bg-neutral-900/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <div className="flex items-center justify-center gap-4 mb-2">
          <h2 className="text-3xl font-bold text-center text-neutral-200">Tools & Ecosystems</h2>
          {isLoading && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
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
      <div className="relative border-y border-neutral-800 bg-black/20 backdrop-blur-sm py-8 h-[200px]">
         <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-transparent to-neutral-900 z-10 pointer-events-none" />
         
         {repos.length > 0 ? (
           <Marquee gradient={false} speed={35} pauseOnHover>
              {displayRepos.map((repo, idx) => (
                  <a key={`${repo.url}-${idx}`} href={repo.url} target="_blank" rel="noopener noreferrer" className="mx-6 w-72 flex flex-col gap-2 p-4 rounded-lg bg-neutral-900/40 border border-white/[0.05] hover:border-white/[0.2] transition group">
                      <div className="flex items-center justify-between">
                          <span className="font-semibold text-neutral-200 truncate group-hover:text-blue-400 transition-colors max-w-[90%]">{repo.name}</span>
                          <FolderGit2 className="w-4 h-4 text-neutral-600" />
                      </div>
                      <p className="text-xs text-neutral-500 line-clamp-2 min-h-[2.5em]">{repo.description}</p>
                      <div className="flex items-center gap-2 mt-auto pt-2 justify-between">
                           <span className="text-[10px] text-neutral-600 uppercase tracking-wider">GitHub</span>
                           <span className="text-[9px] px-1.5 py-0.5 bg-blue-900/30 text-blue-300 rounded border border-blue-800/50">{repo.category}</span>
                      </div>
                  </a>
              ))}
           </Marquee>
         ) : (
           <div className="flex items-center justify-center h-full text-neutral-600">
             {isLoading ? "Fetching list..." : "No items found"}
           </div>
         )}
      </div>
    </div>
  );
}


