export default async (component) => {
  const { selector, src, dir } = component;
  const module = await import(`./${dir}/${src}.js`);

  return [selector].forEach((s) =>
    [...document.querySelectorAll(s)].forEach((el) => module.default(el)),
  );
};
