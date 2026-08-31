'use strict';

/**
 * Ensure default section starts at the very top (Hero section) on initial page load
 */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

if (!window.location.hash || window.location.hash === '#' || window.location.hash === '#hero') {
  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  } catch (e) {
    window.scrollTo(0, 0);
  }
}

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

  // Ensure background video plays smoothly
  const bgVideo = document.querySelector(".bg-video-container video");
  if (bgVideo) {
    bgVideo.play().catch(() => {});
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
    { icon: "🚑", title: "SIAGA", sub: "OPSI 2026", grad: "linear-gradient(135deg, hsl(0, 75%, 55%), hsl(30, 90%, 55%))" },
    { icon: "🏆", title: "SSC25 Winner", sub: "Swift Student Challenge", grad: "linear-gradient(135deg, hsl(210, 80%, 55%), hsl(260, 70%, 60%))" },
    { icon: "🚢", title: "Smart Ticketing", sub: "Maritime Services", grad: "linear-gradient(135deg, hsl(200, 80%, 50%), hsl(170, 70%, 45%))" },
    { icon: "🤖", title: "10+ AI Agents", sub: "Intelligent Ecosystem", grad: "linear-gradient(135deg, hsl(150, 80%, 50%), hsl(190, 70%, 45%))" },
    { icon: "📱", title: "Mobile-First UI", sub: "Fully Responsive Layouts", grad: "linear-gradient(135deg, hsl(280, 80%, 55%), hsl(320, 70%, 50%))" },
    { icon: "📊", title: "Interactive BI", sub: "Data Visualization", grad: "linear-gradient(135deg, hsl(30, 85%, 50%), hsl(10, 70%, 45%))" }
  ];

  items.forEach((item, idx) => {
    const badge = badges[idx] || { icon: "📁", title: item.badgeTitle || item.title, sub: item.badgeSub || "Project", grad: "linear-gradient(135deg, #333, #555)" };
    const li = document.createElement('li');
    li.className = `slider-item ${idx === 0 ? 'is-active' : idx === 1 ? 'is-next' : idx === items.length - 1 ? 'is-prev' : 'is-hidden-right'}`;
    li.setAttribute('data-slider-item', '');
    li.setAttribute('data-index', idx);
    
    li.innerHTML = `
      <div class="portfolio-grid-card">
        <div class="portfolio-grid-card__img-wrap">
          <img src="${item.image}" width="800" height="600" loading="lazy" alt="${item.title}" class="img-cover">
          
          <div class="portfolio-grid-card__badge" style="background: hsla(0, 0%, 0%, 0.65);">
            <div class="portfolio-grid-card__badge-icon" style="background: ${badge.grad};">${badge.icon}</div>
            <div class="portfolio-grid-card__badge-text">
              <span class="portfolio-grid-card__badge-title">${badge.title}</span>
              <span class="portfolio-grid-card__badge-sub">${badge.sub}</span>
            </div>
          </div>
        </div>

        <a href="${item.link}" class="layer-link" aria-label="View ${item.title}"></a>
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
    } else if (type === 'experience') {
      li.innerHTML = `
        <div class="progress-wrapper"><p class="progress-label" style="font-size: 1.2rem; font-weight: 700;">${entry.role}</p></div>
        ${entry.company ? `<p class="card-text" style="margin-top:6px; color:var(--white); font-weight: 600;">${entry.company} ${entry.location ? `• <span style="color:var(--roman-silver); font-weight: 400;">${entry.location}</span>` : ''}</p>` : ''}
        <p class="card-text" style="color:var(--roman-silver); margin-top:4px; font-size:1.4rem;">${entry.date}</p>
        <p class="card-text" style="margin-top:10px; color:var(--roman-silver);">${entry.notes || ''}</p>
        ${entry.skills ? `<p class="card-text" style="margin-top:8px; font-size:1.35rem; color:hsla(0, 0%, 100%, 0.75);"><span style="color:var(--white); font-weight:600;">Keahlian:</span> ${entry.skills}</p>` : ''}
      `;
    } else if (type === 'organizations') {
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
const navToggleBtn = document.querySelector("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  if (navbar) navbar.classList.toggle("active");
  if (navToggleBtn) navToggleBtn.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

const navLinks = document.querySelectorAll("[data-nav-link]");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navbar && navbar.classList.contains("active")) {
      toggleNavbar();
    }
    // Also close dropdown if a dropdown link was clicked
    const dropdown = link.closest("[data-dropdown]");
    if (dropdown) {
      dropdown.classList.remove("active");
      const btn = dropdown.querySelector("[data-dropdown-btn]");
      if (btn) btn.setAttribute("aria-expanded", "false");
    }
  });
});

/**
 * DROPDOWN MENU
 */
const dropdowns = document.querySelectorAll("[data-dropdown]");
dropdowns.forEach(dropdown => {
  const btn = dropdown.querySelector("[data-dropdown-btn]");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isActive = dropdown.classList.contains("active");
    dropdowns.forEach(d => {
      d.classList.remove("active");
      const b = d.querySelector("[data-dropdown-btn]");
      if (b) b.setAttribute("aria-expanded", "false");
    });

    if (!isActive) {
      dropdown.classList.add("active");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

// Close dropdown on outside click
document.addEventListener("click", (e) => {
  dropdowns.forEach(dropdown => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
      const btn = dropdown.querySelector("[data-dropdown-btn]");
      if (btn) btn.setAttribute("aria-expanded", "false");
    }
  });
});



/**
 * HEADER
 * Sticky glassmorphism header active when window scrolls down
 */

const header = document.querySelector("[data-header]");

const updateHeaderSticky = function () {
  if (!header) return;
  if (window.scrollY >= 40) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

window.addEventListener("scroll", updateHeaderSticky, { passive: true });
window.addEventListener("load", updateHeaderSticky);
updateHeaderSticky();



/**
 * SLIDER
 */

const initLayeredSlider = function (currentSlider) {
  const sliderContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");
  
  if (!sliderContainer) return;

  const getItems = () => Array.from(sliderContainer.querySelectorAll("[data-slider-item]"));
  let items = getItems();
  const total = items.length;
  if (total === 0) return;

  let currentIndex = 0;
  let autoSlideInterval = null;

  const applyClasses = () => {
    items = getItems();
    const count = items.length;
    if (count === 0) return;

    items.forEach((item, idx) => {
      item.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden-left', 'is-hidden-right');
      
      // Calculate shortest distance in circular ring
      let diff = idx - currentIndex;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;

      if (diff === 0) {
        item.classList.add('is-active');
      } else if (diff === -1 || (count === 2 && diff === 1 && currentIndex === 1)) {
        item.classList.add('is-prev');
      } else if (diff === 1) {
        item.classList.add('is-next');
      } else if (diff < -1) {
        item.classList.add('is-hidden-left');
      } else {
        item.classList.add('is-hidden-right');
      }
    });
  };

  const goToSlide = (index) => {
    currentIndex = ((index % total) + total) % total;
    applyClasses();
  };

  const slideNext = () => {
    goToSlide(currentIndex + 1);
  };

  const slidePrev = () => {
    goToSlide(currentIndex - 1);
  };

  // 7-second auto-slide to the right
  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
      slideNext();
    }, 7000);
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  };

  // Start auto-slide timer
  startAutoSlide();

  const handleManualSlide = (action) => {
    action();
    startAutoSlide(); // Reset the 7-second timer on manual interaction
  };

  if (sliderNextBtn) {
    sliderNextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      handleManualSlide(slideNext);
    });
  }

  if (sliderPrevBtn) {
    sliderPrevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      handleManualSlide(slidePrev);
    });
  }

  // Click on peek cards to slide directly
  sliderContainer.addEventListener("click", (e) => {
    const item = e.target.closest("[data-slider-item]");
    if (!item) return;

    if (item.classList.contains("is-prev")) {
      e.preventDefault();
      e.stopPropagation();
      handleManualSlide(slidePrev);
    } else if (item.classList.contains("is-next")) {
      e.preventDefault();
      e.stopPropagation();
      handleManualSlide(slideNext);
    }
  });

  // Touch and pointer swipe handling
  let startX = 0;
  let currentX = 0;
  let isPointerDown = false;
  let hasSwiped = false;

  const onPointerDown = (e) => {
    isPointerDown = true;
    hasSwiped = false;
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    currentX = startX;
    stopAutoSlide();
  };

  const onPointerMove = (e) => {
    if (!isPointerDown) return;
    currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    if (Math.abs(currentX - startX) > 12) {
      hasSwiped = true;
    }
  };

  const onPointerUp = () => {
    if (!isPointerDown) return;
    isPointerDown = false;
    const diff = currentX - startX;
    if (hasSwiped && Math.abs(diff) > 40) {
      if (diff < 0) {
        handleManualSlide(slideNext);
      } else {
        handleManualSlide(slidePrev);
      }
    } else {
      startAutoSlide();
    }
  };

  // Prevent link click when dragging
  sliderContainer.addEventListener("click", (e) => {
    if (hasSwiped) {
      e.preventDefault();
      e.stopPropagation();
      hasSwiped = false;
    }
  }, true);

  sliderContainer.addEventListener("mousedown", onPointerDown);
  window.addEventListener("mousemove", onPointerMove);
  window.addEventListener("mouseup", onPointerUp);

  sliderContainer.addEventListener("touchstart", onPointerDown, { passive: true });
  sliderContainer.addEventListener("touchmove", onPointerMove, { passive: true });
  sliderContainer.addEventListener("touchend", onPointerUp, { passive: true });

  // Wheel slide (shift + wheel or deltaX)
  currentSlider.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaX) > 30) {
      if (e.deltaX > 0) handleManualSlide(slideNext);
      else handleManualSlide(slidePrev);
    } else if (e.shiftKey && Math.abs(e.deltaY) > 0) {
      if (e.deltaY > 0) handleManualSlide(slideNext);
      else handleManualSlide(slidePrev);
    }
  });

  // Pause on hover
  let isHovered = false;
  currentSlider.addEventListener("mouseenter", () => {
    isHovered = true;
    stopAutoSlide();
  });
  currentSlider.addEventListener("mouseleave", () => {
    isHovered = false;
    startAutoSlide();
  });

  window.addEventListener("keydown", (e) => {
    if (!isHovered) return;
    if (e.key === "ArrowLeft") handleManualSlide(slidePrev);
    if (e.key === "ArrowRight") handleManualSlide(slideNext);
  });

  // Initial call
  applyClasses();
};

const initSlider = function (currentSlider) {
  const sliderContainer = currentSlider.querySelector("[data-slider-container]");
  if (!sliderContainer) return;

  if (sliderContainer.classList.contains("layered-carousel") || currentSlider.classList.contains("portfolio-3d-slider")) {
    initLayeredSlider(currentSlider);
    return;
  }

  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items")) || 1;
  let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    if (sliderContainer.children[currentSlidePos]) {
      sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
    }
  }

  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSlidableItems;
    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }
    moveSliderItem();
  }

  if (sliderNextBtn) sliderNextBtn.addEventListener("click", slideNext);

  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSlidableItems;
    } else {
      currentSlidePos--;
    }
    moveSliderItem();
  }

  if (sliderPrevBtn) sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = totalSlidableItems <= 0;
  if (dontHaveExtraItem) {
    if (sliderNextBtn) sliderNextBtn.style.display = 'none';
    if (sliderPrevBtn) sliderPrevBtn.style.display = 'none';
  }

  currentSlider.addEventListener("wheel", function (event) {
    if (event.shiftKey && event.deltaY > 0) slideNext();
    if (event.shiftKey && event.deltaY < 0) slidePrev();
  });

  window.addEventListener("resize", function () {
    totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items")) || 1;
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
  
  /**
   * Sequential Skills Progress Bar animation (filling one by one in order)
   */
  let skillsAnimated = false;
  const startSequentialSkillsAnimation = () => {
    if (skillsAnimated) return;
    skillsAnimated = true;

    const skillsSection = document.querySelector("#skills") || document.querySelector(".skills");
    if (!skillsSection) return;

    const skillItems = skillsSection.querySelectorAll(".skill-item");
    if (!skillItems.length) return;

    skillItems.forEach((item, index) => {
      const bar = item.querySelector(".progress");
      const val = item.querySelector(".progress-value");
      if (!bar || !val) return;

      const target = Number(bar.getAttribute("data-progress")) || Number(val.getAttribute("data-target")) || 0;
      const duration = 850; // duration for each bar
      const delay = index * 450; // sequential delay for each bar in order

      setTimeout(() => {
        item.classList.add("animating");
        bar.style.width = `${target}%`;

        let startTime = performance.now();
        const updateCount = (now) => {
          const elapsed = now - startTime;
          const progressRatio = Math.min(elapsed / duration, 1);
          // smooth cubic ease out
          const ease = 1 - Math.pow(1 - progressRatio, 3);
          const currentVal = Math.round(target * ease);
          val.textContent = `${currentVal}%`;

          if (progressRatio < 1) {
            requestAnimationFrame(updateCount);
          } else {
            val.textContent = `${target}%`;
            item.classList.remove("animating");
            item.classList.add("filled");
          }
        };
        requestAnimationFrame(updateCount);
      }, delay);
    });
  };

  /**
   * Scroll reveal functionality with IntersectionObserver and staggered timing
   */
  const setupScrollReveal = () => {
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
      const observerOptions = {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08
      };

      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            if (entry.target.id === "skills" || entry.target.closest("#skills")) {
              startSequentialSkillsAnimation();
            }
          }
        });
      }, observerOptions);

      revealElements.forEach(el => revealObserver.observe(el));

      const skillsSection = document.querySelector("#skills") || document.querySelector(".skills");
      if (skillsSection) {
        revealObserver.observe(skillsSection);
      }
    } else {
      const revealOnScroll = () => {
        for (let i = 0, len = revealElements.length; i < len; i++) {
          const element = revealElements[i];
          const isElementVisible = element.getBoundingClientRect().top < window.innerHeight - 40;
          if (isElementVisible) {
            element.classList.add("active");
          }
        }
        const skillsSection = document.querySelector("#skills") || document.querySelector(".skills");
        if (skillsSection && !skillsAnimated) {
          const rect = skillsSection.getBoundingClientRect();
          if (rect.top < window.innerHeight - 50 && rect.bottom > 50) {
            startSequentialSkillsAnimation();
          }
        }
      };

      window.addEventListener("scroll", revealOnScroll, { passive: true });
      revealOnScroll();
    }
  };

  setupScrollReveal();

  // Re-check after a brief timeout to trigger anything above the fold
  setTimeout(() => {
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 30 && rect.bottom > 0) {
        el.classList.add("active");
      }
    });

    const skillsSection = document.querySelector("#skills") || document.querySelector(".skills");
    if (skillsSection && !skillsAnimated) {
      const rect = skillsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 30 && rect.bottom > 0) {
        startSequentialSkillsAnimation();
      }
    }
  }, 120);

  /**
   * Interactive Letter Drift Animation (Google Labs Putty Effect)
   */
  const driftElements = document.querySelectorAll("[data-drift]");
  if (driftElements.length) {
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    let driftStart = performance.now();
    const animateDrift = (now) => {
      const t = (now - driftStart) / 1000;
      driftElements.forEach((el, index) => {
        const offset = index * 0.45;
        const x = Math.sin(t * 1.8 + offset) * 2.5 + mouseX * 3;
        const y = Math.cos(t * 1.4 + offset) * 2.2 + mouseY * 2.5;
        const rot = Math.sin(t * 1.2 + offset) * 1.8;
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0px) rotate(${rot.toFixed(2)}deg)`;
      });
      requestAnimationFrame(animateDrift);
    };
    requestAnimationFrame(animateDrift);
  }

  /**
   * Background Video Cinematic Transition (Fade Black -> Blur & Morph In)
   */
  const bgVideo = document.getElementById("bg-video") || document.querySelector(".bg-video-container video");
  if (bgVideo) {
    let isTransitioning = false;

    const handleVideoLoopTransition = () => {
      if (isTransitioning) return;
      isTransitioning = true;

      // 1. Fade out to black
      bgVideo.classList.remove("video-morph-in");
      bgVideo.classList.add("video-fade-black");

      setTimeout(() => {
        // 2. Reset time to start while faded out
        try {
          bgVideo.currentTime = 0;
          const playPromise = bgVideo.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        } catch (e) {}

        // Force reflow
        void bgVideo.offsetWidth;

        // 3. Morph & Blur back in
        bgVideo.classList.remove("video-fade-black");
        bgVideo.classList.add("video-morph-in");

        setTimeout(() => {
          bgVideo.classList.remove("video-morph-in");
          isTransitioning = false;
        }, 1500);
      }, 750);
    };

    bgVideo.addEventListener("ended", handleVideoLoopTransition);

    bgVideo.addEventListener("timeupdate", () => {
      if (!isTransitioning && bgVideo.duration && bgVideo.currentTime >= bgVideo.duration - 0.75) {
        handleVideoLoopTransition();
      }
    });
  }
});