// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Category from './pages/Category';
import Subcategory from './pages/Subcategory';
import Products from './pages/Products';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './components/AuthContext';
import AddCategory from './pages/AddCategory';
import EditCategory from './pages/EditCategory';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/subcategory" element={<Subcategory />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/home" element={<Home />} >
                        <Route index element={<Dashboard />} />
                        <Route path="category" element={<Category />} />
                        <Route path="subcategory" element={<Subcategory />} />
                        <Route path="products" element={<Products />} />
                    </Route>
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/home/category/add-category" element={<AddCategory />} />
                    <Route path="/home/category/edit-category/:id" element={<EditCategory />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
