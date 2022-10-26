import React from "react";
import { string } from "prop-types";

const propTypes = { name: string };

const TaxonomyItem = (props) => {
  const { name } = props;

  return (
    <a className="taxonomy-item" href="#">
      {name}
    </a>
  );
};

TaxonomyItem.propTypes = propTypes;
export default TaxonomyItem;
