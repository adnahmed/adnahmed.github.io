"use client";
import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { staticProjects } from "@/lib/data";
import { FolderGit2, Globe } from "lucide-react";

const Overlay = ({ item }: { item: typeof staticProjects[0] }) => (
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-20">
        {item.links.github && (
            <a href={item.links.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition"><FolderGit2 className="w-5 h-5 text-white" /></a>
        )}
        {item.links.live && (
            <a href={item.links.live} target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition"><Globe className="w-5 h-5 text-white" /></a>
        )}
    </div>
);

const ProjectHeader = ({ item }: { item: typeof staticProjects[0] }) => {
  const [error, setError] = useState(false);
  
  let imageUrl = null;

  // 1. Build-time Snapshot (served locally)
  if (item.links.live) {
      const filename = item.title.toLowerCase().replace(/[^a-z0-9]/g, "-") + ".png";
      imageUrl = `/snapshots/${filename}`;
  } 
  // 2. Fallback to GitHub Open Graph
  else if (item.links.github) {
    try {
        const url = new URL(item.links.github);
        const pathParts = url.pathname.split('/').filter(Boolean);
        if (pathParts.length >= 2) {
            const user = pathParts[0];
            const repo = pathParts[1];
            imageUrl = `https://opengraph.githubassets.com/1/${user}/${repo}`;
        }
    } catch (e) {
        // invalid url
    }
  }

  if (!imageUrl || error) {
      return (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 items-center justify-center border border-white/[0.1] relative overflow-hidden group">
             <Overlay item={item} />
             <div className="opacity-30 text-6xl font-black text-neutral-700 select-none">
                {item.title.substring(0,1)}
             </div>
        </div>
      );
  }

  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-900 items-center justify-center border border-white/[0.1] relative overflow-hidden group">
         {/* eslint-disable-next-line @next/next/no-img-element */}
         <img 
            src={imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition duration-200 grayscale group-hover:grayscale-0"
            onError={() => setError(true)}
         />
         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition z-10" />
         <Overlay item={item} />
    </div>
  );
};

export function Projects() {
  return (
    <div className="w-full max-w-7xl mx-auto py-20 px-4">
       <h2 className="text-3xl font-bold mb-12 text-center text-neutral-200">Featured Projects</h2>
      <BentoGrid className="max-w-4xl mx-auto">
        {staticProjects.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={
                <div className="flex flex-col gap-2">
                    <span>{item.description}</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                        {item.tech.map((t, idx) => (
                            <span key={idx} className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded border border-neutral-700">{t}</span>
                        ))}
                    </div>
                </div>
            }
            header={<ProjectHeader item={item} />}
            className={i === 3 || i === 0 ? "md:col-span-2" : ""}
            icon={<FolderGit2 className="h-4 w-4 text-neutral-500" />}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
