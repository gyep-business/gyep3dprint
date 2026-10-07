document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("[data-header], #siteHeader");
  const toggle = document.querySelector("[data-menu-toggle], #menuToggle");
  const mobileMenu = document.querySelector("[data-mobile-menu], #mobileMenu");

  function syncHeader() {
    header?.classList.toggle("scrolled", window.scrollY > 36);
  }
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  toggle?.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    header.classList.toggle("menu-open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });


  // Mark the active page consistently across the shared navigation.
  const currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.desktop-nav a, .mobile-menu a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (!href || href.startsWith('http')) return;
    const clean = href.split('#')[0].toLowerCase();
    if (clean && clean === currentFile) link.setAttribute('aria-current', 'page');
  });

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    header?.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }

  const data = {
    people: {
      label: "PEOPLE",
      text: "Made from the people who matter.",
      mode: "people"
    },
    memories: {
      label: "MEMORIES",
      text: "Keep a moment in a different form.",
      mode: "memories"
    },
    names: {
      label: "NAMES",
      text: "Put your name on it.",
      mode: "names"
    },
    places: {
      label: "PLACES",
      text: "Turn places into keepsakes.",
      mode: "places"
    },
    events: {
      label: "EVENTS",
      text: "Made for moments worth celebrating.",
      mode: "events"
    },
    everyday: {
      label: "EVERYDAY",
      text: "Useful things, made a little more yours.",
      mode: "everyday"
    }
  };

  const art = document.getElementById("possibilityArt");
  const object = document.getElementById("possibilityObject");
  const label = document.getElementById("possibilityLabel");
  const text = document.getElementById("possibilityText");

  function applyMode(mode) {
    art.dataset.mode = mode;
    if (!object) return;

    object.className = "possibility-figure";
    object.innerHTML = "";

    if (mode === "people") {
      object.classList.add("mode-people");
    } else if (mode === "memories") {
      object.classList.add("mode-memory");
    } else if (mode === "names") {
      object.classList.add("mode-name");
      object.textContent = "JILL";
    } else if (mode === "places") {
      object.classList.add("mode-map");
    } else if (mode === "events") {
      object.classList.add("mode-event");
    } else if (mode === "everyday") {
      object.classList.add("mode-home");
    }

    if (typeof object.animate !== "function") return;
    object.animate(
      [
        { opacity: .25, transform: "translateY(10px) scale(.96)" },
        { opacity: 1, transform: "translateY(0) scale(1)" }
      ],
      { duration: 320, easing: "cubic-bezier(.22,1,.36,1)" }
    );
  }

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.key;
      const item = data[key];
      if (!item) return;

      document.querySelectorAll(".tab").forEach((button) => button.classList.remove("is-active"));
      tab.classList.add("is-active");
      if (label) label.textContent = item.label;
      if (text) text.textContent = item.text;
      if (art) applyMode(item.mode);
    });
  });

  // Initial mode
  if (art) applyMode("people");
});
