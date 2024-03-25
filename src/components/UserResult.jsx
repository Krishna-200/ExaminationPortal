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
      <div className={css.homeContainer}>
        <UserNavbar />
        <div>
          <div className={css.detailsHeader}>
            <h2>My Results</h2>
          </div>

          <div className={css.details}>
            <table className={css.studentMenu}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Marks</th>
                  <th>Exam Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id}>
                    <td>{result.name}</td>
                    <td>{result.subject}</td>
                    <td>{new Date(result.date).toLocaleDateString("en-GB")}</td>
                    <td>{result.totalMarks}</td>
                    <td>{result.examType}</td>
                    <td
                      className={result.stauts === "true" ? css.pass : css.fail}
                    >
                      {result.stauts === "true" ? <p>pass</p> : <p>fail</p>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserResult;
