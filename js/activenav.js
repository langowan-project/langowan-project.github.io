let section = document.querySelectorAll("article, .beranda");
let menu = document.querySelectorAll("li a");

window.onscroll = () => {
  section.forEach((i) => {
    let top = window.scrollY;
    let offset = i.offsetTop - 150;
    let height = i.offsetHeight;
    let id = i.getAttribute("id");

    if (top >= offset && top < offset + height) {
      menu.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector("li a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};
