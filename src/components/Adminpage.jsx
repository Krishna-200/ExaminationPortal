import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import css from "../styles/AdminPage.module.css";
import AdminNavbar from "./AdminNavbar";
import { IoSchoolSharp } from "react-icons/io5";
import { FcDepartment } from "react-icons/fc";
import { FaSchool } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import avatar from "/profile.png";

const AdminPage = () => {
  const [fullname, setFullname] = useState("");
  const [mail, setMail] = useState("");
  const [file, setFile] = useState(null);
  const [department, setDepartment] = useState("");
  const [results, setResutls] = useState([]);
  const [score, setScore] = useState([]);
  const [filePath, setFilePath] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showButton, setShowButton] = useState(false);
  const param = useParams().id;

  async function getData() {
    const { data } = await axios.get("/AdminPage/" + param);
    setFullname(data.fullname);
    setMail(data.mail);
    setDepartment(data.department);
  }
  useEffect(() => {
    getData();
  }, []);

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
    <div className={css.container}>
      <div className={css.homeContainer}>
        <AdminNavbar />
        <div className={css.profile}>
          <div className={css.avatar}>
            {filePath ? (
              <img
                src={`https://examniationportal-backend.onrender.com/images/${filePath}`}
                alt="avatar"
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
          <div className={css.line}> </div>
          <div className={css.info}>
            <span>
              <IoSchoolSharp />
              <p>{department}</p>
            </span>
            <span>
              <FcDepartment />
              <p>CSE</p>
            </span>
            <span>
              <FaSchool />
              <p>Aditya collge of engineering</p>
            </span>
            <span>
              <CgProfile />
              <p>Student</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
