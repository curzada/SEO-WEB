/**
* Template Name: Strategy
* Template URL: https://bootstrapmade.com/strategy-bootstrap-agency-template/
* Updated: Jun 06 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

console.log(
  "This pen uses z-index, color, and shadow to create an x-ray illusion. The elements in order from back to front are: solid text, circle, outlined text. The circle's background color must be the same as the body's. The circle's border, the solid text color, and the text outline must also all be the same color. When the circle passes between the solid and outlined text it covers the solid text, leaving only the outline visible."
);

//this function keeps the circle tracked to mouse movement by moving it every time the cursor moves
document.addEventListener("mousemove", (e) => {
  // create variables for circle element and 50% of circle diameter:
  const circle = document.getElementById("circle");
  const halfCircleSize = circle.offsetHeight / 2;

  //get cursor location:
  const mouse_x = e.clientX;
  const mouse_y = e.clientY;

  // move the circle to the cursor's location and offset the circle by 50% of its diameter so that it is always centered with the cursor:
  circle.style.left = `${mouse_x - halfCircleSize}px`;
  circle.style.top = `${mouse_y - halfCircleSize}px`;
});

class GrandFinale {
  constructor() {
    this.cursor = document.getElementById("cursor");
    this.fireworksContainer = document.getElementById("fireworks");
    this.neonRing = document.getElementById("neonRing");
    this.message = document.getElementById("message");
    this.celebrateBtn = document.getElementById("celebrateBtn");
    this.audioControl = document.getElementById("audioControl");

    this.isCelebrating = false;
    this.audioContext = null;
    this.isAudioPlaying = false;

    this.init();
  }

  init() {
    this.createStarfield();
    this.createSnow();
    this.createFloatingParticles();
    this.createVisualizer();
    this.initCursor();
    this.initCountdown();
    this.initEventListeners();
  }

  // ===== STARFIELD =====
  createStarfield() {
    const starfield = document.getElementById("starfield");
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            --duration: ${Math.random() * 3 + 2}s;
            --opacity: ${Math.random() * 0.5 + 0.3};
            animation-delay: ${Math.random() * 3}s;
          `;
      starfield.appendChild(star);
    }

    // Add shooting stars
    this.createShootingStars();
  }

  createShootingStars() {
    setInterval(() => {
      if (Math.random() > 0.7) {
        const starfield = document.getElementById("starfield");
        const shootingStar = document.createElement("div");
        shootingStar.className = "shooting-star";
        shootingStar.style.cssText = `
              left: ${Math.random() * 50}%;
              top: ${Math.random() * 30}%;
              animation-duration: ${Math.random() * 1 + 0.5}s;
            `;
        starfield.appendChild(shootingStar);

        setTimeout(() => shootingStar.remove(), 2000);
      }
    }, 2000);
  }

  //  SNOW
  createSnow() {
    const snowContainer = document.getElementById("snow");
    const snowflakes = ["❄", "❅", "❆", "✧", "✦"];

    setInterval(() => {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.textContent =
        snowflakes[Math.floor(Math.random() * snowflakes.length)];
      snowflake.style.cssText = `
            left: ${Math.random() * 100}%;
            font-size: ${Math.random() * 1 + 0.5}rem;
            animation-duration: ${Math.random() * 5 + 5}s;
            animation-delay: ${Math.random() * 2}s;
          `;
      snowContainer.appendChild(snowflake);

      setTimeout(() => snowflake.remove(), 12000);
    }, 200);
  }

  //  FLOATING PARTICLES
  createFloatingParticles() {
    const container = document.getElementById("floatingParticles");
    const colors = ["#ffd700", "#ff6b6b", "#4ecdc4", "#a29bfe", "#fd79a8"];

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "floating-particle";
      particle.style.cssText = `
            left: ${Math.random() * 100}%;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration: ${Math.random() * 10 + 10}s;
            animation-delay: ${Math.random() * 10}s;
          `;
      container.appendChild(particle);
    }
  }

  //  VISUALIZER
  createVisualizer() {
    const visualizer = document.getElementById("visualizer");
    const barCount = 20;

    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.cssText = `
            --min-height: ${Math.random() * 10 + 5}px;
            --max-height: ${Math.random() * 40 + 20}px;
            animation-delay: ${i * 0.05}s;
          `;
      visualizer.appendChild(bar);
    }
  }

  //  CURSOR
  initCursor() {
    const trailColors = ["#ffd700", "#ff6b6b", "#4ecdc4", "#a29bfe", "#fd79a8"];
    let colorIndex = 0;

    document.addEventListener("mousemove", (e) => {
      this.cursor.style.left = e.clientX - 10 + "px";
      this.cursor.style.top = e.clientY - 10 + "px";

      // Create trail
      if (Math.random() > 0.5) {
        const trail = document.createElement("div");
        trail.className = "trail";
        trail.style.cssText = `
              left: ${e.clientX - 4}px;
              top: ${e.clientY - 4}px;
              background: ${trailColors[colorIndex]};
              box-shadow: 0 0 10px ${trailColors[colorIndex]};
            `;
        document.body.appendChild(trail);

        colorIndex = (colorIndex + 1) % trailColors.length;

        setTimeout(() => trail.remove(), 1000);
      }
    });
  }

  //  COUNTDOWN
  initCountdown() {
    const targetDate = new Date("January 1, 2026 00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.animateValue("days", days);
        this.animateValue("hours", hours);
        this.animateValue("minutes", minutes);
        this.animateValue("seconds", seconds);
      } else {
        // It's 2026!
        this.triggerCelebration();
      }
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  animateValue(id, value) {
    const element = document.getElementById(id);
    const currentValue = element.textContent;
    const newValue = value.toString().padStart(2, "0");

    if (currentValue !== newValue) {
      element.style.transform = "scale(1.1)";
      element.textContent = newValue;
      setTimeout(() => {
        element.style.transform = "scale(1)";
      }, 150);
    }
  }

  //  EVENT LISTENERS
  initEventListeners() {
    this.celebrateBtn.addEventListener("click", () => this.triggerCelebration());

    this.audioControl.addEventListener("click", () => this.toggleAudio());

    // Click anywhere for mini fireworks
    document.addEventListener("click", (e) => {
      if (
        e.target !== this.celebrateBtn &&
        !this.celebrateBtn.contains(e.target)
      ) {
        this.createFirework(e.clientX, e.clientY, 20);
      }
    });
  }

  //  CELEBRATION
  triggerCelebration() {
    if (this.isCelebrating) return;
    this.isCelebrating = true;

    // Show message
    this.message.classList.add("show");

    // Neon ring effect
    this.neonRing.classList.add("active");

    // Launch multiple fireworks
    this.launchFireworksShow();

    // Create confetti
    this.createConfetti(150);

    // Play celebration sound
    this.playCelebrationSound();

    // Reset after animation
    setTimeout(() => {
      this.message.classList.remove("show");
      this.neonRing.classList.remove("active");
      this.isCelebrating = false;
    }, 5000);
  }

  //  FIREWORKS
  createFirework(x, y, particleCount = 30) {
    const colors = [
      "#ff0000",
      "#ffd700",
      "#00ff00",
      "#00ffff",
      "#ff00ff",
      "#ff6b6b",
      "#4ecdc4",
      "#a29bfe"
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "firework-particle";

      const angle = (i / particleCount) * Math.PI * 2;
      const velocity = Math.random() * 100 + 50;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      particle.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            background: ${color};
            box-shadow: 0 0 6px ${color}, 0 0 12px ${color};
            --tx: ${tx}px;
            --ty: ${ty}px;
          `;

      this.fireworksContainer.appendChild(particle);

      setTimeout(() => particle.remove(), 1500);
    }
  }

  launchFireworksShow() {
    const duration = 5000;
    const interval = 200;
    let elapsed = 0;

    const fireworkInterval = setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * (window.innerHeight * 0.6);
      this.createFirework(x, y, Math.floor(Math.random() * 30 + 20));

      elapsed += interval;
      if (elapsed >= duration) {
        clearInterval(fireworkInterval);
      }
    }, interval);
  }

  //  CONFETTI
  createConfetti(count) {
    const colors = [
      "#ff0000",
      "#ffd700",
      "#00ff00",
      "#00ffff",
      "#ff00ff",
      "#ff6b6b"
    ];

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.cssText = `
              left: ${Math.random() * 100}%;
              background: ${colors[Math.floor(Math.random() * colors.length)]};
              width: ${Math.random() * 10 + 5}px;
              height: ${Math.random() * 15 + 10}px;
              animation-duration: ${Math.random() * 2 + 2}s;
              animation-delay: ${Math.random() * 0.5}s;
            `;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
      }, Math.random() * 500);
    }
  }

  //  AUDIO
  toggleAudio() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    this.isAudioPlaying = !this.isAudioPlaying;

    if (this.isAudioPlaying) {
      this.playBackgroundMusic();
      document.getElementById("audioIcon").style.opacity = "1";
    } else {
      if (this.oscillator) {
        this.oscillator.stop();
        this.oscillator = null;
      }
      document.getElementById("audioIcon").style.opacity = "0.5";
    }
  }

  playBackgroundMusic() {
    // Simple synthesized celebration melody
    const melody = [
      523.25,
      587.33,
      659.25,
      698.46,
      783.99,
      698.46,
      659.25,
      587.33
    ];
    let noteIndex = 0;

    const playNote = () => {
      if (!this.isAudioPlaying) return;

      this.oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      this.oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      this.oscillator.frequency.value = melody[noteIndex];
      this.oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.5
      );

      this.oscillator.start();
      this.oscillator.stop(this.audioContext.currentTime + 0.5);

      noteIndex = (noteIndex + 1) % melody.length;

      setTimeout(playNote, 500);
    };

    playNote();
  }

  playCelebrationSound() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Create a celebration sound effect
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      800,
      this.audioContext.currentTime + 0.1
    );
    oscillator.frequency.exponentialRampToValueAtTime(
      600,
      this.audioContext.currentTime + 0.2
    );

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.3
    );

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new GrandFinale();
});

const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "Welcome To Bridge OF Ph KR",
    "We Assist Your Needs Philippines To South Korea",
    "We Offer Education, Basic Korean Language, English, Basic Bisaya, Tayo Magtagalog,",
    "If you already Done Schooling For RASR Learning Center, There's a Chance that you study abroad in Sounth korea",
    "We Connect Korean Products abroad like Cosmetic, Foods, Tourism, Work, Processing Visa Like G,9 E, 7 Many More..",
    "We Assist your Profile in Philippines Gov, Getting For Visa, and more.",
    "Book Now ",
    ":)",
    "Here in Bridge OF Ph KR",
    "Call Us Philippines Number : + 63 +63 997 910 6988",
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 20)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 20)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "90%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();







