'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  userEmail: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('admin_auth');
    if (stored) {
      const { email } = JSON.parse(stored);
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 1200));
    if (!email || !password) return { success: false, error: 'Please fill all fields.' };
    if (!email.includes('@')) return { success: false, error: 'Enter a valid email address.' };
    if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };
    localStorage.setItem('admin_auth', JSON.stringify({ email }));
    setIsLoggedIn(true);
    setUserEmail(email);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('admin_auth');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
