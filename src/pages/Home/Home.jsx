import React, { useState, useEffect } from "react";
import Header from "./Header/header";
import Jobs from "./Jobs/jobs";
import Companies from "./Companies/companies";
import { useLocation } from "react-router-dom";
import Notifications from "./Notifications/notifications";
import Profile from "./Profiles/profiles";
import Saved from "./Saved/saved";
import Qualifications from "./Profiles/Qualifications/qualifications";
import ContactInfo from "./Profiles/ContactInfo/contactInfo";

const Home = () => {
  const [JC, setJC] = useState("Jobs");
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/jobs":
        setJC("jobs");
        break;
      case "/companies":
        setJC("companies");
        break;
      case "/notifications":
        setJC("notifications");
        break;
      case "/profile":
        setJC("profile");
        break;
      case "/saved":
        setJC("saved");
        break;
      case "/qualifications":
        setJC("qualifications");
        break;
      case "/contact-info":
        setJC("contactInfo");
        break;
      default:
        setJC("jobs");
        break;
    }
  }, [location]);
  
  return (
    <div className="w-[100%] h-auto bg-[#f6f5fa]">
      <Header />
      {JC === "jobs" && <Jobs/>}
      {JC === "companies" && <Companies/>}
      {JC === "notifications" && <Notifications/>}
      {JC === "profile" && <Profile/>}
      {JC === "saved" && <Saved/>}
      {JC === "qualifications" && <Qualifications/>}
      {JC === "contactInfo" && <ContactInfo/>}
    </div>
  );
};

export default Home;
