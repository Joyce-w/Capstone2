import { Link } from "react-router-dom";
import "./NavBar.css"


const NavBar = ({isLoggedIn, loginUser} ) => {

    const logoutUser = () => {
        localStorage.clear();
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

        {/* <nav role='navigation'>
            <ul>
                <li><Link to="/plants">Browse Plants</Link></li>
                    {isLoggedIn && <li><Link to="/user-lists">My Plant List</Link></li>}
                        {isLoggedIn ?
                            <li onClick={logoutUser}><Link to="/">Logout</Link></li> :
                            <li><Link to="/login">Login</Link></li>
                        }
            </ul>
        </nav>   */}
        </div>
    </div>

    )
}

export default NavBar;