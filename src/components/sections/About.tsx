"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaCode, FaMobileAlt, FaServer, FaTools, FaAws } from "react-icons/fa";
import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiMongodb,
  SiFirebase,
  SiPython,
  SiNextdotjs,
  SiJavascript,
} from "react-icons/si";
import styles from "./About.module.scss";

const skills = [
  {
    category: "Frontend",
    icon: <FaCode className={styles.skillIcon} />,
    items: [
      { name: "React", level: 90, icon: <SiReact /> },
      { name: "Next.js", level: 85, icon: <SiNextdotjs /> },
      { name: "TypeScript", level: 85, icon: <SiTypescript /> },
      { name: "JavaScript (ES6+)", level: 90, icon: <SiJavascript /> },
      { name: "HTML5 & CSS3", level: 90, icon: <FaCode /> },
      { name: "Redux", level: 75, icon: <FaCode /> },
    ],
  },
  {
    category: "Mobile",
    icon: <FaMobileAlt className={styles.skillIcon} />,
    items: [
      { name: "React Native", level: 90, icon: <SiReact /> },
      { name: "Android (Kotlin/Java)", level: 65, icon: <FaMobileAlt /> },
      { name: "iOS Development", level: 60, icon: <FaMobileAlt /> },
      { name: "Expo", level: 80, icon: <FaMobileAlt /> },
    ],
  },
  {
    category: "Backend",
    icon: <FaServer className={styles.skillIcon} />,
    items: [
      { name: "Node.js", level: 85, icon: <SiNodedotjs /> },
      { name: "Express", level: 85, icon: <SiNodedotjs /> },
      { name: "Python FastAPI", level: 85, icon: <SiPython /> },
      { name: "RESTful APIs", level: 90, icon: <FaServer /> },
      { name: "GraphQL", level: 70, icon: <FaServer /> },
      { name: "WebSockets", level: 75, icon: <FaServer /> },
    ],
  },
  {
    category: "Tools & Others",
    icon: <FaTools className={styles.skillIcon} />,
    items: [
      { name: "MongoDB", level: 80, icon: <SiMongodb /> },
      { name: "Firebase", level: 85, icon: <SiFirebase /> },
      { name: "AWS", level: 70, icon: <FaAws /> },
      { name: "Docker", level: 55, icon: <FaTools /> },
      { name: "Git", level: 85, icon: <FaTools /> },
    ],
  },
];

const About = () => {
  // Removed container and item variants to reduce animation load

  return (
    <section id="about" className={`${styles.about} section`}>
      <div className={`${styles.container} container`}>
        <motion.div
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2>About Me</h2>
          <p>Get to know more about my skills and experience</p>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.textContent}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className={styles.textContent2}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h3>Full-Stack Developer with a Passion for Mobile</h3>
            <p>
              I&apos;m a passionate Full-Stack Developer with over 2 years of
              experience in building modern web and mobile applications. I
              specialize in the MERN stack (MongoDB, Express, React, Node.js)
              and have extensive experience with React Native for cross-platform
              mobile development.
            </p>
            <p>
              My journey in software development started with a curiosity for
              how things work, which led me to pursue a degree in Computer
              Science. Since then, I&apos;ve had the opportunity to work on
              various projects, from small business websites to large-scale
              enterprise applications.
            </p>
            <p>
              I&apos;m a strong believer in clean code, best practices, and
              continuous learning. I enjoy solving complex problems and turning
              ideas into reality through code. When I&apos;m not coding, you can
              find me exploring new technologies, contributing to open-source
              projects, or sharing my knowledge with the developer community.
            </p>
            </motion.div>

            <div className={styles.stats}>
              <motion.div
                className={styles.statItem}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className={styles.statNumber}>2+</div>
                <div className={styles.statLabel}>Years Experience</div>
              </motion.div>

              <motion.div
                className={styles.statItem}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className={styles.statNumber}>20+</div>
                <div className={styles.statLabel}>Projects Completed</div>
              </motion.div>

              <motion.div
                className={styles.statItem}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className={styles.statNumber}>5+</div>
                <div className={styles.statLabel}>Happy Clients</div>
              </motion.div>
            </div>

            <div className={styles.CharacterImageWrapper}>
              <Image
                src="/images/profile/charactor_Image.png"
                alt="Character Image"
                width={500}
                height={500}
                className={styles.CharacterImage}
                priority
                quality={100}
              />
            </div>
          </motion.div>

          <motion.div
            className={styles.skills}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h3>My Skills</h3>

            <div className={styles.skillsContainer}>
              {skills.map((skillCategory) => (
                <div
                  key={skillCategory.category}
                  className={styles.skillCategory}
                >
                  <div className={styles.skillHeader}>
                    {skillCategory.icon}
                    <h4>{skillCategory.category}</h4>
                  </div>
                  <div className={styles.skillItems}>
                    {skillCategory.items.map((skill) => (
                      <div key={skill.name} className={styles.skillItem}>
                        <div className={styles.skillInfo}>
                          <span className={styles.skillName}>
                            {skill.icon} {skill.name}
                          </span>
                          <span className={styles.skillPercent}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className={styles.skillBar}>
                          <motion.div
                            className={styles.skillLevel}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{
                              once: true,
                              margin: "-50px 0px -50px 0px",
                            }}
                            transition={{
                              duration: 0.8,
                              delay: 0.1,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
