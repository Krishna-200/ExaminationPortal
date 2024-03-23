import React, { useContext, useState } from "react";
import css from "../styles/SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import Modal from "react-modal";
import studentImage from "../Images/StudentImage.png";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [mail, setMail] = useState("");
  const [mobileno, setMobileno] = useState("");
  const { setFullname: setSignedInFullname, setId } = useContext(UserContext);
  const navigate = useNavigate();
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [fullnameError, setFullnameError] = useState(false);
  const [rollnoError, setRollnoError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [mobilenoError, setMobilenoError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [validOtp, setValidOtp] = useState(false);

  const handleOtpClick = async () => {
    try {
      setMailError("");
      let isValid = true;

      if (
        !mail ||
        !mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        setMailError(true);
        isValid = false;
      } else {
        setLoadingOtp(true);
        const res = await axios.post("/otp", {
          mail,
          fullname,
        });
        if (otpVisible) {
          setOtpVisible(otpVisible);
        } else {
          setOtpVisible(!otpVisible);
        }
        // console.log(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleOtpVerify = async () => {
    setLoadingVerify(true);
    setOtpError(false);

    try {
      const res = await axios.post("/verifyOtp", {
        mail,
        otp,
      });
      // console.log(res.data.valid);
      if (!res.data.valid) {
        setOtpError(true);
      }
      setLoadingVerify(false);
      // console.log("res data " + res.data.valid);
      setValidOtp(res.data.valid);
      // console.log("set data " + validOtp);
    } catch (error) {
      console.log(error);
    }
  };
  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      setFullnameError(false);
      setRollnoError(false);
      setPasswordError(false);
      setGenderError(false);
      setYearError(false);
      setMailError(false);
      setMobilenoError(false);

      let isValid = true;
      if (!fullname) {
        setFullnameError(true);
        isValid = false;
      }
      if (!rollno) {
        setRollnoError(true);
        isValid = false;
      }
      if (!password || password.length < 8) {
        setPasswordError(true);
        isValid = false;
      }
      if (!gender) {
        setGenderError(true);
        isValid = false;
      }
      if (!year) {
        setYearError(true);
        isValid = false;
      }
      if (
        !mail ||
        !mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        setMailError(true);
        isValid = false;
      }
      if (!mobileno) {
        setMobilenoError(true);
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      const response = await axios.post("/SignUp", {
        fullname,
        rollno,
        password,
        gender,
        year,
        mail,
        mobileno,
      });
      // console.log(response.data);

      setSignedInFullname(fullname);
      setId(response.id);
      const userId = response.data.id;
      navigate(`/UserPage/${userId}`);
      if (response.status == 201) {
        alert("Successfull user created");
      }
    } catch (error) {
      console.log(error);
      alert("Email already exists");
    }
  }

  return (
    <div className={css.container}>
      <div className={css.image}>
        <h2>Elevate your online exam experience. Sign Up now!</h2>
        <img className={css.studentImage} src={studentImage} alt="" />
      </div>
      <div className={css.signContainer}>
        <div className={css.form}>
          <h1>User Sign Up</h1>
          <form action="" onSubmit={handleSubmit}>
            <input
              className={fullnameError ? css.fullnameError : css.fullname}
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(ev) => setFullname(ev.target.value)}
            />

            <input
              className={rollnoError ? css.rollnoError : css.rollno}
              type="text"
              placeholder="Roll Number"
              value={rollno}
              onChange={(ev) => setRollno(ev.target.value)}
            />

            <div className={css.selectElements}>
              <select
                className={genderError ? css.genderError : css.gender}
                name="Gender"
                value={gender}
                onChange={(ev) => setGender(ev.target.value)}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <select
                className={yearError ? css.yearError : css.year}
                name="Year"
                value={year}
                onChange={(ev) => setYear(ev.target.value)}
              >
                <option value="">Year</option>
                <option value="first">First</option>
                <option value="second">Second</option>
                <option value="third">Third</option>
                <option value="fourth">Fourth</option>
              </select>
            </div>

            <div className={css.mail}>
              <input
                className={mailError ? css.emailError : css.email}
                type="email"
                placeholder="Enter college Mail ID"
                value={mail}
                onChange={(ev) => setMail(ev.target.value)}
              />

              <h2
                onClick={handleOtpClick}
                className={otpVisible ? css.after : css.before}
              >
                {loadingOtp ? (
                  <div className={css.loadingOtp}>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : otpVisible ? (
                  "OTP Sent"
                ) : (
                  "Send OTP"
                )}
              </h2>
            </div>
            {otpVisible && (
              <div className={css.otp}>
                <input
                  className={otpError ? css.optError : css.ValidOtp}
                  type="text"
                  placeholder="Enter otp"
                  value={otp}
                  onChange={(ev) => setOtp(ev.target.value)}
                />
                <p
                  onClick={handleOtpVerify}
                  className={!validOtp ? css.before : css.after}
                >
                  {loadingVerify ? (
                    <div className={css.loadingOtp}>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : !validOtp ? (
                    "Verify OTP"
                  ) : (
                    "Success"
                  )}
                </p>
              </div>
            )}

            <input
              className={passwordError ? css.passwordError : css.password}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />

            <input
              className={mobilenoError ? css.mobilenoError : css.mobileno}
              type="number"
              placeholder="Mobile No."
              value={mobileno}
              onChange={(ev) => setMobileno(ev.target.value)}
            />

            <div className={css.SignUpButton}>
              <button disabled={!validOtp}>Sign Up</button>
            </div>
            <h3>
              Already have an account?
              <Link style={{ textDecoration: "none" }} to="/login">
                Sign In
              </Link>
            </h3>
          </form>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
