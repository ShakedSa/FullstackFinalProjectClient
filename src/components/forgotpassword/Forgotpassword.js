import { React } from "react";
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { validateEmail } from "../../assets/validations";
import Button from "../common/Button";
import FormControl from "../common/FormControl";
import Navbar from "../common/Navbar";
import Modal from "../common/Modal";
import { siteName } from "../../assets/const";
import { ServerAPI } from "../../assets/api";


const Forgotpassword = () => {

    useEffect(() => {
        document.title = `${siteName} - Forgot Password`;
    }, []);

    const [userEmail, setUserEmail] = useState("");

    const [modalMessage, setModalMessage] = useState("Please fill the email, requirement are in the tooltip.");
    const [showModal, setShowModal] = useState(false);

    const SendForgotPasswordRequest = async () => {
        if (validateEmail(userEmail)) {
            const res = await fetch(`${ServerAPI}/forgetpassword`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail }),
            });
            const resData = await res.json();
            if (resData.message === 'True') {
                setModalMessage("We have sent your password, please check your email.");
            } else {
                setModalMessage("Failed to send your password. Please try again in a few minutes.");
            }
            setShowModal(true);
        } else {
            setModalMessage("Please fill the email, requirement are in the tooltip.");
            setShowModal(true);
        }
    }
    return (
        <>
            <Navbar />
            <main className="page">

                <h1>Forgot your password?</h1>
                <p className="text" style={{ textAlign: "left" }}>It's ok, happens to the best of the bests.<br />Fill up your email and we will resend your password.</p>
                <form>
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
