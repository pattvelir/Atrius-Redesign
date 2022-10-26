import React from "react";
import { string, shape } from "prop-types";
const propTypes = {
  quote: string,
  attribution: shape({
    name: string,
    part2: string,
    part3: string,
  }),
};
const pullQuote = (props) => {
  const { quote, attribution } = props;
  const hasCaption = attribution.name || attribution.part2 || attribution.part3;

  return (
    <figure className="pull-quote container">
      <blockquote className="pull-quote__quote subheader2">{quote}</blockquote>
      {hasCaption && (
        <figcaption className="pull-quote__caption">
          <span className="pull-quote__prefix">-</span>
          {attribution.name && (
            <span className="pull-quote__name">{attribution.name}</span>
          )}
          {attribution.part2 && (
            <span className="pullQuote__job">{attribution.part2}</span>
          )}
          {attribution.part3 && (
            <span className="pullQuote__company">, {attribution.part3}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
};
pullQuote.propTypes = propTypes;
export default pullQuote;
