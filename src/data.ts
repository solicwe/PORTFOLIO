export const myInfo = {
  name: "Sorawit Padungkul",
  role: "Computer Engineering Student",
  education: "Srinakharinwirot University (SWU)",
  gpa: "3.03",
  contact: {
    email: "prem25.sorawit@gmail.com",
    phone: "094-017-5289",
    github: "https://github.com/solicwe"
  },
  skills: {
    programming: ["Python", "C", "HTML5", "CSS3", "JavaScript"],
    tools: ["React", "GitHub", "Blender", "Adobe Premiere Pro"]
  }
};

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  period?: string;
}

export const myProjects: Project[] = [
  {
    id: "1",
    title: "BrainFit - Cognitive Care",
    description: "แอปพลิเคชันช่วยเหลือผู้ป่วยอัลไซเมอร์ผ่านกิจกรรมและเกมโต้ตอบเพื่อฝึกทักษะการรู้คิด พัฒนาร่วมกับทีมสหวิชาชีพ",
    techStack: ["ReactJS", "UI/UX Design", "Front-End Development"],
    githubUrl: "https://github.com/solicwe",
    period: "Aug - Oct 2025"
  },
  {
    id: "2",
    title: "TedE - Grade Calculator",
    description: "แพลตฟอร์มคำนวณเกรดเฉลี่ยและระบบจัดอันดับนักเรียน ออกแบบ UI ให้ตอบสนองทุกอุปกรณ์อย่างลื่นไหล",
    techStack: ["ReactJS", "HTML5", "CSS", "JavaScript"],
    githubUrl: "https://github.com/solicwe",
    period: "Oct 2022 - Dec 2025"
  },
  {
    id: "3",
    title: "BST Visualizer",
    description: "เครื่องมือจำลองการทำงานของ Binary Search Tree แบบ Real-time เพื่อใช้ประกอบการเรียนการสอน",
    techStack: ["HTML5", "CSS", "JavaScript"],
    githubUrl: "https://github.com/solicwe",
    period: "Nov 2024"
  },
  {
    id: "4",
    title: "Metaverse & 3D Modeling",
    description: "พัฒนาโลกเสมือนจริงและโมเดล 3D (Building, Cafe) โดยใช้ Blender สำหรับงานเวิร์กชอปและนิทรรศการ",
    techStack: ["Blender", "Metaverse Development", "3D Modeling"],
    githubUrl: "https://github.com/solicwe",
    period: "2025"
  }
];

export interface NewsUpdate {
  id: number;
  date: string;
  title: string;
  description: string;
  type: 'project' | 'achievement' | 'update';
  techStack?: string[];
  link?: string;
}

export const newsUpdates: NewsUpdate[] = [
  {
    id: 1,
    date: "Jan 27, 2026",
    title: "Portfolio Website Launch",
    description: "เปิดตัวเว็บ Portfolio ใหม่ที่สร้างด้วย React และ TypeScript เน้นความ Clean และ Performance",
    type: "project",
    techStack: ["React", "TypeScript", "Tailwind CSS"]
  },
  {
    id: 2,
    date: "Jan 15, 2026",
    title: "Completed BrainFit Project",
    description: "สำเร็จการพัฒนาแอปพลิเคชัน BrainFit สำหรับช่วยเหลือผู้ป่วยอัลไซเมอร์ พร้อมระบบกิจกรรมฝึกสมอง",
    type: "achievement",
    techStack: ["ReactJS", "UI/UX"]
  },
  {
    id: 3,
    date: "Dec 20, 2025",
    title: "TedE Platform Update",
    description: "อัปเดตระบบคำนวณเกรดให้รองรับการคำนวณแบบใหม่ และปรับปรุง UI ให้ใช้งานง่ายขึ้น",
    type: "update",
    techStack: ["ReactJS", "JavaScript"]
  }
];