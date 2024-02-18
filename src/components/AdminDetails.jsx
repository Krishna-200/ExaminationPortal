import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import css from "../styles/AdminPage.module.css";

const AdminDetails = () => {
  const [fullname, setFullname] = useState("");
  const [empid, setEmpid] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [mail, setMail] = useState("");
  const [mobileno, setMobileno] = useState("");
  const param = useParams().id;
  async function getData() {
    const { data } = await axios.get("/AdminPage/" + param);
    setFullname(data.fullname);
    setEmpid(data.empid);
    setGender(data.gender);
    setDepartment(data.department);
    setMail(data.mail);
    setMobileno(data.mobileno);
    // console.log(data);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={css.container}>
      <AdminNavbar />
      <div className={css.detailsHeader}>
        <h2>My Details</h2>
      </div>
      <div className={css.details}>
        <div className={css.detailContainer}>
          <div className={css.detail}>
            <h2>Full Name</h2>
            <h2>{fullname}</h2>
          </div>
          <div className={css.detail}>
            <h2>Emp Id</h2>
            <h2>{empid}</h2>
          </div>
          <div className={css.detail}>
            <h2>Gender</h2>
            <h2>{gender}</h2>
          </div>
          <div className={css.detail}>
            <h2>Email</h2>
            <h2>{mail}</h2>
          </div>
          <div className={css.detail}>
            <h2>Department</h2>
            <h2>{department}</h2>
          </div>
          <div className={css.detail}>
            <h2>Mobile No.</h2>
            <h2>{mobileno}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
