export interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

export async function getRecentStars(): Promise<Repo[]> {
  try {
    const res = await fetch("https://api.github.com/users/adnahmed/starred?per_page=15&sort=created&direction=desc");
    
    if (!res.ok) {
      console.error("Failed to fetch stars");
      return [];
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching stars:", error);
    return [];
  }
}
