import React from "react";
import usePasswordToggle from "../../hooks/usePasswordToggle";

const EmployerSignUp = () => {
  const [passwordType, PasswordIcon] = usePasswordToggle();
  const [confirmPasswordType, ConfirmPasswordIcon] = usePasswordToggle();
  return (
      <form className="w-[80%] flex flex-wrap gap-3 flex-col max-xl:gap-1 max-sm:text-sm">
        <div className="w-[100%] shrink flex flex-col gap-1">
          <input
            type="text"
            id="employerSignName"
            placeholder="Name"
            className="w-[100%] py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
          />
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1">
          <input
            type="text"
            id="employerSignCompanyName"
            placeholder="Company name"
            className="w-[100%] py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
          />
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1 ">
          <input
            type="text"
            id="designation"
            placeholder="Designation"
            className="w-[100%] py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
          />
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1 ">
          <input
            type="tel"
            id="no-of-employees"
            placeholder="No of employees"
            className="w-[100%] py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
          />
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1 ">
          <input
            type="text"
            id="employerSignEmail"
            placeholder="Email ID"
            className="w-[100%]  py-2 shrink px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
          />
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1 relative">
          <input
            type={passwordType}
            id="employerSignPassword"
            placeholder="Password"
            className="w-[100%] py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
          />
          <span className="absolute top-2 right-3">{PasswordIcon}</span>
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1 relative">
          <input
            type={confirmPasswordType}
            id="employerSignConfirmPassword"
            placeholder="Confirm Password"
            className="w-[100%] py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
          />
          <span className="absolute top-2 right-3">{ConfirmPasswordIcon}</span>
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1">
          <input
            type="tel"
            id="employerSignMobileNo"
            placeholder="Mobile number"
            className="w-[100%] py-2 px-3 text-[#18b1a6] text-md font-semibold out outline-[#18b1a6] border-b border-[#191919]"
          />
        </div>
        <div className="w-[100%] flex mt-4">
          <button className="w-[100%] px-5 py-2 text-lg text-white font-semibold rounded-md bg-[#18b1a6] active:scale-95 duration-150">
            Register
          </button>
        </div>
      </form> 
  );
};

export default EmployerSignUp;
