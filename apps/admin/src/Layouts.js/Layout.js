import React from 'react';
import Sidebar from './Sidebar';
import AppHeader from './Header';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
