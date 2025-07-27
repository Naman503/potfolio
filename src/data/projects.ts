import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "Bwsala",
    heading: "Recruitment Platform",
    subHeading:
      "A recruitment solution designed for Saudi Arabia with candidate/vendor flows and Zoho integration.",
    description:
      "A recruitment platform with resume parsing and multilingual workflows",
    image: "/images/projects/Bwsala/Bwsala_carasol_1.png",
    carouselImages: [
      "/images/projects/Bwsala/Bwsala_carasol_1.png",
      "/images/projects/Bwsala/Bwsala_carasol_2.png",
      "/images/projects/Bwsala/Bwsala_carasol_3.png",
      "/images/projects/Bwsala/Bwsala_carasol_4.png",
      "/images/projects/Bwsala/Bwsala_carasol_5.png",
    ],
    tags: ["Recruitment", "Dashboard", "Multilingual"],
    technologies: [
      "React",
      "TypeScript",
      "Material-UI",
      "Zoho",
      "Resume Parser",
    ],
    githubUrl: "https://github.com/yourusername/qlm-dashboard",
    demoUrl: "https://app.bwsala.com/",
    featured: true,
    role: "Team Lead",
    longDescription:
      "Bwsala is a comprehensive recruitment platform developed for the Saudi market, featuring advanced resume parsing, multilingual candidate/vendor onboarding, and integrated workflows with Zoho CRM. I contributed to the full front-end architecture and designed reusable UI components tailored for analytics and data management. The platform ensures seamless vendor-candidate interaction and helps HR teams streamline their hiring workflows efficiently.",
    features: [
      "Resume parsing logic integration",
      "Vendor and candidate dashboards",
      "Zoho CRM workflow integration",
      "Multilingual support",
      "Responsive UI",
      "Secure user authentication",
    ],
  },
  {
    id: 2,
    title: "Caprics",
    heading: "Online Learning Platform",
    subHeading:
      "A virtual learning environment for students and teachers with real-time classes and video content.",
    description: "Virtual learning solution with web and Android TV support",
    image: "/images/projects/Caprics/Caprics_carasol_1.png",
    carouselImages: [
      "/images/projects/Caprics/Caprics_carasol_1.png",
      "/images/projects/Caprics/Caprics_carasol_2.png",
      "/images/projects/Caprics/Caprics_carasol_3.png",
    ],
    tags: ["Education", "Virtual Learning", "TV App"],
    technologies: ["Next.js", "TypeScript", "Firebase"],
    githubUrl: "https://github.com/yourusername/qlm-dashboard",
    demoUrl: "https://capricslearninglab.com/",
    featured: true,
    role: "Full Stack Developer",
    longDescription:
      "Caprics is a comprehensive digital education platform enabling real-time teaching and learning through web and Android TV applications. I was involved in creating a scalable front-end, developing user interfaces for educators and students, and integrating Firebase for seamless live communication. The platform supports scheduling, content streaming, and session recordings, making it a robust choice for remote learning environments.",
    features: [
      "Live class scheduling",
      "Teacher/student dashboards",
      "Android TV support",
      "Admin panel for content control",
      "Authentication and notifications",
    ],
  },
  {
    id: 3,
    title: "Smart Air Dashboard",
    heading: "Environmental Monitoring Admin Panel",
    subHeading:
      "A centralized control panel for environmental sensor monitoring in Bangladesh and AQI visualization.",
    description:
      "Admin dashboard for managing and visualizing air quality data",
    image:
      "/images/projects/Smart_Air_bangladesh_React_Admin/SmartAirAdmin_carasol_1.png",
    carouselImages: [
      "/images/projects/Smart_Air_bangladesh_React_Admin/SmartAirAdmin_carasol_1.png",
      "/images/projects/Smart_Air_bangladesh_React_Admin/SmartAirAdmin_carasol_2.png",
      "/images/projects/Smart_Air_bangladesh_React_Admin/SmartAirAdmin_carasol_3.png",
      "/images/projects/Smart_Air_bangladesh_React_Admin/SmartAirAdmin_carasol_4.png",
      "/images/projects/Smart_Air_bangladesh_React_Admin/SmartAirAdmin_carasol_5.png",
    ],
    tags: ["Dashboard", "Air Quality", "Analytics"],
    technologies: [
      "React",
      "TypeScript",
      "Material-UI",
      "Recharts",
      "Firebase",
    ],
    githubUrl: "https://github.com/yourusername/smart-air-dashboard",
    demoUrl: "https://smartairfilters.com/bd/en/",
    featured: true,
    role: "Team Lead",
    longDescription:
      "Smart Air Dashboard is a real-time AQI (Air Quality Index) analytics tool built for Smart Air Bangladesh. I led the Full Stack development, designing and implementing interactive data charts, map-based sensor monitoring, and role-based access modules. The platform helps users make informed decisions about air purification by visualizing data collected from IoT-based environmental sensors.",
    features: [
      "Real-time AQI data",
      "Station and region control",
      "Data export and reporting",
      "Role-based access",
      "Responsive and accessible design",
    ],
  },
  {
    id: 4,
    title: "Golavi",
    heading: "Live Streaming Social Platform",
    subHeading:
      "A live video streaming and social engagement app with payment features.",
    description: "Social media platform with live challenges and monetization",
    image: "/images/projects/Golavi/Golavi_carasol_1.png",
    carouselImages: [
      "/images/projects/Golavi/Golavi_carasol_1.png",
      "/images/projects/Golavi/Golavi_carasol_2.png",
    ],
    tags: ["Social Media", "Live Streaming", "AWS IVS"],
    technologies: ["React Native", "Amazon IVS", "Stripe", "Redux"],
    githubUrl: "https://github.com/yourusername/golavi",
    liveUrl: "https://apps.apple.com/in/app/golavi/id6450529001",
    featured: true,
    role: "Full Stack Developer",
    longDescription:
      "Golavi is a social broadcasting app where users can join real-time video streams, participate in challenges, and earn rewards. I worked across the stack to develop interactive UIs, implement live streaming using Amazon IVS, and integrate Stripe for in-app purchases. The project emphasized performance and seamless live interaction.",
    features: [
      "Live video streaming via AWS IVS",
      "Audience-host interaction",
      "Stripe-based monetization",
      "Push notifications",
      "User profile and feed",
    ],
  },
  {
    id: 5,
    title: "QLM",
    heading: "Insurance Analytics Dashboard",
    subHeading:
      "A health-focused data dashboard built for Qatari insurance analytics.",
    description:
      "A dashboard for tracking and analyzing life quality indicators",
    image: "/images/projects/QLM/QLM_carasol_1.png",
    carouselImages: [
      "/images/projects/QLM/QLM_carasol_1.png",
      "/images/projects/QLM/QLM_carasol_2.png",
      "/images/projects/QLM/QLM_carasol_3.png",
      "/images/projects/QLM/QLM_carasol_4.png",
    ],
    tags: ["Health", "Analytics", "Dashboard"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "D3.js"],
    githubUrl: "https://github.com/yourusername/qlm-dashboard",
    demoUrl: "https://qlm.com.qa/",
    featured: true,
    role: "Frontend Developer",
    longDescription:
      "QLM is a performance analytics tool tailored for the insurance industry in Qatar. It tracks health-related KPIs and generates customizable reports and visual insights. My contributions included developing responsive UI components, data filtering mechanisms, and localized interfaces to cater to Arabic-speaking users.",
    features: [
      "Health KPIs and analytics",
      "Customizable dashboard widgets",
      "Multilingual UI",
      "Chart-based reporting",
      "Export capabilities",
    ],
  },
  {
    id: 6,
    title: "Smart Air Mobile App",
    heading: "Mobile Air Quality Tracker",
    subHeading: "A mobile companion app for Smart Air’s air monitoring system.",
    description: "Cross-platform mobile app for air quality alerts",
    image: "/images/projects/Smart_Air_Mobile/SmartAir_carasol_1.png",
    carouselImages: [
      "/images/projects/Smart_Air_Mobile/SmartAir_carasol_1.png",
      "/images/projects/Smart_Air_Mobile/SmartAir_carasol_2.png",
      "/images/projects/Smart_Air_Mobile/SmartAir_carasol_3.png",
      "/images/projects/Smart_Air_Mobile/SmartAir_carasol_4.png",
    ],
    tags: ["Mobile", "Air Quality", "React Native"],
    technologies: ["React Native", "Redux", "Firebase", "Maps", "SSLCommerz"],
    githubUrl: "https://github.com/yourusername/smart-air-mobile",
    demoUrl: "https://smartairfilters.com/bd/en/",
    featured: true,
    role: "Team Lead",
    longDescription:
      "This mobile application complements the Smart Air platform by providing users with localized AQI alerts, real-time sensor readings, and payment services for premium air filters. I designed the front-end flow, integrated location-based alerting, and built secure transactional flows via SSLCommerz.",
    features: [
      "Live AQI monitoring",
      "Geo-based station alerts",
      "Offline functionality",
      "Push notifications",
      "Payment gateway integration",
    ],
  },
];
