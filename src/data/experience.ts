export type WorkExperience = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | "Present";
  location: string;
  bullets: string[];
  skills: string[];
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  year: string;
  honors?: string;
};

export const workExperience: WorkExperience[] = [
  {
    id: "exp-1",
    company: "Freelance / Independent",
    role: "Music Video Director & Photographer",
    startDate: "2023",
    endDate: "Present",
    location: "Valenzuela City, Philippines",
    bullets: [
      "Directed 15+ music videos for startup artists, handling full production from concept to final delivery",
      "Managed cinematography, lighting design, and on-set direction for each production",
      "Performed color grading and post-production editing to match client creative vision",
      "Conducted portrait and commercial photography shoots for artists",
    ],
    skills: ["Direction", "Cinematography", "Color Grading", "Photography"],
  },
  {
    id: "exp-2",
    company: "Bakunawa Studios / maeluis",
    role: "Game Trailer Videographer",
    startDate: "2023",
    endDate: "Present",
    location: "Philippines",
    bullets: [
      "Produced cinematic promotional content for Shadow of the Past (Bakunawa Studios)",
      "Shot and edited trailer footage for The Smile I Didn't Mean To Show",
      "Handled direction, filming, and post-production for game marketing material",
    ],
    skills: ["Cinematography", "Editing", "Post Production", "Game Trailers"],
  },
  {
    id: "exp-3",
    company: "Pamantasan ng Lungsod ng Valenzuela",
    role: "Documentary Videographer",
    startDate: "2022",
    endDate: "Present",
    location: "Valenzuela City, Philippines",
    bullets: [
      "Covered school events through documentary-style photography and videography",
      "Delivered edited footage and photo sets for institutional documentation",
    ],
    skills: ["Documentary", "Event Photography", "Editing"],
  },
];

export const education: Education[] = [
  {
    id: "edu-1",
    institution: "Pamantasan ng Lungsod ng Valenzuela (PLV)",
    degree: "Bachelor of Science in Information Technology",
    field: "BSIT",
    year: "2022 – Present",
  },
];

export const skills: string[] = [
  "Music Video Direction",
  "Photography",
  "Cinematography",
  "Color Grading",
  "Art Direction",
  "Visual Storytelling",
  "Graphic Design",
  "Brand Identity",
  "Photo Retouching",
  "Adobe Premiere Pro",
  "Adobe Lightroom",
  "Adobe Photoshop",
  "Capture One",
  "DaVinci Resolve",
  "Adobe Illustrator",
  "Figma",
];
