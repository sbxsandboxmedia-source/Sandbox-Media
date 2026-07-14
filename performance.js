(() => {
  document.documentElement.classList.add("js");

  const markLoaded = () => document.body?.classList.add("page-ready");
  if (document.readyState === "complete") markLoaded();
  else window.addEventListener("load", markLoaded, { once: true });

  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    const rel = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
    rel.add("noopener");
    rel.add("noreferrer");
    link.setAttribute("rel", [...rel].join(" "));
  });

  if ("connection" in navigator && navigator.connection?.saveData) {
    document.documentElement.classList.add("save-data");
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("content-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "250px 0px" });

    document.querySelectorAll("main section:not(:first-child)").forEach(section => observer.observe(section));
  }
})();