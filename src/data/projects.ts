export type VideoEntry = {
  title: string;
  url: string;
  year?: string;
  feat?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  role: string;
  tags: string[];
  category: "Music Video" | "Photography" | "Design" | "Branding" | "Other";
  liveUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  metrics?: string[];
  year: string;
  client?: string;
  thumbnail?: string;      // explicit thumbnail URL (falls back to first video thumbnail)
  videos?: VideoEntry[];   // multiple video entries
};

export const projects: Project[] = [
  {
    id: "nexart",
    title: "nexart",
    description:
      "Ongoing collaboration with Filipino independent artist nexart — directing official music videos from concept to final cut. Responsible for visual treatment, on-set direction, cinematography, and post-production.",
    role: "Director / DP",
    client: "nexart (@definitelynexx)",
    tags: ["Direction", "Cinematography", "Color Grading", "Post Production", "Art Direction"],
    category: "Music Video",
    featured: true,
    metrics: ["9 music videos", "Ongoing collaboration"],
    year: "2024",
    liveUrl: "https://www.youtube.com/@definitelynexx",
    videos: [
      { title: "Iripit ft. Gerold",          url: "https://www.youtube.com/watch?v=UwsN5Nk6IB4", feat: "ft. Gerold"       },
      { title: "Sa Tabi Ko ft. Gerold",       url: "https://www.youtube.com/watch?v=sWYE6ZosxnY", feat: "ft. Gerold"       },
      { title: "Sigaw",                       url: "https://www.youtube.com/watch?v=OXmtd4BDmto"                           },
      { title: "DAMBANA Pt. 1",              url: "https://www.youtube.com/watch?v=WdaHWU5qSJY"                           },
      { title: "Unan ft. Vlone Carti",        url: "https://www.youtube.com/watch?v=dCL9JHyIC8w", feat: "ft. Vlone Carti"  },
      { title: "Yugto ft. Gerold (One-Take)", url: "https://www.youtube.com/watch?v=W8ot8p7mt3I", feat: "ft. Gerold"       },
      { title: "Kita Mo Yung ft. Gerold",     url: "https://www.youtube.com/watch?v=iHhpwn6zGKg", feat: "ft. Gerold"       },
      { title: "Mahikamo (Freestyle)",        url: "https://www.youtube.com/watch?v=1fbUhUvUsI4"                           },
      { title: "Mr. Kupido ft. Gerold",       url: "https://www.youtube.com/watch?v=k47IVqed58Q", feat: "ft. Gerold"       },
    ],
  },
  {
    id: "glitttz",
    title: "glitttz",
    description:
      "Music video collaboration with glitttz — directing cinematic visuals that blend performance and narrative storytelling. Responsible for direction, shot design, art direction, and edit.",
    role: "Director",
    client: "glitttz (@glitttz)",
    tags: ["Direction", "Art Direction", "Editing", "Storytelling"],
    category: "Music Video",
    featured: true,
    metrics: ["3 music videos", "ft. nexart & Vlone Carti"],
    year: "2024",
    liveUrl: "https://www.youtube.com/@glitttz",
    videos: [
      { title: "Crazy ft. nexart",                          url: "https://www.youtube.com/watch?v=TLaV-9COd2E", feat: "ft. nexart"                  },
      { title: "Ikaw Lang Gusto ft. nexart",                url: "https://www.youtube.com/watch?v=b3WYSTXKpxA", feat: "ft. nexart"                  },
      { title: "Flight Mode ft. nexart & Vlone Carti",      url: "https://www.youtube.com/watch?v=jiS85Jen_e0", feat: "ft. nexart & Vlone Carti"    },
    ],
  },
  {
    id: "shadow-of-the-past",
    title: "Shadow of the Past",
    description:
      "Produced cinematic promotional content for Bakunawa Studios' indie slasher horror game. Handled direction, filming, and post-production for game marketing material.",
    role: "Videographer / Editor",
    client: "Bakunawa Studios",
    tags: ["Cinematography", "Game Trailer", "Post Production", "Horror"],
    category: "Other",
    featured: true,
    metrics: ["Game promotional content"],
    year: "2024",
    liveUrl: "https://bakunawa-studios.itch.io/shadow-of-the-past",
  },
  {
    id: "tsidmts",
    title: "The Smile I Didn't Mean To Show",
    description:
      "Shot and produced promotional video content for the indie horror game 'The Smile I Didn't Mean To Show'. Responsible for cinematography, direction, and post-production editing.",
    role: "Videographer / Editor",
    client: "maeluis",
    tags: ["Cinematography", "Game Trailer", "Post Production", "Horror"],
    category: "Other",
    featured: true,
    metrics: ["Game promotional content"],
    year: "2024",
    liveUrl: "https://maeluis.itch.io/tsidmts",
  },
];
