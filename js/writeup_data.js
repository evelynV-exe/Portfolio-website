window.writeups = [
  {
    event: "CyberHero CTF 2026",
    slug: "cyberhero-ctf-2026",
    date: "12.09.2026",
    description: "Technical write-ups covering cybersecurity challenges involving network analysis, digital forensics, and miscellaneous investigation.",
    tags: ["forensics", "networking", "misc"],
    url: "https://github.com/evelynV-exe/Cyber-Hero-Write-ups-2026"
  },
  {
    event: "picoCTF 2019 - shark on wire 1 & 2",
    slug: "picoCTF-2019-shark-on-wire",
    date: "14.09.2026",
    description: "Network forensics challenges involving packet capture analysis and extracting hidden data from UDP traffic.",
    tags: ["forensics", "networking", "wireshark"],
    url: "https://medium.com/@inthepondddd/picoctf-2019-shark-on-wire-1-2-forensics-3437161d58a4"
  },
  {
    event: "picoCTF 2025 - ChaCha Slide",
    slug: "picoCTF-2025-chacha-slide",
    date: "09.09.2026",
    description: "Cryptography challenge involving ChaCha20 encryption, analyzing the implementation, and recovering the information needed to decrypt the message.",
    tags: ["cryptography", "code"],
    url: "https://medium.com/@inthepondddd/chacha-slide-write-up-picoctf-2025-20f74d0cd64b"
  },
  {
    event: "Cyberdefenders - Insider Lab",
    slug: "cyberdefenders-insider-lab",
    date: "07.09.2026",
    description: "Endpoint forensics investigation focused on analyzing a compromised system and uncovering evidence of insider activity.",
    tags: ["Endpoint forensics", "blue team"],
    url: "https://medium.com/@inthepondddd/insider-lab-cyberdefenders-labs-write-up-999fc3ad421b"
  },
  {
    event: "picoCTF 2021 - forensics",
    slug: "picoCTF-2021-forensics",
    date: "03.09.2026",
    description: "Collection of digital forensics challenges involving file analysis, metadata, hidden information, and investigating digital artifacts.",
    tags: ["Endpoint forensics", "blue team", "mix difficulty"],
    url: "https://medium.com/@inthepondddd/picoctf-2021-forensics-write-ups-6016e828ba9c"
  },
  {
    event: "traffic analysis 2026-08-09",
    slug: "traffic-analysis-2026-08-09",
    date: "27.08.2026",
    description: "Network traffic analysis exercise focused on examining packet captures, identifying suspicious communication, and extracting relevant network evidence.",
    tags: ["Traffic analysis", "blue team", "wireshark"],
    url: "https://medium.com/@inthepondddd/2026-08-09-traffic-analysis-exercise-write-up-df445f132f72"
  },
  {
    event: "picoCTF 2019 - b00tl3gRSA2",
    slug: "picoCTF-2019-b00tl3gRSA2",
    date: "25.08.2026",
    description: "RSA cryptography challenge involving analysis of weak encryption parameters and recovering the plaintext from the provided ciphertext.",
    tags: ["Cryptography", "hard"],
    url: "https://medium.com/@inthepondddd/2026-08-09-traffic-analysis-exercise-write-up-df445f132f72"
  }
];

(function () {
  const container = document.getElementById("writeups-container");
  if (!container) return;

  function parseDate(date) {
    if (!date) return new Date(0);

    // DD.MM.YYYY
    const match = date.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

    if (match) {
      const [, day, month, year] = match;
      return new Date(year, month - 1, day);
    }

    // YYYY
    if (/^\d{4}$/.test(date)) {
      return new Date(date, 0, 1);
    }

    return new Date(0);
  }

  // Show a NEW badge for 7 days after `date`
  const TIME = 14 * 24 * 60 * 60 * 1000;

  function isRecentWriteup(writeup) {
    if (!writeup.date) return false;

    const match = writeup.date.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (!match) return false;

    const [, day, month, year] = match;
    const added = new Date(year, month - 1, day).getTime();

    return !isNaN(added) &&
      Date.now() >= added &&
      (Date.now() - added) < TIME;
  }

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
    const items = window.writeups
      .filter(writeup => yearOf(writeup) === year)
      .sort((a, b) => parseDate(b.date) - parseDate(a.date));

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

              ${isRecentWriteup(writeup)
                ? '<span class="writeup-new">NEW</span>'
                : ''
              }

              <p class="writeup-desc">${writeup.description}</p>

              <div class="writeup-tags">
                ${(writeup.tags || [])
                  .map(tag => `<span class="tag">${tag}</span>`)
                  .join("")}
              </div>

              <div class="writeup-medium">
                follow the link &rarr;
              </div>

            </div>
          </a>
        `).join("")}
      </div>
    `;
  }).join("");
})();