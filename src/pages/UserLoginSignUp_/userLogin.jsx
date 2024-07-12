import React, { useState } from "react";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const Login = () => {
  const [loginPassword, loginIcon] = usePasswordToggle();
  const navigate = useNavigate();

  // state for storing login data
  const [userLoginData, setUserLoginData] = useState({
    userLogEmail: "",
    userLogPassword: "",
  });

  // handling the data entered by the user
  const handleUserLoginData = (e) => {
    const {id, value} = e.target;
    setUserLoginData((prevData)=>({...prevData,[id]:value}))
  }

  // log to check data is stored or not
  console.log(userLoginData);

  return (
    <div className="w-[80%] h-[80%] bg-white flex flex-col justify-center items-center rounded-lg shadow-slate-500 shadow-lg py-4 max-sm:h-auto">
      <div className="shrink">
        <h1 className="text-[26px] font-bold pb-8 max-[1025px]:text-[20px] max-md:text-[18px] max-sm:text-[16px]">
          Login into <span className="text-[#18b1a6] pr-2">CareerCraze</span>
          profile
        </h1>
      </div>
      <form className="w-[80%] flex flex-wrap gap-4 flex-col">
        <div className="w-[100%] shrink flex flex-col gap-1 ">
          <label htmlFor="userLogEmail" className="block font-semibold">
            Email ID<span className="text-[#f14c4c]">*</span>
          </label>
          <input
            type="text"
            id="userLogEmail"
            placeholder="Enter your email ID"
            value={userLoginData.userLogEmail}
            onChange={handleUserLoginData}
            className="w-[100%] rounded-md py-2 shrink px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
          />
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1 relative">
          <label htmlFor="userLogPassword" className="block font-semibold">
            Password<span className="text-[#f14c4c]">*</span>
          </label>
          <input
            type={loginPassword}
            id="userLogPassword"
            placeholder="Enter yor password"
            value={userLoginData.userLogPassword}
            onChange={handleUserLoginData}
            className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
          />
          <span className="absolute top-9 right-3">{loginIcon}</span>
        </div>
        <div className="hidden max-md:block max-sm:text-sm">
          Don't have an account?{" "}
          <span
            className="text-[#18b1a6] font-semibold"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </div>
        <div className="w-[100%] flex justify-end mt-4">
          <div className="w-[40%] ">
            <Button BtName={"Login"} route={"/Home"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
