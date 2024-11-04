"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage on initial load
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            const { user, token } = JSON.parse(storedAuth);
            setUser({ ...user, token });
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        const authData = {
            user: { username: userData.username },
            token: userData.token
        };
        setUser(authData);
        localStorage.setItem('auth', JSON.stringify(authData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth');
    };

    // Function to get the auth token
    const getToken = () => {
        if (user && user.token) {
            return user.token;
        }
        return null;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, getToken, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
