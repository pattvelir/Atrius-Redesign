import React from "react";
import { string, array } from "prop-types";
import TextWithIcon from "../TextWithIcon/TextWithIcon.jsx";

const propTypes = {
  title: string,
  links: array,
};

const RelatedLinks = (props) => {
  const { title, links } = props;

  const atLeastOneLink = links.some((link) => link.href);

  return (
    atLeastOneLink && (
      <nav className="related-links" aria-label={title}>
        <h2 className="related-links__title">{title}</h2>
        {links && links.length > 0 && (
          <ul className="related-links__links">
            {links.map((link, i) => {
              return (
                link.href && (
                  <li key={i} className="related-links__link">
                    <TextWithIcon {...link} />
                  </li>
                )
              );
            })}
          </ul>
        )}
      </nav>
    )
  );
};

RelatedLinks.propTypes = propTypes;
export default RelatedLinks;
