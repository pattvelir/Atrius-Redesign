import React from "react";
import IconComponent from "./Icon.jsx";
import cx from "classnames";
const icons = [
  "appointment",
  "arrow_drop_up",
  "add_circle",
  "arrow_drop_down",
  "arrow-right",
  "camera",
  "check_box_outline_blank",
  "check_box",
  "check-circle",
  "check-mark",
  "check-square",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "close_circle",
  "close",
  "display_more",
  "equalizer",
  "fax",
  "grid",
  "globe",
  "google",
  "info-circle",
  "keyboard_arrow_down-disabled",
  "keyboard_arrow_down",
  "left-arrow",
  "list",
  "loading-squares",
  "location",
  "logo-full-black",
  "logo-full-optim-black",
  "logo-full-optim-white",
  "logo-full-optim",
  "logo-full-white",
  "logo-full",
  "logo-icon-black",
  "logo-icon-blue",
  "logo-icon-white",
  "map",
  "notification-circle",
  "pause",
  "phone",
  "play",
  "pub-date",
  "radio_button_checked",
  "radio_button_unchecked",
  "remove_circle",
  "right-arrow",
  "rss",
  "search-field",
  "search",
  "share",
  "sms",
  "social-email",
  "social-facebook",
  "social-instagram",
  "social-linkedin",
  "social-pinterest",
  "social-print",
  "social-share",
  "social-sms",
  "social-twitter",
  "social-youtube",
  "toggle_off",
  "toggle_on",
  "twitter",
  "unfold_less",
  "unfold_more",
  "youtube",
];
export const Icon = (args) => (
  <>
    <IconComponent
      className={cx("icon--24x24", [args.iconColor])}
      iconName={args.iconName}
    />
    <IconComponent
      className={cx("icon--36x36", [args.iconColor])}
      iconName={args.iconName}
    />{" "}
    <IconComponent
      className={cx("icon--48x48", [args.iconColor])}
      iconName={args.iconName}
    />
  </>
);

export const AllIcons = (args) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(10,1fr)",
      gridGap: "30px",
      gridTemplateRows: "auto",
    }}
  >
    {icons.map((i) => (
      <IconComponent
        key={i}
        className={cx([args.iconSize, args.iconColor])}
        iconName={i}
      />
    ))}
  </div>
);

export default {
  title: "Base/Icon",
  parameters: {
    controls: { expanded: true }, // Show full documentation for each property
  },
  argTypes: {
    iconName: {
      description: "Change icon (single view)",
      defaultValue: "arrow_drop_up",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "arrow_drop_up",
        },
      },
      options: icons,
      control: {
        type: "select", // for selecting between the array of options above
      },
    },
    iconSize: {
      description: "Change size (all view)",

      defaultValue: "icon--24x24",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "icon-24x24",
        },
      },
      options: ["icon-24x24", "icon--36x36", "icon--48x48"],
      control: {
        type: "select", // for selecting between the array of options above
      },
    },
    iconColor: {
      description: "Change color",
      defaultValue: "icon--black",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "icon--black",
        },
      },
      options: ["icon--black", "icon--white", "icon--special"],
      control: {
        type: "select", // for selecting between the array of options above
      },
    },
  },
};
