export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface MeResponse {
    user: {
        id: number;
        profile: {
            name: string;
            email: string;
        };
        account: {
            role: string;
            storageLimit: number;
            usedStorage: number;
        };
        createdAt: string;
    }
}