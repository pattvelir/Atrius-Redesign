import React from "react";
import { array } from "prop-types";
import Icon from "../Icon/Icon.jsx";
// import "./breadcrumbs.scss";
const propTypes = {
  items: array,
};

const breadcrumbs = (props) => {
  const { items } = props;

  return (
    <nav className="breadcrumbs container" aria-label="Breadcrumbs">
      <ol className="breadcrumbs__list">
        {items.map((item, i) => {
          if (i === items.length - 1) {
            return (
              <li key={i} className="breadcrumbs__item">
                {item}
              </li>
            );
          } else {
            return (
              <li key={i} className="breadcrumbs__item">
                <a href="#">{item}</a>
                <span className="breadcrumbs__divider">
                  <Icon iconName="chevron-right" className="icon--24x24" />
                </span>
              </li>
            );
          }
        })}
      </ol>
    </nav>
  );
};

breadcrumbs.propTypes = propTypes;
export default breadcrumbs;
