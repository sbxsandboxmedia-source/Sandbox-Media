const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '✕' : '☰';
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('active'));
}

// Safety fallback: content must never remain invisible if an observer is delayed.
window.setTimeout(() => {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('active'));
}, 700);

document.querySelectorAll('.magnetic').forEach((element) => {
  element.addEventListener('mousemove', (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    element.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
  });
  element.addEventListener('mouseleave', () => {
    element.style.transform = '';
  });
});

const cursorGlow = document.getElementById('cursorGlow');
const homeHero = document.querySelector('.hero');
if (cursorGlow && homeHero) {
  homeHero.addEventListener('mousemove', (event) => {
    const rect = homeHero.getBoundingClientRect();
    cursorGlow.style.left = `${event.clientX - rect.left}px`;
    cursorGlow.style.top = `${event.clientY - rect.top}px`;
  });
}

const homeHeroVisual = document.getElementById('heroVisual');
if (homeHeroVisual) {
  homeHeroVisual.addEventListener('mousemove', (event) => {
    if (window.innerWidth < 1180) return;
    const rect = homeHeroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    homeHeroVisual.style.transform = `perspective(1200px) rotateY(${x * 4}deg) rotateX(${y * -4}deg)`;
  });
  homeHeroVisual.addEventListener('mouseleave', () => {
    homeHeroVisual.style.transform = '';
  });
}

const impactNumbers = document.querySelectorAll('[data-impact]');
if (impactNumbers.length && 'IntersectionObserver' in window) {
  const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.impact);
      const suffix = element.dataset.suffix || '';
      let value = 0;
      const step = Math.max(1, Math.ceil(target / 45));
      const timer = window.setInterval(() => {
        value += step;
        if (value >= target) {
          element.textContent = `${target}${suffix}`;
          window.clearInterval(timer);
        } else {
          element.textContent = `${value}${suffix}`;
        }
      }, 24);
      impactObserver.unobserve(element);
    });
  }, { threshold: 0.45 });

  impactNumbers.forEach((element) => impactObserver.observe(element));
}

const reviewsTrack = document.getElementById('reviewsTrack');
const reviewCards = document.querySelectorAll('.review-v2-card');
const reviewPrev = document.getElementById('reviewPrev');
const reviewNext = document.getElementById('reviewNext');
const reviewDots = document.getElementById('reviewDots');
let reviewIndex = 0;

function reviewVisibleCount() {
  if (window.innerWidth <= 780) return 1;
  if (window.innerWidth <= 1100) return 2;
  return 3;
}

function reviewMaxIndex() {
  return Math.max(0, reviewCards.length - reviewVisibleCount());
}

function buildReviewDots() {
  if (!reviewDots || !reviewCards.length) return;
  reviewDots.innerHTML = '';
  for (let index = 0; index <= reviewMaxIndex(); index += 1) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to review ${index + 1}`);
    if (index === reviewIndex) dot.classList.add('active');
    dot.addEventListener('click', () => {
      reviewIndex = index;
      updateReviews();
    });
    reviewDots.appendChild(dot);
  }
}

function updateReviews() {
  if (!reviewsTrack || !reviewCards.length) return;
  const gap = 18;
  const cardWidth = reviewCards[0].getBoundingClientRect().width;
  reviewIndex = Math.min(reviewIndex, reviewMaxIndex());
  reviewsTrack.style.transform = `translateX(-${reviewIndex * (cardWidth + gap)}px)`;
  buildReviewDots();
}

if (reviewPrev) {
  reviewPrev.addEventListener('click', () => {
    reviewIndex = Math.max(0, reviewIndex - 1);
    updateReviews();
  });
}
if (reviewNext) {
  reviewNext.addEventListener('click', () => {
    reviewIndex = Math.min(reviewMaxIndex(), reviewIndex + 1);
    updateReviews();
  });
}
if (reviewsTrack) {
  window.addEventListener('resize', updateReviews);
  buildReviewDots();
}

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const answer = item ? item.querySelector('.faq-answer') : null;
    if (!item || !answer) return;
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach((other) => {
      other.classList.remove('open');
      const otherButton = other.querySelector('button');
      const otherAnswer = other.querySelector('.faq-answer');
      if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
      if (otherAnswer) otherAnswer.style.maxHeight = '0px';
    });

    if (!isOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

const productSearch=document.getElementById("productSearch");
const productFilters=document.querySelectorAll(".product-filter");
const storeProductCards=document.querySelectorAll(".store-product-card");
const productEmptyState=document.getElementById("productEmptyState");
let activeProductFilter="all";

function updateProductStore(){
  if(!storeProductCards.length)return;
  const term=(productSearch?.value||"").trim().toLowerCase();
  let visible=0;

  storeProductCards.forEach(card=>{
    const category=card.dataset.productCategory||"";
    const searchText=(card.dataset.productSearch||"").toLowerCase();
    const categoryMatch=activeProductFilter==="all"||category===activeProductFilter;
    const textMatch=!term||searchText.includes(term)||card.textContent.toLowerCase().includes(term);
    const show=categoryMatch&&textMatch;
    card.classList.toggle("hidden",!show);
    if(show)visible++;
  });

  if(productEmptyState)productEmptyState.classList.toggle("show",visible===0);
}

productFilters.forEach(button=>{
  button.addEventListener("click",()=>{
    productFilters.forEach(item=>item.classList.remove("active"));
    button.classList.add("active");
    activeProductFilter=button.dataset.productFilter||"all";
    updateProductStore();
  });
});

if(productSearch)productSearch.addEventListener("input",updateProductStore);
