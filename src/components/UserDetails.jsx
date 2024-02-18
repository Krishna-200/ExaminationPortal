import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import UserNavbar from "./UserNavbar";
import css from "../styles/AdminPage.module.css";

const UserDetails = () => {
  const [fullname, setFullname] = useState("");
  const [rollno, setRollno] = useState("");
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [mail, setMail] = useState("");
  const [mobileno, setMobileno] = useState("");
  const param = useParams().id;
  async function getData() {
    const { data } = await axios.get("/UserPage/" + param);
    setFullname(data.fullname);
    setRollno(data.rollno);
    setGender(data.gender);
    setYear(data.year);
    setMail(data.mail);
    setMobileno(data.mobileno);
    // console.log(data);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={css.container}>
      <UserNavbar />
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
            <h2>Roll No</h2>
            <h2>{rollno}</h2>
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
            <h2>Year</h2>
            <h2>{year}</h2>
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

export default UserDetails;
