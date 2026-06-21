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
      { name: "C", level: "intermediate" },
      { name: "TypeScript", level: "beginner" },
    ],
  },
  {
    name: "Frameworks & Libraries",
    skills: [
      { name: "Next.js", level: "beginner" },
      { name: "Node.js", level: "beginner" },
      { name: "Tailwind CSS", level: "intermediate" },
    ],
  },
  {
    name: "AI / ML",
    skills: [
      { name: "TensorFlow", level: "intermediate" },
      { name: "Scikit-learn", level: "intermediate" },
      { name: "Computer Vision", level: "intermediate" },
      { name: "AI Agents", level: "intermediate" },
      { name: "MCP", level: "intermediate" },
      { name: "Self-Hosted LLMs", level: "intermediate" },
      { name: "Pandas", level: "intermediate" },
      { name: "NumPy", level: "beginner" },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "MySQL", level: "intermediate" },
      { name: "SQLite", level: "beginner" },
    ],
  },
  {
    name: "Tools & Platforms",
    skills: [
      { name: "Git", level: "advanced" },
      { name: "GitHub", level: "advanced" },
      { name: "Claude Code", level: "intermediate" },
      { name: "OpenClaw", level: "intermediate" },
      { name: "Docker", level: "learning" },
      { name: "Linux", level: "beginner" },
      { name: "VS Code", level: "advanced" },
    ],
  },
];
