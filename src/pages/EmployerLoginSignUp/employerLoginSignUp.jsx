import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import temp from "../../assets/employee.png";
import { useLocation, useNavigate } from "react-router-dom";
import { ExportOutlined } from "@ant-design/icons";
import EmployerSignUp from "./employerSignUp";
import EmployerLogin from "./employerLogin";

const EmployerLoginSignUp = () => {
  const [emLoRe, setEmLoRe] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/employer-login") {
      setEmLoRe("employerLogin");
    } else {
      setEmLoRe("employerRegister");
    }
  }, [location]);

  return (
    <div className="w-screen h-screen ">
      <div className="w-screen h-[12%] flex justify-between items-center px-20 bg-white shadow-sm shadow-slate-200 max-md:px-5">
        <div className="w-[100%] pr-4">
          <img src={logo} alt="logo" width={"250px"} />
        </div>
        <div className="w-[100%] flex justify-end">
          <button
            className="flex gap-2 justify-center items-center font-bold text-[#015f4d] hover:border-b-2 hover:border-[#18b1a6] max-md:text-sm"
            onClick={() => navigate("/")}
          >
            Job seekers <ExportOutlined />
          </button>
        </div>
      </div>
      <div className="w-[100%] h-[88%] flex items-center max-md:block">
        <div className="w-[100%] h-[100%] flex flex-col gap-2 justify-center items-center max-md:h-[30%]">
          <h1 className="font-bold text-[#18b1a6] text-lg max-lg:text-[16px] max-sm:text-[13px]">
            CAREER CRAZE HIRING SUITE FOR EMPLOYERS
          </h1>
          <p className="text-3xl text-[#015f4d] font-semibold max-xl:text-2xl max-lg:text-[17px] max-sm:text-[15px]">
            From Campus to Senior Level Hiring
          </p>
          <h2 className="text-[22px] font-semibold text-[#8892a3] max-xl:text-[18px] max-lg:text-[15px] max-sm:text-[12px]">
            Bouquet of solutions to meet all your hiring needs
          </h2>
          <img src={temp} width={"70%"} className="max-md:hidden"/>
        </div>
        <div className="w-[100%] h-auto flex justify-center items-center max-md:pb-8">
          <div className="w-[80%] h-[100%] bg-white flex flex-col justify-center items-center rounded-lg shadow-slate-500 shadow-lg py-4">
            <div className="shrink flex w-[100%] pb-2">
              <div className={`w-[50%] text-center text-lg pb-3 border-b-[3px] ${emLoRe === "employerLogin" ? "border-[#18b1a6]" : "border-[#cdd3db] text-gray-500"}  cursor-pointer font-semibold`} onClick={()=>navigate("/employer-login")}>
                Login
              </div>
              <div className={`w-[50%] text-center text-lg pb-3 border-b-[3px] ${emLoRe === "employerLogin" ? "border-[#cdd3db] text-gray-500" : "border-[#18b1a6]"} cursor-pointer font-semibold`} onClick={()=>navigate("/employer-register")}>
                SignUp
              </div>
            </div>
            {emLoRe === "employerLogin" ? <EmployerLogin/> : <EmployerSignUp/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerLoginSignUp;
