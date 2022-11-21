export default async (component) => {
  const { selector, src } = component;
  return [selector].forEach(async (s) => {
    const module = await import(`./modules/${src}.js`);
    const selectors = [...document.querySelectorAll(s)];
    if (selectors.length <= 0) return;
    selectors.forEach((el) => {
      module.default(el);
    });
  });
};
