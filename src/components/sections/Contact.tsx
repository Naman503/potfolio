'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import styles from './Contact.module.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean | null, message: string}>({ success: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Replace with your form submission logic
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus({
        success: true,
        message: 'Your message has been sent successfully! I\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
      
      // Reset status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ success: null, message: '' });
      }, 5000);
    }
  };

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: <SiLeetcode />, url: 'https://leetcode.com/yourusername', label: 'LeetCode' },
    { icon: <FaTwitter />, url: 'https://twitter.com/yourusername', label: 'Twitter' },
  ];

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <h2>Get In Touch</h2>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
          </p>
        </div>

        <div className={styles.contactContainer}>
          <motion.div 
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Contact Information</h3>
            <p className={styles.contactText}>
              I&apos;m open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <ul className={styles.contactDetails}>
              <li>
                <span className={styles.contactIcon}><FaMapMarkerAlt /></span>
                <div>
                  <h4>Location</h4>
                  <p>New York, USA</p>
                </div>
              </li>
              <li>
                <span className={styles.contactIcon}><FaEnvelope /></span>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:your.email@example.com">your.email@example.com</a>
                </div>
              </li>
              <li>
                <span className={styles.contactIcon}><FaPhone /></span>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+11234567890">+1 (123) 456-7890</a>
                </div>
              </li>
            </ul>

            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={styles.socialLink}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form 
            className={styles.contactForm}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.formGroup}>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                required
                className={styles.formInput}
              />
              <label htmlFor="name" className={styles.formLabel}>Your Name</label>
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
                className={styles.formInput}
              />
              <label htmlFor="email" className={styles.formLabel}>Your Email</label>
            </div>

            <div className={styles.formGroup}>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder=" "
                required
                className={styles.formInput}
              />
              <label htmlFor="subject" className={styles.formLabel}>Subject</label>
            </div>

            <div className={styles.formGroup}>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                rows={5}
                required
                className={`${styles.formInput} ${styles.textarea}`}
              />
              <label htmlFor="message" className={styles.formLabel}>Your Message</label>
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <span>Send Message</span>
                  <FaPaperPlane className={styles.sendIcon} />
                </>
              )}
            </button>

            {submitStatus.message && (
              <div className={`${styles.statusMessage} ${submitStatus.success ? styles.success : styles.error}`}>
                {submitStatus.message}
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
