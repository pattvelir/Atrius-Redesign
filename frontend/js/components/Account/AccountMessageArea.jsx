import React from "react";
import { string } from "prop-types";

const propTypes = {
  color: string,
  icon: string.isRequired,
  message: string.isRequired,
};

const accountMessage = (props) => {
  const { color, icon, message } = props;

  const bgStyle = color ? { backgroundColor: color } : null;

  return (
    <div
      className="account-message js-error-box is-hidden"
      role="alert"
      style={bgStyle}
    >
      <svg
        className="icon"
        xmlns="http://www.w3.org/2000/svg"
        width="512"
        height="512"
        viewBox="0 0 512 512"
      >
        <path d="M256 48c-55.559 0-107.792 21.636-147.078 60.922S48 200.441 48 256s21.636 107.792 60.922 147.078S200.441 464 256 464s107.792-21.636 147.078-60.922S464 311.559 464 256s-21.636-107.792-60.922-147.078S311.559 48 256 48zm0-48c141.385 0 256 114.615 256 256S397.385 512 256 512 0 397.385 0 256 114.615 0 256 0zm-32 352h64v64h-64zm0-256h64v192h-64z" />
      </svg>
      <span
        className="js-error-msg"
        dangerouslySetInnerHTML={{ __html: message }}
      ></span>
    </div>
  );
};

accountMessage.propTypes = propTypes;
export default accountMessage;
