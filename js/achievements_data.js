/*
  Achievements data — shared between index.html (featured achievements strip)
  and achievements.html (full filterable list).

  Fields:
    title       string  — name of the achievement/award/certification
    date        string  — e.g. "Jun 2026"
    category    string  — one of: "Academic", "Competition", "Leadership",
                            "Certification", "Project" (used for filter pills)
    description string  — 1-3 sentence summary
    tags        array   — short keyword chips shown on the card
    icon        string  — a single emoji used as a visual marker
    link        string  — optional URL ("" if none) e.g. certificate/verify link
    featured    bool    — show on homepage strip

  >>> PLACEHOLDER CONTENT — replace title/date/description/tags/link with the
  >>> real details for each achievement, remove any entries that don't apply,
  >>> and add new keys (then list them in achievementOrder below) for anything
  >>> missing.
*/

window.achievements = {
  'honors-cum-laude': {
    title: "Graduated With Honor — Cum Laude",
    date: "2025",
    category: "Academic",
    description:
      "Graduated from Ambassador Bilingual Academy (ABA) with Honor distinction, finishing with a GPAX of 3.99 across the full senior high school curriculum.",
    tags: ["GPAX 3.99", "Senior High School"],
    link: "",
    featured: true
  },

  'coding-club-president': {
    title: "President, Coding Club",
    date: "2024 – 2025",
    category: "Leadership",
    description:
      "Led the school's Coding Club, organizing weekly workshops and mentoring members on web development and programming fundamentals while representing the club in STEM initiatives.",
    tags: ["Leadership", "Mentorship", "STEM"],
    link: "",
    featured: true
  },
};

window.achievementOrder = [
  'honors-cum-laude',
  'coding-club-president',
];