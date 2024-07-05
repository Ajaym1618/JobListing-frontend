import EmployerLoginSignUp from "./components/employerLoginSignUp/employerLoginSignUp";
import UserLoginSignUp from "./components/userLoginSignUp/userLoginSignUp";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>} />
          <Route path="/login" element={<UserLoginSignUp type="/login"/>}></Route>
          <Route path="/register" element={<UserLoginSignUp type="/register"/>}></Route>
          <Route path="/employee" element={<Navigate to="/employer-login"/>} />
          <Route path="/employer-login" element={<EmployerLoginSignUp type="/employer-login"/>}></Route>
          <Route path="/employer-register" element={<EmployerLoginSignUp type="/employer-register"/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
