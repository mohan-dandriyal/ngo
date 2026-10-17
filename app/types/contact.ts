export type ContactIcon = "mail" | "phone" | "location";

export interface ContactDetail {
    icon: ContactIcon;
    label: string;
    value: string;
    href: string;
}

export interface ContactReason {
    value: string;
    label: string;
}

export interface ContactPageData {
    hero: { image: string; title: string };
    intro: { badge: string; title: string; description: string };
    contactDetails: ContactDetail[];
    form: {
        eyebrow: string;
        title: string;
        nameLabel: string;
        namePlaceholder: string;
        emailLabel: string;
        emailPlaceholder: string;
        reasonLabel: string;
        reasons: ContactReason[];
        messageLabel: string;
        messagePlaceholder: string;
        submitLabel: string;
        successTitle: string;
        successDescription: string;
        resetLabel: string;
    };
    visit: { eyebrow: string; title: string; details: string; address: string };
}
