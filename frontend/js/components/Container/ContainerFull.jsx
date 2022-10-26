import React from "react";
import { node, string } from "prop-types";
import cx from "classnames";

const propTypes = {
  children: node,
  className: string,
};

const ContainerFull = (props) => {
  const { children, className, ...otherProps } = props;

  return (
    <section
      className={cx("container container--100", className)}
      {...otherProps}
    >
      <div className="container__col container__col--100">{children}</div>
    </section>
  );
};

ContainerFull.propTypes = propTypes;
export default ContainerFull;
