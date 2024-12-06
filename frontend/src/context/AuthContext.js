import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, user: null, userId: null, username: null });

    const login = useCallback((data) => {
        setAuth(data);

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.user);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);
    }, []);

    return (
        <AuthContext.Provider value={{ auth, login }}>
            {children}
        </AuthContext.Provider>
    );
};