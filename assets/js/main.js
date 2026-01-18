/* PARTICLE ANIMATION - DUST STORM */
function initParticles() {
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 400, // Even more particles for dense dust
          density: {
            enable: true,
            value_area: 1000,
          },
        },
        color: {
          value: ["#bd892f", "#eac931", "#d0a32a", "#f4ca44", "#ffd700"],
        },
        shape: {
          type: "edge", // Edge creates more irregular shapes
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: [3, 5, 7], // More irregular shapes
          },
        },
        opacity: {
          value: 0.3, // Very subtle for depth
          random: true,
          anim: {
            enable: true,
            speed: 0.8,
            opacity_min: 0.05, // Very faint minimum
            sync: false,
          },
        },
        size: {
          value: 2,
          random: true,
          anim: {
            enable: true,
            speed: 3,
            size_min: 0.5,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
        },
        move: {
          enable: true,
          speed: 1, // lower speed for dust drift
          direction: "bottom-right", // Diagonal movement
          random: true,
          straight: false,
          out_mode: "out",
          bounce: true,
          attract: {
            enable: true, // Enable attraction for swirling
            rotateX: 800,
            rotateY: 1600,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 200,
            line_linked: {
              opacity: 0.3,
            },
          },
          bubble: {
            distance: 200,
            size: 4,
            duration: 1,
            opacity: 0.6,
            speed: 2,
          },
          repulse: {
            distance: 150,
            duration: 0.5,
          },
          push: {
            particles_nb: 6,
          },
          remove: {
            particles_nb: 3,
          },
        },
      },
      retina_detect: true,
    });
  }
}

/* SCROLL TO TOP FUNCTIONALITY */
function initScrollToTop() {
  const scrollButton = document.getElementById("scrollToTop");

  if (!scrollButton) return;

  // Show/hide button based on scroll position
  function toggleScrollButton() {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add("visible");
    } else {
      scrollButton.classList.remove("visible");
    }
  }

  // Scroll to top function
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Event listeners
  window.addEventListener("scroll", toggleScrollButton);
  scrollButton.addEventListener("click", scrollToTop);

  // Initialize button state
  toggleScrollButton();
}

/* MOBILE MENU FUNCTIONALITY */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");
  const header = document.getElementById("site-header");
  const mainContent = document.querySelector("main");
  const scrollToTopBtn = document.getElementById("scrollToTop");

  if (!mobileMenuBtn || !mobileMenuOverlay) return;

  // Open mobile menu
  function openMobileMenu() {
    // Prevent body scrolling
    document.body.classList.add("hideScroll");

    // Animate header and main content fade out
    gsap.to([header, mainContent, scrollToTopBtn], {
      duration: 0.4,
      opacity: 0,
      ease: "power2.out",
    });

    // Show overlay
    gsap.to(mobileMenuOverlay, {
      duration: 0.4,
      opacity: 1,
      visibility: "visible",
      ease: "power2.out",
      onStart: () => {
        mobileMenuOverlay.classList.add("active");
        mobileMenuBtn.classList.add("active");
      },
    });

    // Stagger animation for menu links
    gsap.to(mobileMenuLinks, {
      duration: 0.6,
      opacity: 1,
      x: 0,
      stagger: 0.08,
      ease: "power3.out",
      delay: 0.2,
    });

    // Animate close button (appears last)
    gsap.to(mobileMenuClose, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      ease: "power3.out",
      delay: 0.8,
    });
  }

  // Close mobile menu
  function closeMobileMenu() {
    // Animate close button (hides first)
    gsap.to(mobileMenuClose, {
      duration: 0.3,
      opacity: 0,
      y: -20,
      ease: "power2.in",
    });

    // Animate menu links (reverse stagger)
    gsap.to(mobileMenuLinks, {
      duration: 0.4,
      opacity: 0,
      x: -30,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        // Reset link positions for next opening
        gsap.set(mobileMenuLinks, { opacity: 0, x: -30 });
      },
    });

    // Hide overlay
    gsap.to(mobileMenuOverlay, {
      duration: 0.4,
      opacity: 0,
      visibility: "hidden",
      ease: "power2.in",
      delay: 0.3,
      onComplete: () => {
        mobileMenuOverlay.classList.remove("active");
        mobileMenuBtn.classList.remove("active");

        // Allow body scrolling
        document.body.classList.remove("hideScroll");
      },
    });

    // Animate header and main content fade in
    gsap.to([header, mainContent, scrollToTopBtn], {
      duration: 0.4,
      opacity: 1,
      ease: "power2.out",
      delay: 0.3,
    });
  }

  // Event listeners
  mobileMenuBtn.addEventListener("click", openMobileMenu);
  mobileMenuClose.addEventListener("click", closeMobileMenu);

  // Close menu when clicking on a link
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close menu when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenuOverlay.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  // Close menu when clicking outside (on overlay background)
  mobileMenuOverlay.addEventListener("click", (e) => {
    if (e.target === mobileMenuOverlay) {
      closeMobileMenu();
    }
  });
}

