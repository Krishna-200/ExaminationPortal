import React, { useEffect, useState } from "react";
import css from "../styles/UserPage.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { MdFactCheck, MdOutlineBugReport } from "react-icons/md";
import { IoIosPaper, IoMdContact } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import avatar from "/profile.png";

const UserNavbar = () => {
  const param = useParams().id;
  // console.log(param);
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [showButton, setShowButton] = useState(false);

  async function getUserData() {
    try {
      const { data } = await axios.get("/UserPage/" + param);
      setFullname(data.fullname);
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

  async function handleFileChange(e) {
    // console.log(e.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = () => {
      console.log(error);
    };
    if (e.target.files[0]) {
      setShowButton(true);
    }
  }

  async function handleImageUpload() {
    const response = await axios.post("/imageUpload", { id: param, image });
    // console.log(response);
    setShowButton(false);
  }

  async function getImage() {
    const response = await axios.get("/getImage", { params: { id: param } });
    // console.log(response);
    setFile(response.data[0].image);
  }

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className={css.sideNavbar}>
      <div>
        <h2>Examify</h2>
        <div className={css.navbarProfile}>
          {!file ? (
            <label htmlFor="file-upload">
              <img src={image ? image : avatar} alt="" />
            </label>
          ) : (
            <img src={file} />
          )}

          <input
            type="file"
            id="file-upload"
            label="Image"
            onChange={handleFileChange}
          />
          {showButton ? <button onClick={handleImageUpload}>Save</button> : ""}
          <h2>{fullname}</h2>
        </div>
      </div>

      <div className={css.navbarMenu}>
        <div className={css.menuItems}>
          <h3>Menu Bar</h3>
          <table>
            <tbody>
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
            </tbody>
          </table>
        </div>
        <div className={css.menuItems}>
          <h3>Any Quries</h3>
          <table>
            <tbody>
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
            </tbody>
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
