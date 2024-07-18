import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Jobs from "./PostingJobs/jobs";
import Candidates from "./Candidates/candidates";
import EmployerInfo from "./EmployerInfo/employerInfo";
import EmployerHeader from "./EmployerHeader/header";
import GetPostData from "./PostingJobs/getPostData";

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
      case "/employer-info":
        setJC("employerInfo");
        break;
      case "/posting-jobs":
        setJC("postingJobs");
        break;
      default:
        setJC("employerJobs");
        break;
    }
  }, [location]);
  return (
    <div className="w-[100%] h-[100vh]">
      <EmployerHeader />
      {JC === "employerJobs" && <Jobs />}
      {JC === "candidates" && <Candidates />}
      {JC === "employerInfo" && <EmployerInfo />}
      {JC === "postingJobs" && <GetPostData/>}
    </div>
  );
};

export default EmployerHome;
