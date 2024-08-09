import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { Outlet, useNavigate } from "react-router-dom"
import "./Home.css"
import {  useEffect } from "react"
// import { AuthContext } from "../components/AuthContext"
import axios from "axios"


const Home = () => {
    // const { auth } = useContext(AuthContext)
    // const [homeAuth, setHomeAuth] = useState({ token: auth.token })
    let navigate=useNavigate()
    useEffect(() => {
        // console.log("Token:", auth.token);
        const authroizeomePage = async () => {
            try {
              const {data:{data}} = await axios.post('http://localhost:5000/api/authorize', {}, 
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
                }
              );
            } catch (error) {
               alert(error.response.data.message)
               navigate("/")
              console.error('Error fetching data:', error);
            }
          };
          authroizeomePage();

    }, []);
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