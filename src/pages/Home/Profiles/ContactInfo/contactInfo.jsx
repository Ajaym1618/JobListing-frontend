import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ContactInfo = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[100%] h-auto pt-3">
      <div className="w-[50%] h-auto m-auto px-6 py-4 bg-white max-lg:w-[80%] max-md:w-[100%]">
        <div
          className="w-10 py-2 text-2xl flex justify-center rounded-md hover:bg-gray-200 hover:text-[#015f4d]"
          onClick={() => navigate("/profile")}
        >
          <FaArrowLeftLong className="cursor-pointer" />
        </div>
        <div className="w-[100%] py-2">
          <h1 className="text-3xl font-semibold pb-4">Contact information</h1>
        </div>
        {/* getting details */}
        <div className="py-8 px-3 flex justify-between items-center border-y border-gray-300 cursor-pointer">
          <form className="w-[80%]  flex flex-wrap gap-4 flex-col">
            <div className="w-[100%] shrink flex flex-col gap-1 ">
              <label htmlFor="contactFullName" className="block font-semibold">
                Full Name<span className="text-[#f14c4c]">*</span>
              </label>
              <input
                type="text"
                id="contactFullName"
                // value={userLoginData.userLogEmail}
                className="w-[100%] rounded-md py-2 shrink px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
              <label htmlFor="contactPhoneNo" className="block font-semibold">
                Phone<span className="text-[#f14c4c]">*</span>
              </label>
              <input
                // type={loginPassword}
                id="contactPhoneNo"
                // value={userLoginData.userLogPassword}
                className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Location</h1>
              <p className="text-sm text-gray-500">
                This will match you with nearby jobs.
              </p>
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
              <label htmlFor="contactCountry" className="block font-semibold">
                Country
              </label>
              <input
                // type={loginPassword}
                id="contactCountry"
                // value={userLoginData.userLogPassword}
                className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
              <label htmlFor="contactStreet" className="block font-semibold">
                Street address
              </label>
              <input
                // type={loginPassword}
                id="contactStreet"
                // value={userLoginData.userLogPassword}
                className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
              <label htmlFor="contactCity" className="block font-semibold">
                City, State<span className="text-[#f14c4c]">*</span>
              </label>
              <input
                // type={loginPassword}
                id="contactCity"
                // value={userLoginData.userLogPassword}
                className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
              <label htmlFor="contactPincode" className="block font-semibold">
                Pincode
              </label>
              <input
                // type={loginPassword}
                id="contactPincode"
                // value={userLoginData.userLogPassword}
                className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-[100%] flex mt-4">
              <div className="w-[40%] ">
                <button className="px-4 py-2 bg-[#18b1a6] rounded-md text-white">save</button>
                {/* <Button BtName={"Login"} route={"/Home"} /> */}
              </div>
            </div>
          </form>
        </div>
        <div className="w-[100%] flex justify-center py-2 text-sm">
          &copy;2024 CareerCraze
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
