import React from "react";
import css from "../styles/Welcome.module.css";
import gradient from "../Images/WelcomeImage.jpeg";
import { Link } from "react-router-dom";
import SignUp from "./SignUp.jsx";

const Welcome = () => {
  return (
    <div className={css.mainContainer}>
      <div className={css.imageContainer}>
        <img src={gradient} alt="welcome image" />
      </div>
      <div className={css.textComponent}>
        <div className={css.text}>
          <h1>Welcome to Online Examination System</h1>
          <h3>
            This app is the best app,thank you for downloading it. You won't
            regret using it.
          </h3>
        </div>
        <div className={css.buttons}>
          <Link to="/AdminSignUp">Sign up as Admin</Link>
          <Link to="/SignUp">Sign up as User</Link>
          <Link to="/login">Login</Link>
        </div>
        <h4>
          By signing up, I agree to the Terms and Conditions and Privacy Policy
        </h4>
      </div>
    </div>
  );
};

export default Welcome;
