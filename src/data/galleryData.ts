import type { PortfolioItem } from "../types/gallery";

export const portfolioData: PortfolioItem[] = [
  {
    id: "3books",
    projectTitle: "3 Books Archive",
    leftImageSrc: "/images/3books-thumb.jpg",
    leftImageAlt: "3 Books Archive Thumbnail",
    descriptionTitle: "Mechanical 3D Bookshelf",
    descriptionText: "An archival interface designed around physical affordances. Pull, drag, and examine three distinct volumes in a physics-driven 3D environment with mechanical soundscapes.",
    technologies: ["React", "SVG Filters", "Web Audio", "Physics"],
  },
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
    id: "project-4",
    projectTitle: "Echo Social",
    leftImageSrc: "/images/right-gallery.jpg",
    leftImageAlt: "Echo Social Feed",
    descriptionTitle: "Modern Social Networking",
    descriptionText: "Echo is a fast, fluid social platform designed for creative professionals. The platform emphasizes large, un-cropped imagery, smooth scroll physics, and instant interactions using optimistic UI updates.",
    technologies: ["Next.js", "TailwindCSS", "PostgreSQL", "Prisma"],
  },
  {
    id: "paper-x",
    projectTitle: "Paper-X",
    leftImageSrc: "/images/paper-x.jpg",
    leftImageAlt: "Administrative Modernism",
    descriptionTitle: "Administrative Modernism",
    descriptionText: "An interactive, high-fidelity digital reproduction of 20th-century administrative aesthetics. Features procedural grain, kinetic scanlines, and animated ledger entries that respond to system cycles.",
    technologies: ["React", "Framer Motion", "Vanilla CSS"],
  },
  {
    id: "tracklist",
    projectTitle: "Tracklist",
    leftImageSrc: "/images/tracklist.jpg",
    leftImageAlt: "Beat Tape Tracklist",
    descriptionTitle: "Animated Beat Tape Tracklist",
    descriptionText: "A kinetic typography experiment for music releases. Features a sequential entrance system, scramble-load timestamps, and an integrated dark mode, all wrapped in a high-contrast brutalist aesthetic.",
    technologies: ["React", "SVG", "Framer Motion", "Oswald"],
  }
];
