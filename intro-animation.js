(() => {
  const intro = document.getElementById("siteIntro");
  if (!intro) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isHome = /(^|\/)(index\.html)?$/.test(window.location.pathname) || window.location.protocol === "file:";
  const alreadyShown = sessionStorage.getItem("sandboxIntroShown") === "true";

  // Show on homepage only, once per browser session.
  if (!isHome || alreadyShown) {
    intro.remove();
    document.documentElement.classList.add("intro-skipped");
    return;
  }

  sessionStorage.setItem("sandboxIntroShown", "true");
  document.documentElement.classList.add("intro-running");

  const finish = () => {
    intro.classList.add("intro-exit");
    window.setTimeout(() => {
      intro.remove();
      document.documentElement.classList.remove("intro-running");
      document.documentElement.classList.add("intro-complete");
    }, reduceMotion ? 150 : 950);
  };

  if (reduceMotion) {
    window.setTimeout(finish, 250);
    return;
  }

  window.addEventListener("load", () => {
    window.setTimeout(finish, 1600);
  }, { once: true });

  // Safety fallback so the website can never remain blocked.
  window.setTimeout(finish, 3600);
})();
