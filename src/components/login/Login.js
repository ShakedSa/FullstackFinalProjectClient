import { React } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../common/Navbar";
import Button from "../common/Button";
import FormControl from "../common/FormControl";
import Modal from "../common/Modal";
import { validateEmail, validatePassword } from "../../assets/validations";
import { getCookie, saveCookie } from "../../assets/cookies";
import { siteName } from "../../assets/const";
import { ServerAPI } from "../../assets/api";
import Loader from "../common/Loader";

const Login = () => {

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [modalMessage, setModalMessage] = useState("Please fill the email and password, requirement are in the tooltip.");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    setLoading(true);
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
    setLoading(false);
  }

  const SendLoginRequest = async () => {
    const res = await axios.post(`${ServerAPI}/login`, { email: userEmail, password: userPassword });
    return res.data;
  }

  useEffect(() => {
    setLoading(true);
    document.title = `${siteName} - Login`;

    // Check cookies for "remember me"
    const email = getCookie("email");
    const password = getCookie("password");
    if (email && password) {
      axios.post(`${ServerAPI}/login`, { email: email, password: password })
        .then((res) => {
          if (res.data.sessionId) {
            saveCookie("sessionId", res.data.sessionId);
            setTimeout(() => {
              navigate("/dashboard");
              setLoading(false);
            });
          }
        });
    }
    setLoading(false)
    return () => setLoading(false);
  }, []);

  return (
    <>
      <Navbar />
      <main className="page">
        <h1>Login to your account</h1>
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
