import Welcome from "./components/Welcome.jsx";
import { Routes, Route } from "react-router-dom";
import ExamPage from "./components/ExamPage.jsx";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import axios from "axios";
import { UserContextProvider } from "./components/UserContext.jsx";
import Userpage from "./components/Userpage.jsx";
import Adminpage from "./components/Adminpage.jsx";
import AdminSignUp from "./components/AdminSignUp.jsx";
import AdminDetails from "./components/AdminDetails.jsx";
import AdminNavbar from "./components/AdminNavbar.jsx";
import AdminUserList from "./components/AdminUserList.jsx";
import UploadTest from "./components/UploadTest.jsx";
import AllExams from "./components/AllExams.jsx";
import UserNavbar from "./components/UserNavbar.jsx";
import UserDetails from "./components/UserDetails.jsx";
import UserAllExams from "./components/UserAllExams.jsx";
import AllResutls from "./components/AllResutls.jsx";
import UserResult from "./components/UserResult.jsx";
import InstructionPage from "./components/InstructionPage.jsx";

function App() {
  axios.defaults.baseURL = "https://examniationportal-backend.onrender.com";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/ExamPage/:id" element={<ExamPage />} />
        <Route exact path="/Signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/UserPage/:id" element={<Userpage />} />
        <Route exact path="/UserDetails/:id" element={<UserDetails />} />
        <Route exact path="/UserAllExams/:id" element={<UserAllExams />} />
        <Route exact path="/UserNavbar/:id" element={<UserNavbar />} />
        <Route exact path="/UserResult/:id" element={<UserResult />} />
        <Route
          exact
          path="/InstructionPage/:id"
          element={<InstructionPage />}
        />
        <Route exact path="/AdminPage/:id" element={<Adminpage />} />
        <Route exact path="/AdminSignUp" element={<AdminSignUp />} />
        <Route exact path="/AdminDetails/:id" element={<AdminDetails />} />
        <Route exact path="/AdminNavbar/:id" element={<AdminNavbar />} />
        <Route exact path="/AdminUserList/:id" element={<AdminUserList />} />
        <Route exact path="/UploadTest/:id" element={<UploadTest />} />
        <Route exact path="/UploadTest/:id/:examId" element={<UploadTest />} />
        <Route exact path="/AllExams/:id" element={<AllExams />} />
        <Route exact path="/AllResults/:id" element={<AllResutls />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
