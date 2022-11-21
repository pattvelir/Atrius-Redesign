export default (component) => {
  const { selector, src } = component;

  return [selector].forEach((s) => {
    const selectors = [...document.querySelectorAll(s)];
    if (selectors.length <= 0) return;
    selectors.forEach((el) => src(el));
  });
};
