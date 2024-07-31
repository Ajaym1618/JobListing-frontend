import React, { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import EmployerNotifications from "../EmployerNotifications/employerNotifications";
import { toast } from "react-toastify";
import {
  getApplyData,
  getEmployData,
  getJobData,
  InitializeApi,
} from "../../../api";
import { setEmployData } from "../../../store/EmploySlices/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import { setApplyData } from "../../../store/UserSlices/applySlice";
import { setGetPostedJobs } from "../../../store/UserSlices/postedJobDataSlice";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { IoMdSettings } from "react-icons/io";

const EmployerHeader = () => {
  const [userModel, setUserModel] = useState(false);
  const [line, setLine] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const employData = useSelector((state) => state.employData);
  const applyData = useSelector((state) => state.apply);
  const userData = useSelector((state) => state.getData);

  const handleNavigate = (e) => {
    navigate(e);
    setLine(e);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    toast.success("Logout successful!");
    navigate("/employer");
  };

  const getDataEmploy = async () => {
    try {
      const response = await getEmployData();
      console.log(response.data);
      dispatch(setEmployData(response.data.user));
      console.log("data", employData);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const getDataApply = async () => {
    try {
      const response = await getApplyData();
      console.log(response.data);
      dispatch(setApplyData(response.data));
      console.log("apply", applyData);
    } catch (err) {
      console.error(err);
    }
  };

  const getDataJob = async () => {
    try {
      const response = await getJobData();
      console.log(response.data);
      dispatch(setGetPostedJobs(response.data[0].jobPosts));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    setLine(location.pathname);
    InitializeApi();
    getDataEmploy();
    getDataJob();
    getDataApply();
  }, []);

  const appliedFilter = applyData.filter((val) => {
    return (
      userData.userSignFullName === val.applyFullName &&
      userData.userSignEmail === val.applyEmail
    );
  });

  return (
    <div className="w-[100%] h-[12vh] flex justify-between items-center py-2 px-6 bg-white shadow-sm shadow-slate-200 ">
      <div className="w-[100%] flex items-center justify-start gap-10 px-8 font-semibold max-lg:px-0">
        <img
          src={logo}
          alt="logo"
          width={"200px"}
          className="max-lg:w-[150px]"
        />
        <div
          className={`h-[80px] flex items-center ${
            line === "/employer-jobs" ? "border-b-[3px]" : ""
          } border-[#015f4d] pt-1 cursor-pointer text-lg hover:text-[#015f4d] max-lg:hidden`}
          onClick={() => handleNavigate("/employer-jobs")}
        >
          Jobs
        </div>
        <div
          className={`h-[78px] flex items-center ${
            line === "/candidates" ? "border-b-[3px]" : ""
          } border-[#015f4d] pt-1 cursor-pointer text-lg hover:text-[#015f4d] max-lg:hidden`}
          onClick={() => handleNavigate("/candidates")}
        >
          Candidates
        </div>
      </div>
      <div className="w-[100%] flex justify-end items-center gap-10 text-2xl px-8 relative max-lg:text-xl ">
        <UserOutlined
          className="cursor-pointer hover:text-[#015f4d]"
          onClick={() => {
            setUserModel(!userModel);
          }}
        />
        {userModel && (
          // before media query
          <>
            <div className="w-auto h-auto rounded-md absolute top-20 right-0 border border-[#015f4d] bg-white shadow-md shadow-slate-400 z-40 max-lg:hidden">
              <div className="absolute top-[-11px] border-l border-t border-[#015f4d] right-8 rotate-[45deg] w-[20px] h-[20px] bg-white z-30"></div>
              <div className="w-[100%] pt-4 text-lg flex flex-col overflow-hidden">
                <div className="font-semibold px-6 py-2">
                  {employData?.employerSignCompanyName}
                </div>
                <div
                  className=" flex gap-2 px-5 py-3 items-center cursor-pointer font-semibold hover:bg-[#d8fffc] hover:text-[#015f4d]"
                  onClick={() => {
                    handleNavigate("/employer-info");
                    setUserModel(!userModel);
                  }}
                >
                  <IoMdSettings className="text-2xl" />
                  Employer settings
                </div>
                <div
                  className="w-[100%] px-6 py-3 items-center font-semibold text-lg flex gap-3 cursor-pointer rounded-b-md hover:bg-[#d8fffc] hover:text-[#015f4d]"
                  onClick={handleLogOut}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  Sign out
                </div>
              </div>
            </div>
            {/* // After media query */}
            <div className="w-auto h-auto rounded-md absolute top-20 right-0 border border-[#015f4d] bg-white shadow-md shadow-slate-400 z-20 hidden max-lg:block">
              <div className="absolute top-[-11px] border-l border-t border-[#015f4d] right-8 rotate-[45deg] w-[20px] h-[20px] bg-white z-0"></div>
              <div className="w-[100%] py-4 text-lg flex flex-col max-md:text-sm">
                <div
                  className="px-6 flex gap-3 py-3 items-center cursor-pointer font-semibold hover:bg-[#d8fffc] hover:text-[#015f4d]"
                  onClick={() => {
                    handleNavigate("/employer-jobs");
                    setUserModel(!userModel);
                  }}
                >
                  <i className="fa-solid fa-briefcase"></i>Jobs
                </div>
                <div
                  className="px-6 flex gap-3 py-3 items-center cursor-pointer font-semibold hover:bg-[#d8fffc] hover:text-[#015f4d]"
                  onClick={() => {
                    handleNavigate("/candidates");
                    setUserModel(!userModel);
                  }}
                >
                  <i className="fa-solid fa-building"></i>Candidates
                </div>
                <div
                  className=" flex gap-3 px-5 py-3 items-center cursor-pointer font-semibold hover:bg-[#d8fffc] hover:text-[#015f4d]"
                  onClick={() => {
                    handleNavigate("/employer-info");
                    setUserModel(!userModel);
                  }}
                >
                  <IoMdSettings className="text-lg" />
                  settings
                </div>
              </div>
              <div
                className="w-[100%] py-2 font-semibold text-[#015f4d] text-lg border-t border-gray-600 flex gap-3 justify-center rounded-b-md items-center cursor-pointer hover:bg-[#d8fffc] max-md:text-sm"
                onClick={handleLogOut}
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                Sign out
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployerHeader;
