import React, { useState } from "react";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import Button from "../../components/Button";
import { employerSignUpAPICall } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setEmploySignUpData,
  clearSetEmploySignUpData,
} from "../../store/EmploySlices/signUpSlice";
import { useSelector, useDispatch } from "react-redux";

const EmployerSignUp = () => {
  const [passwordType, PasswordIcon] = usePasswordToggle();
  const [confirmPasswordType, ConfirmPasswordIcon] = usePasswordToggle();
  const [pin, setPin] = useState(false);
  const navigate = useNavigate();

  const employSignUpData = useSelector((state) => state.employSignUp);
  const dispatch = useDispatch();

  // handling the data entered by the user
  const handleEmploySignUpData = (e) => {
    const { id, value } = e.target;
    dispatch(setEmploySignUpData({ [id]: value }));
  };

  // sending data to the backend
  const handleEmploySignUp = async (e) => {
    e.preventDefault();
    const isDataComplete = Object.values(employSignUpData).every(
      (value) => value !== undefined && value !== ""
    );

    if(!isDataComplete){
      toast.error("Please enter all the details");
      return;
    }
    // Email validation regex pattern
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Password validation regex patterns
    const minLengthPattern = /.{8,}/;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const digitPattern = /\d/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

    // Extracting data from the form
    const {
      employerSignName,
      employerSignCompanyName,
      designation,
      noOfEmployees,
      employerSignEmail,
      employerSignPassword,
      employerSignConfirmPassword,
      employerSignMobileNo,
    } = employSignUpData;

    // Validate email format
    if (!emailPattern.test(employerSignEmail)) {
      toast.error("Invalid email format");
      return;
    }

    // Validate password format
    if (!minLengthPattern.test(employerSignPassword)) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (!uppercasePattern.test(employerSignPassword)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }
    if (!lowercasePattern.test(employerSignPassword)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }
    if (!digitPattern.test(employerSignPassword)) {
      toast.error("Password must contain at least one digit");
      return;
    }
    if (!specialCharPattern.test(employerSignPassword)) {
      toast.error(
        "Password must contain at least one special character like @, #, etc."
      );
      return;
    }

    // Validate passwords match
    if (employerSignPassword !== employerSignConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await employerSignUpAPICall(employSignUpData);
      console.log(response);
      dispatch(clearSetEmploySignUpData());
      setPin(true);
      setTimeout(() => {
        navigate("/employer-login");
        toast.success(response.data.message);
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("user already exist or password does'nt match");
    }
  };

  // log to check the data is store or not
  console.log(employSignUpData);

  return (
    <form
      className="w-[80%] flex flex-wrap gap-3 flex-col max-xl:gap-1 max-sm:text-sm"
      onSubmit={handleEmploySignUp}
    >
      <div className="w-[100%] shrink flex flex-col gap-1">
        <input
          type="text"
          id="employerSignName"
          placeholder="Name"
          value={employSignUpData.employerSignName}
          onChange={handleEmploySignUpData}
          className="w-[100%] py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
        />
      </div>
      <div className="w-[100%] shrink flex flex-col gap-1">
        <input
          type="text"
          id="employerSignCompanyName"
          placeholder="Company name"
          value={employSignUpData.employerSignCompanyName}
          onChange={handleEmploySignUpData}
          className="w-[100%] py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
        />
      </div>
      <div className="w-[100%] shrink flex flex-col gap-1 ">
        <input
          type="text"
          id="designation"
          placeholder="Designation"
          value={employSignUpData.designation}
          onChange={handleEmploySignUpData}
          className="w-[100%] py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
        />
      </div>
      <div className="w-[100%] shrink flex flex-col gap-1 ">
        <input
          type="tel"
          id="noOfEmployees"
          placeholder="No of employees"
          value={employSignUpData.noOfEmployees}
          onChange={handleEmploySignUpData}
          className="w-[100%] py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
        />
      </div>
      <div className="w-[100%] shrink flex flex-col gap-1 ">
        <input
          type="text"
          id="employerSignEmail"
          placeholder="Email ID"
          value={employSignUpData.employerSignEmail}
          onChange={handleEmploySignUpData}
          pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
          className="w-[100%]  py-2 shrink px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
        />
      </div>
      <div className="w-[100%] shrink flex flex-col gap-1 relative">
        <input
          type={passwordType}
          id="employerSignPassword"
          placeholder="Password"
          value={employSignUpData.employerSignPassword}
          onChange={handleEmploySignUpData}
          className="w-[100%] py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
        />
        <span className="absolute top-2 right-3">{PasswordIcon}</span>
      </div>
      <div className="w-[100%] shrink flex flex-col gap-1 relative">
        <input
          type={confirmPasswordType}
          id="employerSignConfirmPassword"
          placeholder="Confirm Password"
          value={employSignUpData.employerSignConfirmPassword}
          onChange={handleEmploySignUpData}
          className="w-[100%] py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
        />
        <span className="absolute top-2 right-3">{ConfirmPasswordIcon}</span>
      </div>
      <div className="w-[100%] shrink flex flex-col gap-1">
        <input
          type="tel"
          id="employerSignMobileNo"
          placeholder="Mobile number"
          value={employSignUpData.employerSignMobileNo}
          onChange={handleEmploySignUpData}
          className="w-[100%] py-2 px-3 text-[#18b1a6] text-md font-semibold out outline-[#18b1a6] border-b border-[#191919]"
        />
      </div>
      <div className="w-[100%] flex justify-end mt-4">
        <Button BtName={"Register"} pin={pin} />
      </div>
    </form>
  );
};

export default EmployerSignUp;
