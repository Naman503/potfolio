"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TypingEffect from "@/components/ui/TypingEffect";
import Image from "next/image";
import styles from "./Hero.module.scss";

// Scroll to section function
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: "-50px 0px",
  });

  const texts = useMemo(
    () => [
      "Full-Stack Developer",
      "React Native Expert",
      "Problem Solver",
      "Tech Enthusiast",
    ],
    []
  );

  const handleScrollDown = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection("about");
    // Focus the about section for better accessibility
    setTimeout(() => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.setAttribute("tabindex", "-1");
        aboutSection.focus();
      }
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleScrollDown(e as unknown as React.MouseEvent);
    }
  };

  return (
    <section id="home" className={styles.hero} ref={ref}>
      <div className={styles.heroBackground} />

      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div
            className={styles.textContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className={styles.title}>
              <motion.span
                className={styles.highlight}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
                transition={{
                  delay: 0.2,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Hi, I&apos;m
              </motion.span>
              <br />
              <motion.span
                className={styles.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
                transition={{
                  delay: 0.3,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Naman Pathak
              </motion.span>
            </h1>

            <motion.div
              className={styles.typingContainer}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
              transition={{
                delay: 0.4,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TypingEffect
                texts={texts}
                typingSpeed={100}
                deletingSpeed={50}
                pauseTime={2000}
              />
            </motion.div>

            <motion.p
              className={styles.description}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
              transition={{
                delay: 0.5,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              I specialize in crafting digital experiences that are both
              innovative and accessible, using modern web technologies to build
              user-first products.
            </motion.p>

            <motion.div
              className={styles.buttons}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
              transition={{
                delay: 0.6,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.a
                href="#contact"
                className={styles.primaryButton}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
                transition={{
                  delay: 0.6,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  y: 1,
                  transition: { duration: 0.1 },
                }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
              >
                <span>Get In Touch</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </motion.a>

              <motion.a
                href="#projects"
                className={styles.secondaryButton}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
                transition={{
                  delay: 0.7,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  y: 1,
                  transition: { duration: 0.1 },
                }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("projects");
                }}
              >
                <span>View My Work</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.profileImageContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: inView ? 1 : 0,
              y: inView ? 0 : 20,
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.4,
            }}
          >
            <div className={styles.profileImageWrapper}>
              <Image
                src="/images/Profile/Naman_B.jpeg"
                alt="Naman Pathak"
                width={500}
                height={500}
                className={styles.profileImage}
                priority
                quality={100}
                data-critical="true"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        className={styles.scrollDown}
        onClick={handleScrollDown}
        onKeyDown={handleKeyDown}
        aria-label="Scroll down to about section"
        whileHover={{ y: 5, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-keyshortcuts="ArrowDown"
        title="Scroll down (or press ↓)"
      >
        <span>Scroll Down</span>
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <path
            d="M19 14L12 21M12 21L5 14M12 21V3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.button>
    </section>
  );
};

export default Hero;
