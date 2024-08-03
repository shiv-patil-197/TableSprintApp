import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTable } from 'react-table';
import categoryStyle from "./Category.module.css";
import DeleteCategory from './DeleteCategory';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const navigate = useNavigate();
  const deleteRef = useRef();

  const showDeletePage = (categoryId) => {
    setDeleteCategoryId(categoryId);
    deleteRef.current.style.display = 'block';
  };

  const cancelDelete = () => {
    deleteRef.current.style.display = 'none';
    setDeleteCategoryId(null);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(response => {
        setCategories(response.data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: 'Id', accessor: '_id' },
      { Header: 'Category name', accessor: 'name' },
      { Header: 'Image', accessor: 'image', Cell: ({ value }) => <img src={`http://localhost:5000/uploads/${value}`} alt="Category" width="80" height="50" /> },
      { Header: 'Status', accessor: 'status', Cell: ({ value }) => <span className={value === 'Active' ? 'active' : 'inactive'}>{value}</span> },
      { Header: 'Sequence', accessor: 'sequence' },
      {
        Header: 'Action', accessor: 'action', Cell: ({ row }) => (
          <>
            <button onClick={() => { navigate(`/home/category/edit-category/${row.original._id}`) }}>Edit</button>
            <button onClick={() => showDeletePage(row.original._id)} className={categoryStyle.showdeleteDiv}>Delete</button>
          </>
        )
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: categories });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className={categoryStyle.category}>
      <header>
        <h1>Category</h1>
        <Link to="/home/category/add-category" className={categoryStyle.add_category_btn}>Add Category</Link>
      </header>
      <table {...getTableProps()} className={categoryStyle.category_table}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={categoryStyle.deleteDiv} ref={deleteRef}>
        {deleteCategoryId && <DeleteCategory categoryId={deleteCategoryId} cancel={cancelDelete} />}
      </div>
    </div>
  );
};

export default Category;
