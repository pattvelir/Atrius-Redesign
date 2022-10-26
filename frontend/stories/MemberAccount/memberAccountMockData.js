export default {
  accountHeading: {
    title: "Account Security",
    subtitle:
      "Concise Description - Complete your profile below in order to enhance your website experience",
  },
  accountNavigation: {
    items: [
      {
        name: "Profile",
        url: "/?path=/story/5-pages-member-profile--member-profile",
        isActive: false,
      },
      {
        name: "Interests",
        url: "/?path=/story/5-pages-member-interests--member-interests",
        isActive: false,
      },
      {
        name: "Email Preferences",
        url: "/?path=/story/5-pages-member-email--member-email",
        isActive: false,
      },
      {
        name: "Account Security",
        url: "/?path=/story/5-pages-member-account--member-account",
        isActive: true,
      },
    ],
  },
  resetEmail: {
    legendTitle: "Reset Username/Email Address",
    legendBody:
      "Form Group general description - Maecenas faucibus mollis interdum. Lorem ipsum dolor sit amet, consectetur adipscing elit.",
    messageTitle: "Optional Form Group MEssage/Icon",
    messageBody: "Sit phareta adipiscing condeimentum bibendum",
    messageIcon: "info-circle",
    use50: true,
    fields: [
      {
        autocomplete: "",
        error: false,
        errorMsg: "",
        label: "How ofen would you like to receive emails from us?",
        name: "sample-text",
        placeholder: "Jane.Doe@email.com",
        required: true,
        showPassword: false,
        type: "email",
        validationType: "email",
        value: "Jane.Doe@email.com",
        helperText:
          "Updating your Email Address will also update your Email Address within your Profile",
      },
    ],
  },
  resetPassword: {
    legendTitle: "Reset Password",
    legendBody:
      "Form Group general description - Maecenas faucibus mollis interdum. Lorem ipsum dolor sit amet, consectetur adipscing elit.",
    messageTitle: "",
    messageBody: "",
    messageIcon: "",
    use50: true,
    fields: [
      {
        autocomplete: "",
        error: false,
        errorMsg: "Your current password was entered incorrectly",
        extraClass: "js-new-password",
        label: "Current Password",
        name: "current-password",
        placeholder: "************",
        required: true,
        showPassword: false,
        type: "password",
        validationType: "new-password",
        helperText: "",
      },
      {
        autocomplete: "",
        error: false,
        errorMsg: "Your new password is not a valid password",
        extraClass: "js-new-password",
        label: "New Password",
        name: "new-password",
        placeholder: "************",
        required: true,
        showPassword: false,
        type: "password",
        validationType: "new-password",
        helperText:
          "Passwords must be 8 characters long and include one capital letter and one number",
      },
    ],
  },
  topMessage: {
    color: "",
    icon: "check-circle",
    message: "Your Interests have been Successfully Updated!",
  },
  bottomMessage: {
    color: "",
    icon: "notification-circle",
    message:
      "Form message area for important messages regarding validation and such! <a href='#'>These should include jump links</a>",
  },
};
