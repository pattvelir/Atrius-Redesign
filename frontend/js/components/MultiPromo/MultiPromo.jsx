import React from "react";
import { string, array } from "prop-types";

import Promo from "../Promo/Promo.jsx";

const propTypes = {
  classNames: string,
  title: string,
  description: string,
  promos: array.isRequired,
};

const multiPromo = (props) => {
  const { classNames, title, description, promos, children } = props;

  return (
    <section className={`multi-promo ${classNames || ""}`}>
      {title && <h2 className="multi-promo__title">{title}</h2>}
      <p className="multi-promo__description">{description}</p>
      <div
        className={`multi-promo__items--${promos?.length} multi-promo__container`}
      >
        {promos != null
          ? promos?.map((promo, i) => <Promo {...promo} key={i} />)
          : children}
      </div>
    </section>
  );
};

multiPromo.propTypes = propTypes;
export default multiPromo;
