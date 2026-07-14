(() => {
  const root = document.getElementById("caseStudyRoot");
  const cases = Array.isArray(window.SANDBOX_CASE_STUDIES) ? window.SANDBOX_CASE_STUDIES : [];
  if (!root) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const item = cases.find(entry => entry.id === id);

  if (!item) {
    root.innerHTML = `<section class="dynamic-product-error section-space"><div class="container"><span class="section-kicker">Case Study Not Found</span><h1>This case study could not be found.</h1><a class="btn primary" href="portfolio.html">Back to Portfolio</a></div></section>`;
    return;
  }

  document.title = `${item.name} Case Study | Sandbox Media`;

  const img = (src, fallback, alt, lazy = true) => `<img src="${src}" data-fallback="${fallback}" alt="${alt}" ${lazy ? 'loading="lazy"' : ''} onerror="if(this.src !== this.dataset.fallback){this.src=this.dataset.fallback;}">`;

  root.innerHTML = `
    <section class="case-hero">
      <div class="container case-hero-grid">
        <div class="case-hero-copy reveal visible">
          <div class="case-meta"><span>${item.category}</span><b>${item.industry}</b></div>
          <h1>${item.name}</h1>
          <p>${item.summary}</p>
          <div class="case-hero-actions">
            <a class="btn primary magnetic" href="${item.liveDemo}" target="_blank" rel="noopener">View Live Sample <span>↗</span></a>
            <a class="btn secondary magnetic" href="#case-overview">Read Full Case Study</a>
          </div>
          <div class="case-privacy-disclaimer">To protect client privacy, this link opens a representative sample or demo of our work rather than the client’s production website.</div>
        </div>
        <div class="case-hero-image reveal visible">
          ${img(item.heroImage, item.heroFallback, `${item.name} case study hero`, false)}
        </div>
      </div>
    </section>

    <section class="case-overview section-space" id="case-overview">
      <div class="container">
        <div class="case-overview-intro reveal visible">
          <span class="section-kicker">Project Context</span>
          <h2>Understanding the problem before designing the solution.</h2>
          <p>Every strong project begins with clarity around the business, audience, user journey and the outcome the experience needs to create.</p>
        </div>

        <div class="case-overview-premium">
          <article class="case-story-card challenge-card reveal visible">
            <div class="case-story-number">01</div>
            <div class="case-story-copy">
              <span class="case-story-label">The Challenge</span>
              <h3>What the project needed to solve.</h3>
              <p>${item.challenge}</p>
            </div>
          </article>

          <div class="case-story-connector reveal visible">
            <span>Research</span>
            <i></i>
            <strong>Strategy</strong>
            <i></i>
            <span>Execution</span>
          </div>

          <article class="case-story-card solution-card reveal visible">
            <div class="case-story-number">02</div>
            <div class="case-story-copy">
              <span class="case-story-label">Our Solution</span>
              <h3>How we approached the experience.</h3>
              <p>${item.solution}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="case-delivery section-space">
      <div class="container">
        <div class="case-delivery-heading reveal visible">
          <span class="section-kicker">Project Delivery</span>
          <h2>Strategy, design and execution working together.</h2>
        </div>
        <div class="case-delivery-grid">
          <article class="reveal visible"><span>01</span><h3>Discovery</h3><p>We reviewed the business, audience, project goals and user journey.</p></article>
          <article class="reveal visible"><span>02</span><h3>Structure</h3><p>We organized pages, content and conversion paths around the main business priorities.</p></article>
          <article class="reveal visible"><span>03</span><h3>Design</h3><p>We created a clean visual system with responsive layouts and premium presentation.</p></article>
          <article class="reveal visible"><span>04</span><h3>Build</h3><p>We implemented the experience with performance, usability and technical SEO in mind.</p></article>
        </div>
      </div>
    </section>

    <section class="case-gallery section-space">
      <div class="container">
        <div class="case-gallery-heading reveal visible">
          <div><span class="section-kicker">Project Gallery</span><h2>A closer look at the final experience.</h2></div>
          <p>Replace these placeholders with the real or approved sample project images listed in README.</p>
        </div>
        <div class="case-gallery-grid">
          ${item.gallery.map((image,index) => `<figure class="case-gallery-item ${index===0 ? 'case-gallery-featured' : ''} reveal visible">${img(image.image,image.fallback,`${item.name} - ${image.caption}`)}<figcaption>${image.caption}</figcaption></figure>`).join("")}
        </div>
      </div>
    </section>

    <section class="case-results section-space">
      <div class="container case-results-box reveal visible">
        <div>
          <span class="section-kicker">Project Outcome</span>
          <h2>What the final experience was designed to improve.</h2>
        </div>
        <div class="case-results-list">${item.results.map((result,index) => `<article><span>${String(index+1).padStart(2,'0')}</span><strong>${result}</strong></article>`).join("")}</div>
      </div>
    </section>

    <section class="case-services section-space">
      <div class="container">
        <div class="case-services-layout">
          <div class="case-services-heading reveal visible">
            <span class="section-kicker">Services Delivered</span>
            <h2>Capabilities combined to deliver the final experience.</h2>
            <p>The project brought together strategy, interface design, technical planning and execution. Each capability supported a specific part of the customer journey and business goal.</p>
          </div>

          <div class="case-services-panel reveal visible">
            <div class="case-services-panel-top">
              <span>Project Capability Stack</span>
              <b>${item.services.length} Services</b>
            </div>
            <div class="case-services-grid">${item.services.map((service,index) => `<article><span>${String(index+1).padStart(2,'0')}</span><strong>${service}</strong></article>`).join("")}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="final-cta-v2 section-space">
      <div class="container final-cta-v2-box reveal visible">
        <div><span class="section-kicker">Build Your Project</span><h2>Need a similar website, platform or digital system?</h2><p>Tell us about your goals and we will recommend the right approach.</p></div>
        <div class="final-cta-v2-actions"><a class="final-cta-primary magnetic" href="https://wa.me/919000000000" target="_blank" rel="noopener">Start a Conversation <span>↗</span></a><a class="final-cta-secondary magnetic" href="portfolio.html">View More Work</a></div>
      </div>
    </section>`;
})();