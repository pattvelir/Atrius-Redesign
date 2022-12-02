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
    <div className={`component multi-promo ${classNames || ""}`}>
      {title && <h2 className="multi-promo__title txt-h2">{title}</h2>}
      <section className="multi-promo__items">
        {promos.map((promo, i) => {
          promo.sizes = promo.sizes
            ? promo.sizes
            : "(min-width: 680px) 50vw, 100vw";
          return (
            <div className="multi-promo__promo" key={i}>
              <Promo {...promo} theme="theme2" />
            </div>
          );
        })}
      </section>
    </div>
  );
};

multiPromo.propTypes = propTypes;
export default multiPromo;
