import { React } from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../common/Navbar";
import Button from "../common/Button";
import FormControl from "../common/FormControl";
import Modal from "../common/Modal";
import { validateEmail, validatePassword } from "../../assets/validations";
import { siteName } from "../../assets/const";
import { ServerAPI } from "../../assets/api";

const Signup = () => {

  useEffect(() => {
    document.title = `${siteName} - Sign up`;
  }, []);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [modalMessage, setModalMessage] = useState("Please fill the email and password, requirement are in the tooltip.");
  const [showModal, setShowModal] = useState(false);

  const CreateAccount = async () => {
    if (validateEmail(userEmail) && validatePassword(userPassword) && userPassword === confirmPassword) {
      const res = await SendSignupRequest();
      if (res) {
        setModalMessage("Account created successfuly");
      } else {
        setModalMessage("Failed to create an account. Please try again in a few minutes.");
      }
      setShowModal(true);
    } else {
      // display modal.
      setModalMessage("Please fill the email and password, requirement are in the tooltip.");
      setShowModal(true);
    }
  }

  const SendSignupRequest = async () => {
    const res = await fetch(`${ServerAPI}/signup`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    });

    const resData = await res.json();
    return resData.message === 'True';
  }

  return (
    <>
      <Navbar />

      <main className="page">
        <h1>Create a new account</h1>
        <form>
          <FormControl
            inputType="email" inputId="email" placeHolder="Email Address" isRequired={false}
            containToolTip={true} toolTipContent="Example: johndoe@gmail.com" onChangeCallback={setUserEmail} />

          <FormControl
            inputType="password" inputId="password" placeHolder="Password" isRequired={false}
            containToolTip={true} toolTipContent="Password must be atleast 6 characters long.
        Password must contain:
        Upper case letter
        Lower case letter
        Special character
        A number." onChangeCallback={setUserPassword} />

          <FormControl
            inputType="password" inputId="confirmPassword" placeHolder="Confirm Password" isRequired={false}
            containToolTip={true} toolTipContent="Confirm password should match password." onChangeCallback={setConfirmPassword} />

          <Button className="btn" content="Create Account" onClickCallback={CreateAccount} />

          <p className="text">
            Already have an account? <NavLink to="/">Login</NavLink>
            <br />
            <NavLink to="/forgotpassword">Forgot Password?</NavLink>
          </p>
        </form>
        {showModal && <Modal errorMessage={modalMessage} setDisplay={setShowModal} />}
      </main>
    </>
  );
}

export default Signup;
