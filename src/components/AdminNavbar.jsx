import React, { useEffect, useState } from "react";
import css from "../styles/AdminPage.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { MdFactCheck, MdOutlineBugReport } from "react-icons/md";
import { IoIosPaper, IoMdContact } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { FaNoteSticky } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import avatar from "/profile.png";

const AdminNavbar = () => {
  const param = useParams().id;
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showButton, setShowButton] = useState(false);

  async function getUserData() {
    try {
      const { data } = await axios.get("/AdminPage/" + param);
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

  function handleFileChange(ev) {
    setShowButton(true);
    setFile(ev.target.files[0]);

    const reader = new FileReader();
    reader.onload = function (e) {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(ev.target.files[0]);
  }

  async function handleFileUpload() {
    const formData = new FormData();
    formData.append("file", file);
    setShowButton(false);
    const response = await axios.post("/imageUpload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: { id: param },
    });
  }

  async function getImage() {
    const response = await axios.get("/getImage", { params: { id: param } });
    if (response.data.length > 0) {
      setFilePath(response.data[0].file);
      console.log(response.data[0].file);
    }
    setShowButton(false);
  }

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className={css.sideNavbar}>
      <div className={css.navbar}>
        <h2>Examify</h2>
        <div className={css.navbarProfile}>
          {filePath ? (
            <img
              src={`https://examniationportal-backend.onrender.com/images/${filePath}`}
              alt="flo"
            />
          ) : imageUrl ? (
            <img src={imageUrl} alt="Uploaded" />
          ) : (
            <label htmlFor="file-upload">
              <img src={avatar} alt="" />
            </label>
          )}

          <input
            type="file"
            id="file-upload"
            label="Image"
            onChange={handleFileChange}
          />
          {showButton ? <button onClick={handleFileUpload}>Save</button> : ""}
          <h2>{fullname}</h2>
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
                      to={"/AdminPage/" + param}
                      style={{ textDecoration: "none" }}
                    >
                      <p>My Profile</p>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <SiGoogleclassroom />
                  </td>
                  <td>
                    <Link
                      to={"/AdminUserList/" + param}
                      style={{ textDecoration: "none" }}
                    >
                      <p>Students Details</p>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <IoIosPaper />
                  </td>
                  <td>
                    <Link
                      to={"/AllResults/" + param}
                      style={{ textDecoration: "none" }}
                    >
                      <p> Results</p>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FaNoteSticky />
                  </td>
                  <td>
                    <Link
                      to={"/UploadTest/" + param}
                      style={{ textDecoration: "none" }}
                    >
                      <p>Upload tests</p>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <MdFactCheck />
                  </td>
                  <td>
                    <Link
                      to={"/AllExams/" + param}
                      style={{ textDecoration: "none" }}
                    >
                      <p>All Your Exams</p>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={css.queryItems}>
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
    </div>
  );
};

export default AdminNavbar;
