import React, { useEffect, useState, useRef } from "react";
import css from "../styles/ExamPage.module.css";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Webcam from "react-webcam";

const ExamPage = () => {
  const location = useLocation();
  const { exam } = location.state;
  const param = useParams().id;
  const date = new Date();
  const webRef = useRef(null);
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(exam.duration * 60);
  const [timer, setTimer] = useState(null);
  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [verifyModalIsOpen, setVerifymodalIsOpen] = useState(false);
  const [tabOpen, setTabOpen] = useState(false);
  const [tabChangeCount, setTabChangeCount] = useState(0);
  const [showClose, setShowClose] = useState(false);
  const [image, setImage] = useState("");
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [screenShots, setScreenShots] = useState([]);
  const examDurationInSeconds = exam.duration * 60;

  useEffect(() => {
    const generateRandomNumbers = () => {
      const randomNumbersArray = [];
      while (randomNumbersArray.length < 5) {
        const newRandomNumber = Math.floor(
          Math.random() * examDurationInSeconds
        );
        if (!randomNumbersArray.includes(newRandomNumber)) {
          randomNumbersArray.push(newRandomNumber);
        }
      }
      randomNumbersArray.sort((a, b) => a - b);
      setRandomNumbers(randomNumbersArray);
    };

    generateRandomNumbers();
  }, [exam.duration]);

  const [userAnswers, setUserAnswers] = useState(
    Array(exam.totalQuestions).fill(null)
  );
  const [totalMarks, setTotalMarks] = useState(0);
  const navigate = useNavigate();

  async function getQuestions() {
    const questions = await axios.get("/getQuestions", {
      params: { examId: exam._id },
    });
    setAllQuestions(questions.data);
  }

  async function getuserData() {
    const response = await axios.get(`/UserPage/${param}`);
    // console.log(response.data.mobileno);
    setUserMobile(response.data.mobileno);
    setUserName(response.data.fullname);
  }

  useEffect(() => {
    getuserData();
    getQuestions();
  }, []);

  useEffect(() => {
    const countdown = () => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      }
    };
    setTimer(setInterval(countdown, 1000));

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      handleFinish();
    }
  }, [remainingTime]);

  const handleQuestionChange = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handlePrevButtonClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSaveAndNextButtonClick = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleOptionSelect = (selectedOption) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = selectedOption;
      // console.log(updatedAnswers);
      return updatedAnswers;
    });
  };

  const calculateTotalMarks = () => {
    let marks = 0;
    allQuestions.forEach((question, index) => {
      // console.log(question.correctOption);
      // console.log(userAnswers[index]);
      const option = question.correctOption;
      const correct = question[`option${option}`];
      // console.log(correct);
      if (correct === userAnswers[index]) {
        marks++;
      }
    });
    return marks;
  };

  async function handleFinish() {
    const marks = calculateTotalMarks();
    let status = "false";
    const totalPossibleMarks = allQuestions.length;
    setTotalMarks(marks);
    const passPercentage = 0.3;
    const passMarks = totalPossibleMarks * passPercentage;
    // alert(`Total Marks : ${marks}`);
    if (marks >= passMarks) {
      // alert("hi");
      status = "true";
    } else {
      status = "false";
    }

    await axios.post("/results", {
      name: userName,
      examId: exam._id,
      adminId: exam.id,
      userId: param,
      totalMarks: marks,
      subject: exam.subject,
      date,
      examType: exam.examType,
      stauts: status,
      mobileno: userMobile,
    });
    // console.log(status);
    document.exitFullscreen();
    navigate("/UserResult/" + param);
    const saveScreenshots = async (screenShots, examId, userId) => {
      try {
        const formData = new FormData();
        screenShots.forEach((screenshot, index) => {
          formData.append(`screenshots[${index}]`, screenshot);
        });
        formData.append("examId", exam._id);
        formData.append("userId", param);

        await axios.post("/saveScreenshots", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

    saveScreenshots(screenShots);
  }

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  useEffect(() => {
    document.documentElement.requestFullscreen().catch((e) => {
      console.log(e);
    });

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }

      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      setVerifymodalIsOpen(true);
    }
    if (document.fullscreenElement) {
      setShowClose(true);
    }
  };

  async function handleFullScreen() {
    document.documentElement.requestFullscreen().catch((error) => {});
  }

  async function handleScreenshot() {
    if (screenShots.length < 5) {
      const screenshot = webRef.current.getScreenshot();
      // console.log(screenshot);
      setImage(screenshot);
      setScreenShots((prevShots) => [...prevShots, screenshot]);
    }
  }

  useEffect(() => {
    if (randomNumbers.includes(remainingTime)) {
      handleScreenshot();
    }
  }, [remainingTime, randomNumbers, exam.duration]);

  useEffect(() => {
    function handleOnBeforeUnload(event) {
      event.preventDefault();
      return (event.returnValue = "");
    }
    window.addEventListener("beforeunload", handleOnBeforeUnload, {
      capture: true,
    });
    return () => {
      window.removeEventListener("beforeunload", handleOnBeforeUnload, {
        capture: true,
      });
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabChangeCount((count) => count + 1);
        setTabOpen(true);
        if (tabChangeCount >= 2) {
          handleFinish();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [tabChangeCount]);

  async function tabChnageModal() {
    setTabOpen(false);
  }

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className={css.container}
      onCopy={(event) => {
        event.preventDefault();
      }}
      onContextMenu={handleContextMenu}
    >
      <div className={css.mainHeading}>
        <h1>
          {userName} - {exam.examType} Exam
        </h1>
        <div className={css.exitAndCam}>
          <h2 onClick={handleFinish}>Exit</h2>
          <Webcam className={css.webcam} ref={webRef} />
        </div>
      </div>
      <div className={css.heading}>
        <h1 className={css.subjectName}>{exam.subject}</h1>
        <div className={css.time}>
          <span>Time Left:</span>
          <span>{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</span>
        </div>
      </div>
      <div className={css.mainComponent}>
        <div className={css.questions}>
          <h3>{`Q.No ${currentQuestionIndex + 1}`}</h3>
          <h2>{allQuestions[currentQuestionIndex]?.question}</h2>
          <div className={css.radioButtons}>
            {Object.keys(allQuestions[currentQuestionIndex] || {}).map(
              (key) => {
                if (key.startsWith("option")) {
                  return (
                    <div key={key}>
                      <input
                        type="radio"
                        id={allQuestions[currentQuestionIndex][key]}
                        name="options"
                        value={allQuestions[currentQuestionIndex][key]}
                        onChange={() =>
                          handleOptionSelect(
                            allQuestions[currentQuestionIndex][key]
                          )
                        }
                        checked={
                          allQuestions[currentQuestionIndex][key] ===
                          userAnswers[currentQuestionIndex]
                        }
                      />
                      <label htmlFor={allQuestions[currentQuestionIndex][key]}>
                        {allQuestions[currentQuestionIndex][key]}
                      </label>
                    </div>
                  );
                }
                return null;
              }
            )}
          </div>
        </div>
        <div className={css.questionNos}>
          <h3>Questions</h3>
          <div className={css.numbers}>
            {allQuestions.map((_, index) => (
              <span
                key={index}
                className={`${css.number} ${
                  index === currentQuestionIndex ? css.active : ""
                } ${userAnswers[index] ? css.greenNumber : ""}`}
                onClick={() => handleQuestionChange(index)}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={css.buttons}>
        <div>
          <button className={css.prev} onClick={handlePrevButtonClick}>
            Prev
          </button>
          <button className={css.next} onClick={handleSaveAndNextButtonClick}>
            Save and Next
          </button>
        </div>
        <button className={css.finish} onClick={handleFinish}>
          Finish
        </button>
      </div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={verifyModalIsOpen}
        onRequestClose={() => setVerifymodalIsOpen(false)}
        contentLabel="Email Status"
        className={css.modal}
      >
        <h2>Please finish the exam before exiting fullscreen.</h2>
        <h2>Click on the Screen</h2>
        <div className={css.modalButtons}>
          <button onClick={handleFullScreen()}> Enable FullScreen</button>
          {showClose && (
            <button onClick={() => setVerifymodalIsOpen(false)}>Close</button>
          )}
        </div>
      </Modal>

      <Modal isOpen={tabOpen} className={`${css.modal} ${css.tabChangeModal}`}>
        <h2>Don't switch tabs during the test</h2>
        <h2>If you change tabs again for {3 - tabChangeCount} times</h2>
        <h2>The exam will be closed</h2>
        <button onClick={() => tabChnageModal()}>Close</button>
      </Modal>
    </div>
  );
};

export default ExamPage;
