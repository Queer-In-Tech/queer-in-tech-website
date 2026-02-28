export interface TeamMember {
  name: string;
  image: string;
  linkedin?: string;
  pronouns?: string;
}

export const TEAM_MEMBERS = {
  dmitry: {
    name: "Dmitry",
    image: "/dmitry.jpeg",
    linkedin: "https://www.linkedin.com/in/dmitry-leyko-ba800715a/",
    pronouns: "He/Him",
  },
  jenni: {
    name: "Jenni",
    image: "/jenni.jpeg",
    linkedin: "https://www.linkedin.com/in/fosterjenni/",
    pronouns: "She/Her",
  },
  stevie: {
    name: "Stevie",
    image: "/stevie.jpeg",
    linkedin: "https://www.linkedin.com/in/stevie-woods-a7806456/",
    pronouns: "They/Them",
  },
  joe: {
    name: "Joe",
    image: "/joe.jpeg",
    linkedin: "https://www.linkedin.com/in/twofirstnames/",
    pronouns: "They/Them",
  },
  rory: {
    name: "Rory",
    image: "/rory.jpeg",
    linkedin: "https://www.linkedin.com/in/rory-maclellan/",
    pronouns: "He/They",
  },
  loz: {
    name: "Loz",
    image: "/loz.jpeg",
    linkedin: "https://www.linkedin.com/in/loz-atkinson/",
    pronouns: "He/They",
  },
  alice: {
    name: "Alice",
    image: "/alice.jpeg",
  },
  akiva: {
    name: "Akiva",
    image: "/akiva.jpeg",
    linkedin: "https://www.linkedin.com/in/akivakaufman/",
    pronouns: "He/Him",
  },
  kaily: {
    name: "Kaily",
    image: "/kaily.jpeg",
    linkedin: "https://www.linkedin.com/in/kailyisme/",
    pronouns: "She/Her",
  },
  rebecca: {
    name: "Rebecca",
    image: "/rebecca.jpeg",
    linkedin: "https://www.linkedin.com/in/therebeccafox/",
    pronouns: "She/Her",
  },
  alex: {
    name: "Alex",
    image: "/alex.jpeg",
    linkedin: "https://www.linkedin.com/in/alejandro-norniella-roza-513077138/",
    pronouns: "He/Him",
  },
  ari: {
    name: "Ari",
    image: "/ari.jpeg",
    linkedin: "https://www.linkedin.com/in/ari-abendstern/",
    pronouns: "They/Them",
  },
} as const satisfies Record<string, TeamMember>;

export type TeamMemberId = keyof typeof TEAM_MEMBERS;

type HomeTeamSection = "manchester" | "leeds" | "previousContributors";

export const HOME_TEAM_ORDER = {
  // Array order controls card placement (left-to-right, top-to-bottom).
  // Add new people to the end of each section.
  manchester: ["dmitry", "jenni", "stevie", "joe", "rory"],
  leeds: ["loz", "alice", "akiva"],
  previousContributors: ["kaily", "rebecca", "alex", "ari"],
} as const satisfies Record<HomeTeamSection, readonly TeamMemberId[]>;
