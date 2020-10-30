document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu functionality
  let menu = document.querySelector(".menu");
  let logo = document.getElementById("logo");
  let hamburger = document.querySelector("header .hamburger");
  let html = document.getElementsByTagName("html");

  hamburger.addEventListener("click", function () {
    if (
      this.classList[1] === "hamburger--stand" &&
      this.classList[2] === "is-active"
    ) {
      this.classList.remove("hamburger--stand", "is-active");
    } else this.classList.add("hamburger--stand", "is-active");
    menu.classList.toggle("active");
    html[0].classList.toggle("hidden-scroll");
    logo.classList.toggle("logo-fixed");
  });

  document.querySelectorAll("header nav .menu a").forEach((item) => {
    item.addEventListener("click", () => {
      menu.classList.remove("active");
      html[0].classList.remove("hidden-scroll");
      logo.classList.remove("logo-fixed");
      hamburger.classList.remove("hamburger--stand", "is-active");
    });
  });

  // Popup Modal cart functionality
  let addCartBtn = document.querySelector(
    ".product-shop-details-box .cart-add-btn"
  );
  let popupModal = document.querySelector(".popup-modal");
  let closePopupBtn = document.querySelector(".popup-close-btn");

  addCartBtn.addEventListener("click", () => {
    popupModal.classList.add("show-popup");
    document.body.style.overflow = "hidden";
  });

  closePopupBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    popupModal.classList.remove("show-popup");
    document.body.style.overflow = "auto";
  });

  popupModal.addEventListener("click", (e) => {
    if (e.target === popupModal) {
      popupModal.classList.remove("show-popup");
      document.body.style.overflow = "auto";
    }
  });

  // Carousel Image Gallery Modal Functionallity
  let imageModalGallery = document.getElementById("modal-img-gallery");
  let imageModalCloseBtn = document.querySelector(
    "#modal-img-gallery .image-modal-close-btn"
  );
  let tumbnailImages = document.querySelectorAll(
    "#product-img-gallery .tumbnail-img"
  );
  let slide = 0;

  tumbnailImages.forEach((tumbnailImg, tumbnailIndex) => {
    tumbnailImg.addEventListener("click", () => {
      imageModalGallery.classList.add("show-modal");
      document.body.style.overflow = "hidden";
      moveCarouselTo(tumbnailIndex);
    });
  });

  imageModalCloseBtn.addEventListener("click", () => {
    imageModalGallery.classList.remove("show-modal");
    document.body.style.overflow = "auto";
  });

  // Variables to target our base class,  get carousel items, count how many carousel items there are, set the slide to 0 (which is the number that tells us the frame we're on), and set motion to true which disables interactivity.
  let itemClassName = "carousel__photo";
  let items = document.getElementsByClassName("carousel__photo");
  let totalItems = items.length;
  let moving = true;

  // To initialise the carousel we'll want to update the DOM with our own classes
  function setInitialClasses() {
    // Target the last, initial, and next items and give them the relevant class.
    // This assumes there are three or more items.
    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
  }

  // Set click events to navigation buttons

  function setEventListeners() {
    var next = document.getElementsByClassName("carousel__button--next")[0],
      prev = document.getElementsByClassName("carousel__button--prev")[0];

    next.addEventListener("click", moveNext);
    prev.addEventListener("click", movePrev);
  }

  // Disable interaction by setting 'moving' to true for the same duration as our transition (0.5s = 500ms)
  function disableInteraction() {
    moving = true;

    setTimeout(function () {
      moving = false;
    }, 500);
  }

  function moveCarouselTo(slide) {
    // Check if carousel is moving, if not, allow interaction
    if (!moving) {
      // temporarily disable interactivity
      disableInteraction();

      // Preemptively set variables for the current next and previous slide, as well as the potential next or previous slide.
      var newPrevious = slide - 1,
        newNext = slide + 1,
        oldPrevious = slide - 2,
        oldNext = slide + 2;

      // Test if carousel has more items
      if (totalItems - 1) {
        // Checks if the new potential slide is out of bounds and sets slide numbers
        if (newPrevious <= 0) {
          oldPrevious = totalItems - 1;
        } else if (newNext >= totalItems - 1) {
          oldNext = 0;
        }

        // Check if current slide is at the beginning or end and sets slide numbers
        if (slide === 0) {
          newPrevious = totalItems - 1;
          oldPrevious = totalItems - 2;
          oldNext = slide + 1;
        } else if (slide === totalItems - 1) {
          newPrevious = slide - 1;
          newNext = 0;
          oldNext = 1;
        }

        // Now we've worked out where we are and where we're going, by adding and removing classes, we'll be triggering the carousel's transitions.

        // Based on the current slide, reset to default classes.
        items[oldPrevious].className = itemClassName;
        items[oldNext].className = itemClassName;

        // Add the new classes
        items[newPrevious].className = itemClassName + " prev";
        items[slide].className = itemClassName + " active";
        items[newNext].className = itemClassName + " next";
      }
    }
  }

  // Next navigation handler
  function moveNext() {
    // Check if moving
    if (!moving) {
      // If it's the last slide, reset to 0, else +1
      if (slide === totalItems - 1) {
        slide = 0;
      } else {
        slide++;
      }

      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }

  // Previous navigation handler
  function movePrev() {
    // Check if moving
    if (!moving) {
      // If it's the first slide, set as the last slide, else -1
      if (slide === 0) {
        slide = totalItems - 1;
      } else {
        slide--;
      }

      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }

  // Initialise carousel
  function initCarousel() {
    setInitialClasses();
    setEventListeners();

    // Set moving to false now that the carousel is ready
    moving = false;
  }

  // make it rain
  initCarousel();
});
