export interface Project {
  id: number | string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  tags: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  year?: number;
  role?: string;
  longDescription?: string;
  features?: string[];
}
