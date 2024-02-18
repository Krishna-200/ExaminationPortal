import React, { useContext, useState } from "react";
import css from "../styles/SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import Modal from "react-modal";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [empid, setEmpid] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [mail, setMail] = useState("");
  const [mobileno, setMobileno] = useState("");
  const { setFullname: setSignedInFullname, setId } = useContext(UserContext);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [fullnameError, setFullnameError] = useState("");
  const [empidError, setEmpidError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [mailError, setMailError] = useState("");
  const [mobilenoError, setMobilenoError] = useState("");
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [verifyModalMessage, setVerifyModalMessage] = useState("");
  const [verifyModalIsOpen, setVerifymodalIsOpen] = useState(false);
  const [validOtp, setValidOtp] = useState(false);

  const handleOtpClick = async () => {
    try {
      setMailError("");
      let isValid = true;

      if (
        !mail ||
        !mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        setMailError("Enter a valid email address");
        isValid = false;
      } else {
        setLoadingOtp(true);
        const res = await axios.post("http://localhost:3000/otp", {
          mail,
          fullname,
        });
        if (otpVisible) {
          setOtpVisible(otpVisible);
        } else {
          setOtpVisible(!otpVisible);
        }
        // console.log(res);
        setModalMessage("Email has been sent successfully.");
        setModalIsOpen(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleOtpVerify = async () => {
    setLoadingVerify(true);
    try {
      const res = await axios.post("http://localhost:3000/verifyOtp", {
        mail,
        otp,
      });
      // console.log(res.data.valid);
      setLoadingVerify(false);
      setVerifymodalIsOpen(true);
      // console.log("res data " + res.data.valid);
      setValidOtp(res.data.valid);
      // console.log("set data " + validOtp);
      if (res.data.valid) {
        setVerifyModalMessage("otp verification successful");
      } else {
        setVerifyModalMessage("otp verification failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("set data after " + validOtp);

  async function handleSubmit(ev) {
    ev.preventDefault();
    setFullnameError("");
    setMailError("");
    setEmpidError("");
    setPasswordError("");
    setGenderError("");
    setDepartmentError("");
    setMobilenoError("");

    let isValid = true;
    if (!fullname) {
      setFullnameError("Please enter your full name");
      isValid = false;
    }
    if (!gender) {
      setGenderError("Please Select your gender");
      isValid = false;
    }
    if (!department) {
      setDepartmentError("Please select your department");
      isValid = false;
    }
    if (!empid) {
      setEmpidError("Emp Id is required");
      isValid = false;
    }

    if (!password || password.length < 8) {
      setPasswordError("Password must be 8 characters long");
      isValid = false;
    }

    if (!mail || !mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setMailError("eMail is required");
      isValid = false;
    }

    if (!mobileno || mobileno.length < 10) {
      setMobilenoError("Mobile No. is required");
      isValid = false;
    }

    if (!isValid) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/AdminSignUp", {
        fullname,
        empid,
        password,
        gender,
        department,
        mail,
        mobileno,
      });
      setSignedInFullname(fullname);
      setId(response.id);
      const adminId = response.data.id;
      navigate(`/AdminPage/${adminId}`);
      // console.log(response.status);
      if (response.status == 201) {
        alert("Successfull admin created");
      }
    } catch (error) {
      alert("Email already exists");
      // console.log(error);
    }
  }

  return (
    <div className={css.container}>
      <div className={css.signContainer}>
        <h1>Admin Sign Up</h1>
        <div className={css.form}>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(ev) => setFullname(ev.target.value)}
            />
            {fullnameError && <p className={css.error}>{fullnameError}</p>}
            <input
              type="text"
              placeholder="Emp.id"
              value={empid}
              onChange={(ev) => setEmpid(ev.target.value)}
            />
            {empidError && <p className={css.error}>{empidError}</p>}
            <div className={css.selectElements}>
              <select
                name="Gender"
                value={gender}
                onChange={(ev) => setGender(ev.target.value)}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <select
                name="department"
                value={department}
                className={css.dept}
                onChange={(ev) => setDepartment(ev.target.value)}
              >
                <option value="">Department</option>
                <option value="cse">CSE</option>
                <option value="ece">ECE</option>
                <option value="mech">MECH</option>
                <option value="civil">CIVIL</option>
                <option value="eee">EEE</option>
              </select>
              {genderError && <p className={css.error}>{genderError}</p>}
              {departmentError && (
                <p className={css.error}>{departmentError}</p>
              )}
            </div>

            <div className={css.mail}>
              <input
                type="email"
                placeholder="Enter Mail ID"
                value={mail}
                onChange={(ev) => setMail(ev.target.value)}
              />
              {mailError && <p className={css.error}>{mailError}</p>}

              <h2 onClick={handleOtpClick}>
                {loadingOtp ? "Sending OTP..." : "Send OTP"}
              </h2>
            </div>
            {otpVisible && (
              <div className={css.otp}>
                <input
                  type="text"
                  placeholder="Enter 4 digit otp"
                  value={otp}
                  onChange={(ev) => setOtp(ev.target.value)}
                />

                <p onClick={handleOtpVerify}>
                  {loadingVerify ? "Verifying OTP..." : "verify OTP"}
                </p>
              </div>
            )}
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            {passwordError && <p className={css.error}>{passwordError}</p>}

            <input
              type="number"
              placeholder="Mobile No."
              value={mobileno}
              onChange={(ev) => setMobileno(ev.target.value)}
            />

            {mobilenoError && <p className={css.error}>{mobilenoError}</p>}

            <div className={css.SignUpButton}>
              <button disabled={!validOtp}>Sign Up</button>
            </div>
          </form>
          <div>
            <Modal
              appElement={document.getElementById("root")}
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              contentLabel="Email Status"
              className={css.modal}
            >
              <h2>{modalMessage}</h2>
              <button onClick={() => setModalIsOpen(false)}>Close</button>
            </Modal>
            <Modal
              appElement={document.getElementById("root")}
              isOpen={verifyModalIsOpen}
              onRequestClose={() => setVerifymodalIsOpen(false)}
              contentLabel="Email Status"
              className={css.modal}
            >
              <h2>{verifyModalMessage}</h2>
              <button onClick={() => setVerifymodalIsOpen(false)}>Close</button>
            </Modal>
          </div>
        </div>
        <h3>
          Already have an account?{" "}
          <Link style={{ textDecoration: "none" }} to="/login">
            Sign In
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default SignUp;
