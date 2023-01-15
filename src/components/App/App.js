import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../common/Footer";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Forgotpassword from "../forgotpassword/Forgotpassword";
import Contact from "../contact/Contact";
import Dashboard from "../dashboard/Dashboard";
import PageNotFound from "../pagenotfound/PageNotFound"

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
