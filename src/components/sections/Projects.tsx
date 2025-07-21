"use client";

import { FC, useState, useRef, useCallback, useEffect, JSX } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import styles from "./Projects.module.scss";
import { FiExternalLink, FiGithub, FiX, FiCode } from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiSass,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiGitlab,
  SiDocker,
  SiPython,
  SiDjango,
  SiAmazon as SiAws,
  SiMaterialdesign as SiMui,
  SiBootstrap,
  SiRedux,
  SiFirebase,
  SiGraphql,
} from "react-icons/si";

// Animation variants for Framer Motion
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
  hover: {
    y: -5,
    transition: { duration: 0.2 },
  },
};

// Project type definition
interface Project {
  id: string | number;
  title: string;
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
}

interface ProjectsProps {
  projects: Project[];
}

const Projects: FC<ProjectsProps> = ({ projects = [] }) => {
  // State for modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Get tech icon component
  const getTechIcon = (tech: string) => {
    const techIcons: { [key: string]: JSX.Element } = {
      react: <SiReact />,
      nextjs: <SiNextdotjs />,
      typescript: <SiTypescript />,
      javascript: <SiJavascript />,
      html: <SiHtml5 />,
      css: <SiCss3 />,
      sass: <SiSass />,
      tailwind: <SiTailwindcss />,
      node: <SiNodedotjs />,
      express: <SiExpress />,
      mongodb: <SiMongodb />,
      postgresql: <SiPostgresql />,
      git: <SiGit />,
      github: <SiGithub />,
      gitlab: <SiGitlab />,
      docker: <SiDocker />,
      python: <SiPython />,
      django: <SiDjango />,
      aws: <SiAws />,
      materialui: <SiMui />,
      bootstrap: <SiBootstrap />,
      redux: <SiRedux />,
      firebase: <SiFirebase />,
      graphql: <SiGraphql />,
      // Add more tech icons as needed
    };

    return techIcons[tech.toLowerCase()] || <FiCode />;
  };

  // Open modal with selected project
  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  }, []);

  // Define nextImage and prevImage before they're used
  const nextImage = useCallback(() => {
    if (!selectedProject?.images) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedProject.images!.length - 1 ? 0 : prevIndex + 1
    );
  }, [selectedProject]);

  const prevImage = useCallback(() => {
    if (!selectedProject?.images) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedProject.images!.length - 1 : prevIndex - 1
    );
  }, [selectedProject]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isModalOpen || !selectedProject) return;

      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    },
    [isModalOpen, selectedProject, closeModal, nextImage, prevImage]
  );

  // Handle click outside modal
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    },
    [closeModal]
  );

  // Handle touch events for mobile swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (
      touchStartX.current === null ||
      touchEndX.current === null ||
      !selectedProject?.images
    )
      return;

    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) {
      // Swipe left
      nextImage();
    } else if (diff < -50) {
      // Swipe right
      prevImage();
    }

    // Reset values
    touchStartX.current = null;
    touchEndX.current = null;
  }, [selectedProject, nextImage, prevImage]);

  // Add/remove event listeners
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => handleClickOutside(e);

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleMouseDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isModalOpen, handleKeyDown, handleClickOutside]);

  // Preload images when modal opens
  useEffect(() => {
    if (!isModalOpen || !selectedProject?.images) return;

    const preloadImages = async () => {
      try {
        await Promise.all(
          (selectedProject.images || []).map((src) => {
            return new Promise<void>((resolve, reject) => {
              const img = new window.Image();
              img.src = src;
              img.onload = () => resolve();
              img.onerror = reject;
            });
          })
        );
      } catch (error) {
        console.error("Error preloading images:", error);
      }
    };

    preloadImages();
  }, [isModalOpen, selectedProject]);

  // Render project cards
  const renderProjects = () => {
    if (!projects || !Array.isArray(projects)) return null;

    return (
      <motion.div
        className={styles.projectsGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className={styles.projectCard}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            onClick={() => openModal(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openModal(project)}
          >
            <div className={styles.projectImageContainer}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={styles.projectImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={project.featured}
              />
              <div className={styles.projectOverlay}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.projectTags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className={styles.projectFooter}>
                <div className={styles.projectLinks}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiGithub />
                    </a>
                  )}
                  {(project.liveUrl || project.demoUrl) && (
                    <a
                      href={project.liveUrl || project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} live demo`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiExternalLink />
                    </a>
                  )}
                </div>
                <div className={styles.projectTech}>
                  {project.technologies.slice(0, 3).map((tech) => (
                    <div key={tech} className={styles.techIcon}>
                      {getTechIcon(tech)}
                    </div>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className={styles.techMore}>
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>My Projects</h2>
          <p className={styles.sectionSubtitle}>
            Here are some of my recent projects. Click on any project to view
            more details.
          </p>
        </motion.div>

        {renderProjects()}
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            className={`${styles.modalOverlay} ${
              isModalOpen ? styles.active : ""
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className={styles.modal}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2 id="modal-title" className={styles.modalTitle}>
                  {selectedProject.title}
                </h2>
                <button
                  className={styles.closeButton}
                  onClick={closeModal}
                  aria-label="Close modal"
                >
                  <FiX />
                </button>
              </div>

              <div className={styles.modalContent}>
                <div
                  className={styles.modalImageContainer}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <Image
                    src={
                      selectedProject.images?.[currentImageIndex] ||
                      selectedProject.image
                    }
                    alt={`${selectedProject.title} - Screenshot ${
                      currentImageIndex + 1
                    }`}
                    fill
                    className={styles.modalImage}
                    priority
                  />

                  {selectedProject.images &&
                    selectedProject.images.length > 1 && (
                      <div className={styles.imageNavigation}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                          }}
                          aria-label="Previous image"
                        >
                          &larr;
                        </button>
                        <span className={styles.imageCounter}>
                          {currentImageIndex + 1} /{" "}
                          {selectedProject.images.length}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                          aria-label="Next image"
                        >
                          &rarr;
                        </button>
                      </div>
                    )}
                </div>

                <div className={styles.modalBody}>
                  <p id="modal-description">
                    {selectedProject.longDescription ||
                      selectedProject.description}
                  </p>

                  {selectedProject.features &&
                    selectedProject.features.length > 0 && (
                      <div className={styles.featuresList}>
                        <h3>Key Features</h3>
                        <ul>
                          {selectedProject.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  <div className={styles.techStack}>
                    <h3>Technologies Used</h3>
                    <div className={styles.techIcons}>
                      {selectedProject.technologies.map((tech) => (
                        <div key={tech} className={styles.techIcon}>
                          {getTechIcon(tech)}
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  <div className={styles.projectLinks}>
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLink}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub /> View on GitHub
                      </a>
                    )}
                    {(selectedProject.liveUrl || selectedProject.demoUrl) && (
                      <a
                        href={
                          selectedProject.liveUrl || selectedProject.demoUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.projectLink} ${styles.liveLink}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink />
                        {selectedProject.liveUrl ? " View Live" : " View Demo"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
