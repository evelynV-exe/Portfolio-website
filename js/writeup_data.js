window.writeups = [
  {
    event: "CyberHero CTF 2026",
    slug: "cyberhero-ctf-2026",
    date: "2026",
    description: "Technical write-ups covering challenges from CyberHero CTF 2026, including network analysis, forensics, and cybersecurity investigation.",
    tags: ["forensics", "networking", "misc"],
    url: "https://github.com/evelynV-exe/Cyber-Hero-Write-ups-2026"
  },
  {
    event: "Holmes CTF 2026: The Reichenbach Directive",
    slug: "holmes-ctf-2026",
    date: "2026",
    description: "Blue-team investigation notes from a five-day cybersecurity scenario focused on incident investigation, evidence analysis, and defensive security operations.",
    tags: ["blue team", "forensics", "investigation"],
    url: "https://medium.com/@inthepondddd"
  },
];

(function () {
  const container = document.getElementById("writeups-container");
  if (!container) return;

  function yearOf(writeup) {
    const match = (writeup.date || "").match(/\d{4}/);
    return match ? match[0] : "Undated";
  }

  const years = [...new Set(window.writeups.map(yearOf))].sort((a, b) => {
    if (a === "Undated") return 1;
    if (b === "Undated") return -1;
    return b.localeCompare(a);
  });

  container.innerHTML = years.map(year => {
    const items = window.writeups.filter(writeup => yearOf(writeup) === year);

    return `
      <div class="writeup-year">${year}</div>
      <div class="writeup-list">
        ${items.map(writeup => `
          <a href="${writeup.url}" target="_blank" rel="noopener noreferrer" class="writeup-card">
            <div class="writeup-card-head">
              <span class="writeup-path">${writeup.slug}</span>
              <span class="writeup-arrow">&#8599;</span>
            </div>

            <div class="writeup-card-body">
              <div class="writeup-top">
                <span class="writeup-event">${writeup.event}</span>
                <span class="writeup-date">&middot; ${writeup.date}</span>
              </div>

              <p class="writeup-desc">${writeup.description}</p>

              <div class="writeup-tags">
                ${(writeup.tags || []).map(tag => `<span class="tag">${tag}</span>`).join("")}
              </div>

              <div class="writeup-medium">follow the link &rarr;</div>
            </div>
          </a>
        `).join("")}
      </div>
    `;
  }).join("");
})();