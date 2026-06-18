export type SkillLevel = "beginner" | "intermediate" | "advanced" | "learning";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "Python", level: "advanced" },
      { name: "JavaScript", level: "advanced" },
      { name: "TypeScript", level: "intermediate" },
      { name: "C++", level: "intermediate" },
      { name: "Java", level: "intermediate" },
    ],
  },
  {
    name: "Frameworks & Libraries",
    skills: [
      { name: "React", level: "advanced" },
      { name: "Next.js", level: "intermediate" },
      { name: "Node.js", level: "intermediate" },
      { name: "Express", level: "intermediate" },
      { name: "Tailwind CSS", level: "advanced" },
    ],
  },
  {
    name: "AI / ML",
    skills: [
      { name: "TensorFlow", level: "intermediate" },
      { name: "PyTorch", level: "intermediate" },
      { name: "Scikit-learn", level: "intermediate" },
      { name: "Pandas", level: "advanced" },
      { name: "NumPy", level: "advanced" },
      { name: "Hugging Face", level: "learning" },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "MongoDB", level: "intermediate" },
      { name: "PostgreSQL", level: "intermediate" },
      { name: "Redis", level: "learning" },
    ],
  },
  {
    name: "Tools & Platforms",
    skills: [
      { name: "Git", level: "advanced" },
      { name: "Docker", level: "learning" },
      { name: "AWS", level: "learning" },
      { name: "Linux", level: "intermediate" },
      { name: "VS Code", level: "advanced" },
      { name: "Figma", level: "beginner" },
    ],
  },
];
