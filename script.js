document.documentElement.classList.add("page-ready");

const directLinks = document.querySelectorAll(".main-link[data-link]");
const socialLinks = document.querySelectorAll(".social-pill[data-link]");

directLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const url = link.dataset.link;

    if (url) {
      window.location.href = url;
    }
  });
});

socialLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const url = link.dataset.link;

    if (url) {
      window.location.href = url;
    }
  });
});
