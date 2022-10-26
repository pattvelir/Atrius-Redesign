import React from "react";
import { bool, string, node } from "prop-types";
import cx from "classnames";

const propTypes = {
  children: node,
  indent: bool,
  maxWidth: string,
  centered: bool,
};

const defaultProps = {
  indent: false,
  maxWidth: null,
  centered: false,
};

const RichText = (props) => {
  const { centered, indent, maxWidth } = props;

  const maxWidthStyle = maxWidth ? { "--max-width": maxWidth } : null;

  return (
    <section
      className={cx("rich-text js-rich-text", {
        "rich-text--centered": centered,
        "rich-text--indented": indent,
      })}
      style={maxWidthStyle}
    >
      {props.children}
    </section>
  );
};
RichText.propTypes = propTypes;
RichText.defaultProps = defaultProps;
export default RichText;
