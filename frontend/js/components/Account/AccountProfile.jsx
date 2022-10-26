import React from "react";
import { string, shape } from "prop-types";

import { breakpoint } from "../../breakpoint.js";

import Icon from "../Icon/Icon.jsx";
import ImageElement from "../ImageElement/ImageElement.jsx";

const propTypes = {
  firstName: string.isRequired,
  lastName: string.isRequired,
  profileTitle: string,
  profileInfo: shape({
    Email: string,
    Phone: string,
    Address: string,
  }),
  profileSocial: shape({
    linkedin: string,
    facebook: string,
    twitter: string,
  }),
  profileImage: shape({
    orientation: string,
    description: string,
    srcset: string,
    sizes: string,
  }),
};

const AccountProfile = (props) => {
  const {
    firstName,
    lastName,
    profileTitle,
    profileInfo,
    profileSocial,
    profileImage,
  } = props;

  return (
    <div className="member-profile__header">
      <figure className="member-profile__image">
        <ImageElement
          alt={profileImage.alt}
          srcSet={profileImage.srcset}
          sizes={profileImage.sizes || "150px"}
        />
      </figure>

      <h2 className="member-profile__name">
        {firstName} {lastName}
      </h2>
      {profileTitle && (
        <p
          dangerouslySetInnerHTML={{ __html: profileTitle }}
          className="member-profile__title"
        />
      )}
      {profileInfo && (
        <ul className="member-profile__info">
          {Object.keys(profileInfo).map((key) => (
            <li className="member-profile__info-item" key={key}>
              <span className="member-profile__info-title">{key}:</span>{" "}
              {profileInfo[key]}
            </li>
          ))}
        </ul>
      )}
      {profileSocial && (
        <div className="memeber-profile__social">
          Also find {firstName} on:
          <ul className="memeber-profile__social-links">
            {Object.keys(profileSocial).map((key) => (
              <li key={key}>
                <a href={profileSocial[key]} aria-label={key}>
                  <Icon className="connect__social-icon" iconName={`${key}`} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

AccountProfile.propTypes = propTypes;
export default AccountProfile;
