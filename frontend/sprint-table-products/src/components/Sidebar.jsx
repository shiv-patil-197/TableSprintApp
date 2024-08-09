// 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';  // Import the CSS file
import { TfiHome } from "react-icons/tfi";
import { BiCategoryAlt } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
const Sidebar = () => {
    return (
        <div className="sidebar">
           
            <ul className="sidebar-menu">
                <li>
                    <Link to="" className="sidebar-link">
                        <span className="sidebar-icon"> <TfiHome /></span>
                        <span className="sidebar-text">Dashboard</span>
                        <span className="sidebar-arrow">▶</span>
                    </Link>
                </li>
                <li >
                    <Link to="category" className="sidebar-link">
                        <span className="sidebar-icon"><BiCategoryAlt/></span>
                        <span className="sidebar-text">Category</span>
                        <span className="sidebar-arrow">▶</span>
                    </Link>
                </li>
                <li>
                    <Link to="subcategory" className="sidebar-link">
                        <span className="sidebar-icon"><BsListTask /></span>
                        <span className="sidebar-text">Subcategory</span>
                        <span className="sidebar-arrow">▶</span>
                    </Link>
                </li>
                <li>
                    <Link to="products" className="sidebar-link">
                        <span className="sidebar-icon"><BsBoxSeam /></span>
                        <span className="sidebar-text">Products</span>
                        <span className="sidebar-arrow">▶</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
