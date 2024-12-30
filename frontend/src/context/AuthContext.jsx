import React, { createContext, useState } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  const login = (token, user) => {
    setAuth({
      isAuthenticated: true,
      token,
      user,
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
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};