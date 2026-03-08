import type { PortfolioItem } from "../types/gallery";

export const portfolioData: PortfolioItem[] = [
  {
    id: "project-1",
    projectTitle: "ChipAgents",
    leftImageSrc: "/images/left-art.jpg",
    leftImageAlt: "ChipAgents Art representation",
    descriptionTitle: "Auto-Refactoring & Analysis",
    descriptionText: "ChipAgents does not just write code; it deploys specialized agents like the Waveform Agent. When a simulation fails, this agent analyzes gigabytes of waveform data to determine causality. It also allows for semantic refactoring of hardware codebases e.g., 'Update the AXI interface across all modules to support 64-bit addressing'.",
    technologies: ["React", "Typescript", "LLMs", "Waveform Analysis"],
  },
  {
    id: "project-2",
    projectTitle: "3 Books Archive",
    customLeftComponent: "SlipcaseShelf",
    descriptionTitle: "Interactive 3D Bookshelf",
    descriptionText: "A fully interactive 3D bookshelf experience allowing users to pull out and examine specific slipcase books. The physics-based animations provide a mechanical, tactile feel to exploring archival material.",
    technologies: ["React", "CSS 3D Transformers", "SVG Filters", "Web Audio API"],
  },
  {
    id: "project-3",
    projectTitle: "NeoFinance App",
    leftImageSrc: "/images/left-art.jpg", // We can reuse the placeholder for now or let the user add real ones
    leftImageAlt: "NeoFinance Dashboard",
    descriptionTitle: "Real-time Crypto Wallet",
    descriptionText: "A conceptual neo-banking application allowing users to trade digital assets seamlessly. Features include real-time price updates via WebSockets, a sleek dark mode interface, and biometric authentication for secure transactions.",
    technologies: ["React Native", "Zustand", "WebSockets"],
  },
  {
    id: "project-4",
    projectTitle: "Echo Social",
    leftImageSrc: "/images/right-gallery.jpg",
    leftImageAlt: "Echo Social Feed",
    descriptionTitle: "Modern Social Networking",
    descriptionText: "Echo is a fast, fluid social platform designed for creative professionals. The platform emphasizes large, un-cropped imagery, smooth scroll physics, and instant interactions using optimistic UI updates.",
    technologies: ["Next.js", "TailwindCSS", "PostgreSQL", "Prisma"],
  }
];
