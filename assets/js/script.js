const item = {
  title: "Дамска чанта PINKO",
  model: "Love Mini Puff 1",
  color: "Черен",
  price: 640.0,
  mainImageSrc: "assets/images/picture-1.jpg",
};

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

  // Adding some mocked data dynamically to the page
  const { title, model, color, price, mainImageSrc } = item;

  let productTitle = document.querySelector(
    "#main-product-view .product-title"
  );
  let productSubtitle = document.querySelector(
    "#main-product-view .product-subtitle"
  );
  let productPriceParagraph = document.querySelector(
    ".product-shop-details .product-price"
  );
  let productMainImage = document.querySelector(".main-img-holder .main-img");

  productTitle.innerHTML = title;
  productSubtitle.innerHTML = model;
  productPriceParagraph.innerHTML = `${price.toFixed(2)} лв.`;
  productMainImage.src = mainImageSrc;

  createPopupModalCheckout();

  // Popup Modal checkout functionality
  function createPopupModalCheckout() {
    // Adding some mocked data and creating DOM elements dynamically
    let addCartBtn = document.querySelector(
      ".product-shop-details-box .cart-add-btn"
    );
    let popupModal = document.querySelector(".popup-modal");
    let closePopupBtn = document.querySelector(".popup-close-btn");

    let popupProductTitle = document.createElement("h3");
    popupProductTitle.className = "popup-product-title";
    popupProductTitle.innerHTML = title;

    let popupProductSubtitle = document.createElement("p");
    popupProductSubtitle.className = "popup-product-subtitle";
    popupProductSubtitle.innerHTML = model;

    let popupProductColorParagraph = document.createElement("p");
    popupProductColorParagraph.className = "popup-product-color";
    popupProductColorParagraph.innerHTML = `Цвят: ${color}`;

    let popupProductPriceParagraph = document.createElement("p");
    popupProductPriceParagraph.className = "popup-product-price";
    popupProductPriceParagraph.innerHTML = `${price.toFixed(2)} лв.`;

    let popupProductInfoDiv = document.createElement("div");
    popupProductInfoDiv.className = "popup-product-info";

    popupProductInfoDiv.append(
      popupProductTitle,
      popupProductSubtitle,
      popupProductColorParagraph,
      popupProductPriceParagraph
    );

    let popupProductImage = document.createElement("img");
    popupProductImage.src = mainImageSrc;
    popupProductImage.className = "popup-product-img";

    let popupProductImageHolderDiv = document.createElement("div");
    popupProductImageHolderDiv.className = "popup-img-holder";
    popupProductImageHolderDiv.appendChild(popupProductImage);

    let popupProductRowDiv = document.createElement("div");
    popupProductRowDiv.className = "popup-product-row";
    popupProductRowDiv.append(popupProductImageHolderDiv, popupProductInfoDiv);

    addCartBtn.addEventListener("click", () => {
      popupModal.classList.add("show-popup");
      document.querySelector(".popup-product-cart").prepend(popupProductRowDiv);
      document.body.style.overflow = "hidden";
    });

    closePopupBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      popupProductRowDiv.remove();
      popupModal.classList.remove("show-popup");
      document.body.style.overflow = "auto";
    });

    popupModal.addEventListener("click", (e) => {
      if (e.target === popupModal) {
        popupProductRowDiv.remove();
        popupModal.classList.remove("show-popup");
        document.body.style.overflow = "auto";
      }
    });
  }

  // Carousel Image Gallery Modal Functionality

  let modalImagelGallery = document.getElementById("modal-img-gallery");
  let modalImageCloseBtn = document.querySelector(
    "#modal-img-gallery .image-modal-close-btn"
  );
  let tumbnailImages = document.querySelectorAll(
    "#product-img-gallery .tumbnail-img"
  );
  let slide = 0;

  tumbnailImages.forEach((tumbnailImg, tumbnailIndex) => {
    tumbnailImg.addEventListener("click", () => {
      slide = tumbnailIndex;
      modalImagelGallery.classList.add("show-modal");
      document.body.style.overflow = "hidden";
      moveCarouselTo(slide);
    });
  });

  modalImageCloseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    modalImagelGallery.classList.remove("show-modal");
    document.body.style.overflow = "auto";
  });

  modalImagelGallery.addEventListener("click", (e) => {
    if (e.target === modalImagelGallery) {
      modalImagelGallery.classList.remove("show-modal");
      document.body.style.overflow = "auto";
    }
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
  function moveNext(e) {
    e.stopPropagation();
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
  function movePrev(e) {
    e.stopPropagation();
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
