import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom"
import "./Home.css"
import { useContext, useEffect } from "react"
import { AuthContext } from "../components/AuthContext"
import axios from "axios"


const Home = () => {
    const { auth } = useContext(AuthContext)
    useEffect(() => {
        console.log("Token:", auth.token);
    }, [auth.token]);
    return (
        <>
            <div className="fullHomePage">
                <div className="app">
                    <Header />
                    <div className="main-content">
                        <Sidebar />
                        <div className="outletDiv">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home