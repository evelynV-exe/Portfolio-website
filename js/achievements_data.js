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
    link        string  — optional URL ("" if none) e.g. certificate/verify link
    featured    bool    — show on homepage strip

  >>> PLACEHOLDER CONTENT — replace title/date/description/tags/link with the
  >>> real details for each achievement, remove any entries that don't apply,
  >>> and add new keys (then list them in achievementOrder below) for anything
  >>> missing.
*/

window.achievements = {
  'road-to-ctf-advance': {
    title: "ROAD-TO-CTF Advanced",
    date: "2026-07-19",
    category: "Academic",
    description:
      "Participated in the ROAD-TO-CTF Advanced event, a cybersecurity competition that tested skills in web security, cryptography, and reverse engineering. Successfully solved multiple challenges and gained hands-on experience in ethical hacking.",
    tags: ["Cybersecurity", "CTF"],
    image: "img/cert/ctf-adv.jpg",
    link: "",
    featured: true
  },
  'road-to-ctf-beginning': {
    title: "ROAD-TO-CTF Beginning",
    date: "2026-07-19",
    category: "Academic",
    description:
      "Participated in the ROAD-TO-CTF Beginning event, a cybersecurity competition designed for newcomers to the field. Gained foundational knowledge in web security, cryptography, and reverse engineering.",
    tags: ["Cybersecurity", "CTF"],
    image: "img/cert/ctf-begin.jpg",
    link: "",
    featured: true
  },
  'basic-cybersecurity': {
    title: "Certified in Basic Cybersecurity",
    date: "2026-06-23",
    category: "Academic",
    description:
      "Completed the Basic Cybersecurity course, gaining fundamental knowledge in web security, cryptography, and reverse engineering.",
    tags: ["Cybersecurity"],
    image: "img/cert/basic-cyber.png",
    link: "",
    featured: true
  },
};

window.achievementOrder = [
  "road-to-ctf-advance",
  "road-to-ctf-beginning",
  "basic-cybersecurity"
];