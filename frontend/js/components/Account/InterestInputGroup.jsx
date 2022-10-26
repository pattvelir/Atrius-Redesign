import React from "react";
import { string, bool, array, object, arrayOf, shape } from "prop-types";
import cx from "classnames";

import RadioCheckbox from "../FormItems/RadioCheckbox.jsx";
import Legend from "../FormItems/Legend.jsx";

const propTypes = {
  legend: object,
  use50: bool,
  groups: arrayOf(
    shape({
      fields: array,
      groupLabel: string,
      selectAll: object,
    }),
  ),
};

const InterestInputGroup = (props) => {
  const { legend, use50, groups } = props;

  return (
    <fieldset className="account-form__fieldset interest__fieldset">
      <div className="account-form__field-group">
        <Legend {...legend} />
        <div
          className={cx("account-form__fields", {
            "account-form__fields--50-50": use50,
            "account-form__fields--strech-inputs": groups && groups.length > 1,
          })}
        >
          {groups &&
            groups.map((group, i) => {
              return (
                <div key={i} className="interest__group js-interests-group">
                  {group.groupLabel && (
                    <div className="interest__title">{group.groupLabel}</div>
                  )}

                  <div className="interests__input-row js-group">
                    {group.fields.map((field, i) => {
                      return (
                        <div key={i} className="interest__input">
                          <RadioCheckbox {...field} />
                        </div>
                      );
                    })}
                  </div>

                  {group.selectAll && (
                    <div className="js-select-all interest__select-all">
                      <RadioCheckbox {...group.selectAll} />
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
InterestInputGroup.propTypes = propTypes;
export default InterestInputGroup;
