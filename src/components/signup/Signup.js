import { React } from "react";
import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Reaptcha from 'reaptcha'
import axios from 'axios';
import Navbar from "../common/Navbar";
import Button from "../common/Button";
import FormControl from "../common/FormControl";
import Modal from "../common/Modal";
import Loader from "../common/Loader";
import { validateEmail, validatePassword } from "../../assets/validations";


const Signup = () => {

  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${process.env.REACT_APP_SITE_NAME} - Sign up`;
  }, []);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("Please fill the email and password, requirement are in the tooltip.");
  const [showModal, setShowModal] = useState(false);
  const [showModalOnError, setShowModalOnError] = useState(false);
  const [recaptcha, setRecaptcha] = useState(false);

  const captchRef = useRef(null);
  const verifyCaptcha = () => {
    captchRef.current.getResponse().then(res => {
      setRecaptcha(res);
    })
  }
  const resetCaptcha = () => {
    setRecaptcha(false);
  }

  const CreateAccount = async () => {
    setLoading(true);
    if (!recaptcha) {
      setModalMessage("Please authenticate recaptcha.");
      setShowModalOnError(true);
      setLoading(false);
      return;
    }
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
    try {
      const resData = await axios.post(`${process.env.REACT_APP_SERVER_API}/signup`, { email: userEmail, password: userPassword });
      return resData.data;
    } catch (err) {
      return { message: err.message };
    }
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

          <Reaptcha sitekey={process.env.REACT_APP_SITE_KEY} ref={captchRef} onVerify={verifyCaptcha} onExpire={resetCaptcha} />

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
