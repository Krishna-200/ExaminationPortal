import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import css from "../styles/AdminPage.module.css";
import AdminNavbar from "./AdminNavbar";

const AllExams = () => {
  const id = useParams().id;
  const [actualExams, setActualExams] = useState([]);
  const [practiceExams, setPracticeExams] = useState([]);
  const [doneExams, setDoneExams] = useState([]);
  const navigate = useNavigate();
  //   console.log(id);
  async function getAllExams() {
    const response = await axios.get("/getAllExams", { params: { id } });
    const allExams = response.data;
    // console.log(allExams);
    const today = new Date();
    const done = [];
    const actual = [];
    const practice = [];
    allExams.forEach((exam) => {
      const allExamsType = exam.examType;
      if (allExamsType == "practice") {
        practice.push(exam);
      } else {
        actual.push(exam);
      }
      const examDate = new Date(exam.date);
      if (examDate <= today) {
        done.push(exam);
      }
    });
    // console.log(done);
    setActualExams(actual);
    setPracticeExams(practice);
    setDoneExams(done);
  }
  useEffect(() => {
    getAllExams();
  }, [id]);

  async function handleExamClick(exam) {
    // console.log(exam);
    const param = exam.id;
    const examId = exam._id;
    // console.log(examId);
    // console.log(param);
    navigate(`/UploadTest/${param}/${examId}`);
  }

  async function handleExamDelete(exam) {
    const examId = exam._id;
    await axios.delete("/deleteExam", { params: { examId } });
    getAllExams();
  }

  async function handleAllExamscreate() {
    navigate("/UploadTest/" + id);
  }

  return (
    <div className={css.container}>
      <AdminNavbar />
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
                      {exam.date.slice(0, 10)}
                    </h3>
                    <div className={css.allExamsMarks}>
                      <h3>{exam.marks} marks</h3>
                      <h3>{exam.duration} mins</h3>
                    </div>
                    <h3 className={css.allExamsYear}>Year: {exam.year}</h3>
                    <button
                      className={css.allExamsEdit}
                      onClick={() => handleExamClick(exam)}
                    >
                      edit
                    </button>
                    <button
                      className={css.allExamsDelete}
                      onClick={() => handleExamDelete(exam)}
                    >
                      delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={css.noExam}>
                <p>No exams available</p>
                <button onClick={handleAllExamscreate}>create exam</button>
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
                      {exam.date.slice(0, 10)}
                    </h3>
                    <div className={css.allExamsMarks}>
                      <h3>{exam.marks} marks</h3>
                      <h3>{exam.duration} mins</h3>
                    </div>
                    <h3 className={css.allExamsYear}>Year: {exam.year}</h3>
                    <button
                      className={css.allExamsEdit}
                      onClick={() => handleExamClick(exam)}
                    >
                      edit
                    </button>
                    <button
                      className={css.allExamsDelete}
                      onClick={() => handleExamDelete(exam)}
                    >
                      delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={css.noExam}>
                <p>No exams available</p>
                <button onClick={handleAllExamscreate}>create exam</button>
              </div>
            )}
          </div>
        </div>
        <div className={css.doneExam}>
          <h2>Completed Exams</h2>
          <div>
            {doneExams.length > 0 ? (
              <div>
                {doneExams.map((exam) => (
                  <div
                    key={exam.id}
                    className={
                      exam.examType === "practice"
                        ? css.practiceComponent
                        : css.actualComponent
                    }
                  >
                    <h3 className={css.AllExamsSubject}>{exam.subject}</h3>
                    <h3 className={css.allExamsdate}>
                      {exam.date.slice(0, 10)}
                    </h3>
                    <div className={css.allExamsMarks}>
                      <h3>{exam.marks} marks</h3>
                      <h3>{exam.duration} mins</h3>
                    </div>
                    <h3 className={css.allExamsYear}>Year: {exam.year}</h3>
                    <button
                      className={css.allExamsEdit}
                      onClick={() => handleExamClick(exam)}
                    >
                      edit
                    </button>
                    <button
                      className={css.allExamsDelete}
                      onClick={() => handleExamDelete(exam)}
                    >
                      delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={css.noExam}>
                <p>No exams available</p>
                <button onClick={handleAllExamscreate}>create exam</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllExams;
