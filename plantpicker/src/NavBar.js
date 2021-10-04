import { Link } from "react-router-dom";
import "./NavBar.css"
import PlantsApi from "./api";
import { useContext, useEffect } from "react";
import UserContext from "./UserContext";

const NavBar = () => {
    
    const { isLoggedIn, loginUser } = useContext(UserContext);


    const logoutUser = async () => {
        localStorage.clear();
        await PlantsApi.logoutUser();
        loginUser();
    }

    return (
    <div className="">
            <div className="NavBar">
                <ul>
                    <li className="logo"><Link to="/">Plant + Pot </Link></li>
                <li className="links"><Link to="/plants">Browse Plants</Link></li>
                    {isLoggedIn && <li className="links"><Link to="/user-lists">My Plant List</Link></li>}
                        {isLoggedIn ?
                            <li className="links" onClick={logoutUser}><Link to="/">Logout</Link></li> :
                            <li className="links"><Link to="/login">Login</Link></li>
                        }
            </ul>
        </div>
    </div>

    )
}

export default NavBar;