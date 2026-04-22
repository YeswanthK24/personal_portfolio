export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectItem = {
  title: string;
  type: string;
  period: string;
  summary: string;
  description: string;
  stack: string[];
  highlights: string[];
  image: string;
  links: ProjectLink[];
  accent: string;
};

export type SkillGroup = {
  title: string;
  caption: string;
  items: string[];
};

export type JourneyItem = {
  period: string;
  title: string;
  organisation: string;
  description: string;
  tags: string[];
};

export type CertificationItem = {
  title: string;
  issuer: string;
  period: string;
  note: string;
};

export const profile = {
  name: "Yeswanth Krishnamoorthi",
  shortName: "Yeswanth K",
  role: "Java Full Stack Developer",
  badge: "Open to opportunities",
  intro:
    "Motivated Java Full Stack Developer focused on building robust web applications with modern frontend frameworks, strong backend services, and clean user experience.",
  subIntro:
    "Skilled in Java, Spring Boot, React.js, REST APIs, and modern web development, with an AI and data science background.",
  availability: "Java Full Stack Developer",
  location: "Pune, India",
  contacts: {
    email: "Yeswanthvijayrocky@gmail.com",
    phone: "+91 88257 00565",
    github: "https://github.com/YeswanthK24",
    linkedin: "https://www.linkedin.com/in/yeswanth-k/",
    resume: "/Yeswanth_K_Resume.pdf",
  },
  focusAreas: ["Java + Spring Boot", "React.js + Frontend", "REST APIs + AI Background"],
  strengths: ["Teamwork", "Versatile", "Analytical", "Collaborative"],
};

export const featuredProject: ProjectItem = {
  title: "Diabetic Foot Ulcer Detection System",
  type: "Featured Project",
  period: "Mar 2025 - Apr 2025",
  summary:
    "A deep learning based medical imaging project for early ulcer detection and severity analysis.",
  description:
    "Built using Faster R-CNN and ResNet50 for detection, localization, and classification of diabetic foot ulcers.",
  stack: ["Python", "Deep Learning", "Faster R-CNN", "ResNet50"],
  highlights: [
    "Used Faster R-CNN for localization.",
    "Improved classification with ResNet50.",
    "Focused on preprocessing and evaluation.",
  ],
  image: "/projects/ulcer-detection.svg",
  links: [],
  accent: "from-lime-300/30 via-emerald-300/10 to-cyan-300/15",
};

export const projects: ProjectItem[] = [
  featuredProject,
  {
    title: "Facial Expressions Recognition",
    type: "Computer Vision",
    period: "Sep 2023 - Oct 2023",
    summary:
      "A real-time facial expression recognition project using TensorFlow and OpenCV.",
    description:
      "Built to recognize facial expressions from video streams for emotion-analysis use cases.",
    stack: ["TensorFlow", "OpenCV", "Python", "Computer Vision"],
    highlights: [
      "Real-time prediction flow.",
      "TensorFlow training pipeline.",
      "OpenCV based inference.",
    ],
    image: "/projects/facial-expression.svg",
    links: [
      {
        label: "Open Repository",
        href: "https://github.com/YeswanthK24/Facial-Expressions-Recognition",
      },
    ],
    accent: "from-teal-300/30 via-cyan-300/10 to-emerald-300/15",
  },
  {
    title: "Digit Recognize",
    type: "Machine Learning",
    period: "Aug 2023 - Sep 2023",
    summary:
      "A handwritten digit classification project built with Python and TensorFlow.",
    description:
      "Focused on digit recognition, training flow, and OCR-style prediction scenarios.",
    stack: ["Python", "scikit-learn", "TensorFlow", "Classification"],
    highlights: [
      "Digit classification workflow.",
      "Model training and evaluation.",
      "OCR-style use case.",
    ],
    image: "/projects/digit-recognize.svg",
    links: [
      {
        label: "Open Repository",
        href: "https://github.com/YeswanthK24/digit-recognize",
      },
    ],
    accent: "from-amber-300/35 via-orange-300/10 to-rose-300/15",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend",
    caption: "Core backend technologies.",
    items: ["Java", "Spring", "Spring Boot", "REST APIs", "MySQL"],
  },
  {
    title: "Frontend",
    caption: "Frontend tools I work with.",
    items: ["React.js", "Angular", "JavaScript", "TypeScript", "HTML", "CSS", "Bootstrap"],
  },
  {
    title: "Other Tools",
    caption: "Supporting tools and platforms.",
    items: ["Git", "GitHub", "AWS", "Python", "TensorFlow", "GitHub Copilot"],
  },
];

export const journey: JourneyItem[] = [];

export const certifications: CertificationItem[] = [];
