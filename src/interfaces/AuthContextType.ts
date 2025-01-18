import { User } from "./user";

export interface AuthContextType {
    login: (userData: User, token: string) => void;
    logout: () => void;
    getUserData: () => User | null;
}