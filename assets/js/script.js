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

  // Popup cart functionality

  let addCartBtn = document.querySelector(
    ".product-shop-details-box .cart-add-btn"
  );
  let popupBox = document.querySelector(".popup");
  let closePopupBtn = document.querySelector(".popup-close-btn");

  addCartBtn.addEventListener("click", () => {
    popupBox.classList.add("show-popup");
    document.body.style.overflow = "hidden";
  });

  closePopupBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    popupBox.classList.remove("show-popup");
    document.body.style.overflow = "auto";
  });

  popupBox.addEventListener("click", (e) => {
    if (e.target === popupBox) {
      popupBox.classList.remove("show-popup");
      document.body.style.overflow = "auto";
    }
  });
});
