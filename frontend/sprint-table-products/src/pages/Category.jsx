import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTable } from 'react-table';
import categoryStyle from "./Category.module.css"

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(response => {console.log(response.data.data)
        setCategories(response.data.data)
        
        ;
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const columns = React.useMemo(
    () => [ 
      { Header: 'Id', accessor: 'id' },
      { Header: 'Category name', accessor: 'name' },
      { Header: 'Image', accessor: 'image', Cell: ({ value }) => <img src={`http://localhost:5000/uploads/${value}`} alt="Category" width="80" /> },
      { Header: 'Status', accessor: 'status', Cell: ({ value }) => <span className={value === 'Active' ? 'active' : 'inactive'}>{value}</span> },
      { Header: 'Sequence', accessor: 'sequence' },
      { Header: 'Action', accessor: 'action', Cell: () => (
        <>
          <button>Edit</button>
          <button>Delete</button>
        </>
      ) },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: categories });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className={categoryStyle.category}>
      <header>
        <h1>Category</h1>
        <Link to="/add-category" className={categoryStyle.add_category_btn}>Add Category</Link>
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
    </div>
  );
};

export default Category;
