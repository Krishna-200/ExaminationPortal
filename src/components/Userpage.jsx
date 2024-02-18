import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "../styles/UserPage.module.css";
import UserNavbar from "./UserNavbar";

const Userpage = () => {
  const param = useParams().id;
  const [fullname, setFullname] = useState("");

  async function getUserData() {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/UserPage/" + param
      );
      setFullname(data.fullname);
      setMail(data.mail);
      console.log(data);
    } catch (error) {
      if (error) throw error;
    }
  }

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className={css.container}>
      <UserNavbar />
      <div className={css.homeContainer}>
        <div className={css.homeText}>
          <h3>Hey,</h3>
          <h3>{fullname}</h3>
          <h3>Student!</h3>
          <h4>
            Are you ready to rise above the rest? You're one test away to Widen
            Your Horizons with Online Exam
          </h4>
        </div>
        <div className={css.homeImage}></div>
      </div>
    </div>
  );
};

export default Userpage;
