import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useTable } from 'react-table';
import categoryStyle from './Category.module.css';
import DeleteCategory from './DeleteCategory';
import { config } from '../Configuration';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const navigate = useNavigate();
  const deleteRef = useRef();
  const location = useLocation();

  const showDeletePage = (categoryId) => {
    setDeleteCategoryId(categoryId);
    deleteRef.current.style.display = 'block';
  };

  const cancelDelete = () => {
    deleteRef.current.style.display = 'none';
    setDeleteCategoryId(null);
  };

  const fetchCategories = async (page) => {
    try {
      const { data } = await axios.get(`${config.baseURL}/api/categories?page=${page}&limit=5`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCategories(data.data);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      alert(error.response?.data?.message || 'Error fetching categories');
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page') || 1;
    fetchCategories(page);
  }, [location.search ]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      navigate(`/home/category?page=${page}`);
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Id', accessor: 'serialNo' },
      { Header: 'Category name', accessor: 'name' },
      { Header: 'Image', accessor: 'image', Cell: ({ value }) => <img src={`${config.baseURL}/uploads/${value}`} alt="Category" width="80" height="60" /> },
      { 
        Header: 'Status', 
        accessor: 'status', 
        Cell: ({ value }) => (
          <span className={value === 'Active' ? categoryStyle.active : categoryStyle.inactive}>
            {value}
          </span>
        ),
      },
      { Header: 'Sequence', accessor: 'sequence' },
      {
        Header: 'Action', accessor: 'action', Cell: ({ row }) => (
          <>
            <button onClick={() => { navigate(`/home/category/edit-category/${row.original._id}?page=${currentPage}`) }}>Edit</button>
            <button onClick={() => showDeletePage(row.original._id)} className={categoryStyle.showdeleteDiv}>Delete</button>
          </>
        )
      },
    ],
    [navigate, currentPage]
  );

  const tableInstance = useTable({ columns, data: categories });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
  <>
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
      <div className={categoryStyle.pagination}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
      <div className={categoryStyle.deleteDiv} ref={deleteRef}>
        {deleteCategoryId && <DeleteCategory categoryId={deleteCategoryId} cancel={cancelDelete} />}
      </div>
    </div>
  </>
  );
};

export default Category;
