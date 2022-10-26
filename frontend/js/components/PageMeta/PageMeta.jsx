import React from "react";
import { string, array } from "prop-types";

const propTypes = { displayDate: string, date: string, authors: array };

const PageMeta = (props) => {
  const { displayDate, date, authors } = props;

  return (
    <p className="page-meta container">
      <time className="page-meta__date" dateTime={date}>
        {displayDate}
      </time>
      <span className="page-meta__byline">
        {" "}
        by{" "}
        {authors &&
          authors.map((author, i) => {
            if (i === authors.length - 1) {
              return <strong key={i}>{author}</strong>;
            } else {
              return <strong key={i}>{author}, </strong>;
            }
          })}
      </span>
    </p>
  );
};
PageMeta.propTypes = propTypes;
export default PageMeta;
