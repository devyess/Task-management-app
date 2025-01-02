import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        setAuth({
          isAuthenticated: true,
          token,
          user: JSON.parse(user),
        });
      }
    } catch (error) {
      console.error('Error loading auth state from localStorage:', error);
    }
  }, []);

  const login = (token, user) => {
    setAuth({
      isAuthenticated: true,
      token,
    });
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      user: null,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};