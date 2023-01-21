import { React } from "react";
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { validateEmail } from "../../assets/validations";
import Button from "../common/Button";
import FormControl from "../common/FormControl";
import Navbar from "../common/Navbar";
import Modal from "../common/Modal";
import Loader from "../common/Loader";


const Forgotpassword = () => {

    useEffect(() => {
        document.title = `${process.env.REACT_APP_SITE_NAME} - Forgot Password`;
    }, []);

    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const [modalMessage, setModalMessage] = useState("Please fill the email, requirement are in the tooltip.");
    const [showModal, setShowModal] = useState(false);

    const SendForgotPasswordRequest = async () => {
        setLoading(true);
        try {
            if (validateEmail(userEmail)) {
                const resData = await axios.post(`${process.env.REACT_APP_SERVER_API}/forgetpassword`, { email: userEmail });
                if (resData.data.message === 'True') {
                    setModalMessage("We have sent your password, please check your email.");
                } else {
                    setModalMessage("Failed to send your password. Please try again in a few minutes.");
                }
                setShowModal(true);
            } else {
                setModalMessage("Please fill the email, requirement are in the tooltip.");
                setShowModal(true);
            }
        } catch (err) {
            setModalMessage("Failed to send your password. ", err.message);
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Navbar />
            <main className="page">

                <h1>Forgot your password?</h1>
                <p className="text" style={{ textAlign: "left" }}>It's ok, happens to the best of the bests.<br />Fill up your email and we will resend your password.</p>
                <form>
                    {loading && <Loader />}
                    <FormControl
                        inputType="email" inputId="email" placeHolder="Email Adress" isRequired={true}
                        containToolTip={true} toolTipContent="Enter the email assosiated with your account to reset your password.
                                    Example: johndoe@gmail.com" onChangeCallback={setUserEmail} />

                    <Button className="btn" content="Send Password" onClickCallback={SendForgotPasswordRequest} />

                    <p className="text">Don't have an account? <NavLink to="/signup">Signup</NavLink></p>
                </form>
                {showModal && <Modal errorMessage={modalMessage} setDisplay={setShowModal} />}
            </main>
        </>
    )
};

export default Forgotpassword;
