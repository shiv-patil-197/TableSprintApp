import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./EditCategory.css"

const EditCategory = () => {
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch category details to populate the form
    axios.get(`http://localhost:5000/api/category/${id}`)
      .then(response => {
        const category = response.data;
        setValue('name', category.name);
        setValue('sequence', category.sequence);
        setValue('status', category.status);
        setValue('image', category.image);
      })
      .catch(error => console.error('Error fetching category details:', error));
  }, [id, setValue]);

  const onSubmit = async ({ name, sequence, status, image }) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sequence', sequence);
    formData.append('status', status);
    if (image.length > 0) {
      formData.append('image', image[0]);
    }

    try {
      await axios.put(`http://localhost:5000/api/categories/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      reset();
      navigate('/home/category');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="edit-category">
      <h1>Edit Category</h1>
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
            {...register('image')}
          />
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

export default EditCategory;
