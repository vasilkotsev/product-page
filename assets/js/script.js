const item = {
  title: "Дамска чанта PINKO",
  model: "Love Mini Puff 1",
  color: "Черен",
  price: 640,
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
});
