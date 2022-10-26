import React from "react";
import { string, bool, array, object, arrayOf, shape } from "prop-types";
import cx from "classnames";

import RadioCheckbox from "../FormItems/RadioCheckbox.jsx";
import Legend from "../FormItems/Legend.jsx";

const propTypes = {
  legend: object,
  use50: bool,
  forceColumn: bool,
  forceRow: bool,
  groups: arrayOf(
    shape({
      fields: array,
      groupLabel: string,
      selectAll: object,
    }),
  ),
  forceFullWidth: bool,
  removeNegativeMargin: bool,
};

const InputGroup = (props) => {
  const {
    legend,
    use50,
    forceRow,
    forceColumn,
    groups,
    removeNegativeMargin,
    forceFullWidth,
  } = props;

  return (
    <fieldset className="account-form__fieldset interest__fieldset">
      <div className="account-form__field-group">
        <Legend {...legend} />
        <div
          className={cx("account-form__fields", {
            "account-form__fields--50-50": use50,
            "account-form__fields--strech-inputs": groups && groups.length > 1,
            "account-form__fields--force-column": forceColumn,
            "account-form__fields--force-row": forceRow,
            "override-margin": removeNegativeMargin,
          })}
        >
          {groups &&
            groups.map((group, i) => {
              return (
                <div
                  key={i}
                  className={cx("interest__group js-interests-group", {
                    "interest__group--full-width": forceFullWidth,
                  })}
                >
                  {group.groupLabel && (
                    <div className="interest__title">{group.groupLabel}</div>
                  )}

                  <div
                    className={cx("interests__input-row js-group", {
                      "interests__input-row--column-50": group.col50,
                    })}
                  >
                    {group.fields.map((field, i) => {
                      return (
                        <div key={i} className="interest__input">
                          <RadioCheckbox {...field} />
                        </div>
                      );
                    })}
                  </div>

                  {(group.selectAll || group.selectNone) && (
                    <div className="interest__selectGroup">
                      {group.selectAll && (
                        <div className="js-select-all interest__select-all">
                          <RadioCheckbox {...group.selectAll} />
                        </div>
                      )}
                      {group.selectNone && (
                        <div className="js-select-none interest__select-all">
                          <RadioCheckbox {...group.selectNone} />
                        </div>
                      )}
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
InputGroup.propTypes = propTypes;
export default InputGroup;
