import React, { useRef, useState } from 'react';
import { RiAccountCircleLine  } from "react-icons/ri";
import './Header.css';
import Logout from './Logout';

const Header = () => {
    let logoutRef=useRef();
    const ShowLogoutPage=()=>{
        console.log(logoutRef);
        if (logoutRef.current) {
            if(logoutRef.current.style.display==="none"){
               logoutRef.current.style.display = 'block';
            }else{
                logoutRef.current.style.display = 'none';
            }
        }
    }
    return (
        <div className="header">
            <div className="header-logo">TableSprint</div>
            <div className="header-profile-icon" onClick={ShowLogoutPage}><RiAccountCircleLine/></div>
            <div className="logoutDiv" ref={logoutRef}><Logout/></div> 
        </div>
    );
};

export default Header;