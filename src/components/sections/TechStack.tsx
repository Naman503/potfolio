'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FaReact, FaNodeJs, FaMobileAlt, FaDatabase, FaServer, FaCode } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiNextdotjs, SiGraphql, SiDocker, SiAws, SiFirebase, SiMongodb, SiPostgresql, SiRedux, SiTailwindcss, } from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import styles from './TechStack.module.scss';

type TechItem = {
  name: string;
  icon: JSX.Element;
  category: string;
  color: string;
};

const techStack: TechItem[] = [
  {
    name: 'React',
    icon: <FaReact />,
    category: 'Frontend',
    color: '#61DAFB',
  },
  {
    name: 'Next.js',
    icon: <SiNextdotjs />,
    category: 'Frontend',
    color: '#000000',
  },
  {
    name: 'TypeScript',
    icon: <SiTypescript />,
    category: 'Frontend',
    color: '#3178C6',
  },
  {
    name: 'JavaScript',
    icon: <SiJavascript />,
    category: 'Frontend',
    color: '#F7DF1E',
  },
  {
    name: 'React Native',
    icon: <TbBrandReactNative />,
    category: 'Mobile',
    color: '#61DAFB',
  },
  {
    name: 'Redux',
    icon: <SiRedux />,
    category: 'State Management',
    color: '#764ABC',
  },
  {
    name: 'Node.js',
    icon: <FaNodeJs />,
    category: 'Backend',
    color: '#68A063',
  },
  {
    name: 'GraphQL',
    icon: <SiGraphql />,
    category: 'Backend',
    color: '#E10098',
  },
  {
    name: 'MongoDB',
    icon: <SiMongodb />,
    category: 'Database',
    color: '#47A248',
  },
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql />,
    category: 'Database',
    color: '#336791',
  },
  {
    name: 'Firebase',
    icon: <SiFirebase />,
    category: 'Backend',
    color: '#FFCA28',
  },
  {
    name: 'AWS',
    icon: <SiAws />,
    category: 'DevOps',
    color: '#FF9900',
  },
  {
    name: 'Docker',
    icon: <SiDocker />,
    category: 'DevOps',
    color: '#2496ED',
  },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss />,
    category: 'Frontend',
    color: '#38BDF8',
  },
];

const categories = [
  { id: 'all', name: 'All', icon: <FaCode /> },
  { id: 'frontend', name: 'Frontend', icon: <FaCode /> },
  { id: 'mobile', name: 'Mobile', icon: <FaMobileAlt /> },
  { id: 'backend', name: 'Backend', icon: <FaServer /> },
  { id: 'database', name: 'Database', icon: <FaDatabase /> },
];

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const filteredTech = activeCategory === 'all' 
    ? techStack 
    : techStack.filter(tech => tech.category.toLowerCase() === activeCategory);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section id="tech-stack" className={`${styles.techStack} section`} ref={ref}>
      <div className={`${styles.container} container`}>
        <motion.div 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2>Tech Stack</h2>
          <p>Technologies I've worked with and mastered</p>
        </motion.div>

        <motion.div 
          className={styles.categories}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                activeCategory === category.id ? styles.active : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </motion.div>

        <motion.div 
          className={styles.techGrid}
          variants={container}
          initial="hidden"
          animate={controls}
        >
          {filteredTech.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className={styles.techCard}
              variants={item}
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              style={{
                '--tech-color': tech.color,
                '--tech-color-rgb': hexToRgb(tech.color),
              } as React.CSSProperties}
            >
              <div className={styles.techIcon} style={{ color: tech.color }}>
                {tech.icon}
              </div>
              <div className={styles.techName}>{tech.name}</div>
              <div className={styles.techCategory}>{tech.category}</div>
              
              {hoveredTech === tech.name && (
                <motion.div 
                  className={styles.techHoverEffect}
                  layoutId="hoverEffect"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Helper function to convert hex to rgb
function hexToRgb(hex: string): string {
  // Remove the hash if it exists
  hex = hex.replace('#', '');
  
  // Parse r, g, b values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}

export default TechStack;
