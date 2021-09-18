import { Link } from "react-router-dom";
import "./NavBar.css"


const NavBar = () => {

    //check localstorage for token
    let token = localStorage.getItem('token')
    //if token, show myplantlsit
    //nav button does not render user list with token in localstorage

    return (

    <div className="NavBar">
        <div className="logo"><Link to="/">Plant + Pot </Link></div>
        <nav role='navigation'>
        <ul>
            <li><Link to="/plants">Browse Plants</Link></li>
            <li><Link to ="/explore">Explore</Link>    </li>
            {localStorage.getItem('token') && <li><Link to ="/user-lists">My Plant List</Link></li>}
            
            <li><Link to ="/login">Login</Link></li>
        </ul>
        </nav>  
    </div>




    )
}

export default NavBar;