import React from "react";
import { string } from "prop-types";
import "./page-header.scss";

const propTypes = { title: string, subtitle: string, contentType: string };

const PageHeader = (props) => {
  const { title, subtitle, contentType } = props;
  return (
    <section className="page-header container">
      {contentType && (
        <div className="page-header__type eyebrow">{contentType}</div>
      )}
      <h1 className="page-header__title mainsection">{title}</h1>
      {subtitle && (
        <div className="page-header__subtitle quote">{subtitle}</div>
      )}
    </section>
  );
};
PageHeader.propTypes = propTypes;
export default PageHeader;
