import React from "react";
import { siteName } from "../../assets/const";


const Footer = () => {
    return (
        <footer className="page-footer">
            <p>
                &copy; <span id="date"></span>
                <span className="footer-logo"> {siteName} </span>Built by MBI & SS
            </p>
        </footer>
    )
};

export default Footer;