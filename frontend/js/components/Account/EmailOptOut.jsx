import React from "react";
import { bool, arrayOf, shape, string, array, object } from "prop-types";
import cx from "classnames";

import Legend from "../FormItems/Legend.jsx";
import RadioCheckbox from "../FormItems/RadioCheckbox.jsx";

const propTypes = {
  use50: bool,
  groups: arrayOf(
    shape({
      fields: array,
      selectAll: object,
      label: string,
    }),
  ).isRequired,
};

const emailOptOut = (props) => {
  const { use50, groups } = props;

  return (
    <fieldset className="account-form__fieldset interest__fieldset">
      <div className="account-form__field-group">
        <Legend {...props} />
        <div
          className={cx("account-form__fields", {
            "account-form__fields--50-50": use50,
            "account-form__fields--strech-inputs": groups && groups.length > 1,
          })}
        >
          {groups.map((group, i) => {
            const { label, fields, selectAll } = group;
            return (
              <div key={i} className="interest__group js-interests-group">
                {label && <div className="interest__title">{label}</div>}

                <div className="interests__input-row js-group">
                  {fields.map((field, i) => {
                    <div className="interest__input" key={i}>
                      <RadioCheckbox {...field} />
                    </div>;
                  })}
                </div>

                {selectAll && (
                  <div className="js-select-all interest__select-all">
                    <RadioCheckbox {...selectAll} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
};

emailOptOut.propTypes = propTypes;
export default emailOptOut;
