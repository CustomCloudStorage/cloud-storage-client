import type { MeResponse, LoginPayload, LoginResponse } from "../types/api/auth";
import client from "./client";

export const authApi = {
    login: (payload: LoginPayload) =>
        client.post<LoginResponse>('/auth/login', payload),
    logout: () => client.post('/auth/logout'),
    me: () => client.get<MeResponse>('/auth/me'),
}

export type { LoginPayload, MeResponse };
