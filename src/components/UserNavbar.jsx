import React, { useEffect, useState } from "react";
import css from "../styles/UserPage.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { MdFactCheck, MdOutlineBugReport } from "react-icons/md";
import { IoIosPaper, IoMdContact } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";

const UserNavbar = () => {
  const param = useParams().id;
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [file, setFile] = useState("");

  async function getUserData() {
    try {
      const { data } = await axios.get("/UserPage/" + param);
      setFullname(data.fullname);
      setFile(data.file);
      // console.log(data);
    } catch (error) {
      if (error) throw error;
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  async function handleLogout() {
    const res = await axios.get("/logout");
    navigate("/");
  }
  return (
    <div className={css.sideNavbar}>
      <h2>Examify</h2>
      <div className={css.navbarProfile}>
        <img src={`http://localhost:3000/images/` + file} alt="" />
        <h2>{fullname}</h2>
      </div>
      <div className={css.navbarMenu}>
        <div className={css.menuItems}>
          <h3>Menu Bar</h3>
          <table>
            <tr>
              <td>
                <FaUser />
              </td>
              <td>
                <Link
                  to={"/UserPage/" + param}
                  style={{ textDecoration: "none" }}
                >
                  <p>Student Profile</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <MdFactCheck />
              </td>
              <td>
                <Link
                  to={"/UserResult/" + param}
                  style={{ textDecoration: "none" }}
                >
                  <p>Results</p>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <IoIosPaper />
              </td>
              <td>
                <Link
                  to={"/UserAllExams/" + param}
                  style={{ textDecoration: "none" }}
                >
                  <p>All Exams</p>
                </Link>
              </td>
            </tr>
          </table>
        </div>
        <div className={css.menuItems}>
          <h3>Any Quries</h3>
          <table>
            <tr>
              <td>
                <IoMdContact />
              </td>
              <td>
                <p>Contact Us</p>
              </td>
            </tr>
            <tr>
              <td>
                <MdOutlineBugReport />
              </td>
              <td>
                <p>Report Error</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div className={css.logoutButton} onClick={handleLogout}>
        <TbLogout2 />
        <p>Log out</p>
      </div>
    </div>
  );
};

export default UserNavbar;
