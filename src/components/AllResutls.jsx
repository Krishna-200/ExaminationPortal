import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import css from "../styles/AdminPage.module.css";
import AdminNavbar from "./AdminNavbar";

const AllResutls = () => {
  const param = useParams().id;
  const navigate = useNavigate();

  const [results, setResutls] = useState([]);
  async function getExamResutls() {
    const response = await axios.get("ExamResutls", { params: { id: param } });
    setResutls(response.data);
  }
  // console.log(results);
  useEffect(() => {
    getExamResutls();
  }, [param]);

  async function resultDetails(result) {
    console.log(result);
    navigate(`/ResultDetails/${param}`, { state: { resultData: result } });
  }

  return (
    <div className={css.container}>
      <div className={css.homeContainer}>
        <AdminNavbar />
        <div>
          <div className={css.detailsHeader}>
            <h2>Student Results</h2>
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
                  <th className={css.mobileno}>Contact No.</th>
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
                    <td className={css.mobileno}>{result.mobileno}</td>
                    <td
                      className={result.stauts === "true" ? css.pass : css.fail}
                    >
                      {result.stauts === "true" ? <p>pass</p> : <p>fail</p>}
                    </td>
                    <td onClick={() => resultDetails(result)}>
                      <p>More Details</p>
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

export default AllResutls;
