'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * PRELOADER
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
  try {
    if (preloader && preloader.classList) preloader.classList.add("loaded");
  } catch (err) {
    console.warn('preloader handling failed:', err);
  }
  try {
    if (document && document.body && document.body.classList) document.body.classList.add("loaded");
  } catch (err) {
    console.warn('failed to add body.loaded:', err);
  }
});

// Load JSON data and render dynamic sections before initializing sliders
const fetchJSON = async (path) => {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

const renderPortfolio = (items) => {
  const container = document.querySelector('[data-slider-container]');
  if (!container || !Array.isArray(items)) return;
  container.innerHTML = '';
  
  const badges = [
    { icon: "🚑", title: "~25% Faster", sub: "Emergency Navigation", grad: "linear-gradient(135deg, hsl(0, 75%, 55%), hsl(30, 90%, 55%))" },
    { icon: "🏆", title: "SSC25 Winner", sub: "Swift Student Challenge 2025", grad: "linear-gradient(135deg, hsl(210, 80%, 55%), hsl(260, 70%, 60%))" },
    { icon: "🚢", title: "Smart Ticketing", sub: "Maritime Services", grad: "linear-gradient(135deg, hsl(200, 80%, 50%), hsl(170, 70%, 45%))" },
    { icon: "🤖", title: "10+ AI Agents", sub: "Intelligent Ecosystem", grad: "linear-gradient(135deg, hsl(150, 80%, 50%), hsl(190, 70%, 45%))" },
    { icon: "📱", title: "Mobile-First UI", sub: "Fully Responsive Layouts", grad: "linear-gradient(135deg, hsl(280, 80%, 55%), hsl(320, 70%, 50%))" },
    { icon: "📊", title: "Interactive BI", sub: "Data Visualization", grad: "linear-gradient(135deg, hsl(30, 85%, 50%), hsl(10, 70%, 45%))" }
  ];

  items.forEach((item, idx) => {
    const badge = badges[idx] || { icon: "📁", title: "Project", sub: "Detail", grad: "linear-gradient(135deg, #333, #555)" };
    const li = document.createElement('li');
    li.className = 'slider-item reveal';
    li.setAttribute('data-slider-item', '');
    
    li.innerHTML = `
      <div class="portfolio-card img-holder" style="--width: 800; --height: 600; border-radius: 24px;">
        <img src="${item.image}" width="800" height="600" loading="lazy" alt="${item.title}" class="img-cover">
        
        <div class="portfolio-card__badge-overlay">
          <div class="portfolio-card__badge-icon" style="background: ${badge.grad};">${badge.icon}</div>
          <div class="portfolio-card__badge-text">
            <span class="portfolio-card__badge-title">${badge.title}</span>
            <span class="portfolio-card__badge-sub">${badge.sub}</span>
          </div>
        </div>

        <a href="${item.link}" class="layer-link"></a>
      </div>
    `;
    container.appendChild(li);
  });
}

const renderList = (selector, items, type) => {
  const container = document.querySelector(selector);
  if (!container || !Array.isArray(items)) return;
  container.innerHTML = '';
  items.forEach(entry => {
    const li = document.createElement('li');
    li.className = 'timeline-card reveal';
    if (type === 'education') {
      li.innerHTML = `<div class="progress-wrapper"><p class="progress-label" style="font-size: 1.2rem; font-weight: 700;">${entry.school}</p></div><p class="card-text" style="margin-top:10px;"><strong>${entry.major}</strong></p><p class="card-text" style="color:var(--roman-silver);">${entry.date} • ${entry.notes || ''}</p>`;
    } else if (type === 'experience' || type === 'organizations') {
      li.innerHTML = `<div class="progress-wrapper"><p class="progress-label" style="font-size: 1.1rem; font-weight: 700;">${entry.role}</p></div><p class="card-text" style="color:var(--roman-silver); margin-top:5px;">${entry.date}</p><p class="card-text" style="margin-top:10px; color:var(--roman-silver);">${entry.notes || ''}</p>`;
    } else if (type === 'cert') {
      li.innerHTML = `<div class="progress-wrapper"><p class="progress-label" style="font-size: 1.1rem; font-weight: 700;">${entry.title}</p></div><p class="card-text" style="color:var(--roman-silver); margin-top:5px;">${entry.issuer || ''} • ${entry.date || ''}</p><p class="card-text" style="margin-top:10px; color:var(--roman-silver);">${entry.notes || ''}</p>`;
    }
    container.appendChild(li);
  });
}

const renderBlog = (items) => {
  const container = document.querySelector('[data-blog-list]');
  if (!container || !Array.isArray(items)) return;
  container.innerHTML = '';
  items.forEach(entry => {
    const li = document.createElement('li');
    li.className = 'reveal';
    li.innerHTML = `
      <div class="blog-card">
        <figure class="card-banner img-holder" style="--width:700; --height:470;">
          <img src="${entry.image}" width="700" height="470" loading="lazy" alt="${entry.alt}" class="img-cover">
        </figure>
        <div class="card-content">
          <time class="time" datetime="${entry.date || ''}">
            <span class="span text-lg">${entry.day}</span>
            ${entry.monthYear}
          </time>
          <div>
            <h3 class="h3 card-title">${entry.title}</h3>
            <p class="card-text">${entry.excerpt}</p>
            <a href="${entry.link}" class="btn has-before"><span class="span">Read more</span><ion-icon name="arrow-forward"></ion-icon></a>
          </div>
        </div>
      </div>
    `;
    container.appendChild(li);
  });
}

const loadAndRender = async () => {
  const portfolioData = await fetchJSON('./assets/data/portfolio.json');
  const contentData = await fetchJSON('./assets/data/content.json');
  if (portfolioData) renderPortfolio(portfolioData);
  if (contentData) {
    renderList('[data-education-list]', contentData.education, 'education');
    renderList('[data-experience-list]', contentData.experience, 'experience');
    renderList('[data-cert-list]', contentData.certifications, 'cert');
    renderList('[data-org-list]', contentData.organizations, 'organizations');
    renderBlog(contentData.blog);
  }
}



/**
 * NAVBAR
 * navbar toggle for mobile
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggleBtn.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * header active when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (!header) return;
  if (window.scrollY >= 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});



/**
 * SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function (currentSlider) {

  const sliderContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
  let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  /**
   * NEXT SLIDE
   */
  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSlidableItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */
  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSlidableItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = totalSlidableItems <= 0;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = 'none';
    sliderPrevBtn.style.display = 'none';
  }

  /**
   * slide with [shift + mouse wheel]
   */

  currentSlider.addEventListener("wheel", function (event) {
    if (event.shiftKey && event.deltaY > 0) slideNext();
    if (event.shiftKey && event.deltaY < 0) slidePrev();
  });

  /**
   * RESPONSIVE
   */

  window.addEventListener("resize", function () {
    totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
    totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

    moveSliderItem();
  });

}

// Initialize sliders and animations after rendering dynamic content
window.addEventListener('DOMContentLoaded', async () => {
  await loadAndRender();
  // re-query sliders after content rendered
  const slidersAfter = document.querySelectorAll('[data-slider]');
  for (let i = 0, len = slidersAfter.length; i < len; i++) { initSlider(slidersAfter[i]); }
  
  // Scroll reveal functionality
  let revealElements = [];
  const updateRevealElements = () => {
    revealElements = document.querySelectorAll(".reveal");
  };
  
  const revealOnScroll = () => {
    for (let i = 0, len = revealElements.length; i < len; i++) {
      const element = revealElements[i];
      // trigger reveal slightly before element enters 50px from the bottom
      const isElementVisible = element.getBoundingClientRect().top < window.innerHeight - 50;
      if (isElementVisible) {
        element.classList.add("active");
      }
    }
  }
  
  updateRevealElements();
  window.addEventListener("scroll", revealOnScroll);
  // Run once after render is complete
  setTimeout(revealOnScroll, 150);
});