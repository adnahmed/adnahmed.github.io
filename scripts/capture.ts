import fs from "fs";
import path from "path";
import { staticProjects } from "../lib/data";

const SNAPSHOT_DIR = path.join(process.cwd(), "public", "snapshots");

async function downloadImage(url: string, filepath: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(filepath, buffer);
  console.log(`Saved ${filepath}`);
}

async function main() {
  if (!fs.existsSync(SNAPSHOT_DIR)) {
    fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });
  }

  for (const project of staticProjects) {
    if (project.links.live) {
      const filename = `${project.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.png`;
      const filepath = path.join(SNAPSHOT_DIR, filename);
       
      // Check if exists to avoid refetching if not needed (or force overwrite?)
      // Let's overwrite to ensure fresh "build time" snapshot
      
      console.log(`Fetching snapshot for ${project.title}...`);
      const encodedUrl = encodeURIComponent(project.links.live);
      // Using Microlink to generate the screenshot
      const microlinkUrl = `https://api.microlink.io/?url=${encodedUrl}&screenshot=true&meta=false&embed=screenshot.url`;
      
      try {
        await downloadImage(microlinkUrl, filepath);
      } catch (e) {
        console.error(`Error capturing ${project.title}:`, e);
      }
    }
  }
}

main().catch(console.error);
