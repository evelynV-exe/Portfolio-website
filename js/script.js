(function(){
  // ---------- Theme toggle ----------
  const themeToggle = document.getElementById('theme-toggle');
  if(themeToggle){
    themeToggle.addEventListener('click', () => {
      const root = document.documentElement;
      const goingLight = root.getAttribute('data-theme') !== 'light';
      if(goingLight){
        root.setAttribute('data-theme', 'light');
      } else {
        root.removeAttribute('data-theme');
      }
      try{ localStorage.setItem('theme', goingLight ? 'light' : 'dark'); }catch(e){}
    });
  }

  // ---------- Mobile nav ----------
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  toggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  // ---------- Active nav on scroll ----------
  const sections = ['about','achievements','projects','blog','skills','experience','contact'];
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === entry.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(id => {
    const el = document.getElementById(id);
    if(el) observer.observe(el);
  });

  // ---------- Reveal on scroll ----------
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ---------- Homepage featured achievements grid ----------
  const achievementsGridEl = document.getElementById('achievements-grid');

  if(achievementsGridEl && window.achievements){
    const order = window.achievementOrder || Object.keys(window.achievements);
    const HOMEPAGE_ACHIEVEMENT_COUNT = 4;
    const featured = order.filter(key => window.achievements[key].featured).slice(0, HOMEPAGE_ACHIEVEMENT_COUNT);
    achievementsGridEl.innerHTML = featured.map(key => {
      const a = window.achievements[key];
      const imageHTML = a.image ? `<img src="${a.image}" alt="${a.title} certificate" class="achievement-image" loading="lazy">` : '';
      const tags = (a.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
      const linkHTML = a.link ? `<a href="${a.link}" target="_blank" rel="noopener" class="achievement-link">view &rarr;</a>` : '';
      return `
        <article class="achievement-card reveal">
          ${imageHTML}
          <div class="achievement-top">
            <span class="achievement-icon">${a.icon || '🏅'}</span>
            <span class="achievement-date">${a.date || ''}</span>
          </div>
          <h3>${a.title}</h3>
          <span class="achievement-category">${a.category || ''}</span>
          <p>${a.description || ''}</p>
          <div class="achievement-tag-row">${tags}</div>
          ${linkHTML}
        </article>`;
    }).join('');
    achievementsGridEl.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  // ---------- Homepage featured project grid ----------
  const projectGridEl = document.getElementById('project-grid');
  if(projectGridEl && window.projectPosts){
    const order = window.projectPostOrder || Object.keys(window.projectPosts);
    const HOMEPAGE_PROJECT_COUNT = 4;
    const featured = order.filter(key => window.projectPosts[key].featured).slice(0, HOMEPAGE_PROJECT_COUNT);
    projectGridEl.innerHTML = featured.map(key => {
      const p = window.projectPosts[key];
      const tags = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
      const githubLink = p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="card-link">source</a>` : '';
      return `
        <article class="project-card reveal">
          <div class="project-card-head"><span class="file">~/projects/${key}</span></div>
          <div class="project-card-body">
            <h3><span class="arrow">&gt;</span> ${p.title}</h3>
            <p>${p.short}</p>
            <div class="tag-row">${tags}</div>
            <div class="card-links"><a href="project-post.html?project=${key}" class="card-link">view project</a>${githubLink}</div>
          </div>
        </article>`;
    }).join('');
    // newly-injected .reveal cards need to be observed for the scroll-in animation
    projectGridEl.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  // ---------- Blog date/freshness helpers (shared by homepage list + terminal) ----------
  // A post is "recent" for TWO_WEEKS_MS after its publishedAt date. Falls back
  // to parsing the display `date` field ("Jul 2026") for sorting if publishedAt
  // is missing, so older posts without the field don't crash sorting — they
  // just never show the NEW badge, since a month-only date can't confirm the
  // post is within the last 14 days.
  function parseBlogDate(post){
    const iso = post.publishedAt ? Date.parse(post.publishedAt) : NaN;
    if(!isNaN(iso)) return iso;
    const fallback = Date.parse('1 ' + (post.date || ''));
    return isNaN(fallback) ? 0 : fallback;
  }

  const TWO_WEEKS_MS = 7 * 24 * 60 * 60 * 1000;
  function isRecentPost(post){
    if(!post.publishedAt) return false; // no exact date = can't confirm it's within 14 days
    const published = Date.parse(post.publishedAt);
    return !isNaN(published) && (Date.now() - published) < TWO_WEEKS_MS;
  }

  // ---------- Homepage blog list ----------
  const blogListEl = document.getElementById('blog-list');
  if(blogListEl && window.blogPosts){
    function excerptOf(post){
      // intro strings have soft-wrap whitespace baked in — collapse and trim
      const clean = (post.intro || '').replace(/\s+/g, ' ').trim();
      return clean.length > 140 ? clean.slice(0, 140).trim() + '\u2026' : clean;
    }

    const order = (window.blogPostOrder || Object.keys(window.blogPosts))
      .slice()
      .sort((a, b) => parseBlogDate(window.blogPosts[b]) - parseBlogDate(window.blogPosts[a]));

    const HOMEPAGE_POST_COUNT = 3;
    const recent = order.slice(0, HOMEPAGE_POST_COUNT);

    blogListEl.innerHTML = recent.map(key => {
      const p = window.blogPosts[key];
      const isNew = isRecentPost(p);
      return `
        <a href="blog-post.html?post=${key}" class="blog-item reveal">
          <div class="blog-main">
            <div class="blog-title">${p.title}${isNew ? ' <span class="new-badge">NEW</span>' : ''}</div>
            <div class="blog-excerpt">${excerptOf(p)}</div>
          </div>
          <span class="blog-meta">${p.date} &middot; ${p.read}</span>
          <span class="blog-arrow">&rarr;</span>
        </a>`;
    }).join('');
    // newly-injected .reveal items need to be observed for the scroll-in animation
    blogListEl.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  // ---------- Terminal ----------
  const termBody = document.getElementById('term-body');
  const termForm = document.getElementById('term-form');
  const termInput = document.getElementById('term-input');
  let introOut = document.getElementById('intro-out');
  if(termBody){
  const initalTerminal = termBody.innerHTML;

  // Project content lives in project_data.js (shared with projects.html and
  // project-post.html) so it's only ever defined in one place. project_data.js
  // must load before this file.
  const projectData = window.projectPosts || {};
  const projectOrder = window.projectPostOrder || Object.keys(projectData);

  // Blog content lives in blog-data.js (shared with blog-post.html) so it's
  // only ever defined in one place. blog-data.js must load before this file.
  const blogData = window.blogPosts || {};
  const blogOrder = window.blogPostOrder || Object.keys(blogData);
  const blogByNumber = {};
  blogOrder.forEach((key, i) => { blogByNumber[i + 1] = key; });

  function renderProjectList(){
    const items = projectOrder.map(key => {
      const p = projectData[key];
      return `<li><strong>${key}</strong> \u2014 ${p.short}</li>`;
    }).join('');
    return `<span class="out-title">ls ~/projects</span><ul>${items}</ul>type <strong>projects &lt;name&gt;</strong> (e.g. <strong>projects ${projectOrder[0]}</strong>) for details, or just type the name on its own.`;
  }

  function renderProjectDetail(key){
    const p = projectData[key];
    const linkEntries = [
      `<a href="project-post.html?project=${key}">full write-up</a>`,
      p.github ? `<a href="${p.github}" target="_blank" rel="noopener">source</a>` : null
    ].filter(Boolean).join(' &middot; ');
    return `<span class="out-title">cat ~/projects/${key}/README.md</span><strong>${p.title}</strong><br>${p.short}<br><br>` +
      `stack: ${(p.tags || []).join(', ')}<br>links: ${linkEntries}<br><br>` +
      `type <strong>projects</strong> to go back to the list.`;
  }

  function renderBlogList(){
    const sorted = blogOrder.slice().sort((a, b) =>
      parseBlogDate(blogData[b]) - parseBlogDate(blogData[a])
    );

    const items = sorted.map((key, i) => {
      const b = blogData[key];
      const isNew = isRecentPost(b);
      return `<li>[${i + 1}] <strong>${b.title}</strong>${isNew ? ' <span class="new-badge">NEW</span>' : ''} &mdash; ${b.date}, ${b.read}</li>`;
    }).join('');
    return `<span class="out-title">cat ~/blog/latest</span><ul>${items}</ul>type <strong>blog &lt;number&gt;</strong> or <strong>blog &lt;slug&gt;</strong> (e.g. <strong>blog 1</strong> or <strong>blog orms</strong>) for a summary, or open the full post from the blog section.`;
  }

  function renderBlogDetail(key){
    const b = blogData[key];
    return `<span class="out-title">cat ~/blog/${key}.md</span><strong>${b.title}</strong><br><span style="color:var(--muted,#888)">${b.date} &middot; ${b.read}</span><br><br>${b.intro}<br><br>` +
      `<a href="blog-post.html?post=${key}">read the full post &rarr;</a><br><br>type <strong>blog</strong> to go back to the list.`;
  }

  const outputs = {
    about: `<span class="out-title">whoami</span>Evelyn (Benjarat Tamwong) — full-stack developer.<br>Computer Engineering student. Networking & cybersecurity enthusiast.`,
    skills: `
      <span class="out-title">cat skills.json</span>
      languages: Python, JavaScript, HTML5, CSS3, C, C++, SQL<br>
      frontend: React, Next.js, Tailwind CSS, Framer Motion, Responsive Design, Vite<br>
      backend/infra: Node.js, Express.js, PostgreSQL, Flask<br>
      python/data: Pandas, NumPy, Scikit-learn, XGBoost, FastF1, psutil<br>
      cybersecurity: Web Security, OWASP Top 10, Network Security, Wireshark, Nmap<br>
      ctf/hacking: OSINT, Cryptography, Reverse Engineering, Binary Exploitation, Web Exploitation, Forensics<br>
      tooling: Git, GitHub, VS Code, Linux, FFmpeg, yt-dlp<br>
      learning: Network Engineering, Cybersecurity, Machine Learning, Computer Networks, System Design
      `,
    experience: `<span class="out-title">cat about.log</span><ul>
      <li>2026\u2013present \u2014 Computer Engineering student @ Rajamangala University of Technology Lanna (RMUTL) focused on full-stack development, networking, and cybersecurity.</li>
      <li>2024\u20132026 \u2014 Senior High School, Ambassador Bilingual Academy (ABA) \u2014 President, Coding Club</li>
      <li>2016\u20132024 \u2014 Ambassador Bilingual School (ABS)</li>
    </ul>`,
    contact: `<span class="out-title">cat contact.txt</span>email: <a href="mailto:asyncbyevelyn@gmail.com">asyncbyevelyn@gmail.com</a><br>github: <a href="https://github.com/evelynV-exe" target="_blank" rel="noopener">github.com/evelynV-exe</a><br>linkedin: <a href="https://linkedin.com/in/evelynbt" target="_blank" rel="noopener">linkedin.com/in/evelynbt</a>`,
    resume: `Fetching resume... <a href="#" target="_blank">\u2192 download resume.pdf</a>`,
    help: `<span class="out-title">available commands</span><ul>
      <li>help \u2014 list available commands</li>
      <li>about \u2014 who I am</li>
      <li>projects \u2014 selected work (try: projects ${projectOrder[0]})</li>
      <li>blog \u2014 writing &amp; notes (try: blog 1)</li>
      <li>achievements \u2014 accomplishments and awards</li>
      <li>skills \u2014 tools and technologies</li>
      <li>experience \u2014 education &amp; background</li>
      <li>contact \u2014 get in touch</li>
      <li>resume \u2014 download resume</li>
      <li>back \u2014 return to the last list view</li>
      <li>clear \u2014 reset the terminal</li>
    </ul>`
  };

  // Track which list ("projects" or "blog") "back" should return to
  let lastList = 'projects';

  function levenshtein(a, b){
    const m = a.length, n = b.length;
    const dp = Array.from({length: m+1}, (_, i) => [i, ...Array(n).fill(0)]);
    for(let j=0;j<=n;j++) dp[0][j] = j;
    for(let i=1;i<=m;i++){
      for(let j=1;j<=n;j++){
        dp[i][j] = a[i-1] === b[j-1]
          ? dp[i-1][j-1]
          : 1 + Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]);
      }
    }
    return dp[m][n];
  }

  function closestCommand(cmd){
    const all = [...Object.keys(outputs), 'projects', 'blog', 'clear', 'back', ...projectOrder, ...blogOrder];
    let best = null, bestDist = Infinity;
    all.forEach(c => {
      const d = levenshtein(cmd, c);
      if(d < bestDist){ bestDist = d; best = c; }
    });
    return bestDist <= 2 ? best : null;
  }

  function scrollTermToBottom(){
    termBody.scrollTop = termBody.scrollHeight;
  }

  function typeIntro(){
    const text = "whoami Evelyn (Benjarat Tamwong) — full-stack developer. Computer Engineering student. Networking & cybersecurity enthusiast.";
    let i = 0;
    introOut.classList.add('terminal-out');
    const iv = setInterval(() => {
      introOut.textContent += text[i];
      i++;
      if(i >= text.length) clearInterval(iv);
    }, 22);
  }
  typeIntro();

  function printCommand(cmd){
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="p1">evelyn@portfolio:~$</span> <span class="p2"></span>`;
    termBody.appendChild(line);
    const target = line.querySelector('.p2');
    let i = 0;
    return new Promise(resolve => {
      const iv = setInterval(() => {
        target.textContent += cmd[i];
        i++;
        scrollTermToBottom();
        if(i >= cmd.length){ clearInterval(iv); resolve(); }
      }, 16);
    });
  }

  function printOutput(html){
    const out = document.createElement('div');
    out.className = 'terminal-out';
    out.innerHTML = html;
    termBody.appendChild(out);
    scrollTermToBottom();
  }

  async function runCommand(raw){
    const trimmed = raw.trim();
    if(!trimmed) return;

    history.push(raw);
    historyIndex = history.length;

    await printCommand(raw);

    const lower = trimmed.toLowerCase();
    if(lower === 'clear'){
      termBody.innerHTML = initalTerminal;
      introOut = document.getElementById("intro-out");
      typeIntro();
      return;
    }

    // small execution delay to feel like a real command running
    await new Promise(r => setTimeout(r, 180));

    const parts = lower.split(/\s+/);
    const head = parts[0];
    const arg = parts.slice(1).join(' ');

    // "back" returns to the last list the user was browsing
    if(head === 'back'){
      printOutput(lastList === 'blog' ? renderBlogList() : renderProjectList());
      return;
    }

    // "projects" list or "projects <name>" detail
    if(head === 'projects'){
      lastList = 'projects';
      if(!arg){ printOutput(renderProjectList()); return; }
      if(projectData[arg]){ printOutput(renderProjectDetail(arg)); return; }
      printOutput(`no project named <strong>${arg}</strong>. type <strong>projects</strong> to see the list.`);
      return;
    }

    // "blog" list or "blog <number|slug>" detail
    if(head === 'blog'){
      lastList = 'blog';
      if(!arg){ printOutput(renderBlogList()); return; }
      const key = blogByNumber[arg] || arg;
      if(blogData[key]){ printOutput(renderBlogDetail(key)); return; }
      printOutput(`no post matching <strong>${arg}</strong>. type <strong>blog</strong> to see the list.`);
      return;
    }

    // shorthand: typing a project or blog slug directly
    if(projectData[lower]){ lastList = 'projects'; printOutput(renderProjectDetail(lower)); return; }
    if(blogData[lower]){ lastList = 'blog'; printOutput(renderBlogDetail(lower)); return; }

    if(outputs[lower]){
      printOutput(outputs[lower]);
      return;
    }

    const suggestion = closestCommand(lower);
    printOutput(
      `command not found: <strong>${lower}</strong>` +
      (suggestion ? ` \u2014 did you mean <strong>${suggestion}</strong>?` : '') +
      ` type <strong>help</strong> to see available commands.`
    );
  }

  let history = [];
  let historyIndex = -1;

  termForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = termInput.value;
    termInput.value = '';
    runCommand(val);
  });

  termInput.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowUp'){
      e.preventDefault();
      if(history.length === 0) return;
      historyIndex = Math.max(0, historyIndex - 1);
      termInput.value = history[historyIndex] || '';
    } else if(e.key === 'ArrowDown'){
      e.preventDefault();
      historyIndex = Math.min(history.length, historyIndex + 1);
      termInput.value = history[historyIndex] || '';
    }
  });

  termBody.addEventListener('click', () => termInput.focus());

  // Resume button routes into terminal command for consistency
  const resumeBtn = document.getElementById('resume-btn');
  if(resumeBtn){
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      runCommand('resume');
      document.getElementById('hero').scrollIntoView({ behavior:'smooth' });
    });
  }
  } // end if(termBody)

  // ---------- Contact form ----------
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
      contactForm.addEventListener("submit", async (e) => {
          e.preventDefault();

          const btn = contactForm.querySelector("button");
          const original = btn.textContent;

          btn.textContent = "$ sending...";
          btn.disabled = true;

          const data = {
              name: document.getElementById("name").value,
              email: document.getElementById("email").value,
              message: document.getElementById("message").value
          };

          try {

              // Email to you
              await emailjs.send(
                  "service_jz6eu4s",
                  "template_811oowb",
                  data
              );

              // Auto reply to visitor
              await emailjs.send(
                  "service_jz6eu4s",
                  "template_ddp1ftp",
                  data
              );

              btn.textContent = "$ message_sent ✓";
              contactForm.reset();

          } catch (err) {
              console.error(err);
              btn.textContent = "$ send_failed";
          }

          setTimeout(() => {
              btn.textContent = original;
              btn.disabled = false;
          }, 2500);
      });
  }
})();

if(typeof emailjs !== 'undefined'){
  emailjs.init({
    publicKey: "eB8xxb_BF0HatBpdm"
  });
}