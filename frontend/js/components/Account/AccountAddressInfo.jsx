import React from "react";
import { string, bool, array } from "prop-types";
import cx from "classnames";

import Legend from "../FormItems/Legend.jsx";
import SelectInput from "../FormItems/SelectInput.jsx";
import TextInput from "../FormItems/TextInput.jsx";

const propTypes = {
  legendTitle: string,
  legendBody: string,
  messageTitle: string,
  messageBody: string,
  messageIcon: string,
  use50: bool,
  countrySelect: array,

  fields: array,
  stateSelect: array,
  zipInput: array,
};

const AccountAddressInfo = (props) => {
  const {
    legendTitle,
    legendBody,
    messageTitle,
    messageBody,
    messageIcon,
    use50,
    countrySelect,
    fields,
    stateSelect,
    zipInput,
  } = props;

  return (
    <fieldset className="account-form__fieldset">
      <div className="account-form__field-group">
        <Legend
          legendTitle={legendTitle}
          legendBody={legendBody}
          messageTitle={messageTitle}
          messageBody={messageBody}
          messageIcon={messageIcon}
        />
        <div
          className={cx("account-form__fields", {
            "account-form__fields--50-50": use50,
          })}
        >
          {countrySelect &&
            countrySelect.map((select, index) => (
              <SelectInput key={index} {...select} />
            ))}

          {fields &&
            fields.map((field, index) => <TextInput key={index} {...field} />)}

          {(stateSelect || zipInput) && <div className="flex-spacer"></div>}

          {stateSelect &&
            stateSelect.map((select, index) => (
              <SelectInput key={index} {...select} />
            ))}

          {zipInput &&
            zipInput.map((input, index) => (
              <TextInput key={index} {...input} />
            ))}
        </div>
      </div>
    </fieldset>
  );
};

AccountAddressInfo.propTypes = propTypes;
export default AccountAddressInfo;
