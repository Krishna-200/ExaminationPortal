import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import css from "../styles/Login.module.css";
import axios from "axios";
import { FaMailBulk } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import userSVG from "../Images/studentSVG.svg";
import adminSVG from "../Images/adminSVG.svg";

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [adminMail, setAdminMail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();
  const [mailError, setMailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [adminMailError, setAdminMailError] = useState(false);
  const [adminPasswordError, setAdminPasswordError] = useState(false);

  // User Login Function handling
  async function handleLogin(ev) {
    try {
      ev.preventDefault();
      setMailError(false);
      setPasswordError(false);

      let isValid = true;
      if (
        !mail ||
        !mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        setMailError(true);
        isValid = false;
      }
      if (!password || password.length < 8) {
        setPasswordError(true);
        isValid = false;
      }

      if (isValid) {
        const response = await axios.post("/login", {
          mail,
          password,
        });
        // console.log(response);
        const userId = response.data.id;
        navigate(`/UserPage/${userId}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setPasswordError(true);
      setMailError(true);
    }
  }

  //Admin Login Function handling
  async function handleAdminLogin(ev) {
    try {
      ev.preventDefault();
      setAdminMailError(false);
      setAdminPasswordError(false);

      let isValid = true;
      if (
        !adminMail ||
        !adminMail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        setAdminMailError(true);
        isValid = false;
      }
      if (!adminPassword || adminPassword.length < 8) {
        setAdminPasswordError(true);
        isValid = false;
      }
      if (isValid) {
        const res = await axios.post("/Adminlogin", {
          mail: adminMail,
          password: adminPassword,
        });

        console.log(res);
        const AdminId = res.data.id;
        navigate(`/AdminPage/${AdminId}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setAdminPasswordError(true);
      setAdminMailError(true);
    }
  }

  //animations

  const [showAdmin, setShowAdmin] = useState(false);
  const [adminClick, setAdminClick] = useState(false);
  const [hideUserSVG, setHideUserSVG] = useState(false);
  const [hideUserLogin, setHideUserLogin] = useState(false);

  const handleClick = () => {
    setShowAdmin(true);
    setAdminClick(true);
    setHideUserSVG(true);
    setHideUserLogin(true);
    setHideAdmin(false);
    setAdminMailError(false);
    setAdminPasswordError(false);
  };

  const [hideAdmin, setHideAdmin] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const handleUserClick = () => {
    setHideAdmin(true);
    setShowAdmin(false);
    setShowUser(true);
    setAdminClick(false);
    setHideUserSVG(false);
    setHideUserLogin(false);
  };

  return (
    <div
      className={`${css.container}   ${
        adminClick ? css.adminLogin : css.userLogin
      }`}
    >
      <div className={`${css.userSVG}   ${hideUserSVG ? css.hideUserSVG : ""}`}>
        <h1>Examify</h1>
        <img src={userSVG} alt="" />
        <h2>Admin Login Click Here</h2>
        <button onClick={handleClick}>Admin Login</button>
      </div>
      <div
        className={`${css.adminSVG} ${hideAdmin ? css.hideAdmin : ""}  ${
          showAdmin ? css.animate : ""
        }`}
      >
        <h1>Examify</h1>
        <img src={adminSVG} alt="" />
        <h2>Admin Login Click Here</h2>
        <button onClick={handleUserClick}>User Login</button>
      </div>
      <div
        className={`${css.adminContainer} ${hideAdmin ? css.hideAdmin : ""} ${
          showAdmin ? css.animate : ""
        }`}
      >
        {/* <div className={css.welcome}>Welcome back</div> */}
        <h2>Admin Log In</h2>

        <form action="" className={css.form} onSubmit={handleAdminLogin}>
          <div
            className={`${css.input} ${
              adminMailError ? css.adminMailError : ""
            } }`}
          >
            <FaMailBulk />
            <input
              type="text"
              placeholder="email@email.com"
              value={adminMail}
              onChange={(ev) => setAdminMail(ev.target.value)}
            />
          </div>
          <div
            className={`${css.input} ${
              adminPasswordError ? css.adminPasswordError : ""
            }`}
          >
            <RiLockPasswordFill />
            <input
              type="password"
              placeholder="***********"
              value={adminPassword}
              onChange={(ev) => setAdminPassword(ev.target.value)}
            />
          </div>

          <button type="submit"> Login</button>
          <h4>
            I don't have an account.{" "}
            <Link to="/AdminSignUp" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </h4>
        </form>
      </div>

      <div
        className={`${css.mainContainer} ${
          hideUserLogin ? css.hideUserLogin : ""
        } `}
      >
        {/* <div className={`${css.welcome} `}>Welcome back</div> */}
        <h2> LogIn as a user</h2>
        <form action="" className={css.form} onSubmit={handleLogin}>
          <div className={`${css.input} ${mailError ? css.mailError : ""}`}>
            <FaMailBulk />
            <input
              type="text"
              placeholder="Enter your email address"
              value={mail}
              onChange={(ev) => setMail(ev.target.value)}
            />
          </div>
          <div
            className={`${css.input} ${passwordError ? css.passwordError : ""}`}
          >
            <RiLockPasswordFill />
            <input
              type="password"
              placeholder="***********"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>

          <button type="submit">Login</button>
          <h4>
            I don't have an account.{" "}
            <Link to="/SignUp" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Login;
