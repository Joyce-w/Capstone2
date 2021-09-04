import { Link } from "react-router-dom";
import "./NavBar.css"


const NavBar = () => {
    return (
        // <div className="NavBar">
        //     <div className="logo">
        //         <Link exact to="/">Plant + Pot</Link>
        //     </div>
        //     <Link exact to="/register">Browse Plants</Link>
        //     <Link exact to ="/explore">Explore</Link>         
        // </div>
    <div className="NavBar">
        <div className="logo"><Link to="/">Plant + Pot </Link></div>
        <nav role='navigation'>
        <ul>
            <li><Link to="/plants">Browse Plants</Link></li>
            <li><Link to ="/explore">Explore</Link>    </li>
            <li><Link to ="/user-lists/:user_id">My Plant List</Link>    </li>
            <li><Link to ="/login">Login</Link>    </li>
        </ul>
        </nav>  
    </div>




    )
}

export default NavBar;