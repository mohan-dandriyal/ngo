export interface ProgramStep {
    number: string;
    title: string;
    description: string;
}

export interface ProgramFaq {
    question: string;
    answer: string;
}

export interface SuccessStory {
    image: string;
    imageAlt: string;
    category: string;
    title: string;
    description: string;
    result: string;
}

export type ProgramCategory = "Education" | "Food" | "Health";

export interface ProgramCampaign {
    id: number;
    title: string;
    category: ProgramCategory;
    image: string;
    imageAlt: string;
    description: string;
    raised: number;
    goal: number;
    donors: number;
    daysLeft: number;
}

export interface ProgramsData {
    hero: {
        image: string;
        title: string;
    };
    campaignsSection: {
        badge: string;
        title: string;
        description: string;
        buttonLabel: string;
        buttonHref: string;
    };
    campaigns: ProgramCampaign[];
    howWeWork: {
        badge: string;
        title: string;
        description: string;
        steps: ProgramStep[];
    };
    faqs: ProgramFaq[];
    successStories: {
        badge: string;
        title: string;
        description: string;
        stories: SuccessStory[];
    };
}
