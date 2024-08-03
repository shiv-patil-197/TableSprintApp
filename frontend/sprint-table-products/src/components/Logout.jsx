import { useNavigate } from "react-router-dom";
import "./Logout.css"
const Logout=()=>{
   let navigatetoLoginPage=useNavigate()
    const AppLogout=async()=>{
        try{   
          navigatetoLoginPage("/")            
         }
         catch(err){
            console.log(err);
         }    
    
    }
    return (
        <div className='logoutPage'><button onClick={AppLogout}>Logout</button></div>
    )
}
export default Logout