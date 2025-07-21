import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import styles from './Footer.module.scss';

const socialLinks = [
  {
    name: 'GitHub', 
    url: 'https://github.com/yourusername',
    icon: <FaGithub />,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: <FaLinkedin />,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: <FaTwitter />,
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: <FaEnvelope />,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoText}>NP</span>
            </Link>
            <p className={styles.tagline}>
              Full-Stack Developer passionate about creating exceptional digital experiences.
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linksGroup}>
              <h3 className={styles.linksTitle}>Navigation</h3>
              <ul className={styles.linksList}>
                <li><Link href="/#about">About</Link></li>
                <li><Link href="/#projects">Projects</Link></li>
                <li><Link href="/#experience">Experience</Link></li>
                <li><Link href="/#contact">Contact</Link></li>
              </ul>
            </div>

            <div className={styles.linksGroup}>
              <h3 className={styles.linksTitle}>Connect</h3>
              <ul className={styles.linksList}>
                <li><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="mailto:your.email@example.com">Email Me</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} Naman Pathak. All rights reserved.
          </p>
          
          <div className={styles.socialLinks}>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
