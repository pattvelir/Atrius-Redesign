import React from "react";

const propTypes = {};

const accountButtons = (props) => {
  const {} = props;

  return (
    <div className="account-buttons">
      <button className="btn btn--cancel js-cancel-btn" type="button">
        Cancel
      </button>
      <button className="btn btn--primary js-submit-btn" type="submit">
        Save Changes
      </button>
    </div>
  );
};

accountButtons.propTypes = propTypes;
export default accountButtons;
