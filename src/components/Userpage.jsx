import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "../styles/UserPage.module.css";
import UserNavbar from "./UserNavbar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { IoSchoolSharp } from "react-icons/io5";
import { FcDepartment } from "react-icons/fc";
import { FaSchool } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

const Userpage = () => {
  const param = useParams().id;
  const [fullname, setFullname] = useState("");
  const [mail, setMail] = useState("");
  const [file, setFile] = useState("");
  const [year, setYear] = useState("");
  const [results, setResutls] = useState([]);
  const [score, setScore] = useState([]);

  async function getUserData() {
    try {
      const { data } = await axios.get("/UserPage/" + param);
      setFullname(data.fullname);
      setMail(data.mail);
      setFile(data.file);
      setYear(data.year);
      console.log(data);
    } catch (error) {
      if (error) throw error;
    }
  }

  async function getExamResutls() {
    const response = await axios.get("/UserResult", { params: { id: param } });
    setResutls(response.data);
  }

  let passMarks = 0;

  useEffect(() => {
    if (results.length > 0) {
      const passMarks = results.map((result) =>
        result.stauts === "true" ? 1 : 0
      );
      setScore(passMarks);
    }
  }, [results]);
  // console.log(score);

  score.map((pass) => {
    if (pass == 1) {
      passMarks++;
    }
  });

  // console.log(score.length);
  // console.log(passMarks);

  const percentage = Math.round((passMarks / score.length) * 100);
  const color = percentage < 60 ? "red" : "green";
  // console.log(percentage);

  useEffect(() => {
    getExamResutls();
  }, [param]);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={css.container}>
      <div className={css.homeContainer}>
        <div>
          <UserNavbar />
        </div>
        <div className={css.progressContainer}>
          <h2>Performance analysis</h2>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={{
              root: { width: 150 },
              path: { stroke: color },
              text: { fill: color },
            }}
          />
          <div>
            <p></p>
            <h3>Good</h3>
            <span></span>
            <h3>Need to imporve</h3>
          </div>
        </div>
        <div className={css.profile}>
          <div className={css.avatar}>
            <img src={`http://localhost:3000/images/` + file} alt="" />
            <h2>{fullname}</h2>
          </div>
          <div className={css.line}> </div>
          <div className={css.info}>
            <span>
              <LiaBirthdayCakeSolid />
              <p>03-11-2001</p>
            </span>
            <span>
              <IoSchoolSharp />
              <p>{year}</p>
            </span>
            <span>
              <FcDepartment />
              <p>CSE</p>
            </span>
            <span>
              <FaSchool />
              <p>Aditya collge of engineering</p>
            </span>
            <span>
              <CgProfile />
              <p>Student</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userpage;
