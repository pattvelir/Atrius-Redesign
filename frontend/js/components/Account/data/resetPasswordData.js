export default {
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
      errorMsg: "",
      label: "Current Password",
      name: "current-password",
      placeholder: "************",
      required: true,
      showPassword: false,
      type: "password",
      validationType: "password",
      helperText: "",
    },
    {
      autocomplete: "",
      error: false,
      errorMsg: "",
      label: "New Password",
      name: "new-password",
      placeholder: "************",
      required: true,
      showPassword: false,
      type: "password",
      validationType: "password",
      helperText:
        "Passwords must be 8 characters long and include one capital letter and one number",
    },
  ],
};
