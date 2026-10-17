

export interface aboutSection {
    image: string,
    badge: string,
    title: string,
    description: string | string[],
    buttonText: string,
    profileImage: string,
    name: string,
    role: string,
}

export interface WhereBeganSection {
    image_left: string,
    image_right: string,
    badge: string,
    title: string,
    description: string | string[];
    image_left_alt: string,
    image_left_title: string,
    image_left_description: string,
    image_right_alt: string,
    image_right_title: string,
    image_right_description: string,
}

export interface MissionVisionSection {
    image: string,
    imageAlt: string,
    mission: {
        badge: string,
        title: string,
        description: string | string[],
    },
    vision: {
        badge: string,
        title: string,
        description: string | string[],
    },
}
