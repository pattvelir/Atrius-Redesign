import React from "react";
import { object, string } from "prop-types";
import cx from "classnames";

import ArrowLink from "../../ArrowLink/ArrowLink.jsx";

const propTypes = {
  title: string,
  query: object.isRequired,
  model: object.isRequired,
  dictionary: object.isRequired,
};

const DynamicContentListing = (props) => {
  const { model, title } = props;

  return (
    <section
      className={cx("dymanic-content-listing", {
        [`dynamic-content-listing--theme${model.theme}`]: model?.theme,
      })}
    >
      {title && <h2 className="dynamic-content-listing__title">{title}</h2>}
      <div
        className="dynamic-content-listing__mount js-dynamic-content-listing-mount"
        data-query={JSON.stringify(props.query)}
        data-model={JSON.stringify(props.model)}
        data-dictionary={JSON.stringify(props.dictionary)}
      ></div>
    </section>
  );
};

DynamicContentListing.propTypes = propTypes;
export default DynamicContentListing;
