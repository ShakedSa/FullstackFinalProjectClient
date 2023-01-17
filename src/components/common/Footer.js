import React from "react";


const Footer = () => {
    return (
        <footer className="page-footer">
            <p>
                &copy; <span id="date"></span>
                <span className="footer-logo"> {process.env.REACT_APP_SITE_NAME} </span>Built by MBI & SS
            </p>
        </footer>
    )
};

export default Footer;