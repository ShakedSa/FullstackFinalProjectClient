import { React } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BsArrowLeftSquareFill } from 'react-icons/bs';
import Navbar from "../common/Navbar";

const PageNotFound = () => {
    useEffect(() => {
        document.title = `${process.env.REACT_APP_SITE_NAME} - 404 Page not found`;
    }, []);
    return (
        <>
            <Navbar />
            <main className="page">

                <h1 style={{ fontSize: "6rem" }}>404</h1>
                <h3>Page Not Found</h3>
                <p className="text">It looks like you found a glitch in the matrix..<br /><NavLink to="/dashboard" style={{ textDecoration: "none" }}>
                    <span style={{ verticalAlign: "middle" }}><BsArrowLeftSquareFill style={{ height: "15px" }} /></span> Back to Dashboard</NavLink></p>

            </main>
        </>);
}

export default PageNotFound;
