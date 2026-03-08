export const shelfData = [
    {
        id: "archive-01",
        colors: { sleeve: "#4aa0e0", paper: "#f4f0e6", ink: "#1a1a1a" },
        textures: { sleeve: "url(#filter-ribbing)", paper: "url(#filter-grain)" },
        sleeve: { title1: "Les Artistes iconographes", title2: "Artists as Iconographers", authors: "Garance Chabert et Aurélien Mole" },
        paper: { title1: "Les Artistes iconographes", title2: "Artists as Iconographers", date: "1975" },
        slides: [
            `<rect x="5" y="5" width="170" height="380" fill="#3a3a3a" class="parallax-bg" />
            <g class="parallax-mg">
                <rect x="40" y="20" width="10" height="350" fill="#111" />
                <rect x="50" y="20" width="25" height="350" fill="#ccc" />
                <line x1="35" y1="25" x2="35" y2="365" stroke="#111" stroke-width="6" stroke-dasharray="2 10" />
                <line x1="80" y1="25" x2="80" y2="365" stroke="#111" stroke-width="6" stroke-dasharray="2 10" />
                <line x1="30" y1="30" x2="30" y2="360" stroke="#0a0a0a" stroke-width="4" stroke-dasharray="1 11" />
                <line x1="85" y1="30" x2="85" y2="360" stroke="#0a0a0a" stroke-width="4" stroke-dasharray="1 11" />
                <line x1="100" y1="10" x2="100" y2="380" stroke="#444" stroke-width="1" />
            </g>
            <g transform="translate(70, 220)">
                <g class="target-overlay parallax-fg">
                    <circle cx="0" cy="0" r="15" fill="none" stroke="#fff" stroke-width="0.5" />
                    <circle cx="0" cy="0" r="30" fill="none" stroke="#fff" stroke-width="0.5" />
                    <circle cx="0" cy="0" r="40" fill="none" stroke="#fff" stroke-width="0.2" />
                </g>
            </g>`,
            `<rect x="5" y="5" width="170" height="380" fill="#2d2d2d" class="parallax-bg" />
            <g class="parallax-mg">
                <rect x="25" y="25" width="130" height="340" fill="none" stroke="#111" stroke-width="3" />
                <line x1="25" y1="110" x2="155" y2="110" stroke="#111" stroke-width="3" />
                <line x1="25" y1="195" x2="155" y2="195" stroke="#111" stroke-width="3" />
            </g>
            <g class="parallax-fg">
                <rect x="35" y="35" width="45" height="65" fill="#151515" />
                <rect x="100" y="120" width="45" height="65" fill="#1a1a1a" />
            </g>`
        ]
    },
    {
        id: "archive-02",
        colors: { sleeve: "#c93a3a", paper: "#1c1c1c", ink: "#e6e6e6" }, // Bauhaus Red, Dark paper
        textures: { sleeve: "url(#filter-stipple)", paper: "url(#filter-grain)" },
        sleeve: { title1: "Architektur und Raum", title2: "Architecture and Space", authors: "Walter Gropius" },
        paper: { title1: "Architektur und Raum", title2: "Architecture and Space", date: "1928" },
        slides: [
            `<rect x="5" y="5" width="170" height="380" fill="none" stroke="var(--ink-black)" stroke-width="2" class="parallax-bg" />
            <g class="parallax-mg">
                <line x1="5" y1="100" x2="175" y2="100" stroke="var(--ink-black)" stroke-width="2"/>
                <line x1="5" y1="280" x2="175" y2="280" stroke="var(--ink-black)" stroke-width="2"/>
                <line x1="90" y1="100" x2="90" y2="280" stroke="var(--ink-black)" stroke-width="1" stroke-dasharray="2 4"/>
            </g>
            <g class="parallax-fg">
                <circle cx="90" cy="190" r="50" fill="none" stroke="var(--ink-black)" stroke-width="1" stroke-dasharray="4 4"/>
                <rect x="60" y="160" width="60" height="60" fill="none" stroke="var(--ink-black)" stroke-width="2"/>
            </g>`,
            `<rect x="5" y="5" width="170" height="380" fill="#222" class="parallax-bg" />
            <rect x="40" y="40" width="100" height="300" fill="none" stroke="var(--ink-black)" stroke-width="4" class="parallax-mg" />
            <circle cx="90" cy="190" r="20" fill="var(--ink-black)" class="parallax-fg" />`
        ]
    },
    {
        id: "archive-03",
        colors: { sleeve: "#888888", paper: "#dcd7bd", ink: "#111111" }, // Brutalist Grey, Manilla paper
        textures: { sleeve: "url(#filter-grain)", paper: "url(#filter-stipple)" },
        sleeve: { title1: "Urban Mass", title2: "Concrete Theory", authors: "Le Corbusier" },
        paper: { title1: "Urban Mass", title2: "Concrete Theory", date: "1965" },
        slides: [
            `<rect x="20" y="20" width="140" height="340" fill="#333" class="parallax-bg" />
            <g class="parallax-mg">
                <rect x="40" y="40" width="40" height="60" fill="#111"/>
                <rect x="100" y="40" width="40" height="60" fill="#111"/>
                <rect x="40" y="120" width="40" height="60" fill="#111"/>
                <rect x="100" y="120" width="40" height="60" fill="#111"/>
            </g>
            <g class="parallax-fg">
                <rect x="40" y="200" width="40" height="60" fill="#111"/>
                <rect x="100" y="200" width="40" height="60" fill="#111"/>
            </g>`,
            `<rect x="5" y="5" width="170" height="380" fill="#444" class="parallax-bg" />
            <polygon points="10,370 160,370 90,50" fill="#222" class="parallax-mg" />
            <line x1="90" y1="50" x2="90" y2="370" stroke="#111" stroke-width="4" class="parallax-fg" />`
        ]
    }
];
