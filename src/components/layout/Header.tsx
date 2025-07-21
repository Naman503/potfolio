"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ThemeToggle from "../ui/ThemeToggle";
import styles from "./Header.module.scss";

const navLinks = [
  { name: "Home", path: "/#home" },
  { name: "About", path: "/#about" },
  { name: "Projects", path: "/#projects" },
  { name: "Experience", path: "/#experience" },
  { name: "Contact", path: "/#contact" },
];

// Smooth scroll function for anchor links
const scrollToSection = (
  e: React.MouseEvent<HTMLAnchorElement>,
  path: string,
  closeMenu?: () => void
) => {
  // If it's an anchor link
  if (path.startsWith("#")) {
    e.preventDefault();
    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Close mobile menu if open
      if (closeMenu) closeMenu();
    }
  }
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Transform scroll value for header background opacity
  const headerBgOpacity = useTransform(
    scrollY,
    [0, 50],
    [0, 0.8]
  );

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Toggle body scroll when mobile menu is open
    document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden';
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, [pathname]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  const mobileMenuVariants = {
    open: { 
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      } 
    },
    closed: { 
      opacity: 0,
      y: '-100%',
      transition: { 
        type: 'spring', 
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
      } 
    },
  };

  const mobileItem = {
    open: { 
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
    closed: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    },
  };

  return (
    <motion.header
      ref={headerRef}
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${
        mobileMenuOpen ? styles.menuOpen : ''
      }`}
      style={{
        backgroundColor: isScrolled 
          ? 'var(--header-bg-scrolled)' 
          : 'var(--header-bg)',
      }}
      initial={false}
      animate={mobileMenuOpen ? 'open' : 'closed'}
      data-scroll="header"
    >
      <motion.div 
        className={styles.headerBg}
        style={{ opacity: headerBgOpacity }}
      />
      
      <div className={styles.container}>
        <motion.div
          className={styles.logoContainer}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className={styles.logo} aria-label="Home">
            <motion.span 
              className={styles.logoText}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              NP
            </motion.span>
          </Link>
        </motion.div>

        <nav className={styles.nav}>
          <motion.ul 
            className={styles.navList}
            variants={container}
            initial="hidden"
            animate="show"
          >
            {navLinks.map((link, index) => {
              const isActive = pathname === link.path.replace("/#", "/") || 
                             (pathname === "/" && link.path === "/#home");
              
              return (
                <motion.li 
                  key={link.path} 
                  className={styles.navItem}
                  variants={item}
                >
                  <Link
                    href={link.path}
                    className={`${styles.navLink} ${
                      isActive ? styles.active : ''
                    }`}
                    onClick={(e) => scrollToSection(e, link.path)}
                  >
                    {link.name}
                    <motion.span 
                      className={styles.navIndicator}
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div 
            className={styles.themeToggleContainer}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ThemeToggle />
          </motion.div>

          <motion.button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={styles.hamburger}
              animate={mobileMenuOpen ? 'open' : 'closed'}
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 7 }
                }}
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -7 }
                }}
              />
            </motion.div>
          </motion.button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <motion.ul className={styles.mobileNavList}>
              {navLinks.map((link) => {
                const isActive = pathname === link.path.replace("/#", "/") || 
                               (pathname === "/" && link.path === "/#home");
                
                return (
                  <motion.li 
                    key={link.path} 
                    className={styles.mobileNavItem}
                    variants={mobileItem}
                  >
                    <Link
                      href={link.path}
                      className={`${styles.mobileNavLink} ${
                        isActive ? styles.active : ''
                      }`}
                      onClick={(e) => scrollToSection(e, link.path, () => setMobileMenuOpen(false))}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span 
                          className={styles.mobileNavIndicator}
                          layoutId="mobileIndicator"
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
