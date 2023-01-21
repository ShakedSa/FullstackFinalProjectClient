import { React } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "./Button";
import { getCookie, removeCookie } from "../../assets/cookies";

const Navbar = ({ links, currentActive }) => {
    const showNav = () => {
        document.querySelector('.nav-links').classList.toggle('show-links');
    }

    return (
        <nav className="navbar">
            <div className="nav-center">
                <div className="nav-header">
                    <NavLink to="/" className="nav-logo">
                        {process.env.REACT_APP_SITE_NAME}
                    </NavLink>
                    {links &&
                        <Button className="btn nav-btn" content={<GiHamburgerMenu style={{ verticalAlign: "middle", height: "30px" }} />}
                            onClickCallback={showNav} />
                    }
                </div>
                {links &&
                    <div className="nav-links">
                        {links.map((link, id) => {
                            let className = "nav-link";
                            if (link.name === currentActive) {
                                className += " active";
                            }
                            if (link.name === "Logout") {
                                return <NavLink key={id} to={link.url} className={className} onClick={async () => {
                                    const sessionId = getCookie("sessionId");
                                    removeCookie("sessionId");
                                    removeCookie("email");
                                    removeCookie("password");
                                    try {
                                        await axios.post(`${process.env.REACT_APP_SERVER_API}/logout`, { sessionId: sessionId });
                                    } catch (err) {
                                        console.log(err.message);
                                    }
                                }}>{link.name}</NavLink>
                            }
                            return <NavLink key={id} to={link.url} className={className}>{link.name}</NavLink>
                        })}
                    </div>}
            </div>
        </nav>
    );
};

export default Navbar;
