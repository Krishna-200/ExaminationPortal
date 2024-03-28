import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import css from "../styles/AdminPage.module.css";
import AdminNavbar from "./AdminNavbar";

const ResultDetails = () => {
  const location = useLocation();
  const { resultData } = location.state;
  const [images, setImages] = useState([]);

  async function getPhotos(examId, userId) {
    try {
      const response = await axios.get("/getScreenshots", {
        params: {
          examId: resultData.examId,
          userId: resultData.userId,
        },
      });
      const { data } = response;
      setImages(data[0].images);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div className={css.container}>
      <div className={css.homeContainer}>
        <AdminNavbar />
        <div>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Screenshot ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultDetails;
