// Accordion Code created by Jonathan Dallas - 2019
// Version 1.0.1

// Expected markup.
// The link and content need to be nested within the js-accordion element, but can be placed anywhere in the code.
//
// <div class="js-accordion is-open">
//   <div>
//     <button class="js-accordion-link" type="button" aria-expanded="true"><span>View all</span></button>
//   </div>
//   <div class="js-accordion-content">
//       Content to show and hide
//   </div>
// </div>

export function Accordion(el, id) {
  const link = el.querySelector(".js-accordion-link");
  const content = el.querySelector(".js-accordion-content");

  if (!link || !content) {
    return false;
  }

  const contentWrapper = wrap(content, document.createElement("div"));

  contentWrapper.classList.add("accordion-wrapper");

  // check if we're in the experience editor to force the content open and prevent the binding event for the link.
  const editorView = document.querySelector("body.is-page-editor");

  let expanded = false;
  let contentBuffer = setTimeout(() => {}, 1);

  const animationSpeed = 500;

  if (el.classList.contains("is-open") || editorView) {
    expanded = true;
    toggleContent(expanded);
  } else {
    setHeight(contentWrapper, "0px");
  }

  link.setAttribute("aria-expanded", expanded);
  link.setAttribute("id", `accordion-link-${id}`);
  link.setAttribute("aria-controls", `accordion-content-${id}`);

  contentWrapper.setAttribute("id", `accordion-content-${id}`);
  contentWrapper.setAttribute("aria-labelledby", `accordion-link-${id}`);

  if (editorView === null) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      toggleContent(!expanded);
    });
  }

  function toggleContent(openState) {
    if (openState === expanded) {
      return;
    }

    const height = content.scrollHeight;
    expanded = openState;

    link.setAttribute("aria-expanded", openState);

    clearTimeout(contentBuffer);

    if (openState) {
      el.classList.add("is-open");
      contentWrapper.style.visibility = "visible";
      setHeight(contentWrapper, `${height}px`);
      contentBuffer = setTimeout(() => {
        setHeight(contentWrapper, "auto");
        contentWrapper.style.overflow = "visible";
      }, animationSpeed + 20);
    } else {
      el.classList.remove("is-open");
      setHeight(contentWrapper, `${height}px`);

      setTimeout(() => {
        setHeight(contentWrapper, "0");
      }, 20);

      setTimeout(() => {
        contentWrapper.style.visibility = "hidden";
      }, animationSpeed + 20);
    }
  }

  function setHeight(el, height) {
    el.setAttribute(
      "style",
      `height: ${height}; transition: height ${animationSpeed}ms ease; overflow: hidden;`,
    );
  }

  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
    return wrapper;
  }

  return {
    el,
    toggleContent,
  };
}
