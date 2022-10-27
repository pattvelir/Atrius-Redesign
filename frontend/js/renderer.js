export default (selector, callback) =>
  [...document.querySelectorAll(selector)].forEach(callback);
