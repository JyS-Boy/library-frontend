export type Role =
    'Admin'
    | 'Librarian';

export interface LoginRequest {
    userName: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    userName: string;
    role: Role;
    expiration: string;
}

export interface CurrentUser {
    userName: string;
    role: Role;
    token: string;
    expiresAt: string;
}