import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { ToolsAndInterests } from "@/components/ToolsAndInterests";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden selection:bg-purple-500/30">
      <Hero />
      <Projects />
      <Experience />
      <ToolsAndInterests />
      
      <footer className="py-10 text-center text-neutral-600 text-sm border-t border-neutral-900 mt-20">
        <p>&copy; {new Date().getFullYear()} Adnan Ahmed. Built with Next.js & Tailwind.</p>
      </footer>
    </main>
  );
}
