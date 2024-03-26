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
  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <div className={css.container}>
      <div className={css.homeContainer}>
        <AdminNavbar />
        <div>
          <div className={css.detailsHeader}>
            <h2>Students Details</h2>
          </div>
          <div className={css.details}>
            <table className={css.studentMenu}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>year</th>
                  <th>Gender</th>
                  <th>Contact No.</th>
                  <th>Email Id</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((student) => (
                  <tr key={student.id}>
                    <td>{student.fullname}</td>
                    <td>{student.rollno}</td>
                    <td> {student.year}</td>
                    <td> {student.gender}</td>
                    <td> {student.mobileno}</td>
                    <td> {student.mail}</td>
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

export default AdminUserList;
