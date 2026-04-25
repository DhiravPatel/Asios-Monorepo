import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Layout from "./Layouts.js/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Category from "./Pages/Category/Category";
import AppHeader from "./Layouts.js/Header";
import Sidebar from "./Layouts.js/Sidebar";
import ViewCategory from "./Pages/Category/ViewCategory";
import Type from "./Pages/Type/Type";
import Product from "./Pages/Product/Product";
import Catelouge from "./Pages/Catelouge/Catelouge";
import Inquiry from "./Pages/Inquiry/Inquiry";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProductInquiry from "./Pages/Product_Inquiry/ProductInquiry";
import Blog from "./Pages/Blog/Blog";
import AddBlog from "./Pages/Blog/AddBlog";
import BulkEmail from "./Pages/BulkEmail/BulkEmail"

function App() {
  const location = useLocation();
  
  // Check if the current path is the login page
  const isLoginPage = location.pathname === "/";

  return (
    <div className="flex flex-col h-screen">
      {/* Conditionally render AppHeader and Sidebar */}
      {!isLoginPage && (
        <>
          <AppHeader />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-4 bg-gray-100"> 
              <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="category" element={<Category />} />
                <Route path="viewcategory" element={<ViewCategory />} />
                <Route path="type" element={<Type />} />
                <Route path="products" element={<Product />} />
                <Route path="catalogue" element={<Catelouge />} />
                <Route path="inquiry" element={<Inquiry />} />
                <Route path="product-inquiry" element={<ProductInquiry />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/add-blog" element={<AddBlog />} />
                <Route path="/edit-blog/:id" element={<AddBlog />} />
                <Route path="/bulk-email" element={<BulkEmail />} />
                </Route>
              </Routes>
            </main>
          </div>
        </>
      )}
      {isLoginPage && (
        <main className="flex-1 p-4 bg-gray-100"> 
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
