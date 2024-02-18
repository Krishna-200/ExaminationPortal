import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import css from "../styles/AdminPage.module.css";
import AdminDetails from "./AdminDetails";
import AdminNavbar from "./AdminNavbar";

const AdminPage = () => {
  const [fullname, setFullname] = useState("");
  const param = useParams().id;
  async function getData() {
    const { data } = await axios.get("/AdminPage/" + param);
    setFullname(data.fullname);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={css.container}>
      <AdminNavbar />
      <div className={css.homeContaier}>
        <div className={css.homeText}>
          <h2>Hey,</h2>
          <h3>{fullname}</h3>
          <h2>Admin</h2>
          <h4>Reimaging the Exam Experience</h4>
          <h4>Redefining the Exam Standard</h4>
        </div>
        <div className={css.homeImage}></div>
      </div>
      {/* <AdminDetails fullname={fullname} /> */}
    </div>
  );
};

export default AdminPage;
