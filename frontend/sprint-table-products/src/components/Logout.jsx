import { useNavigate } from "react-router-dom";
import "./Logout.css"
const Logout = ({cancel}) => {
  let navigatetoLoginPage = useNavigate()
  const AppLogout = async () => {
    try {
      navigatetoLoginPage("/")
    }
    catch (err) {
      console.log(err);
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
export default Logout