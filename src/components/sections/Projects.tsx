"use client";

import { FC, useState, useRef, useCallback, useEffect, JSX } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import dynamic from "next/dynamic";
import styles from "./Projects.module.scss";
import { FiExternalLink, FiGithub, FiX } from "react-icons/fi";
import techIcons, { FallbackIcon } from "@/utils/techIcons";

// Dynamically import components to avoid SSR issues
const ProjectCardCarousel = dynamic(() => import("../ui/ProjectCardCarousel"), {
  ssr: false,
});

const Carousel = dynamic(() => import("../ui/Carousel"), { ssr: false });

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

  // Get carousel images for a project
  const getCarouselImages = (project: Project): string[] => {
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
  };

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

  // Open modal with selected project
  const openModal = useCallback((project: Project) => {
    // Set the modal content
    setSelectedProject(project);
    setIsModalOpen(true);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    // Close the modal first
    setIsModalOpen(false);

    // Re-enable background scrolling
    document.body.style.overflow = "auto";

    // Clear the selected project after animation
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
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

  // Add/remove event listeners
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => handleClickOutside(e);

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleMouseDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
      document.body.style.overflow = "auto";
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
              openModal(project);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                openModal(project);
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
          transition={{ duration: 0.6 }}
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
                <div>
                  <div className={styles.modalImageContainer}>
                    <Carousel
                      images={getCarouselImages(selectedProject)}
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
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
