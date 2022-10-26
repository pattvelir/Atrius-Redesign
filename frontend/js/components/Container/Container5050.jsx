import React from "react";
import { node, string } from "prop-types";
import cx from "classnames";

const propTypes = {
  left: node,
  right: node,
  className: string,
};

const Container5050 = (props) => {
  const { left, right, className, ...otherProps } = props;
  return (
    <section
      className={cx("container container--50-50", className)}
      {...otherProps}
    >
      <div className="container__col container__col--50 container__col--left">
        {left}
      </div>
      <div className="container__col container__col--50 container__col--right">
        {right}
      </div>
    </section>
  );
};

Container5050.propTypes = propTypes;
export default Container5050;
