import React from "react";
import { node, string } from "prop-types";
import cx from "classnames";

const propTypes = {
  children: node,
  className: string,
};

const ContainerContent = (props) => {
  const { children, className, ...otherProps } = props;
  return (
    <section
      className={cx("container container--content", className)}
      {...otherProps}
    >
      {children}
    </section>
  );
};

ContainerContent.propTypes = propTypes;
export default ContainerContent;
