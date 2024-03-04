import React, { useEffect, useState, useRef } from "react";
import css from "../styles/LandingPage.module.css";
import SVG from "../Images/LandingPage.png";
import { FiCheckCircle } from "react-icons/fi";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { SiProtonmail } from "react-icons/si";
import upArrow from "../Images/upArrow.png";
import downArrow from "../Images/downArrow.png";
import AboutSVG from "../Images/AboutSVG.svg";
import student from "../Images/student.webp";
import teacher from "../Images/teacher.webp";
import {
  FaFacebookF,
  FaGithub,
  FaGoogle,
  FaRegSmile,
  FaMailBulk,
} from "react-icons/fa";
import {
  FaXTwitter,
  FaLinkedin,
  FaPhoneVolume,
  FaLocationDot,
} from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const [aboutTextHidden, setAboutTextHidden] = useState(false);

  async function readmore() {
    setAboutTextHidden(true);
  }
  async function readLess() {
    setAboutTextHidden(false);
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  //   gsap animations

  async function gsapAnimation() {
    const words = ["Create", "Upload", "Write"];

    let mainTimeline = gsap.timeline({
      repeat: -1,
      delay: 1,
    });

    words.forEach((word) => {
      let testTimeline = gsap.timeline({
        repeat: 1,
        yoyo: true,
        repeatDelay: 4,
      });
      testTimeline.to("#typewriter", {
        text: word,
        duration: 1,
      });
      mainTimeline.add(testTimeline);
    });
  }

  useEffect(() => {
    gsapAnimation();
  });

  const ref = useRef([]);
  ref.current = [];

  useEffect(() => {
    ref.current.forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          left: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const addtoRefs = (el) => {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
  };

  return (
    <ReactLenis root>
      <div className={css.container} id="section-1">
        <div className={`${css.navbar} ${css.sticky}`}>
          <div className={css.title}>
            <h1 onClick={() => scrollToSection("section-1")}>Examify</h1>
          </div>
          <ul className={css.navList}>
            <li>
              <a onClick={() => scrollToSection("section-1")}>Home</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("section-2")}>About Us</a>
            </li>
            <li>
              <a onClick={() => scrollToSection("section-3")}>Contact Us</a>
            </li>
            <a href="/Welcome" style={{ textDecoration: "none" }}>
              Sign Up / Login
            </a>
          </ul>
        </div>
        <div className={css.mainContent}>
          <div className={css.mainText}>
            <h2>
              Revolutionary way to unleash your potential with online exams to{" "}
              <br />
              <span id="typewriter"></span>
              <span id={css.cursor}>|</span>
            </h2>
            <button>
              <a href="/Welcome" style={{ textDecoration: "none" }}>
                Start Now
              </a>
            </button>
          </div>
          <div className={css.mainSVG}>
            <img src={SVG} alt="" />
          </div>
        </div>
        <div className={css.textFeatures}>
          <h1>Key Features</h1>
          <div className={css.features}>
            <div className={css.exams}>
              <FaRegSmile />
              <h2>Customized Exams</h2>
              <p>
                Create customized exams based on subject, difficulty level, and
                other parameters.
              </p>
              <p>Easily schedule and manage exam sessions.</p>
            </div>
            <div className={css.proctoring}>
              <HiMiniViewfinderCircle />
              <h2>Remote Proctoring</h2>
              <p>Monitor examinees remotely via webcam and screen recording.</p>
              <p> Takes screen shots in a regular interval of time.</p>
            </div>
            <div className={css.grading}>
              <FiCheckCircle />
              <h2>Instant Grading</h2>
              <p>Automatically grade objective questions upon submission.</p>
              <p> Provide immediate feedback to examinees.</p>
            </div>
            <div className={css.notification}>
              <SiProtonmail />
              <h2>Mail Notification</h2>
              <p>
                Mails can be sent to all the students to notify the time and
                details of the test conducted by the teachers.
              </p>
            </div>
          </div>
        </div>
        <div className={css.aboutUs} id="section-2">
          <h1 ref={addtoRefs}>About Us</h1>
          <div className={css.aboutContent}>
            <div ref={addtoRefs} className={css.aboutSVG}>
              <img src={AboutSVG} alt="" />
            </div>
            <div ref={addtoRefs} className={css.aboutText}>
              <h2>A FEW WORDS ABOUT US</h2>
              <p>
                The Online Examination System is the perfect solution for
                students and teachers looking for an accessible and
                user-friendly way to take and create tests.
                <p>
                  Our platform is perfect for students who want to test from the
                  comfort of their own homes, as well as for teachers who need
                  to create and distribute tests.
                </p>
                <p className={!aboutTextHidden ? css.textHidden : ""}>
                  Our system lets teachers create tests, while students can
                  practice those tests until they are confident enough to take
                  the actual exam.
                </p>
                <p className={!aboutTextHidden ? css.textHidden : ""}>
                  We go the extra mile to provide a range of features, including
                  practice tests, customizable tests, and high-quality remote
                  proctoring.
                </p>
                <p className={!aboutTextHidden ? css.textHidden : ""}>
                  If you're looking for an efficient, secure, and user-friendly
                  way to take tests, then look no further than the Online
                  Examination System.
                </p>
              </p>
              <button onClick={aboutTextHidden ? readLess : readmore}>
                {!aboutTextHidden ? "Read More" : "Read Less"}
              </button>
            </div>
          </div>
        </div>
        <div className={css.workflow}>
          <h1 ref={addtoRefs}>Our Portal WorkFlow</h1>
          <div ref={addtoRefs} className={css.workComponents}>
            <div className={css.one}>
              <span>
                <p>1</p>
              </span>
              <h3>Creating The Exam</h3>
              <h4>
                Teachers log in and create exams by setting questions, time
                limits, and instructions.
              </h4>
              <img src={upArrow} alt="" />
            </div>
            <div className={css.two}>
              <img src={downArrow} alt="" />
              <span>
                <p>2</p>
              </span>
              <h3>Assign Exam to Students</h3>
              <h4>
                Teachers assign the created exam to specific students or
                classes.
              </h4>
            </div>
            <div className={css.three}>
              <span>
                <p>3</p>
              </span>
              <h3>Students Access Exam</h3>
              <h4>
                Students log in and take the assigned exam within the specified
                time frame.
              </h4>
              <img src={upArrow} alt="" />
            </div>
            <div className={css.four}>
              <span>
                <p>4</p>
              </span>
              <h3>Students Results Update</h3>
              <h4>After Complete of exam student will get results instantly</h4>
            </div>
          </div>
        </div>
        <div className={css.components}>
          <div ref={addtoRefs} className={css.teacherComponent}>
            <div className={css.imgComponent}>
              <img src={teacher} alt="" />
            </div>
            <div>
              <h3>For Teachers</h3>
              <p>
                Sign Up and let the magic begin, create exams with one click and
                make the whole examination process easier and fun!
              </p>
              <a href="/AdminSignUp">Get Started As Teacher</a>
            </div>
          </div>
          <div ref={addtoRefs} className={css.studentComponent}>
            <div>
              <h3>For Students</h3>
              <p>
                Sign Up to stay a step ahead and redefine the entire examination
                experience with one click. Now you can take exams straight from
                your couch!
              </p>
              <a href="/SignUp">Get Started As Student</a>
            </div>
            <div className={css.imgComponent}>
              <img src={student} alt="" />
            </div>
          </div>
        </div>
        <div className={css.benefits}>
          <h1 ref={addtoRefs}>Benefits</h1>
          <p ref={addtoRefs}>
            Online examination systems offer a wide range of features and
            benefits that contribute to the efficiency, security, and
            accessibility of the exam process for educational institutions and
            examinees alike.
          </p>
          <div className={css.benefitComponent}>
            <div ref={addtoRefs} className={css.Convenience}>
              <h2>Convenience</h2>
              <h6>
                Eliminate the need for physical exam centers. Allow students to
                take exams remotely at their convenience.
              </h6>
            </div>
            <div ref={addtoRefs} className={css.cost}>
              <h2>Cost-effective</h2>
              <h6>
                Reduce administrative costs associated with traditional exam
                processes. Minimize paper and printing expenses.
              </h6>
            </div>
            <div ref={addtoRefs} className={css.time}>
              <h2>Time Saving</h2>
              <h6>
                Streamline exam creation, administration, and grading processes.
                Save instructors and administrators time for other tasks.
              </h6>
            </div>
            <div ref={addtoRefs} className={css.efficiency}>
              <h2>Improved Efficiency</h2>
              <h6>
                Automate grading and result generation processes. Enable faster
                feedback to students.
              </h6>
            </div>
            <div ref={addtoRefs} className={css.test}>
              <h2>Test Anywhere</h2>
              <h6>
                Creation of tests made easy for teachers. Students can take
                tests from anywhere according to their comfort.
              </h6>
            </div>
          </div>
        </div>
        <div className={css.contactUs} id="section-3">
          <div className={css.info}>
            <table>
              <tbody>
                <tr ref={addtoRefs}>
                  <td>
                    <FaLocationDot />
                    <span>
                      <h3>Address</h3>
                      <h4>Surampalem</h4>
                    </span>
                  </td>
                </tr>
                <tr ref={addtoRefs}>
                  <td>
                    <FaMailBulk />
                    <span>
                      <h3>Email</h3>
                      <h4>examinationportal@hotmail.com</h4>
                    </span>
                  </td>
                </tr>
                <tr ref={addtoRefs}>
                  <td>
                    <FaPhoneVolume />
                    <span>
                      <h3>Phone</h3>
                      <h4>1234567890</h4>
                    </span>
                  </td>
                </tr>
                <tr ref={addtoRefs}>
                  <td className={css.follow}>
                    <h3>Follow Us On</h3>
                    <div>
                      <FaFacebookF className={css.facebook} />
                      <FaXTwitter className={css.twitter} />
                      <RiInstagramFill className={css.insta} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={css.contact}>
            <h2 ref={addtoRefs}>Contact With Us</h2>
            <p ref={addtoRefs}>
              If you have any queries or encounter any bugs, please feel free to
              inform us. Your feedback is valuable and helps us improve our
              services.
            </p>
            <form action="" className={css.contactForm}>
              <input type="text" placeholder="Full Name*" ref={addtoRefs} />
              <div>
                <input type="email" placeholder="Email*" ref={addtoRefs} />
                <input
                  type="number"
                  placeholder="Phone Number*"
                  ref={addtoRefs}
                />
              </div>
              <textarea
                ref={addtoRefs}
                name=""
                id=""
                cols="73"
                rows="8"
                placeholder="Message*"
              ></textarea>
              <button ref={addtoRefs}>Send Message</button>
            </form>
          </div>
        </div>
        <div ref={addtoRefs} className={css.footer}>
          <div className={css.footerName}>
            <h2>Examify</h2>
            <p>
              Our Online Examination System provides a user-friendly solution
              for students and teachers, offering convenient test-taking and
              creation options.
            </p>
          </div>
          <div className={css.Links}>
            <h3>Useful Links</h3>
            <Link to={"/SignUp"} style={{ textDecoration: "none" }}>
              <p>Studet Sign Up</p>
            </Link>
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <p>Studet Login</p>
            </Link>
            <Link to={"/AdminSignUp"} style={{ textDecoration: "none" }}>
              <p> Teacher Sign Up</p>
            </Link>
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <p>Teacher Login</p>
            </Link>
          </div>
          <div className={css.footerContact}>
            <h3>Contact</h3>
            <div>
              <FaLocationDot />
              <p>Surampalem</p>
            </div>
            <div>
              <FaMailBulk />
              <p>examinationportal@hotmail.com</p>
            </div>
            <div>
              <FaPhoneVolume />
              <p>1234567890</p>
            </div>
          </div>
          <div className={css.footerfollow}>
            <h3>Follow Us On</h3>
            <div>
              <FaFacebookF />
              <FaXTwitter />
              <RiInstagramFill />
              <FaLinkedin />
              <FaGithub />
              <FaGoogle />
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default LandingPage;
