interface UrlField {
    value: string;
};

interface ProfileFormData {
    image: File | null;
    username: string;
    email: string;
    bio: string;
    urls: UrlField[];
};

export type { ProfileFormData, UrlField };