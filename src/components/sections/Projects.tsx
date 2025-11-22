"use client";

import { FC, useState, useRef, useEffect, useCallback, JSX, useMemo } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import styles from "./Projects.module.scss";
import { FiExternalLink, FiGithub, FiX } from "react-icons/fi";
import techIcons, { FallbackIcon } from "@/utils/techIcons";

// Import components directly for faster loading
import ProjectCardCarousel from "../ui/ProjectCardCarousel";
import Carousel from "../ui/Carousel";

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
  carouselImages?: string[]; // Array of carousel image paths
}

interface ProjectsProps {
  projects: Project[];
}

const Projects: FC<ProjectsProps> = ({ projects = [] }): JSX.Element => {
  // State for modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false); // Prevent multiple close calls
  const isOpeningRef = useRef(false); // Prevent multiple open calls

  // Get carousel images for a project
  const getCarouselImages = useCallback((project: Project): string[] => {
    // If the project has carouselImages defined, use those
    if (project.carouselImages && project.carouselImages.length > 0) {
      return project.carouselImages;
    }

    // Otherwise, combine the main image with any additional images
    const images = [project.image];
    if (project.images && project.images.length > 0) {
      images.push(...project.images);
    }

    return images;
  }, []);

  // Memoize carousel images to prevent re-renders
  const carouselImages = useMemo(() => {
    return selectedProject ? getCarouselImages(selectedProject) : [];
  }, [selectedProject, getCarouselImages]);

  // Get tech icon component (case-insensitive)
  const getTechIcon = (tech: string): JSX.Element => {
    // Find the correct case-sensitive key from techIcons
    const techKey =
      Object.keys(techIcons).find(
        (key) => key.toLowerCase() === tech.toLowerCase()
      ) || "";

    const IconComponent = techIcons[techKey] || FallbackIcon;
    return <IconComponent className={styles.techIcon} />;
  };

  // Open modal with selected project - optimized to prevent flickering
  const openModal = useCallback((project: Project) => {
    // Prevent opening if already opening, closing, or already open with same project
    if (isOpeningRef.current || isClosingRef.current || (isModalOpen && selectedProject?.id === project.id)) {
      return;
    }
    
    // Set opening flag
    isOpeningRef.current = true;
    
    // Reset closing flag
    isClosingRef.current = false;
    
    // Set both states together - React 18+ batches these automatically
    setSelectedProject(project);
    setIsModalOpen(true);
    
    // Reset opening flag after a short delay
    setTimeout(() => {
      isOpeningRef.current = false;
    }, 100);
  }, [isModalOpen, selectedProject]);

  // Close modal
  const closeModal = useCallback((e?: React.MouseEvent | React.KeyboardEvent) => {
    // Prevent event bubbling if called from button
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    // Prevent multiple close calls
    if (isClosingRef.current || !isModalOpen) {
      return;
    }
    
    // Set closing flag
    isClosingRef.current = true;
    
    // Close the modal first
    setIsModalOpen(false);

    // Re-enable background scrolling immediately
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    // Clear the selected project after animation completes
    setTimeout(() => {
      setSelectedProject(null);
      isClosingRef.current = false;
    }, 250); // Slightly longer than animation duration (200ms)
  }, [isModalOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen && !isClosingRef.current) {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
      }
    },
    [closeModal, isModalOpen]
  );

  // Add/remove event listeners
  useEffect(() => {
    if (isModalOpen) {
      // Prevent background scrolling
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      
      // Add keyboard listener
      document.addEventListener("keydown", handleKeyDown);
      
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      };
    }
  }, [isModalOpen, handleKeyDown]);

  // Images are already preloaded during the loading screen, so no need to preload again
  // This reduces redundant network requests and improves performance

  // Render project cards
  const renderProjects = (): JSX.Element | null => {
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Prevent opening if modal is already open, closing, or opening
              if (!isModalOpen && !isClosingRef.current && !isOpeningRef.current) {
                openModal(project);
              }
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                // Prevent opening if modal is already open, closing, or opening
                if (!isModalOpen && !isClosingRef.current && !isOpeningRef.current) {
                  openModal(project);
                }
              }
            }}
          >
            <div className={styles.projectImageContainer}>
              <div className={styles.projectImage}>
                <ProjectCardCarousel
                  images={getCarouselImages(project)}
                  projectName={project.title}
                />
              </div>
              <div className={styles.projectOverlay}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{project.heading}</h3>
              <p className={styles.projectDescription}>{project.subHeading}</p>
              <div className={styles.projectTags}>
                {project.technologies.map((tech) => {
                  const IconComponent = techIcons[tech] || FallbackIcon;

                  return (
                    <span key={tech} className={styles.tag}>
                      <span
                        style={{ paddingRight: "0.5rem", marginTop: "0.5rem" }}
                        className={styles.techIcon}
                      >
                        <IconComponent />
                      </span>
                      <span>{tech}</span>
                    </span>
                  );
                })}
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
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className={styles.headerContent}>
            <div className={styles.titleWrapper}>
              <span className={styles.sectionSubtitle}>Featured Work</span>
              <h2 className={styles.sectionTitle}>
                My <span className={styles.highlight}>Projects</span>
              </h2>
              <div className={styles.titleUnderline}></div>
            </div>
            <p className={styles.sectionDescription}>
              Here are some of my recent projects. Each project represents a
              unique challenge and solution.
              <span className={styles.ctaText}>
                Click on any project to view more details.
              </span>
            </p>
          </div>
        </motion.div>

        {renderProjects()}
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProject ? (
          <motion.div
            key={`modal-overlay-${selectedProject.id}`}
            className={`${styles.modalOverlay} ${styles.active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              // Only close if clicking directly on overlay, not on modal content
              if (e.target === e.currentTarget) {
                closeModal(e);
              }
            }}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              key={`modal-content-${selectedProject.id}`}
              ref={modalRef}
              className={styles.modal}
              initial={{ y: 10, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.98 }}
              transition={{ 
                duration: 0.2, 
                ease: [0.16, 1, 0.3, 1]
              }}
              onClick={(e) => {
                // Prevent clicks inside modal from closing it
                e.stopPropagation();
              }}
            >
              <div className={styles.modalHeader}>
                <h2 id="modal-title" className={styles.modalTitle}>
                  {selectedProject.title}
                </h2>
                <button
                  className={styles.closeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeModal(e);
                  }}
                  aria-label="Close modal"
                  type="button"
                >
                  <FiX />
                </button>
              </div>

              <div className={styles.modalContent}>
                <div>
                  <div className={styles.modalImageContainer}>
                    <Carousel
                      images={carouselImages}
                      projectName={selectedProject.title}
                      autoPlay={true}
                      interval={5000}
                    />
                  </div>
                  <div className={styles.projectLinks}>
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.github} ${styles.projectLink}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub /> View Code
                      </a>
                    )}
                    {(selectedProject.liveUrl || selectedProject.demoUrl) && (
                      <a
                        href={
                          selectedProject.liveUrl || selectedProject.demoUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.live} ${styles.projectLink}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink />
                        {selectedProject.liveUrl ? " View Live" : " View Demo"}
                      </a>
                    )}
                  </div>
                </div>

                <div className={styles.modalDetails}>
                  <h4>About This Project</h4>
                  <p>
                    {selectedProject.longDescription ||
                      selectedProject.description}
                  </p>

                  {selectedProject.features &&
                    selectedProject.features.length > 0 && (
                      <div className={styles.projectFeatures}>
                        <h5>Key Features</h5>
                        <ul>
                          {selectedProject.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  <div className={styles.techStack}>
                    <h5>Technologies Used</h5>
                    <div className={styles.techTags}>
                      {selectedProject.technologies.map((tech) => {
                        const IconComponent = techIcons[tech] || FallbackIcon;
                        return (
                          <div key={tech} className={styles.techTag}>
                            <span className={styles.techIcon}>
                              <IconComponent />
                            </span>
                            <span className={styles.techName}>{tech}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
