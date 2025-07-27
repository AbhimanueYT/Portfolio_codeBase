export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  skills: {
    technical: { name: string; level: number }[];
    tools: { name: string; level: number }[];
    languages: { name: string; level: number }[];
  };
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    location: string;
    description: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    duration: string;
    location: string;
    gpa?: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    features: string[];
  }>;
  
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Abhimanue T D",
    title: "Software Developer for fun",
    email: "abhimanuetd@gmail.com",
    phone: "+91 8547780763",
    location: "Ernakulam, Kerala, India",
    linkedin: "https://www.linkedin.com/in/abhimanue-td-1904ba32a/",
    github: "https://github.com/AbhimanueYT"
  },
  summary: "\"Funny how humans complicate what's simple.\"",
  skills: {
    technical: [
      { name: "Three.js", level: 95 },
      { name: "WebGL", level: 90 },
      { name: "TypeScript", level: 92 },
      { name: "Django", level: 80 },
      { name: "Vue.js", level: 85 },
      { name: "React", level: 90 },
      { name: "Flutter", level: 75 },
      { name: "JavaScript", level: 95 },
      { name: "Node.js", level: 85 },
      { name: "Python", level: 90 },
      { name: "C++", level: 70 },
      { name: "OpenGL", level: 60 },
      { name: "CSS", level: 88 },
      { name: "HTML", level: 90 },
      { name: "Git", level: 85 }
    ],
    tools: [
      { name: "Blender", level: 60 },
      { name: "Docker", level: 70 },
      { name: "Postman", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Supabase", level: 60 },
      { name: "MySQL", level: 85 }
    ],
    languages: [
      { name: "English", level: 80 },
      { name: "Hindi", level: 65 },
      { name: "Malayalam", level: 95 }
    ]
  },
  experience: [
    {
      title: "Full Stack Developer",
      company: "Cognifyr",
      duration: "2025 - Present",
      location: "Ernakulam, Kerala, India",
      description: [
        "Developed and maintained web applications using Django and Vue.js",
        "Implemented responsive designs and optimized performance for complex web applications",
        "Developed and maintained mobile applications using Flutter",
        "Collaborated with design team to create immersive user experiences"
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "Cochin University of Science and Technology",
      duration: "2023 - 2026",
      location: "Ernakulam, Kerala, India"
    },
    {
      degree: "Diploma in Computer Science",
      institution: "SCMS College of Polytechnic",
      duration: "2020 - 2023",
      location: "Ernakulam, Kerala, India"
    },{
      degree: "Higher Secondary Education",
      institution: "Kendriya Vidyalaya No.1, Naval Base, Kochi",
      duration: "2018 - 2019",
      location: "Ernakulam, Kerala, India"
    }
  ],
  projects: [
    {
      name: "Portfolio",
      description: "A dynamic portfolio website featuring 3D models and scroll-based animations",
      technologies: ["Three.js", "TypeScript", "GSAP", "Vite"],
      link: "https://github.com/AbhimanueYT/portfolio",
      features: [
        "Scroll-triggered 3D animations",
        "Responsive design with mobile optimization",
        "Interactive 3D models with realistic materials",
        "Smooth performance optimization"
      ]
    },
    {
      name: "FUSION",
      description: "Cross-platform task management app built with React Native and Supabase, featuring AI-driven task suggestions, calendar view, and secure authentication with row-level security policies.",
      technologies: ["React Native", "Expo", "Supabase", "PostgreSQL"],
      link: "https://github.com/AbhimanueYT/FUSION",
      features: [
        "AI-driven task suggestions",
        "Calendar view",
        "Progress tracking",
        "Secure authentication",
        "Mobile-friendly UI"
      ]
    },
    {
      name: " College Website",
      description: "Improved student engagement and streamlined access to resources, saving time and effort.",
      technologies: ["HTML", "CSS", "PHP", "JavaScript"],
      link: "https://github.com/AbhimanueYT/CampusX",
      features: [
        "User-friendly platform",
        "Centralized college information",
        "Streamlined access to resources"
      ]
    },
    {
      name: " Advanced Automatic Water Pump Controller",
      description: "Developed an advanced Automatic Water Pump Controller that helped  prevent flooding incidents during heavy rainfall periods that reduced manual intervention by automatically pumping out excess water from the flooded regions.",
      technologies: ["Arduino", "Sensor Integration"],
      link: "https://github.com/AbhimanueYT/Automatic-water-pump",
      features: [
        "Prevent flooding incidents",
        "Reduce manual intervention"
      ]
    },
    {
      name: "Medical Shop Billing System",
      description: "Designed a user-friendly and secure interface with intuitive navigation, robust login functionality, and accessibility for medical shop staff with varying technical expertise.",
      technologies: ["Java", "MySQL", "JSP", "NetBeans"],
      link: "https://github.com/AbhimanueYT/Medical-Shop-Billing-System",
      features: [
        "Inventory management",
        "Billing management",
        "User-friendly interface",
        "Secure authentication"
      ]
    },
    {
      name: "Ones",
      description: "Ones is a full-featured educational platform with a web app (Next.js), mobile app (Flutter), and an admin panel (Vue.js + Django + PostgreSQL), where I contributed to both the admin and mobile sides by developing features, APIs, and integrations.",
      technologies: ["Next.js", "Flutter", "Vue.js", "Django", "PostgreSQL"],
      features: [
        "User-friendly platform",
        "Centralized college information",
        "Streamlined access to resources"
      ]
    }
  ]
}; 