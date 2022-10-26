import React from "react";
import { node, string } from "prop-types";
import cx from "classnames";

const propTypes = {
  left: node,
  right: node,
  className: string,
};

const Container3070 = (props) => {
  const { left, right, className, ...otherProps } = props;
  return (
    <section
      className={cx("container container--30-70", className)}
      {...otherProps}
    >
      <div className="container__col container__col--30 container__col--left">
        {left}
      </div>
      <div className="container__col container__col--70 container__col--right">
        {right}
      </div>
    </section>
  );
};

Container3070.propTypes = propTypes;
export default Container3070;
