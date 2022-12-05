import React from "react";
import { string, array } from "prop-types";

import Promo from "../Promo/Promo.jsx";

const propTypes = {
  classNames: string,
  title: string,
  promos: array.isRequired,
};

const multiPromo = (props) => {
  const { classNames, title, promos } = props;

  return (
    <section className={`multi-promo ${classNames || ""}`}>
      {title && <h2 className="multi-promo__title">{title}</h2>}
      <div
        className={`multi-promo__items--${promos.length} multi-promo__container`}
      >
        {promos.map((promo, i) => (
          <Promo {...promo} key={i} />
        ))}
      </div>
    </section>
  );
};

multiPromo.propTypes = propTypes;
export default multiPromo;
