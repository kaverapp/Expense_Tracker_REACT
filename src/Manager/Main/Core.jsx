import { DashBoard } from "../Pages/Dash"
import "./style.css"

export const CoreDisplay=()=>{
    return(
        <>
        <header style={{display:"flex",gap:"9px"}}>
            <nav>HOME</nav>
            <nav>Reports</nav>
            <nav>Login</nav>
            <nav>Logo</nav>
        </header>
            <DashBoard/>
       
        </>
    )
}