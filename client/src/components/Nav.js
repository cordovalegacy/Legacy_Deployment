import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import Logo from '../img/lb_logo_2.jpg';
import CartIcon from '../img/cart_icon.png';
import { useContext } from "react";
import { MyContext } from "../App";
import { FaSpaceShuttle } from 'react-icons/fa'

const Nav = (props) => {

    const { setLoggedInUser } = props
    const { displayName, setDisplayName } = useContext(MyContext)
    const navigate = useNavigate()
    console.log(displayName)

    const logout = async () => {
        try { //successful logout
            const res = await axios.post('http://localhost:8000/api/users/logout',
                {},
                {withCredentials: true}) //checks for authorization (see user routes)
            console.log(res);
            console.log("Logged Out", res.data);
            setLoggedInUser({})
            setDisplayName("")
            navigate('/')
            window.location.reload()
        } catch (err) { //failed logout
            console.log("Something went wrong (Nav.js): ", err);
        }
    }


    return (
        <nav>
            <Link to='/'><img id='logo' src={Logo} alt='Logo' /></Link>
            <Link to='/computers/gallery'>Gallery</Link>
            <Link to='/computers/customs'>Custom</Link>
            <Link to='/computers/inventory'>Inventory</Link>
            <Link to='/computers/about' id='company-link'>Company</Link>
            <Link to='/computers/faq' id='faq-link'>FAQ's</Link>
                {/* ***Default*** */}
                {displayName !== "" ?
                    <div className="nav-login-registration">
                        <button className='logout-btn' onClick={logout}>Logout</button>
                        <h5 id='display-name'>{displayName}</h5>
                    </div>
                    : null}
                {displayName === "" ?
                    <div className="nav-login-registration">
                        <button id="login-btn"><Link to={'/computers/login'}>Login</Link></button>
                        <h5 id='display-name'>{displayName}</h5>
                    </div>
                    : null}
                <Link to='/computers/cart'><FaSpaceShuttle className="w-10 h-10"/></Link>
        </nav>
    )
}

export default Nav