export default (el, i) => {
  if (el.dataset.location) {
    el.addEventListener("click", (event) => {
      window.location.href = el.dataset.location;
    });
  }
};
