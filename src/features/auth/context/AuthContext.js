import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('authToken');
  });
  const [userName, setUserName] = useState("");

  const login = (token, name) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', name);
    setIsAuthenticated(true);
    setUserName(() => name);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserName("");
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);

    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, []);

  useEffect(() => {
    console.log("AuthContext useEffect triggered. userName:", userName);
  }, [userName]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);