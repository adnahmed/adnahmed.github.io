import React from "react";
import Marquee from "react-fast-marquee";
import fs from "fs";
import path from "path";
import { FolderGit2 } from "lucide-react";

interface Repo {
  name: string;
  url: string;
  description: string;
  category: string;
}

function parseStarsMarkdown(content: string): Repo[] {
  const lines = content.split("\n");
  const repos: Repo[] = [];
  let currentCategory = "General";

  // Match headers like "## Title"
  const categoryRegex = /^##\s+(.+)$/;
  // Match items like "- [Name](URL) - Description" or "- [Name](URL)"
  const itemRegex = /^-\s+\[([^\]]+)\]\(([^)]+)\)(?:\s*-\s*(.+))?$/;

  for (const line of lines) {
    const catMatch = line.match(categoryRegex);
    if (catMatch) {
      currentCategory = catMatch[1].trim();
      continue;
    }

    const itemMatch = line.match(itemRegex);
    if (itemMatch) {
      const name = itemMatch[1];
      const url = itemMatch[2];
      const description = itemMatch[3] || "";
      repos.push({
        name,
        url,
        description,
        category: currentCategory,
      });
    }
  }
  return repos;
}

export function ToolsAndInterests() {
  const filePath = path.join(process.cwd(), "lib", "stars.md");
  let repos: Repo[] = [];
  
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    repos = parseStarsMarkdown(fileContent);
  }

  // Shuffle the repos for the marquee
  const shuffled = [...repos];
  for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  const categories = Array.from(new Set(repos.map(r => r.category))).sort();

  return (
    <div className="w-full py-20 bg-neutral-900/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10">
         <h2 className="text-3xl font-bold text-center text-neutral-200 mb-2">Tools & Ecosystems</h2>
         <p className="text-center text-neutral-400 mb-12">
            Curated via <a href="https://github.com/adnahmed?tab=stars" className="text-blue-400 hover:underline">GitHub Stars</a>
         </p>
         
         {/* Tech Cloud */}
         <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-3xl mx-auto">
            {categories.map((cat, idx) => (
                <span key={idx} className="px-4 py-2 bg-neutral-800/80 border border-neutral-700 rounded-full text-neutral-300 text-sm">
                    {cat}
                </span>
            ))}
         </div>
      </div>

      {/* Marquee */}
      <div className="relative border-y border-neutral-800 bg-black/20 backdrop-blur-sm py-8">
         <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-transparent to-neutral-900 z-10 pointer-events-none" />
         <Marquee gradient={false} speed={40} pauseOnHover>
            {shuffled.map((repo, idx) => (
                <a key={idx} href={repo.url} target="_blank" rel="noopener noreferrer" className="mx-6 w-72 flex flex-col gap-2 p-4 rounded-lg bg-neutral-900/40 border border-white/[0.05] hover:border-white/[0.2] transition group">
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
      </div>
    </div>
  );
}
