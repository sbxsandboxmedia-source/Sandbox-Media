(() => {
  const cases = Array.isArray(window.SANDBOX_CASE_STUDIES) ? window.SANDBOX_CASE_STUDIES : [];
  const grid = document.getElementById("case-study-grid");
  const filters = document.getElementById("portfolioFilters");
  if (!grid || !filters) return;

  let active = "all";

  const picture = item => `<img src="${item.cardImage}" data-fallback="${item.cardFallback}" alt="${item.name} case study preview" loading="lazy" onerror="if(this.src !== this.dataset.fallback){this.src=this.dataset.fallback;}">`;

  function renderFilters() {
    const categories = [...new Set(cases.map(item => item.category))];
    filters.innerHTML = [`<button class="portfolio-filter active" type="button" data-filter="all">All Projects</button>`, ...categories.map(category => `<button class="portfolio-filter" type="button" data-filter="${category}">${category}</button>`)].join("");
    filters.querySelectorAll(".portfolio-filter").forEach(button => {
      button.addEventListener("click", () => {
        filters.querySelectorAll(".portfolio-filter").forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        active = button.dataset.filter;
        applyFilter();
      });
    });
  }

  function renderCases() {
    grid.innerHTML = cases.map(item => `
      <article class="portfolio-case-card reveal visible" data-category="${item.category}">
        <div class="portfolio-case-image">
          ${picture(item)}
          <span>${item.category}</span>
        </div>
        <div class="portfolio-case-content">
          <small>${item.industry}</small>
          <h3>${item.name}</h3>
          <p>${item.summary}</p>
          <div class="portfolio-case-services">${item.services.slice(0,3).map(service => `<span>${service}</span>`).join("")}</div>
          <div class="portfolio-case-actions">
            <a class="portfolio-case-primary" href="case-study.html?id=${encodeURIComponent(item.id)}">View Case Study</a>
            <a class="portfolio-case-secondary" href="${item.liveDemo}" target="_blank" rel="noopener">View Live Sample ↗</a>
          </div>
        </div>
      </article>`).join("");
  }

  function applyFilter() {
    grid.querySelectorAll(".portfolio-case-card").forEach(card => {
      card.classList.toggle("hidden", active !== "all" && card.dataset.category !== active);
    });
  }

  renderFilters();
  renderCases();
})();