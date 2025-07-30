"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { FiFileText, FiDownload, FiX, FiExternalLink } from "react-icons/fi";
import styles from "./FloatingResume.module.scss";

export default function FloatingResume() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // 0: hidden, 1: fully visible, 2: partially visible (40% opacity)
  const [visibilityState, setVisibilityState] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const velocityY = useRef(0);
  const velocityX = useRef(0);
  const gravity = 0;
  const friction = 0.98;
  const bounce = 0.8;

  // Motion values for animation
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);

  // Get PDF URL based on environment
  const getPdfUrl = useCallback(() => {
    if (process.env.NODE_ENV === "development") {
      return "/Naman-Pathak-Resume.pdf";
    }
    return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/Naman-Pathak-Resume.pdf`;
  }, []);

  const pdfUrl = getPdfUrl();

  // Initial show with delay and animation
  useEffect(() => {
    if (!isClient) return;

    // Show with fade-in animation after 3 seconds
    const showTimer = setTimeout(() => {
      setVisibilityState(1); // Start with partially visible
    }, 7000);

    return () => {
      clearTimeout(showTimer);
    };
  }, [isClient]);

  // Handle hover state changes
  useEffect(() => {
    if (isHovered && visibilityState === 2) {
      setVisibilityState(1); // Fully visible on hover
    } else if (!isHovered && visibilityState === 1) {
      // Return to partially visible after hover ends
      const timer = setTimeout(() => {
        setVisibilityState(2);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isHovered, visibilityState]);

  // Handle hover state
  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
    scale.set(1.05);
    rotate.set(Math.random() * 10 - 5);
  }, [scale, rotate]);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
    scale.set(1);
    rotate.set(0);
  }, [scale, rotate]);

  // Handle download resume
  const handleDownload = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.preventDefault();
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Naman-Pathak-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [pdfUrl]
  );

  // Handle modal close with cleanup
  const closeModal = useCallback(() => {
    // Restore scrolling before closing
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    setIsExpanded(false);
  }, []);

  // Toggle expand state with animation and prevent background scroll
  const toggleExpand = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const willExpand = !isExpanded;

      if (willExpand) {
        // Prevent scrolling on body and html elements
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        
        setIsExpanded(true);
      } else {
        closeModal();
      }
    },
    [isExpanded, closeModal]
  );

  // Clean up scroll locks when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Handle overlay click
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isExpanded, closeModal]);

  // Initialize client-side state and set up window resize listener
  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      getViewportBounds();
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Get viewport bounds considering scroll position
  const getViewportBounds = useCallback(() => {
    if (!boxRef.current) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };

    const boxRect = boxRef.current.getBoundingClientRect();
    return {
      minX: 0,
      maxX: window.innerWidth - boxRect.width,
      minY: 0,
      maxY: window.innerHeight - boxRect.height,
    };
  }, []);

  // Animation loop for floating effect with physics
  useEffect(() => {
    if (!isClient) return;

    const box = boxRef.current;
    if (!box) return;

    // Initialize position and velocity
    let vx = (Math.random() - 0.5) * 0.5;
    let vy = (Math.random() - 0.5) * 0.5;
    let isDragging = false;
    let lastTime = performance.now();
    let { minX, maxX, minY, maxY } = getViewportBounds();

    // Set random initial position if not set
    if (x.get() === 0 && y.get() === 0) {
      x.set(Math.max(minX, Math.min(Math.random() * maxX, maxX - 100)));
      y.set(Math.max(minY, Math.min(Math.random() * maxY, maxY - 100)));
    }

    const updatePosition = (time: number) => {
      const currentTime = time || performance.now();
      const delta = Math.min(currentTime - lastTime, 100) / 16; // Cap delta time at 100ms
      lastTime = currentTime;

      // Skip physics if hovered or dragging
      if (isHovered || isDragging) {
        animationFrameRef.current = requestAnimationFrame(updatePosition);
        return;
      }

      // Get current viewport bounds
      const bounds = getViewportBounds();
      minX = bounds.minX;
      maxX = bounds.maxX;
      minY = bounds.minY;
      maxY = bounds.maxY;

      // Apply gravity and friction
      velocityY.current *= friction;
      velocityX.current *= friction;
      velocityY.current += gravity * 0.1; // Reduced gravity effect

      // Update position based on velocity
      const currentX = x.get();
      const currentY = y.get();

      let newX = currentX + (vx + velocityX.current) * delta;
      let newY = currentY + (vy + velocityY.current) * delta;

      // Bounce off edges with damping and ensure within bounds
      if (newX <= minX) {
        newX = minX + 2; // Add small offset to prevent sticking
        vx = Math.abs(vx) * bounce * 0.8;
        velocityX.current = Math.abs(velocityX.current) * bounce * 0.8;
      } else if (newX >= maxX) {
        newX = maxX - 2; // Add small offset to prevent sticking
        vx = -Math.abs(vx) * bounce * 0.8;
        velocityX.current = -Math.abs(velocityX.current) * bounce * 0.8;
      }

      if (newY <= minY) {
        newY = minY + 2; // Add small offset to prevent sticking
        vy = Math.abs(vy) * bounce * 0.8;
        velocityY.current = Math.abs(velocityY.current) * bounce * 0.8;
      } else if (newY >= maxY) {
        newY = maxY - 2; // Add small offset to prevent sticking
        vy = -Math.abs(vy) * bounce * 0.7; // Less bounce on bottom
        velocityY.current = -Math.abs(velocityY.current) * bounce * 0.5;
      }

      // Apply position with bounds checking
      x.set(Math.max(minX, Math.min(newX, maxX)));
      y.set(Math.max(minY, Math.min(newY, maxY)));

      // Add subtle rotation based on velocity
      rotate.set(velocityX.current * 0.5);

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(updatePosition);
    };

    // Handle window resize
    const handleResize = () => {
      const bounds = getViewportBounds();
      minX = bounds.minX;
      maxX = bounds.maxX;
      minY = bounds.minY;
      maxY = bounds.maxY;

      // Ensure box stays within bounds after resize
      const currentX = x.get();
      const currentY = y.get();
      const newX = Math.max(minX, Math.min(currentX, maxX - 100)); // Account for box size
      const newY = Math.max(minY, Math.min(currentY, maxY - 100)); // Account for box size

      x.set(newX);
      y.set(newY);
    };

    // Handle drag start/end
    const handleDragStart = () => {
      isDragging = true;
    };

    const handleDragEnd = () => {
      isDragging = false;
    };

    // Initialize animation
    animationFrameRef.current = requestAnimationFrame(updatePosition);

    // Add event listeners
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleResize, { passive: true });
    box.addEventListener("mousedown", handleDragStart);
    box.addEventListener("mouseup", handleDragEnd);
    box.addEventListener("touchstart", handleDragStart, { passive: true });
    box.addEventListener("touchend", handleDragEnd, { passive: true });

    // Initial position check
    handleResize();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
      box.removeEventListener("mousedown", handleDragStart);
      box.removeEventListener("mouseup", handleDragEnd);
      box.removeEventListener("touchstart", handleDragStart);
      box.removeEventListener("touchend", handleDragEnd);
    };
  }, [isClient, x, y, isHovered, rotate, getViewportBounds]);

  if (!isClient) return null;

  return (
    <>
      {/* Floating Resume Box */}
      <motion.div
        ref={boxRef}
        className={`${styles.floatingResume} ${
          isExpanded ? styles.expanded : ""
        }`}
        style={{
          // x: -xSpring,
          // y: -ySpring,
          scale: isExpanded ? 1 : scale,
          rotate: rotate,
          zIndex: isExpanded ? 1000 : 100,
          cursor: "pointer",
          willChange: "transform",
          touchAction: "none",
          opacity: visibilityState === 1 ? 1 : 0.4,
          transition:
            "opacity 0.3s ease-in-out, right 0.3s ease-in-out, transform 0.3s ease-in-out",
          transform: visibilityState === 1 ? "scale(1.05)" : "scale(1)",
          pointerEvents: "auto",
          right: visibilityState === 1 ? "10px" : "-200px",
          borderLeft:
            visibilityState === 1
              ? "none"
              : "10px solid rgba(103, 130, 248, 0.76)",
          visibility: visibilityState === 0 ? "hidden" : "visible",
        }}
        onClick={toggleExpand}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        initial={false}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={{
          expanded: { zIndex: 1000, cursor: "default" },
          collapsed: { zIndex: 100 },
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          scale: { type: "spring", stiffness: 500, damping: 15 },
          rotate: { type: "spring", stiffness: 200, damping: 10 },
        }}
      >
        <div className={styles.resumeContent}>
          <div
            onClick={toggleExpand}
            style={{ position: "relative" }}
            className={styles.previewContainer}
          >
            <iframe
              src={`${pdfUrl}#view=fitH`}
              scrolling="no"
              className={styles.pdfIframe}
              style={{
                width: "calc(100% + 20px)",
                height: "100%",
                border: "none",
                background: "transparent",
                pointerEvents: "none",
                overflow: "hidden",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                marginRight: "-20px"
              }}
              title="Resume Preview"
              loading="lazy"
            />
          </div>
          <div className={styles.resumeLabel}>
            <FiFileText className={styles.resumeIcon} />
            <span>View Resume</span>
          </div>
        </div>
      </motion.div>

      {/* PDF Preview Modal */}
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            className={styles.overlay}
            onClick={handleOverlayClick}
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { opacity: 1 },
              closed: { opacity: 0 },
            }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className={styles.modal}
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    duration: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { duration: 0.2 },
                  },
                },
                closed: {
                  opacity: 0,
                  scale: 0.95,
                  y: 20,
                  transition: {
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                    opacity: { duration: 0.15 },
                  },
                },
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h3>My Resume</h3>
                <div className={styles.headerActions}>
                  <button
                    className={`${styles.actionButton} ${styles.viewInNewTab}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(pdfUrl, "_blank", "noopener,noreferrer");
                    }}
                    title="Open in new tab"
                  >
                    <FiExternalLink /> Open in New Tab
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.downloadButton}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(e);
                    }}
                    title="Download PDF"
                  >
                    <FiDownload /> Download
                  </button>
                  <button
                    className={styles.closeButton}
                    onClick={() => closeModal()}
                    aria-label="Close resume"
                    title="Close"
                  >
                    <FiX />
                  </button>
                </div>
              </div>

              <div className={styles.modalContent}>
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
                  className={styles.fullPdfIframe}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    background: "transparent",
                  }}
                  title="Full Resume"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
