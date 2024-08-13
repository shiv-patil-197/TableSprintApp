import axios from "axios";
import "./DeleteCategory.css";
import {config} from "../Configuration"
import { memo } from "react";

const DeleteCategory = ({ categoryId, cancel }) => {
  const deleteCategory = async () => {
    try {
      await axios.delete(`${config.baseURL}/api/categories/${categoryId}`, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      // Reload(!load);
      window.location.reload();// Reload the page to update the category list
    } catch (error) {
      alert(error.response.data.message)
      console.log(err);
    }
  };

  return (
    <div className='DeleteCategoryPage'>
      <div className="DeleteCategoryText">
        <h2>Delete</h2>
        <p>Are you sure you want to delete?</p>
      </div>
      <div className="DeleteCategoryButtons">
        <button onClick={cancel} className="cancelBtn">Cancel</button>
        <button onClick={deleteCategory} className="DeleteCategoryBtn">Confirm</button>
      </div>
    </div>
  );
};

export default memo(DeleteCategory)