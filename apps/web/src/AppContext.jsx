// AppContext.jsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [footerData, setFooterData] = useState('');

  useEffect(() => {
    const savedFooterData = localStorage.getItem('footerData');
    if (savedFooterData) {
      setFooterData(JSON.parse(savedFooterData));
    }
  }, []);

  useEffect(() => {
    if (footerData.length > 0) {
      localStorage.setItem('footerData', JSON.stringify(footerData));
    }
  }, [footerData]);

  return (
    <AppContext.Provider value={{ footerData, setFooterData }}>
      {children}
    </AppContext.Provider>
  );
};
