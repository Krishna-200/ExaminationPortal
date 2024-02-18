import React from "react";
import css from "../styles/AdminPage.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminNavbar = () => {
  const param = useParams().id;
  const navigate = useNavigate();

  async function handleLogout() {
    const res = await axios.get("/logout");
    navigate("/");
  }
  return (
    <div className={css.navbar}>
      <ul className={css.navList}>
        <Link to={"/AdminPage/" + param} style={{ textDecoration: "none" }}>
          <li>Home</li>
        </Link>
        <Link to={"/AdminDetails/" + param} style={{ textDecoration: "none" }}>
          <li>My details</li>
        </Link>
        <Link to={"/AdminUserList/" + param} style={{ textDecoration: "none" }}>
          <li>Student Details</li>
        </Link>
        <Link to={"/AllResults/" + param} style={{ textDecoration: "none" }}>
          <li>Student Results</li>
        </Link>
        <Link to={"/UploadTest/" + param} style={{ textDecoration: "none" }}>
          <li>Upload tests</li>
        </Link>
        <Link to={"/AllExams/" + param} style={{ textDecoration: "none" }}>
          <li>All Your Exams</li>
        </Link>
      </ul>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default AdminNavbar;
