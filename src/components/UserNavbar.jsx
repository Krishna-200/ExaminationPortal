import React from "react";
import css from "../styles/UserPage.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserNavbar = () => {
  const param = useParams().id;
  const navigate = useNavigate();

  async function handleLogout() {
    const res = await axios.get("/logout");
    navigate("/");
  }
  return (
    <div className={css.navbar}>
      <ul className={css.navList}>
        <Link to={"/UserPage/" + param} style={{ textDecoration: "none" }}>
          <li>Home</li>
        </Link>
        <Link to={"/UserDetails/" + param} style={{ textDecoration: "none" }}>
          <li>My details</li>
        </Link>

        <Link to={"/UserResult/" + param} style={{ textDecoration: "none" }}>
          <li> Results</li>
        </Link>

        <Link to={"/UserAllExams/" + param} style={{ textDecoration: "none" }}>
          <li>All Exams</li>
        </Link>
      </ul>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default UserNavbar;
