"use client";
import React from "react";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <div className="w-full max-w-4xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-12 text-center text-neutral-200">Work Experience</h2>
      <div className="relative border-l border-neutral-800 ml-4 md:ml-0 space-y-12">
        {experience.map((job, index) => (
          <div key={index} className="md:pl-12 relative">
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-2 w-3 h-3 bg-neutral-200 rounded-full border border-neutral-900 shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10" />
            
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-4">
               <div>
                  <h3 className="text-xl font-semibold text-neutral-100">{job.company}</h3>
                  <a href={job.link} target="_blank" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                    {job.location}
                  </a>
               </div>
               {/* Tech Stack for the job */}
               <div className="flex flex-wrap gap-2 max-w-sm">
                 {job.tech?.slice(0, 5).map((t, i) => (
                    <span key={i} className="text-xs bg-neutral-900 text-neutral-400 px-2 py-1 rounded-full border border-neutral-800">
                        {t}
                    </span>
                 ))}
                 {job.tech && job.tech.length > 5 && <span className="text-xs text-neutral-600 self-center">+{job.tech.length - 5}</span>}
               </div>
            </div>

            {/* Roles */}
            <div className="space-y-8">
                {job.roles.map((role, rIndex) => (
                    <div key={rIndex} className="relative pl-6 border-l border-neutral-800/50">
                        <div className="flex justify-between items-center mb-2">
                             <h4 className="text-lg font-medium text-neutral-200">{role.title}</h4>
                             <span className="text-sm text-neutral-400 font-mono">{role.start} - {role.end}</span>
                        </div>
                        <ul className="list-disc list-outside text-neutral-400 text-sm space-y-2 ml-4">
                            {role.description.map((desc, dIndex) => (
                                <li key={dIndex}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
