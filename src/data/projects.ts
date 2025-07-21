import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Golavi',
    description: 'An e-commerce platform for handmade products',
    image: '/images/projects/Golavi/Android_App_loginPage.png',
    images: [
      '/images/projects/Golavi/Android_App_loginPage.png',
      '/images/projects/Golavi/IOS_App_open_image.png',
      '/images/projects/Golavi/Invite_cohost_screen.png',
      '/images/projects/Golavi/Live_streaming.png',
      '/images/projects/Golavi/Screenshot_2025-02-26_at_5.57.46_PM.png'
    ],
    tags: ['E-commerce', 'Handmade', 'Marketplace'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
    githubUrl: 'https://github.com/yourusername/golavi',
    liveUrl: 'https://golavi.com',
    featured: true,
    role: 'Full Stack Developer',
    longDescription: 'A full-featured e-commerce platform for artisans to sell their handmade products with features like product listings, cart, checkout, and user reviews.',
    features: [
      'User authentication and authorization',
      'Product catalog with categories and filters',
      'Shopping cart and checkout process',
      'Seller dashboard',
      'Order management',
      'Product reviews and ratings'
    ]
  },
  {
    id: 2,
    title: 'Smart Air Dashboard',
    description: 'Admin dashboard for monitoring air quality data',
    image: '/images/projects/Smart_Air_bangladesh_React_Admin/AdminDashboard.png',
    images: [
      '/images/projects/Smart_Air_bangladesh_React_Admin/AdminDashboard.png',
      '/images/projects/Smart_Air_bangladesh_React_Admin/Admin_LedBoard.png',
      '/images/projects/Smart_Air_bangladesh_React_Admin/Admin_blogPost.png',
      '/images/projects/Smart_Air_bangladesh_React_Admin/DashboardAqiGraph.png'
    ],
    tags: ['Dashboard', 'Analytics', 'Air Quality'],
    technologies: ['React', 'TypeScript', 'Material-UI', 'Recharts', 'Firebase'],
    githubUrl: 'https://github.com/yourusername/smart-air-dashboard',
    demoUrl: 'https://smartair-demo.com',
    featured: true,
    role: 'Frontend Developer',
    longDescription: 'A real-time dashboard for monitoring and analyzing air quality data with interactive charts and data visualization.',
    features: [
      'Real-time data visualization',
      'Interactive charts and graphs',
      'Data export functionality',
      'User management',
      'Responsive design'
    ]
  },
  {
    id: 3,
    title: 'Smart Air Mobile App',
    description: 'Mobile application for air quality monitoring',
    image: '/images/projects/Smart_Air_Mobile/Screenshot_2025-06-11_at_4.44.35_PM.png',
    images: [
      '/images/projects/Smart_Air_Mobile/Screenshot_2025-06-11_at_4.44.35_PM.png',
      '/images/projects/Smart_Air_Mobile/Screenshot_2025-06-11_at_4.44.52_PM.png',
      '/images/projects/Smart_Air_Mobile/Screenshot_2025-06-11_at_4.45.26_PM.png',
      '/images/projects/Smart_Air_Mobile/Screenshot_2025-06-11_at_4.45.39_PM.png',
      '/images/projects/Smart_Air_Mobile/Screenshot_2025-06-11_at_4.46.14_PM.png',
      '/images/projects/Smart_Air_Mobile/Screenshot_2025-06-11_at_4.47.09_PM.png',
      '/images/projects/Smart_Air_Mobile/Screenshot_2025-06-11_at_4.47.22_PM.png',
      '/images/projects/Smart_Air_Mobile/Screenshot_2025-06-11_at_4.48.00_PM.png'
    ],
    tags: ['Mobile', 'Air Quality', 'React Native'],
    technologies: ['React Native', 'Redux', 'Firebase', 'Maps'],
    githubUrl: 'https://github.com/yourusername/smart-air-mobile',
    demoUrl: 'https://expo.dev/yourusername/smart-air-mobile',
    featured: true,
    role: 'Mobile Developer',
    longDescription: 'A cross-platform mobile application for monitoring air quality data on the go with push notifications and location-based alerts.',
    features: [
      'Real-time air quality data',
      'Location-based alerts',
      'Push notifications',
      'Offline support',
      'User-friendly interface'
    ]
  },
  {
    id: 4,
    title: 'QLM Dashboard',
    description: 'Quality Life Metrics dashboard for health data',
    image: '/images/projects/QLM/Full_homePageDesign.png',
    images: [
      '/images/projects/QLM/Full_homePageDesign.png',
      '/images/projects/QLM/Mobile_AppDesign.png',
      '/images/projects/QLM/Screenshot_2025-02-26_at_5.30.07_PM.png',
      '/images/projects/QLM/Screenshot_2025-02-26_at_5.30.48_PM.png',
      '/images/projects/QLM/Screenshot_2025-02-26_at_5.31.44_PM.png'
    ],
    tags: ['Health', 'Dashboard', 'Analytics'],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'D3.js'],
    githubUrl: 'https://github.com/yourusername/qlm-dashboard',
    demoUrl: 'https://qlm-demo.com',
    featured: true,
    role: 'Frontend Developer',
    longDescription: 'A comprehensive dashboard for tracking and analyzing quality of life metrics and health data with beautiful visualizations.',
    features: [
      'Interactive data visualizations',
      'Customizable dashboards',
      'Data export and sharing',
      'Responsive design',
      'Secure user authentication'
    ]
  }
];
