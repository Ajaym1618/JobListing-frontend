import React, { useEffect, useState } from "react";
import EmployerHeader from "./employerHeader/header";
import { useLocation } from "react-router-dom";
import Jobs from "./PostingJobs/jobs";
import Candidates from "./Candidates/candidates";

const EmployerHome = () => {
  const [JC, setJC] = useState("Jobs");
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/employer-jobs":
        setJC("employerJobs");
        break;
      case "/candidates":
        setJC("candidates");
        break;
      default:
        setJC("employerJobs");
        break;
    }
  }, [location]);
  return (
    <div className="w-[100%] h-[100vh]">
      <EmployerHeader />
      {JC === "employerJobs"&& <Jobs/>}
      {JC === "candidates"&& <Candidates/>}
    </div>
  );
};

export default EmployerHome;
