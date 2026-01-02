"use client";
import React from "react";
import { Spotlight } from "./ui/spotlight";
import { profile } from "@/lib/data";
import { Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-background/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          {profile.name} <br />
          <span className="text-2xl md:text-4xl font-normal text-neutral-300">
            {profile.role}
          </span>
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          {profile.about}
        </p>

        <div className="flex justify-center gap-6 mt-8">
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
            </a>
            <a href={`mailto:${profile.email}`} className="text-neutral-400 hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
            </a>
        </div>
      </div>
    </div>
  );
}
