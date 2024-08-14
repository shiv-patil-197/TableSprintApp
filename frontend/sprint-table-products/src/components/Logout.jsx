import { useNavigate } from "react-router-dom";
import "./Logout.css"
import axios from "axios";
import { config } from "../Configuration";
import { memo } from "react";
const Logout = ({cancel}) => {
  let navigatetoLoginPage = useNavigate()
  const AppLogout = async () => {
    try {
        await axios.post(`${config.baseURL}/api/logout`, {}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      localStorage.setItem('token', null);
      navigatetoLoginPage("/")
    }
    catch (error) {
      console.log(error);
      alert(error)
    }

  }
  const cancelLogout = async () => {
    cancel();
  }
  return (
    <div className='logoutPage'>
      <div className="logoutText">
        <h2>Logout</h2>
        <p>Are you sure want to log out?</p>
      </div>
      <div className="logoutButtons">
        <button onClick={cancelLogout} className="cancelBtn">Delete</button>
        <button onClick={AppLogout} className="logoutBtn">Confirm</button>
      </div>
    </div>
  )
}
export default memo(Logout)