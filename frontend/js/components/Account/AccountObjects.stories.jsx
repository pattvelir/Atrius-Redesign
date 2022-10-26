import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";

import addressInfo from "./data/addressInfo.js";
import AccountAddressInfo from "./AccountAddressInfo.jsx";
import contactInfo from "./data/contactInfo.js";
import AccountContactInfo from "./AccountContactInfo.jsx";
import personalInfo from "./data/personalInfo.js";
import AccountPersonalInfo from "./AccountPersonalInfo.jsx";
import profileData from "./data/profileData.js";
import AccountProfile from "./AccountProfile.jsx";
import profilePhotoData from "./data/profilePhotoData.js";
import AccountProfilePhoto from "./AccountProfilePhoto.jsx";
import resetEmailData from "./data/resetEmailData.js";
import AccountResetEmail from "./AccountResetEmail.jsx";
import resetPasswordData from "./data/resetPasswordData.js";
import AccountResetPassword from "./AccountResetPassword.jsx";
import shortBioData from "./data/shortBioData.js";
import AccountShortBio from "./AccountShortBio.jsx";
import socialAccountsData from "./data/socialAccountsData.js";
import AccountSocialAccounts from "./AccountSocialAccounts.jsx";
import interestInputData from "./data/interestInputData.js";
import InterestInputGroup from "./InterestInputGroup.jsx";
import inputGroupData from "./data/inputGroupData.js";
import InputGroup from "./InputGroup.jsx";
import emailOptOutData from "./data/emailOptOutData.js";
import EmailOptOut from "./EmailOptOut.jsx";

import AccountButtons from "./AccountButtons.jsx";
import AccountFooter from "./AccountFooter.jsx";
import AccountHeader from "./AccountHeader.jsx";
import AccountMessageArea from "./AccountMessageArea.jsx";
import ProfileButtons from "./ProfileButtons.jsx";

export default {
  title: "Components/Account/Objects",
};

export const accountButtons = () => (
  <ContainerFull>
    <AccountButtons />
  </ContainerFull>
);

export const accountFooter = () => (
  <ContainerFull>
    <AccountFooter />
  </ContainerFull>
);

export const accountHeader = () => (
  <ContainerFull>
    <AccountHeader
      title="Account Security"
      subtitle="Concise Description - Complete your profile below in order to enhance your website experience"
    />
  </ContainerFull>
);

export const accountMessageArea = () => (
  <ContainerFull>
    <AccountMessageArea
      color=""
      icon="notification-circle"
      message="Form message area for important messages regarding validation and such! <a href='#'>These should include jump links</a>"
    />
  </ContainerFull>
);

export const profileButtons = () => (
  <ContainerFull>
    <ProfileButtons />
  </ContainerFull>
);

export const accountAddressInfo = () => <AccountAddressInfo {...addressInfo} />;

export const accountContactInfo = () => <AccountContactInfo {...contactInfo} />;

export const accountPersonalInfo = () => (
  <AccountPersonalInfo {...personalInfo} />
);

export const memberProfile = () => <AccountProfile {...profileData} />;

export const accountProfilePhoto = () => (
  <AccountProfilePhoto {...profilePhotoData} />
);

export const accountResetEmail = () => (
  <AccountResetEmail {...resetEmailData} />
);

export const accountResetPassword = () => (
  <AccountResetPassword {...resetPasswordData} />
);

export const accountShortBio = () => <AccountShortBio {...shortBioData} />;

export const accountSocialAccounts = () => (
  <AccountSocialAccounts {...socialAccountsData} />
);

export const interests = () => (
  <ContainerFull>
    <InterestInputGroup {...interestInputData} />
  </ContainerFull>
);

export const inputGroup = () => (
  <ContainerFull>
    <InputGroup {...inputGroupData} />
  </ContainerFull>
);

export const emailOptOut = () => (
  <ContainerFull>
    <EmailOptOut {...emailOptOutData} />
  </ContainerFull>
);
