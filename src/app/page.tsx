"use client";

import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import styles from "./page.module.scss";
import { projects } from "@/data/projects";
import LoadingScreen from "@/components/ui/LoadingScreen";

// Import components directly for faster loading
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";



// Section configuration
interface SectionConfig {
  id: string;
  component: React.ComponentType;
  threshold: number;
}

const sections: SectionConfig[] = [
  {
    id: "home",
    component: Hero,
    threshold: 0.1,
  },
  {
    id: "about",
    component: About,
    threshold: 0.1,
  },
  {
    id: "projects",
    component: () => <Projects projects={projects} />,
    threshold: 0.1,
  },
  {
    id: "experience",
    component: Experience,
    threshold: 0.1,
  },
  {
    id: "contact",
    component: Contact,
    threshold: 0.1,
  },
];

const useSectionRefs = () => {
  const homeRef = useInView({ triggerOnce: true, threshold: 0.1 });
  const aboutRef = useInView({ triggerOnce: true, threshold: 0.1 });
  const projectsRef = useInView({ triggerOnce: true, threshold: 0.1 });
  const experienceRef = useInView({ triggerOnce: true, threshold: 0.1 });
  const contactRef = useInView({ triggerOnce: true, threshold: 0.1 });

  return useMemo(
    () => ({
      home: homeRef,
      about: aboutRef,
      projects: projectsRef,
      experience: experienceRef,
      contact: contactRef,
    }),
    [homeRef, aboutRef, projectsRef, experienceRef, contactRef]
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simple loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading
    
    return () => clearTimeout(timer);
  }, []);

  // Sections with direct component imports
  const sections = useMemo(() => [
    {
      id: "home",
      component: Hero,
      threshold: 0.1,
    },
    {
      id: "about",
      component: About,
      threshold: 0.1,
    },
    {
      id: "projects",
      component: () => <Projects projects={projects} />,
      threshold: 0.1,
    },
    {
      id: "experience",
      component: Experience,
      threshold: 0.1,
    },
    {
      id: "contact",
      component: Contact,
      threshold: 0.1,
    },
  ], []);

  const refs = useSectionRefs();

  // Set the page title and description
  useEffect(() => {
    document.title = "Naman Pathak | Full-Stack Developer";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Personal portfolio of Naman Pathak, a Full-Stack Developer specializing in React, React Native, and Node.js."
      );
    }
  }, []);

  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <LoadingScreen 
        isLoading={isLoading} 
        onLoadingComplete={handleLoadingComplete}
      />
      
      {!isLoading && (
        <motion.main 
          className={styles.main}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {sections.map(({ id, component: Component }) => {
            const sectionId = id as keyof typeof refs;
            const [ref, inView] = refs[sectionId];

            return (
              <section
                key={id}
                id={id}
                className={`${styles.section} ${id === "home" ? styles.home : ""}`}
                ref={ref}
              >
                <motion.div
                  initial={{ opacity: 0.8, y: 5 }} // Much more subtle animation
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{ 
                    duration: 0.2, // Very fast
                    ease: "easeOut"
                  }}
                >
                  <Component />
                </motion.div>
              </section>
            );
          })}
        </motion.main>
      )}
    </>
  );
}
