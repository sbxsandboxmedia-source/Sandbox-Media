(() => {
  const root = document.getElementById("blogPostRoot");
  const posts = Array.isArray(window.SANDBOX_BLOG_POSTS) ? window.SANDBOX_BLOG_POSTS : [];
  if (!root) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const post = posts.find(item => item.id === id);

  if (!post) {
    root.innerHTML = `<section class="dynamic-product-error section-space"><div class="container"><span class="section-kicker">Article Not Found</span><h1>This article could not be found.</h1><a class="btn primary" href="blog.html">Back to Blog</a></div></section>`;
    return;
  }

  document.title = `${post.title} | Sandbox Media`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", post.excerpt);

  const image = (src,fallback,alt,lazy=true) => `<img src="${src}" data-fallback="${fallback}" alt="${alt}" ${lazy ? 'loading="lazy"' : ''} onerror="if(this.src !== this.dataset.fallback){this.src=this.dataset.fallback;}">`;

  const articleSections = post.sections.map((section,index) => `
    <section id="article-section-${index+1}">
      <h2>${section.heading}</h2>
      <p>${section.text}</p>
      ${index === 1 ? `<figure class="article-inline-image">${image(post.contentImage1,post.contentImage1Fallback,`${post.title} supporting visual`)}<figcaption>Supporting visual for this article.</figcaption></figure>` : ""}
      ${index === 2 ? `<div class="article-checklist"><strong>Practical review points</strong><ul><li>Clear objective and audience</li><li>Consistent brand presentation</li><li>Mobile-first experience</li><li>Technical and SEO foundation</li><li>Strong call to action</li></ul></div>` : ""}
      ${index === 3 ? `<blockquote>Good digital work feels simple because the thinking behind it is clear.</blockquote>` : ""}
    </section>`).join("");

  const faq = post.faq.map(item => `
    <article class="faq-item">
      <button type="button" aria-expanded="false">${item.question}<span>+</span></button>
      <div class="faq-answer"><p>${item.answer}</p></div>
    </article>`).join("");

  root.innerHTML = `
    <article>
      <section class="article-hero">
        <div class="container article-hero-inner">
          <div class="article-breadcrumb"><a href="blog.html">Blog</a><span>›</span><b>${post.category}</b></div>
          <span class="section-kicker">${post.category}</span>
          <h1>${post.title}</h1>
          <p>${post.excerpt}</p>
          <div class="article-meta">
            <span>${post.author}</span>
            <span>${post.dateLabel}</span>
            <span>${post.readTime}</span>
          </div>
        </div>
      </section>

      <section class="article-cover">
        <div class="container">${image(post.coverImage,post.coverFallback,post.title,false)}</div>
      </section>

      <section class="article-body-section section-space">
        <div class="container article-layout">
          <aside class="article-toc">
            <span>Table of Contents</span>
            ${post.toc.map((item,index) => `<a href="#article-section-${index+1}">${String(index+1).padStart(2,"0")} ${item}</a>`).join("")}
            <div class="article-share">
              <strong>Share Article</strong>
              <button type="button" data-share="whatsapp">WhatsApp</button>
              <button type="button" data-share="linkedin">LinkedIn</button>
              <button type="button" data-share="copy">Copy Link</button>
            </div>
          </aside>

          <div class="article-content">
            ${articleSections}

            <div class="article-author-box">
              <img src="assets/logos/sandbox-logo.png" alt="Sandbox Media logo">
              <div><span>Written by</span><h3>Sandbox Media</h3><p>Strategy-led digital agency helping businesses with websites, branding, SEO, content, video and business systems.</p></div>
            </div>

            <section class="article-faq">
              <span class="section-kicker">Article FAQ</span>
              <h2>Common questions about this topic.</h2>
              <div class="faq-list">${faq}</div>
            </section>
          </div>
        </div>
      </section>

      <section class="article-related section-space">
        <div class="container">
          <div class="article-related-heading"><span class="section-kicker">Related Articles</span><h2>Continue learning.</h2></div>
          <div class="article-related-grid" id="relatedBlogPosts"></div>
        </div>
      </section>

      <section class="final-cta-v2 section-space">
        <div class="container final-cta-v2-box">
          <div><span class="section-kicker">Need Expert Support?</span><h2>Let’s apply the right strategy to your business.</h2><p>Discuss your website, brand, SEO, marketing or digital-system requirement.</p></div>
          <div class="final-cta-v2-actions"><a class="final-cta-primary" href="contact.html">Book Consultation <span>↗</span></a><a class="final-cta-secondary" href="services.html">View Services</a></div>
        </div>
      </section>
    </article>`;

  const related = document.getElementById("relatedBlogPosts");
  if (related) {
    related.innerHTML = posts.filter(item => item.id !== post.id).slice(0,3).map(item => `
      <article>
        ${image(item.coverImage,item.coverFallback,item.title)}
        <div><span>${item.category}</span><h3>${item.title}</h3><a href="blog-post.html?id=${encodeURIComponent(item.id)}">Read Article ↗</a></div>
      </article>`).join("");
  }

  document.querySelectorAll(".article-faq .faq-item button").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".article-faq .faq-item").forEach(other => {
        other.classList.remove("open");
        other.querySelector("button")?.setAttribute("aria-expanded","false");
        const otherAnswer = other.querySelector(".faq-answer");
        if (otherAnswer) otherAnswer.style.maxHeight = "0px";
      });
      if (!isOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded","true");
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  document.querySelectorAll("[data-share]").forEach(button => {
    button.addEventListener("click", async () => {
      const url = window.location.href;
      const title = post.title;
      if (button.dataset.share === "whatsapp") window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,"_blank");
      if (button.dataset.share === "linkedin") window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,"_blank");
      if (button.dataset.share === "copy") {
        try {
          await navigator.clipboard.writeText(url);
          button.textContent = "Copied";
        } catch {
          window.prompt("Copy this link:",url);
        }
      }
    });
  });
})();