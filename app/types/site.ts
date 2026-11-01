export interface NavLinkItem {
  label: string;
  href: string;
}

export interface SocialLinkItem {
  label: string;
  href: string;
  platform: "facebook" | "x" | "instagram" | "youtube" | "linkedin";
}

export interface SiteData {
  brand: {
    name: string;
    tagline: string;
    logoLight: string;
    logoDark: string;
    description: string;
  };
  header: {
    navLinks: NavLinkItem[];
    contactLink?: {
      label: string;
      href: string;
    };
    donateCta: {
      label: string;
      href: string;
    };
  };
  footer: {
    newsletter: {
      badge: string;
      title: string;
      description: string;
      placeholder: string;
      buttonLabel: string;
      successMessage: string;
    };
    companyHeading: string;
    companyLinks: NavLinkItem[];
    programsHeading: string;
    programLinks: NavLinkItem[];
    causesHeading: string;
    contact: {
      address: string;
      email: string;
      phone: string;
    };
    socials: SocialLinkItem[];
    copyright: string;
  };
}
