(() => {
  // Keyboard-visible focus handling
  document.addEventListener("keydown", e => {
    if (e.key === "Tab") document.documentElement.classList.add("keyboard-nav");
  });
  document.addEventListener("mousedown", () => {
    document.documentElement.classList.remove("keyboard-nav");
  });

  // Ensure mobile menu closes on Escape and focus returns to toggle
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && nav && nav.classList.contains("open")) {
      nav.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
      toggle?.focus();
    }
  });

  // Add current-page indication when active class exists
  document.querySelectorAll(".nav-links a.active").forEach(link => {
    link.setAttribute("aria-current", "page");
  });

  // External links open safely
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    const rel = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
    rel.add("noopener");
    rel.add("noreferrer");
    link.setAttribute("rel", [...rel].join(" "));
  });
})();