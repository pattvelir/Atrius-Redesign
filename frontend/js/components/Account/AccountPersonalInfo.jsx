import React from "react";
import { string, bool, array } from "prop-types";
import cx from "classnames";

import Legend from "../FormItems/Legend.jsx";
import TextInput from "../FormItems/TextInput.jsx";

const propTypes = {
  legendTitle: string,
  legendBody: string,
  messageTitle: string,
  messageBody: string,
  messageIcon: string,
  use50: bool,
  fields: array,
};

const AccountPersonalInfo = (props) => {
  const {
    legendTitle,
    legendBody,
    messageTitle,
    messageBody,
    messageIcon,
    use50,
    fields,
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
          {fields &&
            fields.map((field, index) => <TextInput key={index} {...field} />)}
        </div>
      </div>
    </fieldset>
  );
};

AccountPersonalInfo.propTypes = propTypes;
export default AccountPersonalInfo;
