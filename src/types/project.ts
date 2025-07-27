export interface Project {
  id: string | number;
  title: string;
  heading: string;
  subHeading: string;
  description: string;
  image: string;
  images?: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  technologies: string[];
  featured?: boolean;
  year?: number;
  role?: string;
  longDescription?: string;
  features?: string[];
  carouselImages?: string[];
}
