import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import css from "../styles/UserPage.module.css";
import UserNavbar from "./UserNavbar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoSchoolSharp } from "react-icons/io5";
import { FcDepartment } from "react-icons/fc";
import { FaSchool } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import avatar from "/profile.png";

const Userpage = () => {
  const param = useParams().id;
  const [fullname, setFullname] = useState("");
  const [mail, setMail] = useState("");
  const [file, setFile] = useState(null);
  const [year, setYear] = useState("");
  const [results, setResutls] = useState([]);
  const [score, setScore] = useState([]);
  const [filePath, setFilePath] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [exams, setExams] = useState("");
  const today = new Date().toLocaleDateString("en-GB");
  const [recentExams, setRecentExams] = useState([]);

  async function getUserData() {
    try {
      const { data } = await axios.get("/UserPage/" + param);
      setFullname(data.fullname);
      setMail(data.mail);
      setYear(data.year);
      // console.log(data);
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

  function handleFileChange(ev) {
    setShowButton(true);
    setFile(ev.target.files[0]);

    const reader = new FileReader();
    reader.onload = function (e) {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(ev.target.files[0]);
  }

  async function handleFileUpload() {
    const formData = new FormData();
    formData.append("file", file);
    setShowButton(false);
    const response = await axios.post("/imageUpload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: { id: param },
    });
  }

  async function getImage() {
    const response = await axios.get("/getImage", { params: { id: param } });
    if (response.data.length > 0) {
      setFilePath(response.data[0].file);
      // console.log(response.data[0].file);
    }
    setShowButton(false);
  }

  useEffect(() => {
    getImage();
  }, []);

  async function getExams() {
    const response = await axios.get("/AllExams");
    // console.log(response.data);
    setExams(response.data);
  }

  useEffect(() => {
    getExams();
  }, []);

  useEffect(() => {
    if (Array.isArray(exams)) {
      const updatedRecentExams = exams.filter((exam) => {
        return (
          exam.year === "second" &&
          new Date(exam.date).toLocaleDateString("en-GB") > today
        );
      });
      setRecentExams(updatedRecentExams);
    }
  }, [exams]);

  console.log(recentExams);

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
            {filePath ? (
              <img
                src={`https://examniationportal-backend.onrender.com/images/${filePath}`}
                alt="avatar"
              />
            ) : imageUrl ? (
              <img src={imageUrl} alt="Uploaded" />
            ) : (
              <label htmlFor="file-upload">
                <img src={avatar} alt="" />
              </label>
            )}

            <input
              type="file"
              id="file-upload"
              label="Image"
              onChange={handleFileChange}
            />
            {showButton ? <button onClick={handleFileUpload}>Save</button> : ""}
            <h2>{fullname}</h2>
          </div>
          <div className={css.line}> </div>
          <div className={css.info}>
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
        <Link to={"/AllExams/" + param} style={{ textDecoration: "none" }}>
          <div className={css.recentExams}>
            <h2>Upcomming Exams</h2>
            <div>
              {recentExams.map((exam) => (
                <div
                  key={exam.id}
                  className={`${css.examCard} ${
                    exam.examType === "practice" ? css.practice : css.actual
                  }`}
                >
                  <div>
                    <h3>Subject: {exam.subject}</h3>
                    <h3>({exam.examType} exam)</h3>
                  </div>
                  <div>
                    <p>Year:{exam.year} </p>
                    <p>Department:{exam.department} </p>
                    <p> Duration:{exam.duration} min </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Userpage;
