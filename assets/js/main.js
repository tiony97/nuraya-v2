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

/* TESTIMONIALS SLIDER */
$(document).ready(function () {
  // Initialize Testimonials Swiper
  const initTestimonialsSwiper = () => {
    const testimonialsSwiper = new Swiper(".testimonials-swiper", {
      direction: "horizontal",
      loop: true,
      speed: 600,
      grabCursor: true,
      spaceBetween: 30,
      centeredSlides: true,

      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
      },

      // Auto play
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      // Pagination
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        //dynamicBullets: true,
      },
    });

    // Pause on hover
    $(".testimonials-swiper").hover(
      function () {
        testimonialsSwiper.autoplay.stop();
      },
      function () {
        testimonialsSwiper.autoplay.start();
      },
    );

    return testimonialsSwiper;
  };

  // Initialize swiper
  const testimonialsSwiper = initTestimonialsSwiper();

  // Reinitialize on window resize for better responsiveness
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      testimonialsSwiper.update();
    }, 250);
  });
});

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
        { duration: 300, fill: "forwards" },
      );
    });

    // Add hover effects
    const interactiveElements = document.querySelectorAll(
      "a, button, .menu-trigger-button",
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
    },
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

// FOUNDER PAGE SLIDER
$(document).ready(function () {
  // Founder Slider Functionality
  function initFounderSlider() {
    const $sliderWrapper = $(".slider-wrapper");
    const $introSlide = $(".intro-slide");
    const $detailsSlide = $(".details-slide");
    const $prevBtn = $(".slider-buttons .prev");
    const $nextBtn = $(".slider-buttons .next");

    let currentSlide = 0;
    const totalSlides = 2;
    const slideDuration = 0.8;

    // Initialize slider
    function initSlider() {
      // Set initial states
      $introSlide.addClass("active");
      $detailsSlide.removeClass("active");

      // Update button states
      updateButtonStates();

      // Add click handlers
      $nextBtn.on("click", nextSlide);
      $prevBtn.on("click", prevSlide);

      // Add keyboard navigation
      $(document).on("keydown", handleKeyboardNavigation);
    }

    // Handle slide transitions
    function goToSlide(slideIndex) {
      // Validate slide index
      if (slideIndex < 0 || slideIndex >= totalSlides) return;

      // Get current and next slide elements
      const $currentSlide = currentSlide === 0 ? $introSlide : $detailsSlide;
      const $nextSlide = slideIndex === 0 ? $introSlide : $detailsSlide;

      // Animate out current slide
      gsap.to($currentSlide, {
        duration: slideDuration / 2,
        opacity: 0,
        ease: "power2.out",
        onComplete: function () {
          // Remove active class from current slide
          $currentSlide.removeClass("active");

          // Animate in next slide
          gsap.fromTo(
            $nextSlide,
            {
              opacity: 0,
              visibility: "visible",
              pointerEvents: "all",
            },
            {
              duration: slideDuration / 2,
              opacity: 1,
              ease: "power2.in",
              onStart: function () {
                // Add active class to next slide
                $nextSlide.addClass("active");
              },
              onComplete: function () {
                // Update current slide
                currentSlide = slideIndex;
                updateButtonStates();
              },
            },
          );
        },
      });
    }

    // Next slide function
    function nextSlide() {
      if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
      }
    }

    // Previous slide function
    function prevSlide() {
      if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
      }
    }

    // Update button states (disabled/enabled)
    function updateButtonStates() {
      // Always show both buttons
      $prevBtn.css({
        opacity: 1,
        visibility: "visible",
      });
      $nextBtn.css({
        opacity: 1,
        visibility: "visible",
      });

      // Enable/disable based on slide position
      if (currentSlide === 0) {
        // First slide - disable prev button
        $prevBtn.prop("disabled", true);
        $nextBtn.prop("disabled", false);
      } else if (currentSlide === totalSlides - 1) {
        // Last slide - disable next button
        $prevBtn.prop("disabled", false);
        $nextBtn.prop("disabled", true);
      } else {
        // Middle slide (if more slides added) - enable both
        $prevBtn.prop("disabled", false);
        $nextBtn.prop("disabled", false);
      }
    }

    // Keyboard navigation
    function handleKeyboardNavigation(e) {
      if (e.key === "ArrowRight" || e.key === "Right") {
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "Left") {
        prevSlide();
      }
    }

    // Initialize slider on page load
    function onPageLoad() {
      // Set initial opacity for slides
      gsap.set($introSlide, { opacity: 1 });
      gsap.set($detailsSlide, { opacity: 0, visibility: "hidden" });

      // Initialize the slider
      initSlider();

      // Animate in the first slide (if you want entrance animation)
      gsap.fromTo(
        $introSlide,
        { y: 30 },
        {
          duration: slideDuration,
          y: 0,
          ease: "power2.out",
        },
      );

      // Animate in buttons with delay
      gsap.fromTo(
        $sliderWrapper.next(".slider-buttons"),
        { opacity: 0, y: 20 },
        {
          duration: slideDuration,
          opacity: 1,
          y: 0,
          delay: slideDuration * 0.3,
          ease: "power2.out",
        },
      );
    }

    // Start everything
    onPageLoad();

    // Cleanup function
    return function cleanup() {
      $nextBtn.off("click", nextSlide);
      $prevBtn.off("click", prevSlide);
      $(document).off("keydown", handleKeyboardNavigation);
    };
  }

  // Initialize founder slider if on founders page
  if ($(".founder-slider").length) {
    const cleanupFounderSlider = initFounderSlider();

    // Optional: Cleanup on page transition if using Barba.js
    if (typeof barba !== "undefined") {
      barba.hooks.beforeLeave(() => {
        cleanupFounderSlider && cleanupFounderSlider();
      });
    }
  }
});

