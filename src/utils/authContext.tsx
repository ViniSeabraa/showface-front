import { AuthContextType } from '../interfaces/AuthContextType';
import { User } from '../interfaces/user';
import { FC, ReactNode, createContext, useContext } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const login = (userData: User, token: string) => {
        sessionStorage.setItem("accessToken", token);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        sessionStorage.removeItem("accessToken");
        localStorage.removeItem('user');
    };

    const getUserData = () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    return (
        <AuthContext.Provider value={{ getUserData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};