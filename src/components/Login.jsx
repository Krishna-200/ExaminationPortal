import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import css from "../styles/Login.module.css";
import axios from "axios";

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [adminMail, setAdminMail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [adminMailError, setAdminMailError] = useState("");
  const [adminPasswordError, setAdminPasswordError] = useState("");

  // User Login Function handling
  async function handleLogin(ev) {
    try {
      ev.preventDefault();
      setMailError("");
      setPasswordError("");

      let isValid = true;
      if (
        !mail ||
        !mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        setMailError("eMail is required");
        isValid = false;
      }
      if (!password || password.length < 8) {
        setPasswordError("Password must be 8 characters long");
        isValid = false;
      }

      if (isValid) {
        const response = await axios.post("http://localhost:3000/login", {
          mail,
          password,
        });
        // console.log(response);
        const userId = response.data.id;
        navigate(`/UserPage/${userId}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setPasswordError("Wrong credentials");
    }
  }

  //Admin Login Function handling
  async function handleAdminLogin(ev) {
    try {
      ev.preventDefault();
      setAdminMailError("");
      setAdminPasswordError("");

      let isValid = true;
      if (
        !adminMail ||
        !adminMail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        setAdminMailError("eMail is required");
        isValid = false;
      }
      if (!adminPassword || adminPassword.length < 8) {
        setAdminPasswordError("Password must be 8 characters long");
        isValid = false;
      }
      if (isValid) {
        const res = await axios.post("http://localhost:3000/Adminlogin", {
          mail: adminMail,
          password: adminPassword,
        });
        const AdminId = res.data.id;
        navigate(`/AdminPage/${AdminId}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setAdminPasswordError("Wrong credentials");
    }
  }
  return (
    <div className={css.container}>
      <div className={css.adminContainer}>
        <h2>Admin Log In</h2>
        <h3>Enter your details to continue</h3>
        <form action="" className={css.form} onSubmit={handleAdminLogin}>
          <label htmlFor="">Enter your email</label>
          <input
            type="text"
            placeholder="email@email.com"
            value={adminMail}
            onChange={(ev) => setAdminMail(ev.target.value)}
          />
          {adminMailError && <p className={css.error}>{adminMailError}</p>}

          <label htmlFor="">Enter your password</label>
          <input
            type="password"
            placeholder="***********"
            value={adminPassword}
            onChange={(ev) => setAdminPassword(ev.target.value)}
          />
          {adminPasswordError && (
            <p className={css.error}>{adminPasswordError}</p>
          )}

          <button type="submit"> Login</button>
          <h4>
            I don't have an account.{" "}
            <Link to="/AdminSignUp" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </h4>
        </form>
      </div>
      <div className={css.mainContainer}>
        <h2>User Log In</h2>
        <h3>Enter your details to continue</h3>
        <form action="" className={css.form} onSubmit={handleLogin}>
          <label htmlFor="">Enter your email</label>
          <input
            type="text"
            placeholder="email@email.com"
            value={mail}
            onChange={(ev) => setMail(ev.target.value)}
          />
          {mailError && <p className={css.error}>{mailError}</p>}

          <label htmlFor="">Enter your password</label>
          <input
            type="password"
            placeholder="***********"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          {passwordError && <p className={css.error}>{passwordError}</p>}

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