// Related Posts Slider
$(document).ready(function () {
  function initRelatedPostsSlider() {
    if ($(".related-posts-slider").length) {
      // Initialize Swiper
      const relatedPostsSwiper = new Swiper(".related-posts-slider", {
        direction: "horizontal",
        loop: false,
        speed: 500,
        grabCursor: true,
        slidesPerView: 1,
        spaceBetween: 20,

        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        // Breakpoints for responsive design
        breakpoints: {
          // When window width is >= 576px
          576: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // When window width is >= 768px
          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          // When window width is >= 992px (desktop)
          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // When window width is >= 1200px
          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },

        // Keyboard control
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
      });

      return relatedPostsSwiper;
    }
  }

  // Initialize the slider
  const relatedPostsSlider = initRelatedPostsSlider();

  // Reinitialize on window resize for better responsiveness
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (relatedPostsSlider && !relatedPostsSlider.destroyed) {
        relatedPostsSlider.update();
      }
    }, 250);
  });
});

// Case Study Slider
$(document).ready(function () {
  function initCaseStudySlider() {
    const pagination = $(".pagination span");
    const slides = $(".case-slide");
    let currentSlide = 1;
    let isAnimating = false;

    console.log("Initializing case study slider...");
    console.log("Pagination items:", pagination.length);
    console.log("Slides found:", slides.length);

    // Initialize first slide
    function initializeFirstSlide() {
      // Ensure first slide is visible and has proper styling
      $('.case-slide[data-slide="1"]').addClass("active").show();
      $('.pagination span[data-slide="1"]').addClass("active");
    }

    function goToSlide(slideNumber) {
      if (isAnimating || slideNumber === currentSlide) return;

      console.log("Navigating to slide:", slideNumber);
      isAnimating = true;
      const direction = slideNumber > currentSlide ? 1 : -1;

      // Update pagination
      pagination.removeClass("active");
      $(`.pagination span[data-slide="${slideNumber}"]`).addClass("active");

      // Get current and next slides
      const currentActive = $(".case-slide.active");
      const nextSlide = $(`.case-slide[data-slide="${slideNumber}"]`);

      console.log("Current active:", currentActive.length);
      console.log("Next slide:", nextSlide.length);

      if (nextSlide.length === 0) {
        console.error("Next slide not found!");
        isAnimating = false;
        return;
      }

      // Create animation timeline
      const slideTL = gsap.timeline({
        onComplete: () => {
          isAnimating = false;
          currentSlide = slideNumber;
          console.log(
            "Slide transition complete. Current slide:",
            currentSlide,
          );
        },
      });

      // Exit current slide
      slideTL
        .to(currentActive, {
          x: -100 * direction,
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        })
        .call(
          () => {
            currentActive.removeClass("active");
          },
          null,
          "-=0.6",
        )

        // Prepare and enter new slide
        .set(nextSlide, {
          x: 100 * direction,
          opacity: 0,
          display: "flex",
        })
        .to(nextSlide, {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
        })
        .call(
          () => {
            nextSlide.addClass("active");
          },
          null,
          "-=0.7",
        );
    }

    // Initialize slider
    function initSlider() {
      // Initialize first slide
      initializeFirstSlide();

      // Pagination click events
      pagination.on("click", function () {
        const slideNumber = parseInt($(this).data("slide"));
        console.log("Pagination clicked, slide:", slideNumber);
        goToSlide(slideNumber);
      });

      // Keyboard navigation
      $(document).on("keydown", function (e) {
        if (e.key === "ArrowRight" && currentSlide < pagination.length) {
          goToSlide(currentSlide + 1);
        } else if (e.key === "ArrowLeft" && currentSlide > 1) {
          goToSlide(currentSlide - 1);
        }
      });

      console.log("Case study slider initialized successfully");
    }

    // Wait for DOM to be fully ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initSlider);
    } else {
      initSlider();
    }
  }

  // Initialize slider
  initCaseStudySlider();
});

