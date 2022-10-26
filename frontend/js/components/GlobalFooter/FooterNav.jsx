import React from "react";
import { array, arrayOf, shape } from "prop-types";

const propTypes = {
  navSection: arrayOf(
    shape({
      items: array,
    }),
  ),
};

const footerNav = (props) => {
  const { navSection } = props;

  return (
    <nav className="footer-nav" aria-label="Footer">
      {navSection.map((section, i) => {
        const { items, numCols, heading } = section;
        const size = Math.ceil(items.length / numCols);
        const columnArray = [];

        for (let i = 0; i < items.length; i += size) {
          columnArray.push(items.slice(i, i + size));
        }
        return (
          <div key={i} className={`footer-nav__section has-${section.numCols}`}>
            <h2 id={`${heading}-123`} className="footer-nav__heading">
              {heading}
            </h2>
            <div className="footer-nav__col-wrapper">
              {columnArray.map((column, i) => {
                return (
                  <ul
                    key={i}
                    className="footer-nav__col"
                    aria-labelledby={`${heading}-123`}
                  >
                    {column.map((item, i) => {
                      return (
                        <li key={i}>
                          <a href={item.url}>{item.label}</a>
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
};

footerNav.propTypes = propTypes;
export default footerNav;
