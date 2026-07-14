(() => {
  const products = Array.isArray(window.SANDBOX_PRODUCTS) ? window.SANDBOX_PRODUCTS : [];
  const grid = document.getElementById("productGrid");
  const filtersWrap = document.getElementById("productFilters");
  const searchInput = document.getElementById("productSearch");
  const emptyState = document.getElementById("productEmptyState");
  const panelList = document.getElementById("storePanelList");
  if (!grid || !filtersWrap) return;

  let activeFilter = "all";

  function picture(product) {
    const fallback = product.cardFallback || product.cardImage;
    return `<img src="${product.cardImage}" data-fallback="${fallback}" alt="${product.name} dashboard preview" loading="lazy" onerror="if(this.src !== this.dataset.fallback){this.src=this.dataset.fallback;}">`;
  }

  function safeHref(url) {
    return typeof url === "string" && url.trim() ? url : "#";
  }

  function cardMarkup(product) {
    const buyText = product.buyLink && product.buyLink.includes("contact") ? "Buy / Request Quote" : "Buy Now";
    const searchText = [
      product.name,
      product.category,
      product.shortDescription,
      product.searchKeywords,
      ...(product.features || [])
    ].join(" ").toLowerCase();

    return `
      <article class="store-product-card reveal visible" data-product-category="${product.categorySlug}" data-product-search="${searchText}">
        <div class="store-product-visual product-image-slot">
          ${picture(product)}
          <span class="store-status ${product.statusClass || ""}">${product.status}</span>
        </div>
        <div class="store-product-content">
          <span class="store-product-category">${product.category}</span>
          <h3>${product.name}</h3>
          <p>${product.shortDescription}</p>
          <div class="store-product-price">
            <small>${product.priceLabel || "Starting from"}</small>
            <strong>${product.price || "Price on Request"}</strong>
          </div>
          <div class="store-product-actions">
            <a class="store-btn primary" href="product.html?id=${encodeURIComponent(product.id)}">View Details</a>
            <a class="store-btn secondary" href="${safeHref(product.liveDemo)}" target="_blank" rel="noopener">Live Demo ↗</a>
            <a class="store-btn ghost" href="${safeHref(product.buyLink)}" target="_blank" rel="noopener">${buyText}</a>
          </div>
        </div>
      </article>`;
  }

  function renderFilters() {
    const categories = [...new Map(products.map(p => [p.categorySlug, p.category])).entries()];
    filtersWrap.innerHTML = [
      `<button class="product-filter active" type="button" data-product-filter="all">All</button>`,
      ...categories.map(([slug, label]) => `<button class="product-filter" type="button" data-product-filter="${slug}">${label}</button>`)
    ].join("");

    filtersWrap.querySelectorAll(".product-filter").forEach(button => {
      button.addEventListener("click", () => {
        filtersWrap.querySelectorAll(".product-filter").forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        activeFilter = button.dataset.productFilter || "all";
        applyFilters();
      });
    });
  }

  function renderPanel() {
    if (!panelList) return;
    panelList.innerHTML = products.slice(0, 3).map(product => `
      <article>
        <div class="spl-icon">${product.category === "Finance" ? "₹" : product.category === "Operations" ? "⬡" : "⏱"}</div>
        <div><strong>${product.name}</strong><small>${product.category}</small></div>
        <span>${product.status}</span>
      </article>`).join("");
  }

  function applyFilters() {
    const term = (searchInput?.value || "").trim().toLowerCase();
    let visible = 0;
    grid.querySelectorAll(".store-product-card").forEach(card => {
      const categoryMatch = activeFilter === "all" || card.dataset.productCategory === activeFilter;
      const textMatch = !term || (card.dataset.productSearch || "").includes(term);
      const show = categoryMatch && textMatch;
      card.classList.toggle("hidden", !show);
      if (show) visible++;
    });
    emptyState?.classList.toggle("show", visible === 0);
  }

  grid.innerHTML = products.map(cardMarkup).join("");
  renderFilters();
  renderPanel();
  searchInput?.addEventListener("input", applyFilters);
  applyFilters();
})();