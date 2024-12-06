import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, user: null, userId: null, username: null });

    const login = (data) => {
        setAuth(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user.email));
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("username", data.user.username);
    };

    return (
        <AuthContext.Provider value={{ auth, login }}>
            {children}
        </AuthContext.Provider>
    );
};