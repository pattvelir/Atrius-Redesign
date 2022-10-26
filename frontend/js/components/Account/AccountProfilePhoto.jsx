import React from "react";
import cx from "classnames";
import { string, bool, array } from "prop-types";

import Legend from "../FormItems/Legend.jsx";
import FileInput from "../FormItems/FileInput.jsx";

const propTypes = {
  legendTitle: string,
  legendBody: string,
  messageTitle: string,
  messageBody: string,
  messageIcon: string,
  use50: bool,
  fields: array,
};

const AccountProfilePhoto = (props) => {
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
          <div className="account-form__photo-upload">
            {fields &&
              fields.map((field, index) => (
                <FileInput key={index} {...field} />
              ))}
          </div>
        </div>
      </div>
    </fieldset>
  );
};

AccountProfilePhoto.propTypes = propTypes;
export default AccountProfilePhoto;
