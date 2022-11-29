import React from "react";
import { node, string } from "prop-types";
import cx from "classnames";
// import "./container.scss";

const propTypes = {
  left: node,
  right: node,
  className: string,
};

const Container7030 = (props) => {
  const { left, right, className, ...otherProps } = props;
  return (
    <section
      className={cx("container container--70-30", className)}
      {...otherProps}
    >
      <div className="container__col container__col--70 container__col--left">
        {left}
      </div>
      <div className="container__col container__col--30 container__col--right">
        {right}
      </div>
    </section>
  );
};

Container7030.propTypes = propTypes;
export default Container7030;
