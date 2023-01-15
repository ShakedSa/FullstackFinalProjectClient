import { React } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Button from "../common/Button";
import FormControl from "../common/FormControl";
import Modal from "../common/Modal";
import { validateEmail, validatePassword } from "../../assets/validations";
import { getCookie, saveCookie } from "../../assets/cookies";
import { siteName } from "../../assets/const";
import { ServerAPI } from "../../assets/api";

const Login = () => {

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [modalMessage, setModalMessage] = useState("Please fill the email and password, requirement are in the tooltip.");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (validateEmail(userEmail) && validatePassword(userPassword)) {
      const res = await SendLoginRequest();
      if (res.sessionId) {
        saveCookie("sessionId", res.sessionId);
        if (remember) {
          saveCookie("email", userEmail);
          saveCookie("password", userPassword);
        }
        navigate('/dashboard');
      } else {
        setModalMessage(`Failed to login, ${res.message}`);
        setShowModal(true);
      }
    } else {
      // display modal.
      setModalMessage("Please fill the email and password, requirement are in the tooltip.");
      setShowModal(true);
    }
  }

  const SendLoginRequest = async () => {
    const res = await fetch(`${ServerAPI}/login`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    });

    const resData = await res.json();
    return resData;
  }

  useEffect(() => {
    document.title = `${siteName} - Login`;

    // Check cookies for "remember me"
    const email = getCookie("email");
    const password = getCookie("password");

    if (email && password) {
      setUserEmail(email);
      setUserPassword(password);
      onSubmit();
    }
  }, []);

  return (
    <>
      <Navbar />

      <main className="page">
        <h1>Login to your account</h1>
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

          <div style={{ textAlign: "center" }}>
            <input type="checkbox" name="remember" id="remember" onChange={(e) => setRemember(e.target.checked)} />
            <span>Remember Me</span>
          </div>
          <Button className="btn" content="Login" onClickCallback={onSubmit} />

          <p className="text">
            Don't have an account? <NavLink to="/signup">Signup</NavLink>
            <br />
            <NavLink to="/forgotpassword">Forgot Password?</NavLink>
          </p>
        </form>
        {showModal && <Modal errorMessage={modalMessage} setDisplay={setShowModal} />}
      </main>
    </>
  );
}
export default Login;
