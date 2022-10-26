import React from "react";
import FullTemplate from "../00-templates/FullTemplate/FullTemplate.jsx";

import memberAccountMockData from "../../js/components/Accounts/data/memberAccountMockData.js";
import memberEmailMockData from "../../js/components/Accounts/data/memberEmailMockData.js";
import memberInterestsMockData from "../../js/components/Accounts/data/memberInterestsMockData.js";
import memberProfileMockData from "../../js/components/Accounts/data/memberProfileMockData.js";

import ContainerFull from "../../js/components/Container/ContainerFull.jsx";

import AccountHeader from "../../js/components/Account/AccountHeader.jsx";
import AccountMessageArea from "../../js/components/Account/AccountMessageArea.jsx";
import AccountFooter from "../../js/components/Account/AccountFooter.jsx";

import AccountNavigation from "../../js/components/Account/AccountNavigation.jsx";
import AccountResetEmail from "../../js/components/Account/AccountResetEmail.jsx";
import AccountResetPassword from "../../js/components/Account/AccountResetPassword.jsx";
import InputGroup from "../../js/components/Account/InputGroup.jsx";

import AccountProfile from "../../js/components/Account/AccountProfile.jsx";
import AccountProfilePhoto from "../../js/components/Account/AccountProfilePhoto.jsx";
import AccountPersonalInfo from "../../js/components/Account/AccountPersonalInfo.jsx";
import AccountContactInfo from "../../js/components/Account/AccountContactInfo.jsx";
import AccountAddressInfo from "../../js/components/Account/AccountAddressInfo.jsx";
import AccountSocialAccounts from "../../js/components/Account/AccountSocialAccounts.jsx";
import AccountShortBio from "../../js/components/Account/AccountShortBio.jsx";

export default {
  title: "Pages/Member Account Page",
  component: FullTemplate,
};

export const accountSecurity = () => (
  <FullTemplate>
    <form className="account-form js-form" action="/APIcall" method="post">
      <ContainerFull>
        <AccountNavigation {...memberAccountMockData.accountNavigation} />
      </ContainerFull>
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
  </FullTemplate>
);

export const emailPreferences = () => (
  <FullTemplate>
    <form
      className="account-form js-interests-form"
      action="/APIcall"
      method="post"
    >
      <ContainerFull>
        <AccountNavigation {...memberEmailMockData.accountNavigation} />
      </ContainerFull>
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
  </FullTemplate>
);

export const interests = () => (
  <FullTemplate>
    <ContainerFull>
      <AccountNavigation {...memberInterestsMockData.interestsNavigation} />
    </ContainerFull>
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
  </FullTemplate>
);

export const memberProfile = () => (
  <FullTemplate>
    <div className="member-profile js-profile">
      <form className="js-profile-form" action="/APIcall" method="post">
        <ContainerFull>
          <AccountNavigation {...memberProfileMockData.profileNavigation} />
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
              <button
                className="btn btn--secondary js-toggle-btn"
                type="button"
              >
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
  </FullTemplate>
);
