export interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: "AI Chatbot with RAG",
    description:
      "A retrieval-augmented generation chatbot that answers questions from custom knowledge bases using LLMs and vector search.",
    image: "/images/projects/placeholder.png",
    tech: ["Python", "LangChain", "OpenAI", "Pinecone", "FastAPI"],
    liveUrl: "#",
    githubUrl: "https://github.com/MAYANKJOSHIcoder",
    featured: true,
  },
  {
    title: "ML Image Classifier",
    description:
      "A deep learning model that classifies images into categories using convolutional neural networks with a web interface.",
    image: "/images/projects/placeholder.png",
    tech: ["Python", "TensorFlow", "React", "Flask"],
    liveUrl: "#",
    githubUrl: "https://github.com/MAYANKJOSHIcoder",
    featured: true,
  },
  {
    title: "Personal Website",
    description:
      "This personal website built with Next.js, Three.js, and Framer Motion. Features a 3D hero scene, dark/light theme, and star fields.",
    image: "/images/projects/placeholder.png",
    tech: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://mayank-joshi-07.vercel.app",
    githubUrl: "https://github.com/MAYANKJOSHIcoder/mayank_joshi",
    featured: true,
  },
  {
    title: "Sentiment Analysis API",
    description:
      "A REST API that performs sentiment analysis on text using pre-trained transformer models with real-time inference.",
    image: "/images/projects/placeholder.png",
    tech: ["Python", "Hugging Face", "FastAPI", "Docker"],
    githubUrl: "https://github.com/MAYANKJOSHIcoder",
    featured: false,
  },
  {
    title: "Task Automation CLI",
    description:
      "A command-line tool that automates repetitive development tasks like project scaffolding, git workflows, and deployments.",
    image: "/images/projects/placeholder.png",
    tech: ["Python", "Click", "Rich", "GitHub API"],
    githubUrl: "https://github.com/MAYANKJOSHIcoder",
    featured: false,
  },
];
