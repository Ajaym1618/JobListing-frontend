import EmployerHome from "./pages/EmployerHome/employerHome";
import EmployerLoginSignUp from "./pages/EmployerLoginSignUp/employerLoginSignUp";
import Home from "./pages/UserHome/Home";
import UserLoginSignUp from "./pages/UserLoginSignUp_/userLoginSignUp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={<UserLoginSignUp type="/login" />}
          ></Route>
          <Route
            path="/register"
            element={<UserLoginSignUp type="/register" />}
          ></Route>
          <Route path="/employee" element={<Navigate to="/employer-login" />} />
          <Route
            path="/employer-login"
            element={<EmployerLoginSignUp type="/employer-login" />}
          ></Route>
          <Route
            path="/employer-register"
            element={<EmployerLoginSignUp type="/employer-register" />}
          ></Route>

          <Route path="/home" element={<Navigate to="/jobs"/>}></Route>
          <Route
            path="/jobs"
            element={<Home type="/jobs" />}
          ></Route>
          <Route
            path="/companies"
            element={<Home type="/companies" />}
          ></Route>
          <Route
            path="/notifications"
            element={<Home type="/notifications" />}
          ></Route>
          <Route
            path="/profile"
            element={<Home type="/profile" />}
          ></Route>
          <Route
            path="/saved"
            element={<Home type="/saved" />}
          ></Route>
          <Route
            path="/qualifications"
            element={<Home type="/qualifications" />}
          ></Route>
          <Route
            path="/contact-info"
            element={<Home type="/contact-info"/>}
          ></Route>
          <Route path="/employer-home" element={<EmployerHome/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
