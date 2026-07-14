(() => {
  const root = document.getElementById("dynamicProductRoot");
  const products = Array.isArray(window.SANDBOX_PRODUCTS) ? window.SANDBOX_PRODUCTS : [];
  if (!root) return;

  const productId = new URLSearchParams(window.location.search).get("id");
  const product = products.find(item => item.id === productId);

  if (!product) {
    root.innerHTML = `<section class="dynamic-product-error section-space"><div class="container"><span class="section-kicker">Product Not Found</span><h1>This product could not be found.</h1><p>Check the product URL or return to the product store.</p><a class="btn primary" href="products.html">Back to Products</a></div></section>`;
    return;
  }

  document.title = `${product.name} | Sandbox Media`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", product.shortDescription);

  const picture = (image, fallback, alt, lazy = true) =>
    `<img src="${image}" data-fallback="${fallback}" alt="${alt}" ${lazy ? 'loading="lazy"' : ""} onerror="if(this.src !== this.dataset.fallback){this.src=this.dataset.fallback;}">`;

  const capabilities = (product.capabilities || []).map((item, index) => `
    <article class="product-feature-block reveal visible">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>`).join("");

  const gallery = (product.gallery || []).map((item, index) => `
    <figure class="product-gallery-item ${index === 0 ? "product-gallery-featured" : ""} reveal visible">
      ${picture(item.image, item.fallback, `${product.name} - ${item.caption}`)}
      <figcaption>${item.caption}</figcaption>
    </figure>`).join("");

  const faq = (product.faq || []).map(item => `
    <article class="faq-item reveal visible">
      <button type="button" aria-expanded="false">${item.question}<span>+</span></button>
      <div class="faq-answer"><p>${item.answer}</p></div>
    </article>`).join("");

  const buyText = product.buyLink && product.buyLink.includes("contact") ? "Request Quote" : "Buy Now";

  root.innerHTML = `
    <section class="single-product-hero">
      <div class="container single-product-hero-grid">
        <div class="single-product-copy reveal visible">
          <div class="single-product-meta"><span>${product.category}</span><b>${product.status}</b></div>
          <h1>${product.name}</h1>
          <p>${product.shortDescription}</p>
          <div class="single-product-actions">
            <a class="btn primary magnetic" href="${product.liveDemo}" target="_blank" rel="noopener">See Live Site <span>↗</span></a>
            <a class="btn secondary magnetic" href="${product.buyLink}" target="_blank" rel="noopener">${buyText}</a>
            <a class="single-product-custom" href="index.html#contact">Request Custom Version</a>
          </div>
          <div class="single-product-note">Demo and payment links are placeholders until you replace them in products-data.js.</div>
        </div>
        <div class="single-product-visual reveal visible">
          <div class="single-product-image-frame">
            ${picture(product.heroImage, product.heroFallback, `${product.name} main dashboard screenshot`, false)}
            <div class="single-product-image-badge">Live Product Preview</div>
          </div>
        </div>
      </div>
    </section>

    <section class="single-product-overview section-space">
      <div class="container">
        <div class="product-description-pro reveal visible">
          <div class="product-description-main">
            <span class="section-kicker">Product Overview</span>
            <h2>${product.name}</h2>
            <p class="product-description-lead">${product.fullDescription}</p>
            <p>This product is designed for businesses that want a cleaner, faster and more organized way to manage everyday work. Important information, actions and reports stay together instead of being spread across disconnected tools.</p>
            <p>Customers can begin with the standard version, request company branding, or choose a fully customized edition with additional modules, workflows and reports.</p>
            <div class="product-description-highlights">
              <article><span>01</span><div><strong>Built for</strong><small>${product.audience}</small></div></article>
              <article><span>02</span><div><strong>Access</strong><small>${product.access}</small></div></article>
              <article><span>03</span><div><strong>Customization</strong><small>${product.customization}</small></div></article>
              <article><span>04</span><div><strong>Support</strong><small>${product.support}</small></div></article>
            </div>
          </div>
          <aside class="product-description-side">
            <h3>What customers receive</h3>
            <ul>
              <li>Product access or deployment files</li>
              <li>Setup instructions and onboarding support</li>
              <li>Admin login and user-role configuration</li>
              <li>Standard updates for the purchased version</li>
              <li>Optional custom branding and feature upgrades</li>
            </ul>
            <a href="#product-gallery">View Product Screenshots <span>↓</span></a>
          </aside>
        </div>
      </div>
    </section>

    <section class="single-product-features section-space">
      <div class="container">
        <div class="single-product-features-heading reveal visible">
          <span class="section-kicker">Key Capabilities</span>
          <h2>Everything customers need to understand the product.</h2>
        </div>
        <div class="single-product-feature-grid">${capabilities}</div>
      </div>
    </section>

    <section class="product-screenshot-gallery section-space" id="product-gallery">
      <div class="container">
        <div class="product-gallery-heading reveal visible">
          <div><span class="section-kicker">Product Screenshots</span><h2>Explore the product interface before you buy.</h2></div>
          <p>Gallery layout is automatic: one large image followed by three balanced rows of two images.</p>
        </div>
        <div class="product-gallery-grid">${gallery}</div>
      </div>
    </section>

    <section class="single-product-pricing section-space">
      <div class="container">
        <div class="single-product-pricing-heading reveal visible">
          <span class="section-kicker">Plans & Purchase</span>
          <h2>Choose standard access or a custom business version.</h2>
        </div>
        <div class="single-product-price-grid">
          <article class="single-price-card reveal visible"><span>Standard</span><h3>Ready-Made Access</h3><p>Use the standard version with core features and regular updates.</p><ul><li>Core features</li><li>Standard dashboard</li><li>Basic support</li><li>Future updates</li></ul><a href="${product.buyLink}" target="_blank" rel="noopener">${buyText} <b>↗</b></a></article>
          <article class="single-price-card featured reveal visible"><span>Business</span><h3>Customized Edition</h3><p>Add your company name, logo, users, fields and workflow preferences.</p><ul><li>Custom branding</li><li>Workflow customization</li><li>Custom reports</li><li>Priority setup</li></ul><a href="index.html#contact">Request Business Quote <b>↗</b></a></article>
          <article class="single-price-card reveal visible"><span>Custom</span><h3>Fully Custom Build</h3><p>Create a new version around your exact process, modules and integrations.</p><ul><li>Custom features</li><li>Custom UI</li><li>Database and integrations</li><li>Deployment support</li></ul><a href="index.html#contact">Discuss Custom Build <b>↗</b></a></article>
        </div>
      </div>
    </section>

    <section class="products-faq section-space">
      <div class="container">
        <div class="products-faq-heading reveal visible"><span class="section-kicker">Product FAQ</span><h2>Questions customers may ask before buying.</h2></div>
        <div class="faq-list">${faq}</div>
      </div>
    </section>

    <section class="related-products section-space">
      <div class="container">
        <div class="related-products-heading reveal visible"><span class="section-kicker">Related Products</span><h2>Explore more tools from Sandbox Media.</h2></div>
        <div class="related-products-grid" id="relatedProductsGrid"></div>
      </div>
    </section>

    <section class="final-cta-v2 section-space">
      <div class="container final-cta-v2-box reveal visible">
        <div><span class="section-kicker">Ready to Explore?</span><h2>Try the live demo or discuss a custom version.</h2><p>We can help you choose the right plan and configure the product for your workflow.</p></div>
        <div class="final-cta-v2-actions"><a class="final-cta-primary magnetic" href="${product.liveDemo}" target="_blank" rel="noopener">See Live Site <span>↗</span></a><a class="final-cta-secondary magnetic" href="index.html#contact">Contact Sandbox Media</a></div>
      </div>
    </section>`;

  const relatedGrid = document.getElementById("relatedProductsGrid");
  if (relatedGrid) {
    relatedGrid.innerHTML = products.filter(item => item.id !== product.id).slice(0, 3).map(item => `
      <article class="related-product-card">
        ${picture(item.cardImage, item.cardFallback, item.name)}
        <div><span>${item.category}</span><h3>${item.name}</h3><a href="product.html?id=${encodeURIComponent(item.id)}">View Details ↗</a></div>
      </article>`).join("");
  }

  document.querySelectorAll(".faq-item button").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(other => {
        other.classList.remove("open");
        other.querySelector("button")?.setAttribute("aria-expanded", "false");
        const otherAnswer = other.querySelector(".faq-answer");
        if (otherAnswer) otherAnswer.style.maxHeight = "0px";
      });
      if (!isOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
})();