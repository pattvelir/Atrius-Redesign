export default function (el) {
  [...el.querySelectorAll("table")].forEach((table) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("rich-text__table-wrapper");
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
}
