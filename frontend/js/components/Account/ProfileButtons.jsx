import React from "react";
import {} from "prop-types";

const propTypes = {};

const profileButtons = (props) => {
  const {} = props;

  return (
    <div className="account-buttons">
      <button
        className="btn btn--primary js-toggle-btn js-toggle"
        type="button"
      >
        Edit Profile
      </button>
      <button
        className="btn btn--secondary is-hidden js-toggle-btn js-toggle"
        type="button"
      >
        Cancel
      </button>
      <button
        className="btn btn--primary is-hidden js-save-btn js-toggle"
        type="submit"
      >
        Save Changes
      </button>
    </div>
  );
};
profileButtons.propTypes = propTypes;
export default profileButtons;
