import React, { useState } from "react";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { userSignUpAPICall } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  setUserSignUpData,
  clearSetUserSignUpData,
} from "../../store/UserSlices/signUpSlice";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const [passwordType, PasswordIcon] = usePasswordToggle();
  const [confirmPasswordType, ConfirmPasswordIcon] = usePasswordToggle();
  const [pin, setPin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userSignUpData = useSelector((state) => state.userSignUp);

  // handling sign up data entered by the user
  const handleUserSignUpData = (e) => {
    const { id, value } = e.target;
    dispatch(setUserSignUpData({ [id]: value }));
  };

  // posting data to backend
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    const isDataComplete = Object.values(userSignUpData).every(
      (value) => value !== undefined && value !== ""
    );

    if (!isDataComplete) {
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
      userSignFullName,
      userSignEmail,
      userSignPassword,
      userSignConfirmPassword,
      userSignMobileNo,
    } = userSignUpData;

    // Validate email format
    if (!emailPattern.test(userSignEmail)) {
      toast.error("Invalid email format");
      return;
    }

    // Validate password format
    if (!minLengthPattern.test(userSignPassword)) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (!uppercasePattern.test(userSignPassword)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }
    if (!lowercasePattern.test(userSignPassword)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }
    if (!digitPattern.test(userSignPassword)) {
      toast.error("Password must contain at least one digit");
      return;
    }
    if (!specialCharPattern.test(userSignPassword)) {
      toast.error(
        "Password must contain at least one special character like @, #, etc."
      );
      return;
    }

    // Validate passwords match
    if (userSignPassword !== userSignConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await userSignUpAPICall(userSignUpData);
      console.log("data:", response);
      dispatch(clearSetUserSignUpData());
      console.log(response.data.message);
      setTimeout(() => {
        navigate("/login");
        toast.success(response.data.message);
      }, 1000);
      setPin(true);
    } catch (err) {
      console.error(err);
      toast.error("Invalid password or user already exists");
    }
  };

  return (
    <div className="w-[80%] h-[100%] bg-white flex flex-col justify-center items-center rounded-lg shadow-slate-500 shadow-lg py-2  max-sm:h-auto">
      <div className="shrink">
        <h1 className="text-[26px] font-bold pb-4 max-[1025px]:pb-2 max-[1025px]:text-[20px] max-md:text-[16px]">
          Create your <span className="text-[#18b1a6]">CareerCraze</span>{" "}
          profile
        </h1>
      </div>
      <form
        className="w-[80%] flex flex-wrap gap-4 flex-col max-[1025px]:gap-2"
        onSubmit={handleSignUpSubmit}
      >
        <div className="w-[100%] shrink flex flex-col gap-1 ">
          <label
            htmlFor="userSignFullName"
            className="block font-semibold max-md:text-sm"
          >
            Full name<span className="text-[#f14c4c]">*</span>
          </label>
          <input
            type="text"
            id="userSignFullName"
            placeholder="What is your name?"
            value={userSignUpData.userSignFullName}
            onChange={handleUserSignUpData}
            className="w-[100%] rounded-md py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border border-[#191919] max-[1025px]:py-1 max-md:text-sm"
          />
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1 ">
          <label
            htmlFor="userSignEmail"
            className="block font-semibold max-md:text-sm"
          >
            Email ID<span className="text-[#f14c4c]">*</span>
          </label>
          <input
            type="text"
            id="userSignEmail"
            placeholder="Tell us your Email ID"
            value={userSignUpData.userSignEmail}
            onChange={handleUserSignUpData}
            pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
            className="w-[100%] rounded-md py-2 shrink px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border border-[#191919] max-[1025px]:py-1 max-md:text-sm"
          />
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1 relative">
          <label
            htmlFor="userSignPassword"
            className="block font-semibold max-md:text-sm"
          >
            Password<span className="text-[#f14c4c]">*</span>
          </label>
          <input
            type={passwordType}
            id="userSignPassword"
            placeholder="(Minimum 6 characters)"
            value={userSignUpData.userSignPassword}
            onChange={handleUserSignUpData}
            className="w-[100%] rounded-md py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border border-[#191919] max-[1025px]:py-1 max-md:text-sm"
          />
          <span className="absolute top-9 right-3 max-md:top-7">
            {PasswordIcon}
          </span>
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1 relative">
          <label
            htmlFor="userSignConfirmPassword"
            className="block font-semibold max-md:text-sm"
          >
            Confirm Password<span className="text-[#f14c4c]">*</span>
          </label>
          <input
            type={confirmPasswordType}
            id="userSignConfirmPassword"
            placeholder="Re-enter your password"
            value={userSignUpData.userSignConfirmPassword}
            onChange={handleUserSignUpData}
            className="w-[100%] rounded-md py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border border-[#191919] max-[1025px]:py-1 max-md:text-sm"
          />
          <span className="absolute top-9 right-3 max-md:top-7">
            {ConfirmPasswordIcon}
          </span>
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1">
          <label
            htmlFor="userSignMobileNo"
            className="block font-semibold max-md:text-sm"
          >
            Mobile number<span className="text-[#f14c4c]">*</span>
          </label>
          <input
            type="tel"
            id="userSignMobileNo"
            placeholder="Enter yor mobile number"
            value={userSignUpData.userSignMobileNo}
            onChange={handleUserSignUpData}
            pattern="[0-9]{10}"
            maxlength="10"
            className="w-[100%] rounded-md py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border border-[#191919] max-[1025px]:py-1 max-md:text-sm"
          />
        </div>
        <div className="hidden max-sm:pt-2 max-md:block max-md:text-sm">
          Already have an account?{" "}
          <span
            className="text-[#18b1a6] font-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
        <div className="w-[100%] flex justify-end mt-4 max-md:mt-2 ">
          <div className="w-[50%]">
            <Button BtName={"Register"} pin={pin} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
