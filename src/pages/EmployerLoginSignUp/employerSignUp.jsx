import React, { useState } from "react";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import Button from "../../components/Button";

const EmployerSignUp = () => {
  const [passwordType, PasswordIcon] = usePasswordToggle();
  const [confirmPasswordType, ConfirmPasswordIcon] = usePasswordToggle();

  // state to store the entered data
  const [employSignUpData, setEmploySignUpData] = useState({
    employerSignName: "",
    employerSignCompanyName: "",
    designation: "",
    noOfEmployees: "",
    employerSignEmail: "",
    employerSignPassword: "",
    employerSignConfirmPassword: "",
    employerSignMobileNo: "",
  });

  // handling the data entered by the user
  const handleEmploySignUpData = (e) => {
    const { id, value } = e.target;
    setEmploySignUpData((prevData) => ({ ...prevData, [id]: value }));
  };

  // log to check the data is store or not
  console.log(employSignUpData);

  return (
    <form className="w-[80%] flex flex-wrap gap-3 flex-col max-xl:gap-1 max-sm:text-sm">
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
        <Button BtName={"Register"} route={"/employer-login"} />
      </div>
    </form>
  );
};

export default EmployerSignUp;
