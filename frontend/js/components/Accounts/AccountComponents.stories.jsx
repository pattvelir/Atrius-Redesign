import React from "react";

import memberAccountMockData from "./data/memberAccountMockData.js";
import memberEmailMockData from "./data/memberEmailMockData.js";
import memberInterestsMockData from "./data/memberInterestsMockData.js";
import memberProfileMockData from "./data/memberProfileMockData.js";
import memberNavigationMockData from "./data/memberNavigationMockData.js";

import ContainerFull from "../Container/ContainerFull.jsx";
import ContainerBleed from "../Container/ContainerBleed.jsx";

import AccountHeader from "../Account/AccountHeader.jsx";
import AccountMessageArea from "../Account/AccountMessageArea.jsx";
import AccountFooter from "../Account/AccountFooter.jsx";

import AccountNavigation from "../Account/AccountNavigation.jsx";
import AccountResetEmail from "../Account/AccountResetEmail.jsx";
import AccountResetPassword from "../Account/AccountResetPassword.jsx";
import InputGroup from "../Account/InputGroup.jsx";

import AccountProfile from "../Account/AccountProfile.jsx";
import AccountProfilePhoto from "../Account/AccountProfilePhoto.jsx";
import AccountPersonalInfo from "../Account/AccountPersonalInfo.jsx";
import AccountContactInfo from "../Account/AccountContactInfo.jsx";
import AccountAddressInfo from "../Account/AccountAddressInfo.jsx";
import AccountSocialAccounts from "../Account/AccountSocialAccounts.jsx";
import AccountShortBio from "../Account/AccountShortBio.jsx";

export default {
  title: "Components/Account",
};

export const accountSecurity = () => (
  <form className="account-form js-form" action="/APIcall" method="post">
    <ContainerFull>
      <AccountHeader {...memberAccountMockData.accountHeading} />
      <AccountMessageArea {...memberAccountMockData.topMessage} />
    </ContainerFull>
    <ContainerFull>
      <AccountResetEmail {...memberAccountMockData.resetEmail} />
      <AccountResetPassword {...memberAccountMockData.resetPassword} />
    </ContainerFull>
    <ContainerFull>
      <AccountMessageArea {...memberAccountMockData.bottomMessage} />
      <AccountFooter />
    </ContainerFull>
  </form>
);

export const emailPreferences = () => (
  <form
    className="account-form js-interests-form"
    action="/APIcall"
    method="post"
  >
    <ContainerFull>
      <AccountHeader {...memberEmailMockData.accountHeading} />
      <AccountMessageArea {...memberEmailMockData.topMessage} />
    </ContainerFull>
    <ContainerFull>
      <InputGroup {...memberEmailMockData.frequency} />
      <InputGroup {...memberEmailMockData.optOut} />
    </ContainerFull>
    <ContainerFull>
      <AccountMessageArea {...memberEmailMockData.bottomMessage} />
      <AccountFooter />
    </ContainerFull>
  </form>
);

export const interests = () => (
  <React.Fragment>
    <form
      className="account-form interests js-interests-form"
      action="/APIcall"
      method="post"
    >
      <ContainerFull>
        <AccountHeader {...memberInterestsMockData.interestsHeading} />
        <AccountMessageArea {...memberInterestsMockData.topMessage} />
      </ContainerFull>
      <ContainerFull>
        <InputGroup {...memberInterestsMockData.interestsGroup} />
        <InputGroup {...memberInterestsMockData.interestsColumnsVarient} />
      </ContainerFull>
      <ContainerFull>
        <AccountMessageArea {...memberInterestsMockData.bottomMessage} />
        <AccountFooter />
      </ContainerFull>
    </form>
  </React.Fragment>
);

export const memberProfile = () => (
  <div className="member-profile js-profile">
    <form className="js-profile-form" action="/APIcall" method="post">
      <ContainerFull>
        <AccountHeader
          {...memberProfileMockData.profileHeading}
          isProfile={true}
        />
        <AccountMessageArea {...memberProfileMockData.statusMessage} />
        <div className="js-preview js-toggle">
          <AccountProfile {...memberProfileMockData.profileInfo} />
          <div className="member-profile__about">
            {memberProfileMockData.profileInfo.firstName && (
              <p className="manage-profile__about-label">
                More about{" "}
                <span>{memberProfileMockData.profileInfo.firstName}</span>
              </p>
            )}
            {memberProfileMockData.personalInfo.bio && (
              <div
                dangerouslySetInnerHTML={{
                  __html: memberProfileMockData.personalInfo.bio,
                }}
              />
            )}
          </div>
        </div>
        <div className="js-form-display is-hidden js-toggle">
          <AccountProfilePhoto {...memberProfileMockData.profilePhoto} />
          <AccountPersonalInfo {...memberProfileMockData.personalInfo} />
          <AccountContactInfo {...memberProfileMockData.contactInfo} />
          <AccountAddressInfo {...memberProfileMockData.addressInfo} />
          <AccountSocialAccounts {...memberProfileMockData.socialAccounts} />
          <AccountShortBio {...memberProfileMockData.shortBio} />
          <AccountMessageArea {...memberProfileMockData.statusMessage} />
          <div className="member-profile__button-block">
            <button className="btn btn--secondary js-toggle-btn" type="button">
              Cancel
            </button>
            <button className="btn btn--primary js-save-btn" type="submit">
              Save Changes
            </button>
          </div>
        </div>
      </ContainerFull>
    </form>
  </div>
);

export const memberAccountNavigation = () => (
  <AccountNavigation {...memberNavigationMockData} />
);
