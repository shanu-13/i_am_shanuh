// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  firstName: "R.A",
  name: "Shankari",
  fullName: "R.A Shankari",
  logo: "Shanuh",
  phone: "+91-82485-76011",
  phoneHref: "tel:+918248576011",
  email: "shankari9514@gmail.com",
  // Drop the files into /public and these paths just work.
  resume: "/resume.pdf",
  portrait: "/person-cutout.png" as string | null, // transparent cut-out works best
  socials: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    portfolio: "#home",
  },
};

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "lab", label: "Creative Lab" },
  { id: "work", label: "Portfolio" },
  { id: "backstage", label: "Backstage" },
  { id: "contact", label: "Contact" },
];

export const marquee = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "WordPress",
  "Figma",
  "Event Hosting",
  "Colour Theory",
];

export const about = {
  statement:
    "I build websites by day and run stages by night. Both are the same job: make it work for the people on the other side.",
  cards: [
    {
      eyebrow: "The screen",
      icon: "</>",
      body: "Frontend developer working in React, Next.js, TypeScript and Tailwind. Currently delivering responsive event websites at TCP International, with a B.Tech in AI & Data Science running alongside.",
    },
    {
      eyebrow: "The stage",
      icon: "✦",
      body: "Student coordinator, magazine lead, house president and event host. I’m at ease with a deadline, a team and a microphone.",
    },
  ],
  stats: [
    { value: 60, decimals: 0, suffix: "+", label: "websites delivered" },
    { value: 300, decimals: 0, suffix: "+", label: "participants, Varnave 2025" },
    { value: 8.41, decimals: 2, suffix: "", label: "CGPA, B.Tech AI & DS" },
  ],
};

export const experience = [
  {
    period: "Feb 2026 — Present",
    role: "Software Developer",
    org: "TCP International Inc.",
    note: "Responsive event websites, shipped in parallel.",
  },
  {
    period: "Sep 2024 — Feb 2025",
    role: "Frontend Developer",
    org: "Anaimalais Coco",
    note: "WordPress storefront with payment and shipping APIs.",
  },
  {
    period: "Sep 2023 — May 2027",
    role: "B.Tech, AI & Data Science",
    org: "Jansons Institute of Technology",
    note: "CGPA 8.41 and counting.",
  },
];

export const services = [
  {
    title: "Responsive Websites",
    body: "Consistent design, usability and performance across dozens of event sites at once.",
    tags: ["Mobile-first", "Performance", "Accessibility"],
  },
  {
    title: "React & Next.js",
    body: "Component-based frontends in TypeScript and Tailwind CSS, built to be fast.",
    tags: ["TypeScript", "Tailwind", "App Router"],
  },
  {
    title: "WordPress",
    body: "Design implementation, plugin integration, content management and payment and shipping APIs.",
    tags: ["WooCommerce", "Plugins", "APIs"],
  },
  {
    title: "Figma to Code",
    body: "Colour theory and careful layouts, planned in Figma before the first line of code.",
    tags: ["Layout", "Colour", "Prototyping"],
  },
];

export const lab = [
  {
    step: "Step 01",
    title: "Sketch the frame",
    body: "Layouts are planned in Figma before any code is written.",
    art: "frame",
  },
  {
    step: "Step 02",
    title: "Choose the colour",
    body: "Colour theory shapes the palette, so a site feels right as well as looking right.",
    art: "colour",
  },
  {
    step: "Step 03",
    title: "Build in code",
    body: "React, Next.js and Tailwind turn the design into responsive pages.",
    art: "code",
  },
  {
    step: "Step 04",
    title: "Ship it",
    body: "Tested, tuned for performance and delivered on time.",
    art: "ship",
  },
] as const;

export const work = [
  {
    title: "Automechanika Expo",
    meta: "60+ responsive event sites · TCP International",
    url: "automechanika-expo.com",
    href: "#",
    image: null as string | null, // e.g. "/work/expo.jpg"
    year: "2026",
  },
  {
    title: "Anaimalais Coco",
    meta: "Shipping and payment APIs · WordPress",
    url: "anaimalaiscoco.com",
    href: "#",
    image: null as string | null,
    year: "2025",
  },
];

export const backstage = [
  {
    eyebrow: "Admit one",
    title: "Overall Student Coordinator",
    body: "Varnave 2025 · 300+ participants",
    stub: "300+",
  },
  {
    eyebrow: "Nov 2025",
    title: "Event Host",
    body: "Indian Karting Race & Formula Imperial",
    stub: "IKR",
  },
  {
    eyebrow: "College",
    title: "Magazine & Fest Lead",
    body: "Led a multidisciplinary team; hosted a technical and cultural fest",
    stub: "№1",
  },
  {
    eyebrow: "School",
    title: "House President",
    body: "Led the team to the “Best Squad” award",
    stub: "★",
  },
];

export const languages = "English (fluent) · French (intermediate)";
