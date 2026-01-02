import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { staticProjects } from "@/lib/data";
import { FolderGit2, Globe } from "lucide-react";

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
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 items-center justify-center border border-white/[0.1] relative overflow-hidden group">
                 {/* Links Overlay */}
                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                     {item.links.github && (
                         <a href={item.links.github} target="_blank" className="p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition"><FolderGit2 className="w-5 h-5 text-white" /></a>
                     )}
                     {item.links.live && (
                         <a href={item.links.live} target="_blank" className="p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition"><Globe className="w-5 h-5 text-white" /></a>
                     )}
                 </div>
                 <div className="opacity-30 text-6xl font-black text-neutral-700 select-none">
                    {item.title.substring(0,1)}
                 </div>
            </div>}
            className={i === 3 || i === 0 ? "md:col-span-2" : ""}
            icon={<FolderGit2 className="h-4 w-4 text-neutral-500" />}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
