import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import "./EditCategory.css";
import { config } from "../Configuration";

const EditCategory = () => {
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
      // Fetch category details to populate the form
    axios.get(`${config.baseURL}/api/category/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        const category = response.data;
        setValue('name', category.name);
        setValue('sequence', category.sequence);
        setValue('status', category.status);
        setValue('image', category.image);
      })
      .catch(error => alert(error.response.data.message));
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
      await axios.put(`${config.baseURL}/api/categories/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      reset();
      // Extract the current page from the location state
      const currentPage = new URLSearchParams(location.search).get('page') || 1;
      navigate(`/home/category?page=${currentPage}`);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {    
    const authorizePage = async () => {

      try {
        await axios.post(`${config.baseURL}/api/authorize`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      } catch (error) {
        alert(error.response.data?.message);
        navigate("/");
        console.error('Error fetching data:', error);
      }
    };
    authorizePage();
  }, []);

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
