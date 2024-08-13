import React, { useRef, memo } from 'react';
import { RiAccountCircleLine  } from "react-icons/ri";
import './Header.css';
import Logout from './Logout';

const Header = () => {
    let logoutRef=useRef();
    const ShowLogoutPage=()=>{
        console.log(logoutRef);
              logoutRef.current.style.display = 'block';
        }

    const cancelLogout=()=>{
       logoutRef.current.style.display = 'none';
        }
    return (
        <div className="header">
            <div className="header-logo">TableSprint</div>
            <div className="header-profile-icon" onClick={ShowLogoutPage}><RiAccountCircleLine/></div>
            <div className="logoutDiv" ref={logoutRef}><Logout cancel={cancelLogout}/></div> 
        </div>
    );
};

export default memo(Header);