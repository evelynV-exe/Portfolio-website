(function(){
  const TWO_WEEKS_MS = 7 * 24 * 60 * 60 * 1000;

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
  const sections = ['about','education','achievements','projects','blog','writeups','skills','experience','contact'];
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
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

    // ---------- Active nav for non-homepage pages ----------
  const currentPage = document.body.dataset.page;
  if(currentPage){
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === currentPage));
  }

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

  // Achievement dates are ISO strings (e.g. "2026-08-21"), so recency can be
  // checked directly — no publishedAt/date fallback needed like blog posts.
  function isRecentAchievement(a){
    if(!a.date) return false;
    const added = Date.parse(a.date);
    return !isNaN(added) && (Date.now() - added) < TWO_WEEKS_MS;
  }

  if(achievementsGridEl && window.achievements){
    const order = (window.achievementOrder || Object.keys(window.achievements))
      .slice()
      .sort((a, b) => (Date.parse(window.achievements[b].date) || 0) - (Date.parse(window.achievements[a].date) || 0));
    const HOMEPAGE_ACHIEVEMENT_COUNT = 3;
    const featured = order.filter(key => window.achievements[key].featured).slice(0, HOMEPAGE_ACHIEVEMENT_COUNT);
    achievementsGridEl.innerHTML = featured.map(key => {
      const a = window.achievements[key];
      const isNew = isRecentAchievement(a);
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
          <h3>${a.title}${isNew ? ' <span class="new-badge">NEW</span>' : ''}</h3>
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
    const HOMEPAGE_PROJECT_COUNT = 3;
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

  function isRecentPost(post){
    if(!post.publishedAt) return false; // no exact date = can't confirm it's within 14 days
    const published = Date.parse(post.publishedAt);
    return !isNaN(published) && (Date.now() - published) < TWO_WEEKS_MS;
  }

  function excerptOf(post){
    // intro strings have soft-wrap whitespace baked in — collapse and trim
    const clean = (post.intro || '').replace(/\s+/g, ' ').trim();
    return clean.length > 140 ? clean.slice(0, 140).trim() + '\u2026' : clean;
  }

  // ---------- Homepage blog list ----------
  const blogListEl = document.getElementById('blog-list');
  if(blogListEl && window.blogPosts){
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

  // ---------- Homepage write-ups list ----------
  // Mirrors the blog list above exactly, but reads from js/writeup_data.js
  // (window.writeups / window.writeupOrder) and links into writeup-post.html.
  const writeupListEl = document.getElementById('writeup-list');
  if(writeupListEl && window.writeups){
    const order = (window.writeupOrder || Object.keys(window.writeups))
      .slice()
      .sort((a, b) => parseBlogDate(window.writeups[b]) - parseBlogDate(window.writeups[a]));

    const HOMEPAGE_WRITEUP_COUNT = 3;
    const recent = order.slice(0, HOMEPAGE_WRITEUP_COUNT);

    writeupListEl.innerHTML = recent.map(key => {
      const p = window.writeups[key];
      const isNew = isRecentPost(p);
      return `
        <a href="writeup-post.html?writeup=${key}" class="blog-item reveal">
          <div class="blog-main">
            <div class="blog-title">${p.title}${isNew ? ' <span class="new-badge">NEW</span>' : ''}</div>
            <div class="blog-excerpt">${excerptOf(p)}</div>
          </div>
          <span class="blog-meta">${p.date} &middot; ${p.read}</span>
          <span class="blog-arrow">&rarr;</span>
        </a>`;
    }).join('');
    writeupListEl.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

})();