import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import css from "../styles/AdminPage.module.css";
import UserNavbar from "./UserNavbar";

const UserAllExams = () => {
  const id = useParams().id;
  const [actualExams, setActualExams] = useState([]);
  const [practiceExams, setPracticeExams] = useState([]);
  const navigate = useNavigate();
  const date = new Date();
  // console.log(date);

  async function getAllExams() {
    const response = await axios.get("/AllExams", { params: { id } });
    const allExams = response.data;
    const today = new Date().toLocaleDateString("en-GB");
    // console.log(today);
    const actual = [];
    const practice = [];

    allExams.forEach((exam) => {
      const allExamsType = exam.examType;
      if (allExamsType === "practice") {
        if (new Date(exam.date).toLocaleDateString("en-GB") >= today) {
          practice.push(exam);
        }
      } else {
        if (new Date(exam.date).toLocaleDateString("en-GB") >= today) {
          actual.push(exam);
        }
      }
    });
    setActualExams(actual);
    setPracticeExams(practice);
  }

  useEffect(() => {
    getAllExams();
  }, [id]);

  async function handleClickExam(exam) {
    navigate("/InstructionPage/" + id, { state: { exam } });
  }

  return (
    <div className={css.container}>
      <div className={css.homeContainer}>
        <UserNavbar />
        <div>
          <div className={css.testHeading}>
            <p>Exams</p>
          </div>
          <div className={css.exams}>
            <div className={css.scheduledExam}>
              <h2>Actual Exams</h2>{" "}
              <div>
                {actualExams.length > 0 ? (
                  <div>
                    {actualExams.map((exam) => (
                      <div key={exam.id} className={css.actualComponent}>
                        <h3 className={css.AllExamsSubject}>{exam.subject}</h3>
                        <h3 className={css.allExamsdate}>
                          {new Date(exam.date).toLocaleDateString("en-GB")}
                        </h3>
                        <div className={css.allExamsMarks}>
                          <h3>{exam.marks} marks</h3>
                          <h3>{exam.duration} mins</h3>
                        </div>
                        <h3 className={css.allExamsYear}>Year: {exam.year}</h3>
                        <button
                          onClick={() => handleClickExam(exam)}
                          className={
                            new Date(exam.date).toDateString() !==
                            date.toDateString()
                              ? css.disabled
                              : css.startExam
                          }
                          disabled={
                            new Date(exam.date).toDateString() !==
                            date.toDateString()
                          }
                        >
                          Start Exam
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={css.noExam}>
                    <p>No exams available</p>
                  </div>
                )}
              </div>
            </div>
            <div className={css.practiceExam}>
              <h2>Practice Exams</h2>
              <div>
                {practiceExams.length > 0 ? (
                  <div>
                    {practiceExams.map((exam) => (
                      <div key={exam.id} className={css.practiceComponent}>
                        <h3 className={css.AllExamsSubject}>{exam.subject}</h3>
                        <h3 className={css.allExamsdate}>
                          {new Date(exam.date).toLocaleDateString("en-GB")}
                        </h3>
                        <div className={css.allExamsMarks}>
                          <h3>{exam.marks} marks</h3>
                          <h3>{exam.duration} mins</h3>
                        </div>

                        <h3 className={css.allExamsYear}>Year: {exam.year}</h3>
                        <button
                          onClick={() => handleClickExam(exam)}
                          className={css.startExam}
                        >
                          Start Exam
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={css.noExam}>
                    <p>No exams available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAllExams;
