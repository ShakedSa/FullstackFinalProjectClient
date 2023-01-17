import { React } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "./Button";
import { siteName } from "../../assets/const";
import { getCookie, removeCookies } from "../../assets/cookies";
import { ServerAPI } from "../../assets/api";

const Navbar = ({ links, currentActive }) => {
    const showNav = () => {
        document.querySelector('.nav-links').classList.toggle('show-links');
    }

    return (
        <nav className="navbar">
            <div className="nav-center">
                <div className="nav-header">
                    <NavLink to="/" className="nav-logo">
                        {siteName}
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
                                    await axios.post(`${ServerAPI}/logout`, { sessionId: getCookie("sessionId") });
                                    removeCookies();
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
