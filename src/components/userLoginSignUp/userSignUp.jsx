import React from "react";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [passwordType, PasswordIcon] = usePasswordToggle();
  const [confirmPasswordType, ConfirmPasswordIcon] = usePasswordToggle();
  const navigate = useNavigate()
  return (
    <div className="w-[80%] h-[100%] bg-white flex flex-col justify-center items-center rounded-lg shadow-slate-500 shadow-lg py-2  max-sm:h-auto">
      <div className="shrink">
        <h1 className="text-[26px] font-bold pb-4 max-[1025px]:pb-2 max-[1025px]:text-[20px] max-md:text-[16px]">
          Create your <span className="text-[#18b1a6]">CareerCraze</span>{" "}
          profile
        </h1>
      </div>
      <form className="w-[80%] flex flex-wrap gap-4 flex-col max-[1025px]:gap-2">
        <div className="w-[100%] shrink flex flex-col gap-1 ">
          <label htmlFor="userSignFullName" className="block font-semibold max-md:text-sm">
            Full name<span className="text-[#f14c4c]">*</span>
          </label>
          <input
            type="text"
            id="userSignFullName"
            placeholder="What is your name?"
            className="w-[100%] rounded-md py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border border-[#191919] max-[1025px]:py-1 max-md:text-sm"
          />
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1 ">
          <label htmlFor="userSignEmail" className="block font-semibold max-md:text-sm">
            Email ID<span className="text-[#f14c4c]">*</span>
          </label>
          <input
            type="text"
            id="userSignEmail"
            placeholder="Tell us your Email ID"
            className="w-[100%] rounded-md py-2 shrink px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border border-[#191919] max-[1025px]:py-1 max-md:text-sm"
          />
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1 relative">
          <label htmlFor="userSignPassword" className="block font-semibold max-md:text-sm">
            Password<span className="text-[#f14c4c]">*</span>
          </label>
          <input
            type={passwordType}
            id="userSignPassword"
            placeholder="(Minimum 6 characters)"
            className="w-[100%] rounded-md py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border border-[#191919] max-[1025px]:py-1 max-md:text-sm"
          />
          <span className="absolute top-9 right-3 max-md:top-7">{PasswordIcon}</span>
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1 relative">
          <label htmlFor="userSignConfirmPassword" className="block font-semibold max-md:text-sm">
            Confirm Password<span className="text-[#f14c4c]">*</span>
          </label>
          <input
            type={confirmPasswordType}
            id="userSignConfirmPassword"
            placeholder="Re-enter your password"
            className="w-[100%] rounded-md py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border border-[#191919] max-[1025px]:py-1 max-md:text-sm"
          />
          <span className="absolute top-9 right-3 max-md:top-7">{ConfirmPasswordIcon}</span>
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1">
          <label htmlFor="userSignMobileNo" className="block font-semibold max-md:text-sm">
            Mobile number<span className="text-[#f14c4c]">*</span>
          </label>
          <input
            type="tel"
            id="userSignMobileNo"
            placeholder="Enter yor mobile number"
            className="w-[100%] rounded-md py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border border-[#191919] max-[1025px]:py-1 max-md:text-sm"
          />
        </div>
        <div className="hidden max-sm:pt-2 max-md:block max-md:text-sm">
          Already have an account? <span className="text-[#18b1a6] font-semibold" onClick={()=>navigate("/login")}>Login</span>
        </div>
        <div className="w-[100%] flex justify-end mt-4 max-md:mt-2 ">
          <button className="px-5 py-2 text-lg text-white font-semibold rounded-md bg-[#18b1a6] active:scale-95 duration-150 max-lg:py-1 max-md:text-sm">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
