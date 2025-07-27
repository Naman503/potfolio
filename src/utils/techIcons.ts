import { FaCode, FaCreditCard, FaMapMarkedAlt, FaChartLine } from 'react-icons/fa';
import { 
  SiZoho, 
  SiAmazonec2, 
  SiStripe, 
  SiTypescript, 
  SiNextdotjs, 
  SiFirebase, 
  SiRedux, 
  SiTailwindcss,
  SiMaterialdesign,
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiSass,
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
  SiBootstrap,
  SiGraphql
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import React from 'react';

// Define the shape of our tech icons object
type TechIcons = {
  [key: string]: React.ComponentType<{ className?: string }>;
};

// Create the tech icons object with proper typing
const techIcons: TechIcons = {
  // Core Technologies
  'React': SiReact,
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'HTML5': SiHtml5,
  'CSS3': SiCss3,
  'Sass': SiSass,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'Git': SiGit,
  'GitHub': SiGithub,
  'GitLab': SiGitlab,
  'Docker': SiDocker,
  'Python': SiPython,
  'Django': SiDjango,
  'AWS': SiAmazonec2,
  'Material-UI': SiMaterialdesign,
  'Bootstrap': SiBootstrap,
  'Redux': SiRedux,
  'Firebase': SiFirebase,
  'GraphQL': SiGraphql,
  'Next.js': SiNextdotjs,
  'React Native': TbBrandReactNative,
  'Zoho': SiZoho,
  'EC2': SiAmazonec2,
  'Stripe': SiStripe,
  'PDF Generation': BsFileEarmarkPdf,
  'Payment Processing': FaCreditCard,
  'Geolocation': FaMapMarkedAlt,
  'Data Visualization': FaChartLine,
  'Resume Parser': BsFileEarmarkPdf // Using PDF icon as a placeholder for resume parser
};

// Fallback icon component
export const FallbackIcon = () => {
  const Icon = FaCode;
  return React.createElement('span', { className: 'inline-flex items-center' }, 
    React.createElement(Icon, { className: 'text-gray-400' })
  );
};

export default techIcons;
