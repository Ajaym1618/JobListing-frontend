import React, { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
const EmployerHeader = () => {
  const [model, setModel] = useState(false);
  const [line, setLine] = useState("/jobs");

  const location = useLocation();

  useEffect(() => {
    setLine(location.pathname);
  }, []);

  const handleNavigate = (e) => {
    navigate(e);
    setLine(e);
  };

  const navigate = useNavigate();
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
            line === "/jobs" ? "border-b-[3px]" : ""
          } border-[#015f4d] pt-1 cursor-pointer text-lg hover:text-[#015f4d] max-lg:hidden`}
          onClick={() => handleNavigate("/jobs")}
        >
          Jobs
        </div>
        <div
          className={`h-[78px] flex items-center ${
            line === "/companies" ? "border-b-[3px]" : ""
          } border-[#015f4d] pt-1 cursor-pointer text-lg hover:text-[#015f4d] max-lg:hidden`}
        >
          Candidates
        </div>
      </div>
      <div className="w-[100%] flex justify-end items-center gap-10 text-2xl px-8 relative max-lg:text-xl ">
        <button className="px-4 py-2 text-lg text-white bg-[#18b1a6] rounded-md">
          Post a job
        </button>
        <BellOutlined
          className={`cursor-pointer h-[80px] flex items-center ${
            line === "/notifications" ? "border-b-[3px]" : ""
          } border-[#015f4d] hover:text-[#015f4d]`}
        />
        <UserOutlined
          className="cursor-pointer hover:text-[#015f4d]"
          onClick={() => setModel(!model)}
        />
        {model && (
          // before media query
          <>
            <div className="w-auto h-auto rounded-md absolute top-20 right-0 border border-[#015f4d] bg-white shadow-md shadow-slate-400 max-lg:hidden">
              <div className="absolute top-[-11px] border-l border-t border-[#015f4d] right-8 rotate-[45deg] w-[20px] h-[20px] bg-white z-30"></div>
              <div className="w-[100%] py-4 text-lg flex flex-col">
                <div className="font-semibold px-6 py-2">email</div>
                <div
                  className="px-6 flex gap-3 py-3 items-center cursor-pointer font-semibold hover:bg-[#d8fffc] hover:text-[#015f4d]"
                  onClick={() => {
                    handleNavigate("/profile");
                    setModel(!model);
                  }}
                >
                  <i className="fa-solid fa-user "></i>Profile
                </div>
                <div
                  className=" flex gap-3 px-6 py-3 items-center cursor-pointer font-semibold hover:bg-[#d8fffc] hover:text-[#015f4d]"
                  onClick={() => {
                    handleNavigate("/saved");
                    setModel(!model);
                  }}
                >
                  <i className="fa-solid fa-bookmark "></i>My jobs
                </div>
              </div>
              <div
                className="w-[100%] py-2 font-semibold text-[#015f4d] text-lg border-t border-gray-600 flex gap-3 justify-center items-center cursor-pointer hover:bg-[#d8fffc]"
                onClick={() => navigate("/")}
              >
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                Sign out
              </div>
            </div>
            {/* // After media query */}
            <div className="w-auto h-auto rounded-md absolute top-20 right-0 border border-[#015f4d] bg-white shadow-md shadow-slate-400 z-20 hidden max-lg:block">
              <div className="absolute top-[-11px] border-l border-t border-[#015f4d] right-8 rotate-[45deg] w-[20px] h-[20px] bg-white z-0"></div>
              <div className="w-[100%] py-4 text-lg flex flex-col max-md:text-sm">
                <div
                  className="px-6 flex gap-3 py-3 items-center cursor-pointer font-semibold hover:bg-[#d8fffc] hover:text-[#015f4d]"
                  onClick={() => handleNavigate("/jobs")}
                >
                  <i class="fa-solid fa-briefcase"></i>Jobs
                </div>
                <div
                  className="px-6 flex gap-3 py-3 items-center cursor-pointer font-semibold hover:bg-[#d8fffc] hover:text-[#015f4d]"
                  onClick={() => handleNavigate("/companies")}
                >
                  <i class="fa-solid fa-building"></i>Companies
                </div>
                <div
                  className="px-6 flex gap-3 py-3 items-center cursor-pointer font-semibold hover:bg-[#d8fffc] hover:text-[#015f4d]"
                  onClick={() => {
                    handleNavigate("/profile");
                    setModel(!model);
                  }}
                >
                  <i className="fa-solid fa-user "></i>Profile
                </div>
                <div
                  className=" flex gap-3 px-6 py-3 items-center cursor-pointer font-semibold hover:bg-[#d8fffc] hover:text-[#015f4d]"
                  onClick={() => {
                    handleNavigate("/saved");
                    setModel(!model);
                  }}
                >
                  <i className="fa-solid fa-bookmark "></i>My jobs
                </div>
              </div>
              <div className="w-[100%] py-2 font-semibold text-[#015f4d] text-lg border-t border-gray-600 flex gap-3 justify-center items-center cursor-pointer hover:bg-[#d8fffc] max-md:text-sm">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
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
