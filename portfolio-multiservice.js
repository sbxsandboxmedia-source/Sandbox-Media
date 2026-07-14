(() => {
  const work = Array.isArray(window.SANDBOX_PORTFOLIO_WORK) ? window.SANDBOX_PORTFOLIO_WORK : [];
  const cases = Array.isArray(window.SANDBOX_CASE_STUDIES) ? window.SANDBOX_CASE_STUDIES : [];
  const root = document.getElementById("portfolio-sections");
  const nav = document.getElementById("portfolioCategoryNav");
  const featured = document.getElementById("featuredCaseStudies");
  if (!root || !nav || !featured) return;

  const sections = [
    {slug:"website", title:"Website & Ecommerce", eyebrow:"Website Design", description:"Premium websites and ecommerce experiences designed around clarity, trust and conversion."},
    {slug:"branding", title:"Branding & Identity", eyebrow:"Brand Systems", description:"Logo systems, visual identity, typography, color direction and branded applications."},
    {slug:"graphics", title:"Graphic Design", eyebrow:"Creative Design", description:"Social posts, ads, packaging, brochures, thumbnails, presentations and print collateral."},
    {slug:"social", title:"Social Media Campaigns", eyebrow:"Content & Campaigns", description:"Campaign direction, content grids, reels covers and platform-ready creative systems."},
    {slug:"seo", title:"SEO Case Studies", eyebrow:"Search Growth", description:"Technical SEO, content structure, local visibility and organic-growth work."},
    {slug:"video", title:"Video Editing", eyebrow:"Motion & Storytelling", description:"Reels, product videos, promotional edits, ads and motion-graphics samples."},
    {slug:"systems", title:"Digital Systems", eyebrow:"Products & Platforms", description:"Dashboards, internal tools and business-management systems designed around real workflows."}
  ];

  const image = item => `<img src="${item.image}" data-fallback="${item.fallback}" alt="${item.title} portfolio preview" loading="lazy" onerror="if(this.src !== this.dataset.fallback){this.src=this.dataset.fallback;}">`;

  nav.innerHTML = sections.map(s => `<a href="#${s.slug}-section">${s.title}</a>`).join("");

  const featuredIds = ["sia-jewels","sagar-offshore","tooth-fairy","business-os"];
  featured.innerHTML = featuredIds.map(id => {
    const item = work.find(w => w.id === id);
    if (!item) return "";
    return `
      <article class="featured-work-card reveal visible">
        <div class="featured-work-image">${image(item)}<span>${item.service}</span></div>
        <div class="featured-work-content">
          <small>${item.industry}</small>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          <div class="featured-work-actions">
            <a href="case-study.html?id=${encodeURIComponent(item.caseId)}">View Full Case Study</a>
            <a href="${item.live}" target="_blank" rel="noopener">View Live Sample ↗</a>
          </div>
        </div>
      </article>`;
  }).join("");

  function standardCard(item) {
    const primary = item.format === "case-study"
      ? `<a href="case-study.html?id=${encodeURIComponent(item.caseId)}">View Case Study</a>`
      : `<button type="button" class="portfolio-preview-btn" data-preview="${item.id}">View Work</button>`;
    const secondary = item.live ? `<a href="${item.live}" target="_blank" rel="noopener">Live Sample ↗</a>` : "";
    return `
      <article class="multi-work-card reveal visible" data-work-id="${item.id}">
        <div class="multi-work-image">${image(item)}<span>${item.service}</span></div>
        <div class="multi-work-content">
          <small>${item.industry}</small>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          <div class="multi-work-actions">${primary}${secondary}</div>
        </div>
      </article>`;
  }

  function seoCard(item) {
    return `
      <article class="seo-work-card reveal visible">
        <div class="seo-work-top"><span>${item.industry}</span><b>SEO</b></div>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <div class="seo-metrics">${(item.metrics||[]).map(metric => `<strong>${metric}</strong>`).join("")}</div>
        <button type="button" class="portfolio-preview-btn" data-preview="${item.id}">View SEO Case</button>
      </article>`;
  }

  function videoCard(item) {
    return `
      <article class="video-work-card reveal visible" data-work-id="${item.id}">
        <div class="video-work-image">${image(item)}<span class="video-play">▶</span></div>
        <div class="video-work-content"><small>${item.industry}</small><h3>${item.title}</h3><p>${item.summary}</p><button type="button" class="portfolio-preview-btn" data-preview="${item.id}">Watch Sample</button></div>
      </article>`;
  }

  root.innerHTML = sections.map(section => {
    const items = work.filter(item => item.serviceSlug === section.slug);
    const cards = items.map(item => item.format === "seo" ? seoCard(item) : item.format === "video" ? videoCard(item) : standardCard(item)).join("");
    return `
      <section class="service-portfolio-section section-space" id="${section.slug}-section">
        <div class="container">
          <div class="portfolio-section-heading reveal visible">
            <div><span class="section-kicker">${section.eyebrow}</span><h2>${section.title}</h2></div>
            <p>${section.description}</p>
          </div>
          <div class="${section.slug === "seo" ? "seo-work-grid" : section.slug === "video" ? "video-work-grid" : "multi-work-grid"}">${cards}</div>
        </div>
      </section>`;
  }).join("");

  const modal = document.createElement("div");
  modal.className = "portfolio-preview-modal";
  modal.innerHTML = `<div class="portfolio-preview-dialog"><button class="portfolio-preview-close" aria-label="Close preview">×</button><div id="portfolioPreviewContent"></div></div>`;
  document.body.appendChild(modal);

  function openPreview(id) {
    const item = work.find(w => w.id === id);
    if (!item) return;

    const baseFolder = item.image.substring(0, item.image.lastIndexOf("/"));
    const gallery = Array.from({ length: 7 }, (_, index) => {
      const number = index + 1;
      return {
        image: `${baseFolder}/${item.id}-gallery-${number}.webp`,
        fallback: item.fallback,
        caption: number === 1 ? "Main Project Presentation" : `Project Visual ${number}`
      };
    });

    const galleryImage = entry => `
      <figure class="portfolio-gallery-item">
        <img src="${entry.image}" data-fallback="${entry.fallback}" alt="${item.title} - ${entry.caption}" loading="lazy"
          onerror="if(this.src !== this.dataset.fallback){this.src=this.dataset.fallback;}">
        <figcaption>${entry.caption}</figcaption>
      </figure>`;

    document.getElementById("portfolioPreviewContent").innerHTML = `
      <div class="portfolio-modal-header">
        <div>
          <span>${item.service}</span>
          <h2>${item.title}</h2>
          <p>${item.summary}</p>
        </div>
        <div class="portfolio-modal-facts">
          <div><small>Industry</small><strong>${item.industry}</strong></div>
          <div><small>Work Type</small><strong>${item.format === "gallery" ? "Creative Gallery" : "Portfolio Showcase"}</strong></div>
        </div>
      </div>

      <div class="portfolio-gallery-showcase">
        <div class="portfolio-gallery-large">${galleryImage(gallery[0])}</div>
        <div class="portfolio-gallery-grid">
          ${gallery.slice(1).map(galleryImage).join("")}
        </div>
      </div>

      <div class="portfolio-modal-bottom">
        <div>
          <span class="section-kicker">Project Overview</span>
          <h3>Project presentation and creative applications.</h3>
          <p>The gallery highlights the main project presentation followed by supporting applications, campaign assets, interface screens and other relevant deliverables.</p>
        </div>
        <p class="portfolio-modal-note">Selected work is presented with appropriate client privacy and confidentiality safeguards.</p>
      </div>`;

    modal.classList.add("open");
    modal.scrollTop = 0;
    document.body.style.overflow = "hidden";
  }

  function closePreview() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-preview]");
    if (btn) openPreview(btn.dataset.preview);
    if (e.target.closest(".portfolio-preview-close") || e.target === modal) {
      closePreview();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closePreview();
    }
  });
})();