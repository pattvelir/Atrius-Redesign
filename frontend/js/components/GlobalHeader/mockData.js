export default {
  siteLogo: {
    title: "Atrius Health",
    logoSm: "/img/AtriusLogo145.png 145w",
    logoLg: "/img/AtriusLogo195.png 194w",
    sizesSm: "145px",
    sizesLg: "194px",
  },
  privacy: {
    policyDescription:
      "This is a description of our privacy policy, the whole policy is located ",
    buttonText: "I Accept",
  },
  primaryNav: [
    {
      href: "#",
      label: "Find a Provider",
    },
    {
      href: "#",
      label: "Locations",
      featureTitle: "Find a Location",
      featureDescription:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      featureLink: {
        href: "#",
        label: "See All Locations",
      },
      menus: [
        {
          title: "Regions and Offices",
          submenu: [
            { href: "#link1", label: "City of Boston" },
            { href: "#link2", label: "Greater Boston" },
            { href: "#link3", label: "Administrative Offices" },
          ],
        },
      ],
    },
    {
      href: "#",
      label: "Services",
      featureTitle: "Our Services",
      featureDescription:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      featureLink: {
        href: "#",
        label: "See All Services",
      },
      menus: [
        {
          title: "Most Visted Services",
          submenu: [
            { href: "#link1", label: "City of Boston" },
            { href: "#link2", label: "Greater Boston" },
            { href: "#link3", label: "Administrative Offices" },
          ],
        },
      ],
    },
    {
      href: "#",
      label: "Patient Information",
      featureTitle: "Patient Information",
      featureDescription:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      featureLink: {
        href: "#",
        label: "Visit Patient Information",
      },
      menus: [
        {
          title: "Getting Care",
          submenu: [
            { href: "#", label: "Become a patient" },
            { href: "#link1", label: "Sign into MyHealth Online" },
            { href: "#link2", label: "Fill a prescription" },
            { href: "#link3", label: "Order contact lenses" },
            { href: "#link3", label: "Request medical records" },
          ],
        },
        {
          title: "Insurance & Billing",
          submenu: [
            { href: "#", label: "Insurance" },
            { href: "#link1", label: "Billing" },
            { href: "#link2", label: "Estimate cost for care" },
          ],
        },
      ],
    },
    {
      href: "#",
      label: "Healthy Living",
      featureTitle: "Healthy Living",
      featureDescription:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      featureLink: {
        href: "#",
        label: "Visit Healthy Living",
      },
      menus: [
        {
          title: "Atrius Blog",
          submenu: [{ href: "#", label: "Read our blog" }],
        },
        {
          title: "Healthy Topics",
          submenu: [
            { href: "#", label: "COVID-19" },
            { href: "#link1", label: "Seasonal Flu" },
            { href: "#link2", label: "Heart Care" },
          ],
          all: {
            href: "#",
            label: "See All Topics",
          },
        },
      ],
    },
  ],
  utilityNav: {
    divider: false,
    items: [
      {
        href: "#",
        label: "My Health Online",
        icon: "heart",
      },
      {
        href: "#",
        label: "Careers",
        icon: "careers",
      },
    ],
  },
  langSelect: {
    currentItem: "Español",
    items: [
      {
        href: "#",
        label: "English",
        langAttr: "en",
      },
      {
        href: "#",
        label: "Español",
        langAttr: "es",
      },
      {
        href: "#",
        label: "Français",
        langAttr: "fr",
      },
      {
        href: "#",
        label: "Deutsch",
        langAttr: "de",
      },
    ],
  },
};
