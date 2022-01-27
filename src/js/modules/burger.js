export const activeBurger = () => {
  const burger = document.querySelector(".menu__burger");
  const menu = document.querySelector(".menu");

  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    menu.classList.toggle("open");
  });

  menu.addEventListener("click", function () {
    removeOpen()
  });

  window.addEventListener('resize', function() {
    if(this.innerWidth > 767) {
      removeOpen()
    }
  })

  function removeOpen() {
    if (menu.classList.contains("open")) {
      burger.classList.remove("open");
      menu.classList.remove("open");
    }
  }
};
