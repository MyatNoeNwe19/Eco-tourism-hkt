import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();
  const STORAGE_KEY = 'kurashiki_user';

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // --- LOGIN LOGIC ---
  const login = (email, password) => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    
    if (!savedData) {
      alert("No account found. Please register first!");
      navigate('/register');
      return false;
    }

    const registeredUser = JSON.parse(savedData);

    if (registeredUser.email.trim() === email.trim() && registeredUser.password === password) {
      setUser(registeredUser);
      alert("Login Successful!");
      navigate('/profile');
      return true;
    } else {
      alert("Invalid email or password. Please try again!");
      return false;
    }
  };

  // --- REGISTER LOGIC ---
  const register = (name, email, password) => {
    const userData = { 
      name, 
      email: email.trim(), 
      password: password 
    };
    
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    
    alert("Registration Successful! Now you can login.");
    navigate('/login');
  };

  const updateUser = (updatedData) => {
    const newData = { ...user, ...updatedData };
    setUser(newData); 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateUser, 
      isLoggedIn: !!user,
      isLoading 
    }}>
      {!isLoading && children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);