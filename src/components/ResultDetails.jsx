import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import css from "../styles/AdminPage.module.css";
import AdminNavbar from "./AdminNavbar";

const ResultDetails = () => {
  const location = useLocation();
  const { resultData } = location.state;
  // console.log(resultData);
  const [images, setImages] = useState([]);
  const [examDetails, setExamDetails] = useState({});
  const [userRollNo, setUserRollNo] = useState("");
  const [userEmail, setUserEmail] = useState("");

  async function getPhotos(examId, userId) {
    try {
      const response = await axios.get("/getScreenshots", {
        params: {
          examId: resultData.examId,
          userId: resultData.userId,
        },
      });
      const { data } = response;
      setImages(data[0].images);
    } catch (error) {
      console.error(error);
    }
  }

  async function getExamDetails() {
    const response = await axios.get("/getExamDetails", {
      params: { examId: resultData.examId },
    });
    // console.log(response.data);
    setExamDetails(response.data);
  }

  async function getUserDetails() {
    const { data } = await axios.get("/UserPage/" + resultData.userId);
    setUserEmail(data.mail);
    setUserRollNo(data.rollno);
  }

  useEffect(() => {
    getPhotos();
    getExamDetails();
    getUserDetails();
  }, []);

  return (
    <div className={css.container}>
      <div className={css.homeContainer}>
        <AdminNavbar />
        <div className={css.resultDetails}>
          <h2>Result Details</h2>
          <div className={css.results}>
            <div className={css.examInfo}>
              <h3>Exam Details:</h3>
              <table>
                <tr>
                  <td>
                    <p>Exam Type:</p>
                  </td>
                  <td>
                    <p>{examDetails.examType}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Department:</p>
                  </td>
                  <td>
                    <p>{examDetails.department}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Duration:</p>
                  </td>
                  <td>
                    <p>{examDetails.duration}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Subject:</p>
                  </td>
                  <td>
                    <p>{examDetails.subject}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Date:</p>
                  </td>
                  <td>
                    <p>
                      {new Date(examDetails.date).toLocaleDateString("en-GB")}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Year:</p>
                  </td>
                  <td>
                    <p>{examDetails.year}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Marks:</p>
                  </td>
                  <td>
                    <p>{examDetails.marks}</p>
                  </td>
                </tr>
              </table>
            </div>
            <div className={css.resultInfo}>
              <h3>Exam Results:</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <p>Name:</p>
                    </td>
                    <td>
                      <p>{resultData.name}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Mobile Number:</p>
                    </td>
                    <td>
                      <p>{resultData.mobileno}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Total Marks:</p>
                    </td>
                    <td>
                      <p>{resultData.totalMarks}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Wrriten Date</p>
                    </td>
                    <td>
                      <p>
                        {new Date(resultData.date).toLocaleDateString("en-GB")}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Email:</p>
                    </td>
                    <td>
                      <p>{userRollNo}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Roll NO:</p>
                    </td>
                    <td>
                      <p>{userRollNo}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Status</p>
                    </td>
                    <td>
                      {resultData.stauts === "true" ? <p>pass</p> : <p>fail</p>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <h2>Images of Student During Exam:</h2>
          <div className={css.screenShots}>
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Screenshot ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDetails;
