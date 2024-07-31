import React, { useState } from "react";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { employerLoginAPICall, InitializeApi } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployerLogin = () => {
  const [passwordType, PasswordIcon] = usePasswordToggle();
  const [pin, setPin] = useState(false);
  const navigate = useNavigate();

  // state for storing data entered by the user
  const [employLoginData, setEmployLoginData] = useState({
    employerLoginEmail: "",
    employerLoginPassword: "",
  });

  // handling data entered by the user
  const handleEmployLoginData = (e) => {
    const { id, value } = e.target;
    setEmployLoginData((prevData) => ({ ...prevData, [id]: value }));
  };

  // log to check data is store or not
  console.log(employLoginData);

  // sending data to backend
  const handleEmployLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await employerLoginAPICall(employLoginData);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        console.log("token stored successfully");
        InitializeApi();
        setPin(true);
        setTimeout(() => {
          navigate("/employer-home");
          toast.success("Login successful!");
        }, 1500);
      } else {
        console.log("Login failed:", response.data.message);
      }
      
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <form
      className="w-[80%] flex flex-wrap gap-8 flex-col pt-8"
      onSubmit={handleEmployLoginSubmit}
    >
      <div className="w-[100%] shrink flex flex-col">
        <input
          type="text"
          id="employerLoginEmail"
          placeholder="Email ID"
          value={employLoginData.employerLoginEmail}
          onChange={handleEmployLoginData}
          className="w-[100%]  py-2 shrink px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
        />
      </div>
      <div className="w-[100%] shrink flex flex-col gap-1 relative">
        <input
          type={passwordType}
          id="employerLoginPassword"
          placeholder="Password"
          value={employLoginData.employerLoginPassword}
          onChange={handleEmployLoginData}
          className="w-[100%] py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
        />
        <span className="absolute top-2 right-3">{PasswordIcon}</span>
      </div>
      <div className="w-[100%] flex justify-end mt-4">
        <Button BtName={"Login"} pin={pin}/>
      </div>
    </form>
  );
};

export default EmployerLogin;
