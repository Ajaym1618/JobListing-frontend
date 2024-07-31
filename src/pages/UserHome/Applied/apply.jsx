import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { applyJob, getApplyData } from "../../../api";
import { toast } from "react-toastify";
import { setApplyData } from "../../../store/UserSlices/applySlice";
import { useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Apply = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, companyName, jobTitle } = location.state || {};
  console.log(id, companyName, jobTitle);
  const dispatch = useDispatch();

  const [pin, setPin] = useState(false);

  const userData = useSelector((state) => state.getData);
  const contactData = useSelector((state) => state.contactInfo);
  const qualify = useSelector((state) => state.qualify);

  const filteredContactData = contactData.filter((data) => {
    const filter = data.contactId === userData?._id;
    return filter;
  });

  console.log(filteredContactData);

  const filteredQualifyData =
    qualify && Array.isArray(qualify)
      ? qualify.filter((data) => {
          return data.qualifyId === userData?._id;
        })
      : [];

  console.log(filteredQualifyData);

  const date = new Date();
  const timeStamp = date.getTime();

  const [jobApplied, setJobApplied] = useState(false);
  const [applied, setApplied] = useState({
    applyId: id,
    applyCompanyName: companyName,
    applyJobTitle: jobTitle,
    applyFullName: userData?.userSignFullName,
    applyEmail: userData?.userSignEmail,
    applyMobileNo: filteredContactData[0]?.contactPhoneNo,
    applyResume: filteredContactData[0]?.resume,
    applyExperience: filteredQualifyData[0]?.experience,
    applyEducation: filteredQualifyData[0]?.education,
    applySkills: filteredQualifyData[0]?.skills,
    applyLanguages: filteredQualifyData[0]?.languages,
    preferred: "none",
    viewed: "true",
    timeStamp: timeStamp,
  });

  const getApply = async () => {
    try {
      const response = await getApplyData();
      console.log(response.data);
      dispatch(setApplyData(response.data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAppliedData = async (e) => {
    e.preventDefault();
    const isDataComplete = Object.values(applied).every(
      (value) => value !== undefined && value !== ""
    );

    if (!isDataComplete) {
      toast.error("Please complete your profile before applying.");
      return;
    }

    const updatedApplied = { ...applied, jobApplied: true };

    try {
      const response = await applyJob(updatedApplied);
      console.log(response.data);
      setJobApplied(true);
      getApply();
      setPin(true);
      setTimeout(() => {
        navigate("/jobs");
        toast.success(response.data.message);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" w-full h-[88vh] flex justify-center items-center">
      <div className="w-[50%] h-auto bg-white flex flex-col justify-center items-center rounded-lg shadow-slate-500 shadow-lg py-2 relative max-sm:h-auto max-sm:w-[90%]">
        <div
          className="absolute top-3 right-3 text-3xl max-sm:text-xl text-[#18b1a6] cursor-pointer"
          onClick={() => navigate("/jobs")}
        >
          <IoIosCloseCircle />
        </div>
        <h1 className="text-2xl font-semibold pt-4 max-sm:text-xl">
          Apply for the job
        </h1>
        <form
          className="w-[80%] py-4 flex flex-wrap gap-4 flex-col max-[1025px]:gap-2"
          onSubmit={handleAppliedData}
        >
          <div className="w-[100%] shrink flex flex-col gap-1 ">
            <label
              htmlFor="applyFullName"
              className="block font-semibold max-md:text-sm"
            >
              Full name<span className="text-[#f14c4c]">*</span>
            </label>
            <input
              type="text"
              id="applyFullName"
              onChange={(e) => e.target.value}
              value={userData?.userSignFullName}
              disabled
              placeholder="What is your name?"
              className="w-[100%] bg-[#c2f1ed] rounded-md py-2 px-3 text-[#015f4d] text-md font-semibold outline-[#18b1a6] border border-[#191919] disabled:cursor-not-allowed max-[1025px]:py-1 max-md:text-sm"
            />
          </div>
          <div className="w-[100%] shrink flex flex-col gap-1 ">
            <label
              htmlFor="applyEmail"
              className="block font-semibold max-md:text-sm"
            >
              Email ID<span className="text-[#f14c4c]">*</span>
            </label>
            <input
              type="text"
              id="applyEmail"
              onChange={(e) => e.target.value}
              value={userData?.userSignEmail}
              disabled
              placeholder="Tell us your Email ID"
              className="w-[100%] bg-[#c2f1ed] rounded-md py-2 shrink px-3 text-[#015f4d] text-md font-semibold outline-[#18b1a6] border border-[#191919] disabled:cursor-not-allowed max-[1025px]:py-1 max-md:text-sm"
            />
          </div>
          <div className="w-[100%] shrink flex flex-col gap-1">
            <label
              htmlFor="applyMobileNo"
              className="block font-semibold max-md:text-sm"
            >
              Mobile number<span className="text-[#f14c4c]">*</span>
            </label>
            <input
              type="tel"
              id="applyMobileNo"
              onChange={(e) => e.target.value}
              value={userData?.userSignMobileNo}
              disabled
              placeholder="Enter yor mobile number"
              className="w-[100%] bg-[#c2f1ed] rounded-md py-2 px-3 text-[#015f4d] text-md font-semibold outline-[#18b1a6] border border-[#191919] disabled:cursor-not-allowed max-[1025px]:py-1 max-md:text-sm"
            />
          </div>
          <div className="w-[100%] py-4 flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Resume</h1>
            <label
              id="applyResume"
              className="w-[40%] px-5 py-2 text-center text-lg text-white font-semibold rounded-md bg-[#18b1a6] cursor-not-allowed max-md:text-sm max-xl:w-[80%] max-sm:w-[100%]"
            >
              {filteredContactData[0]
                ? filteredContactData[0]?.resume?.slice(13)
                : "Upload resume"}
            </label>
            <p className="text-sm">
              <span className="text-[#f14c4c]">*</span> To change or add any
              details go to profile..
            </p>
          </div>
          <div className="w-[100%] flex justify-end mt-4 max-md:mt-2 ">
            <button
              type="submit"
              className="w-[30%] px-5 flex justify-center items-center gap-2 py-2 text-center text-lg text-white font-semibold rounded-md bg-[#18b1a6] active:scale-95 duration-150 cursor-pointer max-md:text-sm max-md:w-[60%]"
            >
              {pin === true && (
                <Spin
                  indicator={
                    <LoadingOutlined spin className="font-bold text-white" />
                  }
                />
              )}
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Apply;
