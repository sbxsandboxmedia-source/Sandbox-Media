(() => {
  const posts = Array.isArray(window.SANDBOX_BLOG_POSTS) ? window.SANDBOX_BLOG_POSTS : [];
  const featured = document.getElementById("blogHeroFeatured");
  const categoryWrap = document.getElementById("blogCategoryFilters");
  const grid = document.getElementById("blogCardGrid");
  const heroSearch = document.getElementById("blogHeroSearch");
  const empty = document.getElementById("blogEmptyState");
  const loadMore = document.getElementById("blogLoadMore");
  const popular = document.getElementById("popularArticles");
  const topics = document.getElementById("blogTopicCounts");

  if (!grid || !categoryWrap) return;

  let activeCategory = "all";
  let visibleLimit = 6;

  const image = post => `<img src="${post.coverImage}" data-fallback="${post.coverFallback}" alt="${post.title}" loading="lazy" onerror="if(this.src !== this.dataset.fallback){this.src=this.dataset.fallback;}">`;

  const featuredPost = posts.find(post => post.featured) || posts[0];
  if (featuredPost && featured) {
    featured.innerHTML = `
      <div class="blog-featured-image">${image(featuredPost)}<span>Featured Article</span></div>
      <div class="blog-featured-content">
        <small>${featuredPost.category} • ${featuredPost.readTime}</small>
        <h2>${featuredPost.title}</h2>
        <p>${featuredPost.excerpt}</p>
        <a href="blog-post.html?id=${encodeURIComponent(featuredPost.id)}">Read Featured Article <b>↗</b></a>
      </div>`;
  }

  const categories = [...new Map(posts.map(post => [post.categorySlug, post.category])).entries()];
  categoryWrap.innerHTML = [
    `<button class="blog-category-button active" type="button" data-category="all">All Articles</button>`,
    ...categories.map(([slug, label]) => `<button class="blog-category-button" type="button" data-category="${slug}">${label}</button>`)
  ].join("");

  function articleCard(post) {
    return `
      <article class="blog-card reveal visible">
        <div class="blog-card-image">${image(post)}<span>${post.category}</span></div>
        <div class="blog-card-content">
          <small>${post.dateLabel} • ${post.readTime}</small>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <div class="blog-card-footer">
            <span>${post.author}</span>
            <a href="blog-post.html?id=${encodeURIComponent(post.id)}">Read Article ↗</a>
          </div>
        </div>
      </article>`;
  }

  function filteredPosts() {
    const term = (heroSearch?.value || "").trim().toLowerCase();
    return posts.filter(post => {
      const categoryMatch = activeCategory === "all" || post.categorySlug === activeCategory;
      const searchText = `${post.title} ${post.category} ${post.excerpt}`.toLowerCase();
      return categoryMatch && (!term || searchText.includes(term));
    });
  }

  function renderPosts() {
    const matches = filteredPosts();
    const shown = matches.slice(0, visibleLimit);
    grid.innerHTML = shown.map(articleCard).join("");
    empty?.classList.toggle("show", matches.length === 0);
    if (loadMore) {
      loadMore.style.display = matches.length > visibleLimit ? "inline-flex" : "none";
    }
  }

  categoryWrap.querySelectorAll(".blog-category-button").forEach(button => {
    button.addEventListener("click", () => {
      categoryWrap.querySelectorAll(".blog-category-button").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      activeCategory = button.dataset.category || "all";
      visibleLimit = 6;
      renderPosts();
    });
  });

  heroSearch?.addEventListener("input", () => {
    visibleLimit = 6;
    renderPosts();
    document.querySelector(".blog-library")?.scrollIntoView({behavior:"smooth", block:"start"});
  });

  loadMore?.addEventListener("click", () => {
    visibleLimit += 6;
    renderPosts();
  });

  if (popular) {
    popular.innerHTML = posts.filter(post => post.popular).slice(0,5).map((post,index) => `
      <a href="blog-post.html?id=${encodeURIComponent(post.id)}">
        <span>${String(index+1).padStart(2,"0")}</span>
        <div><strong>${post.title}</strong><small>${post.readTime}</small></div>
      </a>`).join("");
  }

  if (topics) {
    topics.innerHTML = categories.map(([slug,label]) => {
      const count = posts.filter(post => post.categorySlug === slug).length;
      return `<button type="button" data-topic="${slug}"><span>${label}</span><b>${count}</b></button>`;
    }).join("");

    topics.querySelectorAll("[data-topic]").forEach(button => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.topic;
        visibleLimit = 6;
        categoryWrap.querySelectorAll(".blog-category-button").forEach(item => {
          item.classList.toggle("active", item.dataset.category === activeCategory);
        });
        renderPosts();
        document.querySelector(".blog-library")?.scrollIntoView({behavior:"smooth"});
      });
    });
  }

  document.getElementById("newsletterForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const message = document.getElementById("newsletterMessage");
    if (message) message.textContent = "Thank you. Connect Mailchimp, Brevo or another email platform before launch.";
    event.currentTarget.reset();
  });

  renderPosts();
})();