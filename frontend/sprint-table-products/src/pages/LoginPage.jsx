import React, { useContext } from 'react';
import LoginStyle from "./LoginPage.module.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate  } from "react-router-dom";
import Signup from '../components/SIgnup';
import axios from "axios";
// import { AuthContext } from "../components/AuthContext"

const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    // const { auth,setAuth } = useContext(AuthContext);
    let navigateToDashboard=useNavigate()
    let SendFormData =async ({user,pass}) => {
        console.log(user,pass);
     try{   
       
        let {data:{data, token ,error,message}}=await axios.post("http://localhost:5000/api/login",{ username: user , password:pass});  
        if(error){
            alert(message);
        }else {
            console.log(token);
            localStorage.setItem('token', token);
            // setAuth({ token }); 
            navigateToDashboard("./home")
        }

     }
     catch(err){
        alert(err.message)
        console.log(err);
     }
    }

    return (
        <div className={LoginStyle.authContainer}>
            <Signup/>
            <div className={LoginStyle.mainDiv}>
            <form className={LoginStyle.subDiv} onSubmit={handleSubmit(SendFormData)}>
                <div className={LoginStyle.formDiv}>
                  <div id={LoginStyle.headerName}><img src="https://assets.tablesprint.com/images/logos/logoWithName.png" alt="" /> <p>Welcome to TableSprint admin</p></div>
                    <div>
                        <input type="email" className={LoginStyle.input_field} placeholder="Email" {...register("user", {
                            required: { value: true, message: "Email is Mandatory" }
                        })} />
                    </div>
                    <div className={LoginStyle.error} style={{ color: "red", fontSize: "12px" }}>{errors.user?.message}</div>
                    <div>
                        <input type="password" className={LoginStyle.input_field} placeholder="Password" {...register("pass", {
                            required: { value: true, message: "Password is Mandatory" }
                        })} />
                    </div>
                    <div className={LoginStyle.error} style={{ color: "red", fontSize: "12px" }}>{errors.pass?.message}</div>
                    <div>
                        <button type="submit">Log In</button>
                    </div>
                    <div>
                        <Link className={LoginStyle.azBkHf} to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <div ><p>New to TableSpirit? SignUp</p></div>
                </div>
            </form>
        </div>
        </div>
        
    );
};

export default LoginPage;