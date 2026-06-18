export interface Experience {
  title: string;
  organization: string;
  date: string;
  description: string;
  tags: string[];
}

export const experiences: Experience[] = [
  {
    title: "B.Tech Computer Science",
    organization: "Bharati Vidyapeeth's College of Engineering",
    date: "2022 – Present",
    description:
      "Pursuing a Bachelor's degree in Computer Science with a focus on AI/ML, data structures, and full-stack development. Active member of the college coding club.",
    tags: ["Computer Science", "AI/ML", "Data Structures", "Algorithms"],
  },
  {
    title: "Open Source Contributor",
    organization: "Various Projects",
    date: "2024 – Present",
    description:
      "Contributing to open-source projects in the AI/ML ecosystem. Focus on documentation, bug fixes, and feature implementations.",
    tags: ["Open Source", "Git", "Python", "Collaboration"],
  },
  {
    title: "Hackathon Participant",
    organization: "Multiple Events",
    date: "2023 – Present",
    description:
      "Participated in various hackathons building AI-powered solutions. Enjoy rapid prototyping and team collaboration under time pressure.",
    tags: ["Hackathons", "Rapid Prototyping", "Teamwork", "Innovation"],
  },
];
