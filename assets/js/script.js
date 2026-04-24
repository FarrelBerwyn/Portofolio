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
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
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
  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'slider-item';
    li.innerHTML = `
      <div class="portfolio-card img-holder" style="--width: 600; --height: 600;">
        <img src="${item.image}" width="600" height="600" loading="lazy" alt="${item.title}" class="img-cover">
        <div class="card-content">
          <h3 class="h3 card-title">${item.title}</h3>
          <p class="card-text">${item.text}</p>
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
    li.style = 'margin-bottom: 25px; padding: 20px; background: rgba(255,255,255,0.02); border-radius: 8px;';
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

// Initialize sliders after rendering dynamic content
window.addEventListener('DOMContentLoaded', async () => {
  await loadAndRender();
  // re-query sliders after content rendered
  const slidersAfter = document.querySelectorAll('[data-slider]');
  for (let i = 0, len = slidersAfter.length; i < len; i++) { initSlider(slidersAfter[i]); }
});