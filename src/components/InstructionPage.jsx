import React, { useEffect, useState, useRef } from "react";
import UserNavbar from "./UserNavbar";
import css from "../styles/InstructionPage.module.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Webcam from "react-webcam";

const InstructionPage = () => {
  const location = useLocation();
  const { exam } = location.state;
  const param = useParams().id;
  //   console.log(param);
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState("");
  const [userDetails, setUserDetails] = useState("");
  //   console.log(exam);
  const webRef = useRef(null);
  const [button, setButton] = useState(false);

  async function camData() {
    // console.log(webRef.current.state.hasUserMedia);
    if (webRef.current.state.hasUserMedia) {
      setButton(true);
    }
  }
  // console.log(button);

  async function handleStartExam() {
    navigate("/ExamPage/" + param, { state: { exam } });
  }

  async function getAdminDetails() {
    const response = await axios.get("/AdminPage/" + exam.id);
    setAdminDetails(response.data);
  }

  async function getUserDetails() {
    const response = await axios.get("/UserPage/" + param);
    setUserDetails(response.data);
  }

  useEffect(() => {
    getAdminDetails();
    getUserDetails();
    camData();
  }, []);

  setTimeout(() => {
    camData();
  }, 8000);

  return (
    <div className={css.container}>
      <div className={css.homeContainer}>
        <UserNavbar />
        <div className={css.instruction}>
          <h2>Instructions</h2>
          <div>
            <h3>
              Logging In: Before accessing any exams, you must log in using your
              username and password. If you don't have an account, you can sign
              up for one using the provided registration form.
            </h3>
            <h3>
              Exam Dashboard: Upon logging in, you will be directed to the exam
              dashboard. The dashboard will display a list of available exams
              along with their details such as subject, date, and duration.
              Click on the exam you wish to take to proceed.
            </h3>
            <h3>
              Exam Instructions: Before starting the exam, carefully read the
              instructions provided. Instructions may include details about the
              exam format, time limit, number of questions, and any specific
              rules or guidelines to follow during the exam.
            </h3>
            <h3>
              Taking the Exam: Once you're ready to begin, click on the "Start
              Exam" button. The exam interface will display the questions one by
              one, along with options for multiple-choice questions or text
              input for descriptive answers. Answer each question to the best of
              your ability. Use the navigation buttons to move between questions
              and review your answers before submitting.
            </h3>
            <h3>
              Submitting the Exam: After completing all the questions, review
              your answers one last time. Once you're satisfied, click on the
              "Submit Exam" button to submit your responses. Once submitted, you
              will not be able to make any further changes.
            </h3>
            <h3>
              Viewing Results: After submitting the exam, you will receive
              immediate feedback on your performance. You may be able to view
              your score, the correct answers, and any feedback provided by the
              examiner. Depending on the exam settings, you may also receive
              detailed performance analysis and suggestions for improvement.
            </h3>
            <h3>
              Exam Integrity: Maintain exam integrity by refraining from any
              form of cheating or dishonest behavior. Any attempt to cheat or
              violate exam rules may result in disqualification and disciplinary
              action.
            </h3>
          </div>
          <div className={css.tableCam}>
            <table className={css.table}>
              <tr>
                <td>Student Name</td>
                <td>{userDetails.fullname}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{userDetails.mail}</td>
              </tr>
              <tr>
                <td>Exam Type</td>
                <td>{exam.examType}</td>
              </tr>
              <tr>
                <td>Subject</td>
                <td>{exam.subject}</td>
              </tr>
              <tr>
                <td>Conducted By</td>
                <td>{adminDetails.fullname}</td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>{exam.duration}</td>
              </tr>
              <tr>
                <td>Year</td>
                <td>{exam.year}</td>
              </tr>
              <tr>
                <td>Total Marks</td>
                <td>{exam.marks}</td>
              </tr>
            </table>
            <Webcam ref={webRef} className={css.cam} />
          </div>
          <button disabled={!button} onClick={handleStartExam}>
            {!button ? (
              <div className={css.loadingOtp}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              "Start Exam"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionPage;
