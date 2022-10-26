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

const AccountShortBio = (props) => {
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
        {fields && (
          <div
            className={cx("account-form__fields", {
              "account-form__fields--50-50": use50,
            })}
          >
            {fields.map((field, index) => (
              <React.Fragment key={index}>
                <TextInput {...field} />
                <div id="editor" className="pell">
                  <div className="account-form__rte-count-container">
                    <span className="js-rte-count account-form__rte-count">
                      {field.textLimit}
                    </span>{" "}
                    Characters Total
                  </div>
                </div>
                <span role="alert" className="sc-form-item__error-msg">
                  {field.errorMsg}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </fieldset>
  );
};

AccountShortBio.propTypes = propTypes;
export default AccountShortBio;
