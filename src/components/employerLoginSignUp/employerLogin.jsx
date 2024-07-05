import React from "react";
import usePasswordToggle from "../../hooks/usePasswordToggle";

const EmployerLogin = () => {
  const [passwordType, PasswordIcon] = usePasswordToggle();
  return (
      <form className="w-[80%] flex flex-wrap gap-8 flex-col pt-8">
        <div className="w-[100%] shrink flex flex-col">
          <input
            type="text"
            id="employerLoginEmail"
            placeholder="Email ID"
            className="w-[100%]  py-2 shrink px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
          />
        </div>
        <div className="w-[100%] shrink flex flex-col gap-1 relative">
          <input
            type={passwordType}
            id="employerLoginPassword"
            placeholder="Password"
            className="w-[100%] py-2 px-3 text-[#18b1a6] text-md font-semibold outline-[#18b1a6] border-b border-[#191919]"
          />
          <span className="absolute top-2 right-3">{PasswordIcon}</span>
        </div>
        <div className="w-[100%] flex mt-4">
          <button className="w-[100%] px-5 py-2 text-lg text-white font-semibold rounded-md bg-[#18b1a6] active:scale-95 duration-150">
            Login
          </button>
        </div>
      </form> 
  );
};

export default EmployerLogin;
