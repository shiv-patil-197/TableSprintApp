import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AddCategory.css"

const AddCategory = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({id,name, sequence, image, status}) => {

    const formData = new FormData();
    formData.append('name', name);
    formData.append('sequence', sequence);
    formData.append('image', image[0]);
    formData.append('status', status);

    try {
      await axios.post('http://localhost:5000/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        reset();
        navigate('/home/category');
      })
      .catch(error => console.error('Error adding category:', error));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const authroizeomePage = async () => {
        try {
         await axios.post('http://localhost:5000/api/authorize', {}, 
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          );
        } catch (error) {
           alert(error.response.data.message)
           navigate("/")
          console.error('Error fetching data:', error);
        }
      };
      authroizeomePage();

}, []);
  

  return (
    <div className="add-category">
      <h1>Add Category</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            {...register('name', { required: 'Category Name is required' })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label>Category Sequence</label>
          <input
            type="number"
            {...register('sequence', { required: 'Category Sequence is required' })}
          />
          {errors.sequence && <p>{errors.sequence.message}</p>}
        </div>
        <div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            {...register('image', { required: 'Image is required' })}
          />
          {errors.image && <p>{errors.image.message}</p>}
        </div>
        <div className="form-group">
          <label>Status</label>
          <select {...register('status')}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/home/category')}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
