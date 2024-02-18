import React, { useEffect, useState } from "react";
import css from "../styles/AdminPage.module.css";
import AdminNavbar from "./AdminNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";

const AdminUserList = () => {
  const param = useParams().id;
  const [studentData, setStudentData] = useState([]);
  const getStudentData = async () => {
    try {
      const response = await axios.get("/UserDetails");
      setStudentData(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
      throw error;
    }
  };
  // console.log(studentData);
  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <div className={css.container}>
      <AdminNavbar />
      <div className={css.detailsHeader}>
        <h2>Student Details</h2>
      </div>

      <div className={css.details}>
        <div className={css.detailContainer}>
          <div className={css.studentMenu}>
            <ul>
              <li>Name</li>
              <li>Roll No</li>
              <li>year</li>
              <li>Gender</li>
              <li>Contact No.</li>
              <li>Email Id</li>
            </ul>
            <hr />
          </div>
          <div>
            <ul className={css.studentData}>
              {studentData.map((student) => (
                <li key={student.id}>
                  <p>{student.fullname}</p>
                  <p>{student.rollno}</p>
                  <p> {student.year}</p>
                  <p> {student.gender}</p>
                  <p> {student.mobileno}</p>
                  <p> {student.mail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserList;
