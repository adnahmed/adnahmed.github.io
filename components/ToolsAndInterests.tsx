import React from "react";
import Marquee from "react-fast-marquee";
import { getRecentStars } from "@/lib/github";
import { Star } from "lucide-react";

const interests = [
  { name: "3D", url: "https://github.com/stars/adnahmed/lists/3d" },
  { name: "AI", url: "https://github.com/stars/adnahmed/lists/ai" },
  { name: "Big Data", url: "https://github.com/stars/adnahmed/lists/big-data" },
  { name: "Cloud", url: "https://github.com/stars/adnahmed/lists/cloud" },
  { name: "Infosec", url: "https://github.com/stars/adnahmed/lists/infosec" },
  { name: "React", url: "https://github.com/stars/adnahmed/lists/react" },
  { name: "Hardware", url: "https://github.com/stars/adnahmed/lists/hardware" },
  { name: "Useful Libs", url: "https://github.com/stars/adnahmed/lists/useful-libs" },
  { name: "Design", url: "https://github.com/stars/adnahmed/lists/design" },
];

export async function ToolsAndInterests() {
  const stars = await getRecentStars();

  return (
    <div className="w-full py-20 bg-neutral-900/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10">
         <h2 className="text-3xl font-bold text-center text-neutral-200 mb-2">Tools & Ecosystems</h2>
         <p className="text-center text-neutral-400 mb-12">Exploring the landscape of software engineering, one star at a time.</p>
         
         {/* Tech Cloud */}
         <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-3xl mx-auto">
            {interests.map((item, idx) => (
                <a key={idx} href={item.url} target="_blank" className="px-4 py-2 bg-neutral-800/80 hover:bg-neutral-700/80 border border-neutral-700 rounded-full text-neutral-300 text-sm transition-all hover:scale-105 hover:border-neutral-500 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    {item.name}
                </a>
            ))}
         </div>
      </div>

      {/* Marquee */}
      <div className="relative border-y border-neutral-800 bg-black/20 backdrop-blur-sm py-8">
         <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-transparent to-neutral-900 z-10 pointer-events-none" />
         <Marquee gradient={false} speed={40} pauseOnHover>
            {stars.map((repo) => (
                <a key={repo.id} href={repo.html_url} target="_blank" className="mx-6 w-72 flex flex-col gap-2 p-4 rounded-lg bg-neutral-900/40 border border-white/[0.05] hover:border-white/[0.2] transition group">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-neutral-200 truncate group-hover:text-blue-400 transition-colors">{repo.name}</span>
                        <div className="flex items-center gap-1 text-yellow-500/80">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs">{repo.stargazers_count}</span>
                        </div>
                    </div>
                    <p className="text-xs text-neutral-500 line-clamp-2 min-h-[2.5em]">{repo.description}</p>
                    <div className="flex items-center gap-2 mt-auto pt-2">
                        <img src={repo.owner.avatar_url} alt={repo.owner.login} className="w-5 h-5 rounded-full opacity-70" />
                        <span className="text-[10px] text-neutral-600 uppercase tracking-wider">{repo.language}</span>
                    </div>
                </a>
            ))}
         </Marquee>
      </div>
    </div>
  );
}
