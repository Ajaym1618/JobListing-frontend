import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import { jobPost } from "../../../api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const GetPostData = () => {
  const navigate = useNavigate();
  const [drop1, setDrop1] = useState(false);
  const [drop2, setDrop2] = useState(false);
  const [drop3, setDrop3] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState("on-site");
  const [selectedOption2, setSelectedOption2] = useState([]);
  const [selectedOption3, setSelectedOption3] = useState([]);

  const employdata = useSelector((state) => state.employData);
  console.log("employ", employdata);

  const jobTypes = [
    "Full-time",
    "Permanent",
    "Fresher",
    "Part-time",
    "Temporary",
    "Internship",
    "Freelance",
  ];

  const jobSchedules = [
    "Day shift",
    "Morning shift",
    "Rotational shift",
    "Night shift",
    "Monday to friday",
    "Evening shift",
    "Weekend availability",
    "Fixed shift",
    "US shift",
    "Uk shift",
    "Weekend only",
    "Other",
  ];

  const availableJobTypes = jobTypes.filter(
    (jobType) => !selectedOption2.includes(jobType)
  );
  const availableJobSchedules = jobSchedules.filter(
    (jobSchedule) => !selectedOption3.includes(jobSchedule)
  );

  const handleOptionClick1 = (option) => {
    setSelectedOption1(option);
    setDrop1(false);
    setPostingData((prevData) => ({
      ...prevData,
      JobOption: option,
    }));
  };

  const handleOptionClick2 = (option) => {
    setSelectedOption2((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
    setPostingData((prevData) => ({
      ...prevData,
      jobType: [...selectedOption2, option],
    }));
  };

  const handleOptionClick3 = (option) => {
    setSelectedOption3((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
    setPostingData((prevData) => ({
      ...prevData,
      jobSchedule: [...selectedOption3, option],
    }));
  };

  const handleTagRemove1 = (option) => {
    setSelectedOption2((prevSelected) =>
      prevSelected.filter((item) => item !== option)
    );
  };
  
  const handleTagRemove2 = (option) => {
    setSelectedOption3((prevSelected) =>
      prevSelected.filter((item) => item !== option)
    );
  };

  const [postingData, setPostingData] = useState({
    companyName: employdata.employerSignCompanyName,
    companyIndustry: "",
    companyDescription: "",
    jobTitle: "",
    JobOption: "On-site",
    jobCity: "",
    jobArea: "",
    jobPincode: "",
    jobStreet: "",
    jobType: [],
    jobSchedule: [],
    jobMinValue: "",
    jobMaxValue: "",
    jobRate: "",
  });

  console.log(postingData);

  const handlePostingData = (e) => {
    const { id, value } = e.target;
    setPostingData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleJobPostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await jobPost(postingData);
      toast.success(response.data.message);
      setPostingData({
        companyIndustry: "",
        companyDescription: "",
        jobTitle: "",
        JobOption: [],
        jobCity: "",
        jobArea: "",
        jobPincode: "",
        jobStreet: "",
        jobType:[],
        jobSchedule:[],
        jobMinValue: "",
        jobMaxValue: "",
        jobRate: "",
        jobSkill:""
      });
      setSelectedOption1("on-site");
      setSelectedOption2([]);
      setSelectedOption3([]);
    } catch (err) {
      console.error(err);
      toast.error("Error while posting");
    }
  };

  useEffect(() => {
    
  }, [selectedOption1, selectedOption2, selectedOption3]);

  return (
    <div className="w-[100%] h-auto py-4">
      <div className="w-[50%] h-auto m-auto px-6 py-4 bg-white max-lg:w-[80%] max-md:w-[100%]">
        <div className="w-[100%] py-2 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Add Job details</h1>
          <div
            className="w-30 py-2 px-2  flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-200 hover:text-[#015f4d]"
            onClick={() => navigate("/employer-jobs")}
          >
            <FaArrowLeft className=" pr-1 text-2xl" /> <span className="text-xl">Back</span>
          </div>
        </div>
        {/* getting details */}
        <div className="py-8 px-3 flex justify-between items-center border-y border-gray-300 cursor-pointer">
          <form
            className="w-[100%]  flex flex-wrap gap-4 flex-col"
            onSubmit={handleJobPostSubmit}
          >
            <div className="w-[100%] shrink flex flex-col gap-1 ">
              <label htmlFor="companyIndustry" className="block font-semibold">
                Company's industry<span className="text-[#f14c4c]">*</span>
              </label>
              <input
                type="text"
                id="companyIndustry"
                value={postingData.companyIndustry}
                onChange={handlePostingData}
                className="w-[100%] rounded-md py-2 shrink px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
              <label
                htmlFor="companyDescription"
                className="block font-semibold"
              >
                Company description<span className="text-[#f14c4c]">*</span>
              </label>
              <textarea
                id="companyDescription"
                value={postingData.companyDescription}
                onChange={handlePostingData}
                className="w-[100%] h-28 resize-none rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 ">
              <label htmlFor="jobTitle" className="block font-semibold">
                Job title<span className="text-[#f14c4c]">*</span>
              </label>
              <input
                type="text"
                id="jobTitle"
                value={postingData.jobTitle}
                onChange={handlePostingData}
                className="w-[100%] rounded-md py-2 shrink px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 ">
              <label htmlFor="jobSkill" className="block font-semibold">
                Job skills<span className="text-[#f14c4c]">*</span>
              </label>
              <input
                type="text"
                id="jobSkill"
                value={postingData.jobSkill}
                onChange={handlePostingData}
                className="w-[100%] rounded-md py-2 shrink px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Job posting location</h1>
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 border-b relative">
              <label htmlFor="JobOption" className="block font-semibold">
                Which option best for you
                <span className="text-[#f14c4c]">*</span>
              </label>
              <div
                id="JobOption"
                className="w-[100%] rounded-md flex justify-between items-center py-2 px-5 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
                onClick={() => setDrop1(!drop1)}
              >
                {selectedOption1}
                {drop1 === false ? <FaChevronDown /> : <FaChevronUp />}
              </div>
              {drop1 && (
                <div className="w-[100%]  py-2 h-auto rounded-lg bg-white border-2 shadow-md shadow-gray-500 border-gray-500 absolute top-20 left-0 z-50">
                  <h1
                    className={`w-full cursor-pointer px-4 hover:bg-gray-100 hover:text-[#18b1a6]`}
                    onClick={() => handleOptionClick1("On-site")}
                  >
                    On-site
                  </h1>
                  <h1
                    className="cursor-pointer px-4  hover:bg-gray-100 hover:text-[#18b1a6]"
                    onClick={() => handleOptionClick1("Remote")}
                  >
                    Remote
                  </h1>
                </div>
              )}
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
              <label htmlFor="jobCity" className="block font-semibold">
                City, State<span className="text-[#f14c4c]">*</span>
              </label>
              <input
                id="jobCity"
                value={postingData.jobCity}
                onChange={handlePostingData}
                className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
              <label htmlFor="jobArea" className="block font-semibold">
                Area<span className="text-[#f14c4c]">*</span>
              </label>
              <input
                id="jobArea"
                value={postingData.jobArea}
                onChange={handlePostingData}
                className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
              <label htmlFor="jobPincode" className="block font-semibold">
                Pincode
              </label>
              <input
                id="jobPincode"
                value={postingData.jobPincode}
                onChange={handlePostingData}
                className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
              <label htmlFor="jobStreet" className="block font-semibold">
                Street address
              </label>
              <input
                id="jobStreet"
                value={postingData.jobStreet}
                onChange={handlePostingData}
                className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 border-b relative">
              <label htmlFor="jobType" className="block font-semibold">
                Job type<span className="text-[#f14c4c]">*</span>
              </label>
              <div
                id="jobType"
                className="w-[100%] rounded-md flex flex-wrap items-center py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
                onClick={() => setDrop2(!drop2)}
              >
                {selectedOption2.length === 0 && "Select options"}
                {selectedOption2.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-[#f6f5fa] px-2 py-1 rounded-md mr-2 mt-1"
                  >
                    {option}
                    <FaTimes
                      className="ml-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTagRemove1(option);
                      }}
                    />
                  </div>
                ))}
                {drop2 === false ? (
                  <FaChevronDown className="ml-auto cursor-pointer" />
                ) : (
                  <FaChevronUp className="ml-auto cursor-pointer" />
                )}
              </div>
              {drop2 && (
                <div className="w-[100%] py-2 h-auto rounded-lg bg-white border-2 shadow-lg shadow-gray-500 border-gray-500 absolute top-20 left-0 z-50">
                  {availableJobTypes.map((option) => (
                    <h1
                      key={option}
                      className="cursor-pointer py-1 px-4 hover:bg-gray-100 hover:text-[#18b1a6]"
                      onClick={() => handleOptionClick2(option)}
                    >
                      {option}
                    </h1>
                  ))}
                </div>
              )}
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 border-b relative">
              <label htmlFor="jobSchedule" className="block font-semibold">
                Job Schedule<span className="text-[#f14c4c]">*</span>
              </label>
              <div
                id="jobSchedule"
                className="w-[100%] rounded-md flex flex-wrap items-center py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
                onClick={() => setDrop3(!drop3)}
              >
                {selectedOption3.length === 0 && "Select options"}
                {selectedOption3.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-[#f6f5fa] px-2 py-1 rounded-md mr-2 mt-1"
                  >
                    {option}
                    <FaTimes
                      className="ml-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTagRemove2(option);
                      }}
                    />
                  </div>
                ))}
                {drop3 === false ? (
                  <FaChevronDown className="ml-auto cursor-pointer" />
                ) : (
                  <FaChevronUp className="ml-auto cursor-pointer" />
                )}
              </div>
              {drop3 && (
                <div className="w-[100%]  py-2 h-auto rounded-lg bg-white border-2 shadow-lg shadow-gray-500 border-gray-500 absolute top-20 left-0 z-50">
                  {availableJobSchedules.map((option) => (
                    <h1
                      key={option}
                      className="cursor-pointer px-4 py-1 hover:bg-gray-100 hover:text-[#18b1a6]"
                      onClick={() => handleOptionClick3(option)}
                    >
                      {option}
                    </h1>
                  ))}
                </div>
              )}
            </div>
            <div className="w-[100%] flex gap-4 max-md:block">
              <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
                <label htmlFor="jobMinValue" className="block font-semibold">
                  Minimum
                </label>
                <input
                  id="jobMinValue"
                  value={postingData.jobMinValue}
                  onChange={handlePostingData}
                  type="text"
                  className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
                  placeholder="₹ 4,09,347.87"
                />
              </div>
              <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
                <label htmlFor="jobMaxValue" className="block font-semibold">
                  Maximum
                </label>
                <input
                  id="jobMaxValue"
                  value={postingData.jobMaxValue}
                  onChange={handlePostingData}
                  type="text"
                  className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
                  placeholder="₹ 17,01,547.61"
                />
              </div>
              <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
                <label htmlFor="jobRate" className="block font-semibold">
                  Rate
                </label>
                <select
                  id="jobRate"
                  value={postingData.jobRate}
                  onChange={handlePostingData}
                  className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
                >
                  <option value="per hour">per hour</option>
                  <option value="per day">per day</option>
                  <option value="per week">per week</option>
                  <option value="per month">per month</option>
                  <option value="per year">per year</option>
                </select>
              </div>
            </div>
            <div className="w-[100%] flex mt-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-[#18b1a6] rounded-md text-white active:scale-95 duration-150"
                >
                  Submit
                </button>
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

export default GetPostData;
