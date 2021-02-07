export interface User {
    idUser: string;
    userName: string;
    email: string;
    created_at: Date| string;
    isAdmin: boolean;
    avatar: string | null;
    provider: string;
    Phone: number | null;
}