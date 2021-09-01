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
        <div class="logo"><Link exact to="/">Plant + Pot </Link></div>
        <nav role='navigation'>
        <ul>
            <li><Link exact to="/register">Browse Plants</Link></li>
            <li><Link exact to ="/explore">Explore</Link>    </li>
        </ul>
        </nav>  
    </div>




    )
}

export default NavBar;