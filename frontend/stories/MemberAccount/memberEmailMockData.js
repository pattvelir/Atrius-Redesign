export default {
  accountHeading: {
    title: "Email Preferences",
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
        isActive: true,
      },
      {
        name: "Account Security",
        url: "/?path=/story/5-pages-member-account--member-account",
        isActive: false,
      },
    ],
  },
  frequency: {
    legend: {
      legendTitle: "Email subscriptions",
      legendBody:
        "Form Group general description - Maecenas faucibus mollis interdum. Lorem ipsum dolor sit amet, consectetur adipscing elit.",
      messageTitle: "Optional Form Group MEssage/Icon",
      messageBody: "Sit phareta adipiscing condeimentum bibendum",
      messageIcon: "info-circle",
    },
    use50: true,
    test: "test",
    forceColumn: true,
    forceFullWidth: true,
    groups: [
      {
        groupLabel: "How often would you like to recieve emails from us?",
        fields: [
          {
            label: "Daily",
            name: "frequency",
            type: "radio",
            value: "Daily",
            checked: true,
          },
          {
            label: "Weekly",
            name: "frequency",
            type: "radio",
            value: "Weekly",
          },
          {
            label: "Monthly",
            name: "frequency",
            type: "radio",
            value: "Monthly",
          },
        ],
      },
      {
        groupLabel: "Select which lists you'd like to receive emails from:",
        col50: true,
        fields: [
          {
            label: "Selected Interest Item",
            name: "sample-checkbox1",
            type: "checkbox",
            inputdescription:
              "<span><strong>Email List Concise Description</strong> Lorem ipsum dolar sit amus.</span>",
            checked: true,
          },
          {
            label: "Intereset Item",
            name: "sample-checkbox2",
            type: "checkbox",
            inputdescription:
              "<span><strong>Email List Concise Description</strong> Lorem ipsum dolar sit amus.</span>",
            checked: true,
          },
          {
            label: "Design",
            name: "sample-checkbox3",
            type: "checkbox",
            inputdescription:
              "<span><strong>Email List Concise Description</strong> Lorem ipsum dolar sit amus.</span>",
            checked: true,
          },
          {
            label: "Economics",
            name: "sample-checkbox4",
            type: "checkbox",
            inputdescription:
              "<span><strong>Email List Concise Description</strong> Lorem ipsum dolar sit amus.</span>",
            checked: true,
          },
          {
            label: "Lorem ipsum dolor",
            name: "sample-checkbox5",
            inputdescription:
              "<span><strong>Email List Concise Description</strong> Lorem ipsum dolar sit amus.</span>",
            type: "checkbox",
          },
          {
            label: "Lorem Ipsum",
            name: "sample-checkbox6",
            inputdescription:
              "<span><strong>Email List Concise Description</strong> Lorem ipsum dolar sit amus.</span>",
            type: "checkbox",
          },
        ],
        selectAll: {
          error: false,
          errorMsg: "",
          label: "Select All",
          name: "sample-checkbox13",
          type: "checkbox",
        },
        selectNone: {
          error: false,
          errorMsg: "",
          label: "Select None",
          name: "sample-checkbox13",
          type: "checkbox",
        },
      },
    ],
  },
  optOut: {
    legend: {
      legendTitle: "Email Opt Out",
      legendBody:
        "Form Group general description - Maecenas faucibus mollis interdum. Lorem ipsum dolor sit amet, consectetur adipscing elit.",
      messageTitle: "Optional Form Group MEssage/Icon",
      messageBody: "Sit phareta adipiscing condeimentum bibendum",
      messageIcon: "info-circle",
    },
    use50: true,
    forceRow: true,
    removeNegativeMargin: true,
    groups: [
      {
        groupLabel: "Prefer to not receive any emails from us?",
        fields: [
          {
            label: "Opt Out of All Email Communications",
            name: "optOut",
            type: "checkbox",
          },
        ],
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
