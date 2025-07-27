"use client";

import { motion, useInView } from "framer-motion";
import { JSX, useRef } from "react";
import { FaBriefcase, FaGraduationCap, FaCode } from "react-icons/fa";
import {
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiPython,
  SiAmazon as SiAws,
  SiFirebase,
  SiMysql,
  SiDocker,
  SiGit,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiAndroid,
} from "react-icons/si";
import { TbBrandNextjs, TbBrandReactNative } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa";
import styles from "./Experience.module.scss";

// Mapping of technology names to their corresponding icons
const techIcons: { [key: string]: JSX.Element } = {
  React: <SiReact />,
  "React Native": <TbBrandReactNative />,
  TypeScript: <SiTypescript />,
  JavaScript: <SiJavascript />,
  "Node.js": <SiNodedotjs />,
  "Next.js": <TbBrandNextjs />,
  MongoDB: <SiMongodb />,
  Python: <SiPython />,
  AWS: <SiAws />,
  Firebase: <SiFirebase />,
  MySQL: <SiMysql />,
  Docker: <SiDocker />,
  Git: <SiGit />,
  HTML: <SiHtml5 />,
  CSS: <SiCss3 />,
  Android: <SiAndroid />,
  FastAPI: <SiPython />,
  Express: <SiNodedotjs />,
  LangChain: <FaCode />,
  ChromaDB: <FaDatabase />,
  MERN: <SiMongodb />,
  ML: <SiPython />,
  "AI/ML": <SiPython />,
  BotPress: <FaCode />,
  "Face Recognition": <FaCode />,
  "Computer Science": <FaGraduationCap />,
  Algorithms: <FaCode />,
  "Data Structures": <FaCode />,
  "Web Development": <SiHtml5 />,
  "Software Engineering": <FaCode />,
};

type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  icon: JSX.Element;
  tags: string[];
  type?: "work" | "education" | "project";
};

const experiences: ExperienceItem[] = [
  {
    id: "exp1",
    type: "work" as const,
    role: "Core Engineer",
    company: "Metafic",
    period: "2023 - Present | Indore, India",
    description: [
      "Led and contributed to multiple mobile and web application projects using React Native, FastAPI, and modern JavaScript technologies",
      "Successfully led end-to-end mobile app project, building the frontend, backend, admin panel, and integrated an AI-driven chatbot using LangChain, ChromaDB, and MySQL",
      "Developed mobile applications including a Chef Booking App (Australia), Insurance App (Qatar), and Social Media App (Saudi Arabia)",
      "Built web projects including a Recruitment Platform, Productivity Tracker, Online School Platform, and Air Quality Dashboard",
    ],
    icon: <FaBriefcase />,
    tags: [
      "React Native",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "FastAPI",
      "MySQL",
      "AWS",
      "Firebase",
    ],
  },
  {
    id: "exp2",
    type: "work" as const,
    role: "Freelance Developer",
    company: "Self-Employed",
    period: "2022 - 2023 | Remote",
    description: [
      "Worked with various clients to develop and maintain web and mobile applications",
      "Collaborated with cross-functional teams to deliver high-quality software solutions",
      "Gained experience in full-stack development and project management",
    ],
    icon: <FaBriefcase />,
    tags: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Firebase",
      "HTML",
      "CSS",
      "JavaScript",
    ],
  },
  {
    id: "project1",
    type: "project" as const,
    role: "Vidyut - AI-Powered Maintenance Guide",
    company: "Smart India Hackathon (Ministry of Power)",
    period: "2023",
    description: [
      "Finalist project at Smart India Hackathon under the Ministry of Power",
      "Built an AI chatbot trained on ministry-provided data to assist with power station maintenance",
      "Technologies: React, Node.js, Python, Machine Learning, BotPress",
    ],
    icon: <FaCode />,
    tags: ["React", "Node.js", "Python", "ML", "BotPress", "AI/ML"],
  },
  {
    id: "project2",
    type: "project" as const,
    role: "Attendo - Face Detection Attendance System",
    company: "Hackathon Project",
    period: "2022",
    description: [
      "Web-based facial recognition system for accurate, real-time attendance tracking",
      "Built with MERN stack (MongoDB, Express, React, Node.js)",
      "Won 1st place in an internal hackathon for its precision and efficiency",
    ],
    icon: <FaCode />,
    tags: [
      "MERN",
      "Face Recognition",
      "MongoDB",
      "React",
      "Node.js",
      "Express",
    ],
  },
  {
    id: "edu1",
    type: "education" as const,
    role: "Bachelor of Technology - Computer Science",
    company: "Indore Institute of Science and Technology",
    period: "2024 | Indore, India",
    description: [
      "Specialized in Computer Science and Engineering",
      "Participated in multiple hackathons and coding competitions",
      "Developed strong foundation in algorithms, data structures, and software development",
    ],
    icon: <FaGraduationCap />,
    tags: [
      "Algorithms",
      "Data Structures",
      "Web Development",
      "Software Engineering",
      "Computer Science",
    ],
  },
];

interface ExperienceItemProps {
  exp: ExperienceItem;
  index: number;
  isInView: boolean;
}

const ExperienceItem = ({ exp, index, isInView }: ExperienceItemProps) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`${styles.timelineItem} ${
        isEven ? styles.left : styles.right
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              },
            }
          : {}
      }
    >
      <div className={styles.timelineContent}>
        <div className={styles.timelineIcon}>
          {exp.type === "work" ? (
            <FaBriefcase />
          ) : exp.type === "project" ? (
            <FaCode />
          ) : (
            <FaGraduationCap />
          )}
        </div>
        <div className={styles.timelineHeader}>
          <h3>{exp.role}</h3>
          <div className={styles.company}>{exp.company}</div>
          <div className={styles.period}>{exp.period}</div>
        </div>
        <ul className={styles.description}>
          {exp.description.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: isEven ? -10 : 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
        <div className={styles.tags}>
          {exp.tags.map((tag, i) => {
            const icon = techIcons[tag] || <FaCode />;
            return (
              <motion.span
                key={i}
                className={styles.tag}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              >
                <span className={styles.tagIcon}>{icon}</span>
                {tag}
              </motion.span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className={styles.experience} id="experience" ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeading}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Experience & Education</h2>
          <div className={styles.divider}></div>
        </motion.div>

        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={exp.id}
              exp={exp}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
