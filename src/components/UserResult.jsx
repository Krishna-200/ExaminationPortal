import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "../styles/AdminPage.module.css";
import UserNavbar from "./UserNavbar";
const UserResult = () => {
  const param = useParams().id;
  const [results, setResutls] = useState([]);
  async function getExamResutls() {
    const response = await axios.get("/UserResult", { params: { id: param } });
    setResutls(response.data);
  }
  // console.log(results);
  useEffect(() => {
    getExamResutls();
  }, [param]);
  return (
    <div className={css.container}>
      <UserNavbar />
      <div className={css.detailsHeader}>
        <h2>My Results</h2>
      </div>

      <div className={css.details}>
        <div className={css.detailContainer}>
          <div className={css.studentMenu}>
            <ul>
              <li>Name</li>
              <li>Subject</li>
              <li>Date</li>
              <li>Marks</li>
              <li>Exam Type</li>
              <li>Status</li>
            </ul>
            <hr />
          </div>
          <div>
            <ul className={css.studentData}>
              {results.map((result) => (
                <li key={result.id}>
                  <p>{result.name}</p>
                  <p>{result.subject}</p>
                  <p>{result.date.slice(0, 10)}</p>
                  <p>{result.totalMarks}</p>
                  <p>{result.examType}</p>
                  <p className={result.stauts == "true" ? css.pass : css.fail}>
                    {result.stauts == "true" ? "Pass" : "Fail"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserResult;
