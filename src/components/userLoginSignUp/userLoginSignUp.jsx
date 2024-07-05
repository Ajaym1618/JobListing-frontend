import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import temp from "../../assets/laptop-screen.gif";
import SignUp from "./userSignUp";
import Login from "./userLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { ExportOutlined } from "@ant-design/icons";

const UserLoginSignUp = () => {
  const [loRe, setLoRe] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/login") {
      setLoRe("login");
    } else {
      setLoRe("register");
    }
  }, [location]);

  return (
    <div className="w-screen h-screen ">
      <div className="w-screen h-[12%] flex justify-between items-center px-6 bg-white shadow-sm shadow-slate-200">
        <div className="w-[100%]">
          <img src={logo} alt="logo" width={"250px"} />
        </div>
        <div className="w-[100%] flex justify-end gap-4">
          <button
            className={`px-3 py-1  ${
              loRe === "login"
                ? "text-white bg-[#18b1a6]"
                : "border border-[#18b1a6]"
            } rounded-md font-semibold text-[#18b1a6] active:scale-95 duration-150 max-md:hidden`}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className={`px-3 py-1 rounded-md ${
              loRe !== "login"
                ? "text-white bg-[#18b1a6]"
                : "border border-[#18b1a6] text-[#18b1a6]"
            } font-semibold active:scale-95 duration-150 max-md:hidden`}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <div className="flex border-l pl-4 border-gray-500 max-md:pl-3">
            <button
              className=" flex justify-center items-center gap-2 font-bold text-[#015f4d] hover:border-b-2 hover:border-[#18b1a6] max-md:text-sm"
              onClick={() => navigate("/employee")}
            >
              {" "}
              For Employers
              <ExportOutlined />
            </button>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[85%] flex ">
        <div className="w-[50%] h-[100%] flex justify-center items-center pt-6 max-lg:w-[60%] max-md:w-[100%]">
          {loRe === "register" ? <SignUp /> : <Login />}
        </div>
        <div className="w-[50%] h-[100%] flex justify-center items-center max-lg:w-[40%] max-md:hidden">
          <img src={temp} width={"80%"} />
        </div>
      </div>
    </div>
  );
};

export default UserLoginSignUp;
