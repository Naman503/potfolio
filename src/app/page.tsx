'use client';

import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import styles from './page.module.scss';
import { projects } from '@/data/projects';

// Import components with dynamic imports
const DynamicHero = dynamic(
  () => import('@/components/sections/Hero'),
  { 
    ssr: false,
    loading: () => <LoadingSpinner />
  }
);

const DynamicAbout = dynamic(
  () => import('@/components/sections/About'),
  { 
    ssr: false,
    loading: () => <LoadingSpinner />
  }
);

const DynamicProjects = dynamic(
  () => import('@/components/sections/Projects'),
  { 
    ssr: false,
    loading: () => <LoadingSpinner />
  }
);

const DynamicExperience = dynamic(
  () => import('@/components/sections/Experience'),
  { 
    ssr: false,
    loading: () => <LoadingSpinner />
  }
);

const DynamicContact = dynamic(
  () => import('@/components/sections/Contact'),
  { 
    ssr: false,
    loading: () => <LoadingSpinner />
  }
);

// Loading spinner component
const LoadingSpinner = () => (
  <div className={styles.loadingPlaceholder}>
    <div className={styles.loadingSpinner}></div>
  </div>
);

// Section configuration
interface SectionConfig {
  id: string;
  component: React.ComponentType;
  threshold: number;
}

const sections: SectionConfig[] = [
  { 
    id: 'home',
    component: DynamicHero,
    threshold: 0.1
  },
  { 
    id: 'about',
    component: DynamicAbout,
    threshold: 0.1
  },
  { 
    id: 'projects',
    component: () => <DynamicProjects projects={projects} />,
    threshold: 0.1
  },
  { 
    id: 'experience',
    component: DynamicExperience,
    threshold: 0.1
  },
  { 
    id: 'contact',
    component: DynamicContact,
    threshold: 0.1
  },
];

const useSectionRefs = () => {
  const homeRef = useInView({ triggerOnce: true, threshold: 0.1 });
  const aboutRef = useInView({ triggerOnce: true, threshold: 0.1 });
  const projectsRef = useInView({ triggerOnce: true, threshold: 0.1 });
  const experienceRef = useInView({ triggerOnce: true, threshold: 0.1 });
  const contactRef = useInView({ triggerOnce: true, threshold: 0.1 });

  return useMemo(() => ({
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    experience: experienceRef,
    contact: contactRef,
  }), [homeRef, aboutRef, projectsRef, experienceRef, contactRef]);
};

export default function Home() {
  const refs = useSectionRefs();

  // Set the page title and description
  useEffect(() => {
    document.title = 'Naman Pathak | Full-Stack Developer';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Personal portfolio of Naman Pathak, a Full-Stack Developer specializing in React, React Native, and Node.js.');
    }
  }, []);

  return (
    <main className={styles.main}>
      {sections.map(({ id, component: Component }) => {
        const sectionId = id as keyof typeof refs;
        const [ref, inView] = refs[sectionId];
        
        return (
          <section 
            key={id} 
            id={id} 
            className={`${styles.section} ${id === 'home' ? styles.home : ''}`}
            ref={ref}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: inView ? 1 : 0, 
                y: inView ? 0 : 20 
              }}
              transition={{ duration: 0.5 }}
            >
              {inView && <Component />}
            </motion.div>
          </section>
        );
      })}
    </main>
  );
}
