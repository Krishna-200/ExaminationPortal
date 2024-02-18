import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import css from "../styles/AdminPage.module.css";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import AllExams from "./AllExams";

const UploadTest = () => {
  const param = useParams().id;
  const { examId: examDetailsId } = useParams();
  const [examType, setExamType] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [marks, setMarks] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [examId, setExamId] = useState("");
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [questionMarks, setQuestionMarks] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const navigate = useNavigate();
  const [select, setSelect] = useState(true);
  const [editButton, setEditButton] = useState(false);
  const [questionId, setQuestionId] = useState("");

  async function handleSave(ev) {
    ev.preventDefault();
    const res = await axios.post("/ExamPaper/" + param, {
      examType,
      department,
      subject,
      year,
      marks,
      date,
      duration: time,
    });
    // console.log(res);
    setExamId(res.data._id);
    setSelect(false);
    alert("exam created successfully");
  }
  useEffect(() => {
    // console.log(examId);
    if (examId) {
      navigate(`/UploadTest/${param}/${examId}`);
    }
  }, [examId]);
  async function getExamDetails() {
    const res = await axios.get("/getExamDetails", {
      params: { examId: examDetailsId },
    });
    setExamType(res.data.examType);
    setDepartment(res.data.department);
    setSubject(res.data.subject);
    setYear(res.data.year);
    setMarks(res.data.marks);
    setDate(res.data.date.slice(0, 10));
    setTime(res.data.duration);
    setSelect(false);
    getQuestions();
  }

  useEffect(() => {
    if (examDetailsId) {
      getExamDetails();
    }
  }, []);
  //   console.log(examId);
  async function handleAddQuestion(ev) {
    ev.preventDefault();
    // console.log("exam id " + examDetailsId);
    const res = await axios.post("/UploadQuestion", {
      exam_id: examDetailsId,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
      questionMarks,
    });

    getQuestions();
    // console.log(questions);
    // console.log(allQuestions);
  }

  // console.log(param);
  // console.log(examId);
  useEffect(() => {}, [allQuestions]);

  async function handleEditQuestion(question) {
    // console.log(question);
    setQuestion(question.question);
    setOptionA(question.optionA);
    setOptionB(question.optionB);
    setOptionC(question.optionC);
    setOptionD(question.optionD);
    setCorrectOption(question.correctOption);
    setQuestionMarks(question.questionMarks);
    setEditButton(true);
    setQuestionId(question._id);
  }
  async function handleUpdateQuestion(ev) {
    ev.preventDefault();
    await axios.post("/editQuestion", {
      questionId,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
      questionMarks,
    });
    getQuestions();
    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectOption("");
    setQuestionMarks("");
    setEditButton(false);
    // console.log(updatedQuestion);
  }
  async function getQuestions() {
    const questions = await axios.get("/getQuestions", {
      params: { examId: examDetailsId },
    });
    setAllQuestions(questions.data);
  }

  async function handleDeleteQuestion(id) {
    try {
      // console.log(id);
      const deleteQuestion = await axios.delete("/deleteQuestion", {
        params: { id },
      });
      // console.log(deleteQuestion);
      getQuestions();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleExamReset() {
    setExamType("");
    setDepartment("");
    setSubject("");
    setYear("");
    setMarks("");
    setDate("");
    setTime("");
  }

  async function handleQuestionReset() {
    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectOption("");
    setQuestionMarks("");
  }

  return (
    <div className={css.container}>
      <AdminNavbar />
      <div className={css.testHeading}>
        <p>Create Exam</p>
      </div>
      <div className={css.test}>
        <div className={css.examDetails}>
          <div>
            <p>Exam Details</p>
          </div>
          <div className={css.detailsForm}>
            <form action="" onSubmit={handleSave}>
              <select
                name=""
                id=""
                value={examType}
                onChange={(ev) => setExamType(ev.target.value)}
                disabled={!select}
              >
                <option value="">Select Exam Type</option>
                <option value="practice">Practice Exam</option>
                <option value="actual">Actual Exam</option>
              </select>
              <select
                name=""
                id=""
                value={department}
                onChange={(ev) => setDepartment(ev.target.value)}
                disabled={!select}
              >
                <option value="">Select Department</option>
                <option value="cse">CSE</option>
                <option value="ece">ECE</option>
                <option value="mech">Mech</option>
                <option value="civil">Civil</option>
                <option value="eee">EEE</option>
              </select>
              <select
                name=""
                id=""
                value={subject}
                onChange={(ev) => setSubject(ev.target.value)}
                disabled={!select}
              >
                <option value="">Select Subject</option>
                <option value="maths">Maths</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="computer">Computer</option>
              </select>
              <select
                name=""
                id=""
                value={year}
                onChange={(ev) => setYear(ev.target.value)}
                disabled={!select}
              >
                <option value="">Select Year</option>
                <option value="first">First</option>
                <option value="second">Second</option>
                <option value="third">Third</option>
                <option value="fourth">Fourth</option>
              </select>
              <input
                type="number"
                placeholder="Enter total marks"
                value={marks}
                onChange={(ev) => setMarks(ev.target.value)}
                disabled={!select}
                className={select ? css.enabledInput : css.disabledInput}
              />
              <label htmlFor="">
                Date:
                <input
                  type="date"
                  value={date}
                  onChange={(ev) => setDate(ev.target.value)}
                  disabled={!select}
                  className={select ? css.enabledInput : css.disabledInput}
                />
              </label>
              <label htmlFor="">
                Test Duration:
                <input
                  type="text"
                  value={time}
                  placeholder="enter test duration in minutes"
                  onChange={(ev) => setTime(ev.target.value)}
                  disabled={!select}
                  className={select ? css.enabledInput : css.disabledInput}
                />
              </label>
              <div className={css.detailButtons}>
                <button onClick={handleExamReset} disabled={!select}>
                  Reset
                </button>
                <button type="submit" disabled={!select}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className={css.mcqTemp}>
          <div>
            <p>MCQ Template</p>
          </div>
          <div className={css.mcqForm}>
            <form action="">
              <input
                type="text"
                placeholder="Enter Question"
                value={question}
                onChange={(ev) => setQuestion(ev.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Option A"
                value={optionA}
                onChange={(ev) => setOptionA(ev.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Option B"
                value={optionB}
                onChange={(ev) => setOptionB(ev.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Option C"
                value={optionC}
                onChange={(ev) => setOptionC(ev.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Option D"
                value={optionD}
                onChange={(ev) => setOptionD(ev.target.value)}
              />
              <select
                name=""
                id=""
                value={correctOption}
                onChange={(ev) => setCorrectOption(ev.target.value)}
              >
                <option value="">Select correct Option</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
              <input
                type="number"
                placeholder="Enter Marks "
                value={questionMarks}
                onChange={(ev) => setQuestionMarks(ev.target.value)}
              />
              <div className={css.mcqButtons}>
                <button onClick={handleQuestionReset}>Reset</button>
                {editButton ? (
                  <button onClick={handleUpdateQuestion}>Update</button>
                ) : (
                  <button onClick={handleAddQuestion}>Add</button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className={css.questionsTemp}>
          <div>
            <p>Question Paper</p>
          </div>
          <div className={css.questions}>
            {allQuestions
              .slice()
              .reverse()
              .map((question, index) => (
                <div key={question._id} className={css.questionTest}>
                  <h5>Question NO. {allQuestions.length - index}</h5>
                  <h5>Q.{question.question}</h5>
                  <h5> A: {question.optionA}</h5>
                  <h5>B: {question.optionB}</h5>
                  <h5>C: {question.optionC}</h5>
                  <h5>D: {question.optionD}</h5>
                  <h5>Correct Option: {question.correctOption}</h5>
                  <button onClick={() => handleEditQuestion(question)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteQuestion(question._id)}>
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={css.finishButton}>
        <Link to={"/AllExams/" + param} style={{ textDecoration: "none" }}>
          <button>Finish</button>
        </Link>
      </div>
    </div>
  );
};

export default UploadTest;
