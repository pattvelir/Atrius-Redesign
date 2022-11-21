import propTypes from "./TextIcon.propTypes.js";
import Icon from "../Icon/Icon.jsx";
import cx from "classnames";
const TextIcon = ({ text, icon, align, classNames }) => {
  return (
    <span className={cx("text-icon", [`text-icon--text-${align}`, classNames])}>
      {text && <span>{text}</span>}
      {icon && <Icon iconName={icon} />}
    </span>
  );
};
TextIcon.defaultProps = { align: "left" };
TextIcon.propTypes = propTypes;
export default TextIcon;
