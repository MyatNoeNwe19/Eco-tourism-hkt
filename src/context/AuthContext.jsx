import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  // အားလုံးမှာ key တစ်ခုတည်းဖြစ်အောင် သတ်မှတ်ထားပါ
  const STORAGE_KEY = 'kurashiki_user';

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    const userData = { 
      name: email.split('@')[0], 
      email: email 
    };
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    navigate('/');
  };

  const register = (name, email, password) => {
    const userData = { name, email };
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    navigate('/login');
  };

  const updateUser = (updatedData) => {
    // React က state ပြောင်းသွားတာကို သိအောင် Object အသစ်တစ်ခုအနေနဲ့ (Spread Operator) သုံးပါ
    const newData = { ...updatedData };
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
      updateUser, // ဒီမှာ ထည့်ပေးဖို့ အရေးကြီးပါတယ်
      isLoggedIn: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);