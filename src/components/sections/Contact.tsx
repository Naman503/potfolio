"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaCopy,
  FaExternalLinkAlt,
} from "react-icons/fa";
import styles from "./Contact.module.scss";

interface ContactInfoItem {
  icon: React.ReactNode;
  text: string;
  action: ((e: React.MouseEvent) => void) | null;
  label: string;
  showTooltip?: boolean;
  tooltipText?: string;
  showCopy?: boolean;
  isLink?: boolean;
}

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  const handleLocationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLocationPopup(true);
    const mapsUrl = 'https://www.google.com/maps/place/Indore,+Madhya+Pradesh,+India';
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
    
    // Auto-hide popup after 3 seconds
    setTimeout(() => {
      setShowLocationPopup(false);
    }, 3000);
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:namanpathak503@gmail.com";
  };

  const handleCallClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = "tel:+916264579927";
  };

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("+91 6264579927");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactInfo: ContactInfoItem[] = [
    {
      icon: <FaMapMarkerAlt className={styles.locationIcon} />,
      text: "Indore, India",
      action: handleLocationClick,
      label: "Location",
      showTooltip: true,
      tooltipText: "View on Google Maps",
      isLink: true
    },
    {
      icon: <FaEnvelope className={styles.emailIcon} />,
      text: "namanpathak503@gmail.com",
      action: handleEmailClick,
      label: "Email",
      isLink: true
    },
    {
      icon: <FaPhone className={styles.phoneIcon} />,
      text: "+91 6264579927",
      action: handleCallClick,
      label: "Call",
      showCopy: true,
      isLink: true
    },
  ];

  const socialLinks = [
    {
      icon: <FaGithub />,
      url: "https://github.com/Naman503",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin />,
      url: "https://linkedin.com/in/naman-pathak-b29510200",
      label: "LinkedIn",
    },
    // {
    //   icon: <SiLeetcode />,
    //   url: "https://leetcode.com/yourusername",
    //   label: "LeetCode",
    // },
    // {
    //   icon: <FaTwitter />,
    //   url: "https://twitter.com/yourusername",
    //   label: "Twitter",
    // },
  ];

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <h2>Get In Touch</h2>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Have a project in mind or want to discuss potential opportunities?
            Feel free to reach out!
          </p>
        </div>
        
        {showLocationPopup && (
          <div className={styles.locationPopup}>
            <FaMapMarkerAlt className={styles.popupIcon} />
            <span>Opening location in Google Maps...</span>
          </div>
        )}

        <div className={styles.contactWrapper}>
          <motion.div
            className={styles.contactContent}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className={styles.contactIntro}>
              <p>I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
              <p>Feel free to reach out through any of the channels below:</p>
            </div>

            <div className={styles.contactGrid}>
              <div className={styles.contactInfo}>
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className={`${styles.infoItem} ${
                      item.action !== null ? styles.clickable : ''
                    } ${item.isLink ? styles.linkItem : ''}`}
                    onClick={item.action || undefined}
                    role={item.action ? 'button' : 'none'}
                    tabIndex={item.action ? 0 : -1}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === 'Enter' && item.action) {
                        item.action(e as unknown as React.MouseEvent);
                      }
                    }}
                    data-tooltip={
                      item.showTooltip && item.tooltipText
                        ? item.tooltipText
                        : item.action !== null
                          ? item.label === 'Email'
                            ? 'Send me an email'
                            : 'Give me a call'
                          : ''
                    }
                  >
                    <span className={styles.infoIcon}>
                      {item.icon}
                      {item.isLink && <FaExternalLinkAlt className={styles.externalLinkIcon} />}
                    </span>
                    <div className={styles.infoContent}>
                      <h4>{item.label}</h4>
                      <p>
                        {item.text}
                        {item.showCopy && (
                          <button 
                            className={`${styles.copyButton} ${copied ? styles.copied : ''}`} 
                            onClick={copyToClipboard}
                            aria-label="Copy phone number"
                            data-tooltip={copied ? 'Copied!' : 'Copy number'}
                          >
                            <FaCopy className={styles.copyIcon} />
                          </button>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.socialSection}>
                <h3 className={styles.socialTitle}>Connect with me</h3>
                <p className={styles.socialSubtitle}>Let&apos;s build something amazing together</p>
                <div className={styles.socialLinks}>
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={link.label}
                      data-tooltip={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
