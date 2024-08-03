
import dashboardCss from "./Dashboard.module.css"


const Dashboard = () => {
    return (
        <>
            <div className={dashboardCss.dashboard}>
                <div className={dashboardCss.container}>
                        <img src="https://www.tablesprint.com/_next/image?url=%2Fimg%2Flogo-white.png&w=1920&q=75" alt="TableSprint Logo" class={dashboardCss.logo}/>
                        <p className={dashboardCss.param}>Welcome to TableSprint admin</p>
                </div>
            </div>
        </>
    )
}
export default Dashboard