/* INITIALIZE FUNCTIONS (WITH CUSTOM CURSOR) */
$(document).ready(function () {
  // Initialize cursor
  const cursorDot = document.querySelector("[data-cursor-dot]");
  const cursorOutline = document.querySelector("[data-cursor-outline]");

  if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", function (e) {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      cursorOutline.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        { duration: 300, fill: "forwards" }
      );
    });

    // Add hover effects
    const interactiveElements = document.querySelectorAll(
      "a, button, .menu-trigger-button"
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", function () {
        cursorOutline.classList.add("grow");
      });
      element.addEventListener("mouseleave", function () {
        cursorOutline.classList.remove("grow");
      });
    });
  }

  // Initialize particles after page type detection
  setTimeout(initParticles, 1000); // Small delay to ensure DOM is ready

  // Initialize scroll to top functionality
  initScrollToTop();

  // Initialize mobile menu
  initMobileMenu();
});

// SERVICE CIRCLES HOVER EFFECTS
$(document).ready(function () {
  let hoverTimeout;
  let isHovering = false;
  const $serviceCircles = $(".service-circle");
  const $growthSystem = $(".growth-system");

  // When hovering over a service circle
  $serviceCircles.on("mouseenter", function () {
    isHovering = true;
    const $this = $(this);

    // Clear any existing timeout
    clearTimeout(hoverTimeout);

    // Immediately hide other circles with a slight delay for smooth transition
    hoverTimeout = setTimeout(() => {
      $serviceCircles.not($this).css({
        opacity: "0",
        visibility: "hidden",
        "pointer-events": "none",
      });
    }, 100);

    // Ensure the hovered circle is fully visible
    $this.css({
      opacity: "1",
      visibility: "visible",
      "pointer-events": "auto",
      "z-index": "10",
    });

    // Show the links for this circle
    $this.find(".circle-links").css({
      opacity: "1",
      visibility: "visible",
      "margin-top": "15px",
    });

    // Add active class
    $this.addClass("hover-active");
  });

  // When leaving a service circle
  $serviceCircles.on("mouseleave", function () {
    const $this = $(this);
    isHovering = false;

    // Clear timeout
    clearTimeout(hoverTimeout);

    // Hide this circle's links
    $this.find(".circle-links").css({
      opacity: "0",
      visibility: "hidden",
      "margin-top": "20px",
    });

    // Show all circles again after a short delay
    hoverTimeout = setTimeout(() => {
      if (!isHovering) {
        $serviceCircles.css({
          opacity: "1",
          visibility: "visible",
          "pointer-events": "auto",
          "z-index": "2",
        });

        // Remove active class from all
        $serviceCircles.removeClass("hover-active");
      }
    }, 300);

    // Remove active class from this circle
    $this.removeClass("hover-active");
  });

  $growthSystem.on("mouseleave", function () {
    isHovering = false;

    // Clear any pending timeouts
    clearTimeout(hoverTimeout);

    // Immediately show all circles
    $serviceCircles.css({
      opacity: "1",
      visibility: "visible",
      "pointer-events": "auto",
      "z-index": "2",
    });

    // Hide all links
    $serviceCircles.find(".circle-links").css({
      opacity: "0",
      visibility: "hidden",
      "margin-top": "20px",
    });

    // Remove active classes
    $serviceCircles.removeClass("hover-active");
  });

  $(".grid-item").hover(
    function () {
      $(this).css("transition", "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)");
    },
    function () {
      $(this).css("transition", "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)");
    }
  );
});

// ACTIVE MENU LINK HIGHLIGHTING
$(document).ready(function () {
  function setActiveMenuLinkSimple() {
    // Get current page filename
    const currentPage = window.location.pathname.split("/").pop();

    // Remove any existing active classes
    $(".menu-link").removeClass("active");

    // Find and activate matching link
    $(".menu-link a").each(function () {
      const $link = $(this);
      const linkHref = $link.attr("href");
      const linkPage = linkHref.split("/").pop();

      // For home page
      if (linkHref === "/" || linkHref === "index.html") {
        if (
          currentPage === "" ||
          currentPage === "index.html" ||
          currentPage === "/"
        ) {
          $link.closest(".menu-link").addClass("active");
          return false;
        }
      }

      // For other pages
      if (
        linkPage === currentPage ||
        (currentPage === "" && linkHref === "/") ||
        (currentPage === "index.html" && linkHref === "/")
      ) {
        $link.closest(".menu-link").addClass("active");
        return false; // Exit loop once found
      }
    });

    // Fallback: if nothing found, activate home for index pages
    if (
      $(".menu-link.active").length === 0 &&
      (currentPage === "" ||
        currentPage === "index.html" ||
        currentPage === "/")
    ) {
      $('.menu-link a[href="/"], .menu-link a[href="index.html"]')
        .first()
        .closest(".menu-link")
        .addClass("active");
    }
  }

  setActiveMenuLinkSimple();
});
