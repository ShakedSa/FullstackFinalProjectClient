import { React } from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "../common/Navbar";
import Button from "../common/Button";
import FormControl from "../common/FormControl";
import Modal from "../common/Modal";
import Loader from "../common/Loader";
import { validateEmail, validatePassword } from "../../assets/validations";
import { siteName } from "../../assets/const";
import { ServerAPI } from "../../assets/api";


const Signup = () => {

  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${siteName} - Sign up`;
  }, []);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [modalMessage, setModalMessage] = useState("Please fill the email and password, requirement are in the tooltip.");
  const [showModal, setShowModal] = useState(false);
  const [showModalOnError, setShowModalOnError] = useState(false);

  const CreateAccount = async () => {
    setLoading(true);
    if (validateEmail(userEmail) && validatePassword(userPassword) && userPassword === confirmPassword) {
      const res = await SendSignupRequest();
      if (res.message === 'True') {
        setModalMessage("Account created successfuly");
        setShowModal(true);
      } else {
        setModalMessage(`Failed to create an account. ${res.message}`);
        setShowModalOnError(true);
      }
    } else {
      // display modal.
      setModalMessage("Please fill the email and password, requirement are in the tooltip.");
      setShowModalOnError(true);
    }
    setLoading(false);
  }

  const SendSignupRequest = async () => {
    const resData = await axios.post(`${ServerAPI}/signup`, { email: userEmail, password: userPassword });
    return resData.data;
  }
  const waitAndClose = () => {
    setShowModal(false);
    navigate("/");
  }

  return (
    <>
      <Navbar />

      <main className="page">
        <h1>Create a new account</h1>
        <form>
          {loading && <Loader />}
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
        {showModalOnError && <Modal errorMessage={modalMessage} setDisplay={setShowModalOnError} />}
        {showModal && <Modal errorMessage={modalMessage} setDisplay={waitAndClose} />}
      </main>
    </>
  );
}

export default Signup;
