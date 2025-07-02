"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode';

interface User {
  userId: string;
  username: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    user: User | null;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        try {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const decodedUser = jwtDecode<User>(storedToken);
        setToken(storedToken);
        setUser(decodedUser);
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false); 
    }
    }, []);

    const login = (newToken: string) => {
        const decodedUser = jwtDecode<User>(newToken);
        setToken(newToken);
        setUser(decodedUser);
        localStorage.setItem('token', newToken);
        router.push('/dashboard');
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        router.push('/login');
    };

    const isLoggedIn = !!token;

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}