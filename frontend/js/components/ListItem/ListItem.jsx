import React from "react";
import { string, array, object, shape } from "prop-types";
import cx from "classnames";
import uniqueid from "lodash.uniqueid";

const propTypes = {
  orientation: string,
  media: string,
  sizes: string,
  title: string,
  description: string,
  contentType: string,
  date: string,
  location: string,
  authors: array,
  focusRef: object, // for React Search apps
  link: shape({
    href: string,
    text: string,
  }),
  featuredResultLabel: string,
};

const listItem = (props) => {
  const {
    orientation,
    media,
    title,
    description,
    contentType,
    date,
    location,
    authors,
    focusRef,
    featured,
    featuredResultLabel,
    link,
    sizes,
  } = props;

  const id = uniqueid("list-item-");

  const handleImageClick = (e) => {
    if (link?.href) {
      window.location = link.href;
    }
  };

  return (
    <article className={`list-item ${orientation || ""}`}>
      {media && (
        // using js click here for a11y, so disabling auto rule
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div
          className={cx("list-item__media", {
            "js-list-item-clickable": link?.href,
          })}
          data-location={link?.href}
          onClick={handleImageClick}
        >
          <img srcSet={media} alt="" sizes={sizes} />
        </div>
      )}
      <div className="list-item__content">
        <div className="list-item__header">
          {featured && (
            <span className="list-item__featured">
              {featuredResultLabel || "Featured"}
            </span>
          )}
          <div className="list-item__eyebrow">
            {contentType && (
              <>
                <span className="list-item__eyebrow-item list-item__eyebrow-item--content-type">
                  {contentType}
                </span>
                <span className="list-item__eyebrow-separator">|</span>
              </>
            )}
            {date && (
              <>
                <span className="list-item__eyebrow-item">{date}</span>
                <span className="list-item__eyebrow-separator">|</span>
              </>
            )}
            {location && (
              <>
                <span className="list-item__eyebrow-item">{location}</span>
                <span className="list-item__eyebrow-separator">|</span>
              </>
            )}
          </div>
          <h2 className="list-item__title" id={id}>
            <a href={link?.href} ref={focusRef}>
              {title}
            </a>
          </h2>
        </div>
        {description && (
          <div
            className="list-item__description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        {!!authors?.length && (
          <div className="list-item__meta">
            <span className="list-item__byline">
              by{" "}
              {authors.map((author, i) => {
                if (i === authors.length - 1) {
                  return <strong key={i}>{author}</strong>;
                } else {
                  return <strong key={i}>{author}, </strong>;
                }
              })}
            </span>
          </div>
        )}
      </div>
    </article>
  );
};

listItem.propTypes = propTypes;
export default listItem;
