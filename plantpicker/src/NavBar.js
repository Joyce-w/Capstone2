import { NavLink, Link } from "react-router-dom";
import "./NavBar.css"

const NavBar = () => {
    return (
        <div className="NavBar">
            <Link exact to ="/">Browse Plants</Link>
            <Link exact to ="/">Lists</Link>
            <Link exact to ="/">User Settings</Link>
        </div>
    )
}

export default NavBar;