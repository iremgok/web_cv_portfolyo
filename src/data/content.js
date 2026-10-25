export const profile = {
  name: 'Irem Gok',
  title: 'Computer Engineering Student & Software Developer',
  location: 'Izmir, Türkiye',
  gpa: '3.44 / 4.00',
  email: 'iremgk1803@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gokirem',
  github: 'https://github.com/iremgok',
  cv: '/assets/cv/IREM_GOK_CV.pdf',
}

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#stack', label: 'Tech Stack' },
  { href: '#contact', label: 'Contact' },
]

export const timeline = [
  {
    type: 'education',
    org: 'Izmir Bakircay University',
    role: 'B.Sc. Computer Engineering',
    period: '4th Year',
    meta: 'GPA: 3.44 / 4.00',
    logo: '/assets/exp3_logo.png',
    logoTone: 'light',
    points: [
      'Focus on Machine Learning, Computer Vision and Embedded Systems.',
      'Active in TEKNOFEST teams and TÜBİTAK-funded research projects.',
    ],
  },
  {
    type: 'work',
    org: 'Johnson Electric',
    role: 'Digital Transformation / Automation Intern Engineer',
    period: '2026',
    logo: '/assets/exp1_logo.png',
    logoTone: 'light',
    points: [
      'Worked on ERP/MES integrations supporting production digitalization.',
      'Built features with Angular and C#, interfacing with PLC-driven lines.',
      'Developed the FluxDoc reporting plug-in for automated documentation.',
    ],
    tags: ['Angular', 'C#', 'ERP/MES', 'PLC'],
  },
  {
    type: 'work',
    org: 'PHINIA Delphi Automotive Systems Turkey Inc.',
    role: 'Software Development Intern',
    period: '2025',
    logo: '/assets/exp2_logo.png',
    logoTone: 'dark',
    points: [
      'Contributed to automotive embedded systems software workflows.',
      'Built Python automation tools, including a Review Helper Tool.',
      'Developed an internal chatbot to speed up engineering lookups.',
    ],
    tags: ['Python', 'Embedded', 'Automation'],
  },
  {
    type: 'work',
    org: 'Izmir Bakircay University',
    role: 'Part-time Student Employee, Smart University & Digital Transformation Office',
    period: '2025',
    logo: '/assets/exp3_logo.png',
    logoTone: 'light',
    points: [
      'Wrote Python scripts for data processing and reporting.',
      'Performed data analysis and supported project coordination.',
    ],
    tags: ['Python', 'Data Analysis'],
  },
  {
    type: 'research',
    org: 'TÜBİTAK 1002-A Projects',
    role: 'Researcher & Developer',
    period: '2025 – 2026',
    points: [
      'VR Occupational Health & Safety (OHS / İSG) training simulation: R&D in Unity & Blender.',
    ],
    tags: ['Unity', 'Blender', 'C#', 'VR'],
  },
]

export const projects = [
  {
    title: 'MLVisor',
    badge: 'TEKNOFEST Finalist',
    image: '/assets/project3.png',
    summary: 'An AI platform that brings machine learning model training, evaluation and visualization together.',
    details: [
      'Reached the finals at TEKNOFEST.',
      'End-to-end pipeline: data preprocessing, model training, metrics and visual reports.',
      'Built around Scikit-Learn and TensorFlow/Keras models.',
    ],
    tags: ['Python', 'Scikit-Learn', 'TensorFlow', 'Pandas'],
  },
  {
    title: 'Bakircay Underwater AUV',
    badge: 'TEKNOFEST 2026',
    image: '/assets/project1.png',
    summary: 'Autonomous underwater vehicle software with real-time computer vision for navigation and mission tasks.',
    details: [
      'Autonomy and mission-control software for an underwater vehicle.',
      'OpenCV-based image processing for object and target detection.',
      'Embedded integration with the vehicle sensors and thrusters.',
    ],
    tags: ['Python', 'OpenCV', 'C++', 'Embedded'],
  },
  {
    title: 'VR OHS Training Simulation',
    badge: 'TÜBİTAK 1002-A',
    image: '/assets/project2.png',
    summary: 'Immersive occupational-safety training simulation built in Unity and Blender.',
    details: [
      'VR Occupational Health & Safety scenarios with interactive hazards.',
      '3D assets modeled in Blender, interactions scripted in C#.',
    ],
    tags: ['Unity', 'C#', 'Blender', 'VR'],
  },
  {
    title: 'CoachNest',
    badge: 'Full-Stack',
    summary: 'Dues management system with real-time messaging for coaches and members.',
    details: [
      'Flutter mobile client with Supabase for auth and storage.',
      'FastAPI backend with WebSockets for real-time chat, Redis pub/sub for fan-out.',
      'Containerized services orchestrated with Docker.',
    ],
    tags: ['Flutter', 'Supabase', 'FastAPI', 'WebSockets', 'Redis', 'Docker'],
  },
]

export const techStack = {
  Languages: ['Python', 'C#', 'C++', 'C', 'SQL', 'Dart'],
  Frameworks: ['ASP.NET Core', 'FastAPI', 'Angular', 'Flutter'],
  'ML & Data': ['Scikit-Learn', 'TensorFlow', 'Keras', 'OpenCV', 'Pandas', 'NumPy'],
  'Dev Tools': ['Docker', 'Git', 'Unity', 'Blender', 'Ansys', 'Assembly'],
}
