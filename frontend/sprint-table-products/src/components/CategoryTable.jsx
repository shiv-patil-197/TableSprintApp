// src/components/CategoryTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import './CategoryTable.css';

const CategoryTable = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Category name', width: 150 },
        { field: 'image', headerName: 'Image', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'sequence', headerName: 'Sequence', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            renderCell: (params) => (
                <strong>
                    <button className="action-button" onClick={() => handleEdit(params.id)}>
                        Edit
                    </button>
                    <button className="action-button" onClick={() => handleDelete(params.id)}>
                        Delete
                    </button>
                </strong>
            ),
        },
    ];

    const handleEdit = (id) => {
        // Edit category logic here
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/categories/${id}`)
            .then(() => {
                setCategories(categories.filter(category => category.id !== id));
            })
            .catch(error => console.error('Error deleting category:', error));
    };

    return (
        <div className="data-grid-container">
            <DataGrid rows={categories} columns={columns} pageSize={5} checkboxSelection />
        </div>
    );
};

export default CategoryTable;