//Case study page slider
$(document).ready(function () {
  function initCaseStudyPageSlider() {
    console.log("Initializing case study slider");

    let currentSlide = 1;
    const slides = $(".slide");
    const totalSlides = slides.length;
    let isAnimating = false;
    let autoSlideInterval;

    // Update UI functions
    function updateUI() {
      $(".slider-number").text(`${currentSlide} / ${totalSlides}`);
      const progress = ((currentSlide - 1) / (totalSlides - 1)) * 100;
      $(".slider-progress-bar").css("width", `${progress}%`);

      // Update button states
      $("#prev-slide").prop("disabled", currentSlide === 1);
      $("#next-slide").prop("disabled", currentSlide === totalSlides);
    }

    // Slide navigation
    function goToSlide(slideNumber) {
      if (isAnimating || slideNumber < 1 || slideNumber > totalSlides) return;

      isAnimating = true;
      const direction = slideNumber > currentSlide ? 1 : -1;

      // Hide current active slide
      gsap.to($(".slide.active"), {
        opacity: 0,
        x: -100 * direction,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: function () {
          $(".slide").removeClass("active");

          // Show new slide
          const newSlide = $(`.slide[data-slide="${slideNumber}"]`);
          newSlide.addClass("active");
          currentSlide = slideNumber;

          gsap.fromTo(
            newSlide,
            {
              opacity: 0,
              x: 100 * direction,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "power2.out",
              onComplete: function () {
                isAnimating = false;
                updateUI();
              },
            },
          );
        },
      });
    }

    function nextSlide() {
      if (currentSlide < totalSlides && !isAnimating) {
        goToSlide(currentSlide + 1);
      }
    }

    function prevSlide() {
      if (currentSlide > 1 && !isAnimating) {
        goToSlide(currentSlide - 1);
      }
    }

    // Initialize slider
    function initSlider() {
      updateUI();

      // Add event listeners
      $("#next-slide").on("click", nextSlide);
      $("#prev-slide").on("click", prevSlide);

      // Keyboard navigation
      $(document).on("keydown", function (e) {
        if (e.key === "ArrowRight") {
          nextSlide();
        } else if (e.key === "ArrowLeft") {
          prevSlide();
        }
      });
    }

    // Initialize the slider
    initSlider();
  }

  // Make sure Font Awesome is loaded before initializing
  if (typeof FontAwesome !== "undefined") {
    initCaseStudyPageSlider();
  } else {
    // Wait for Font Awesome to load
    $(window).on("load", initCaseStudyPageSlider);
  }
});
