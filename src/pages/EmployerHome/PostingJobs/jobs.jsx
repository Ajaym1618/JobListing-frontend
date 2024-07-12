import React, { useState } from "react";
import { AiOutlineControl } from "react-icons/ai";
import calendar from "../../../assets/calendar.png";

const Jobs = () => {
  const [jobFilter, setJobFilter] = useState({
    filterData: "",
  });

  const handleJobFilter = (e) => {
    const {id, value} = e.target;
    setJobFilter({[id]:value});
  }

  console.log(jobFilter);

  return (
    <div className="w-[100%] h-[88vh] px-10 py-10">
      <div className="w-full flex justify-between items-center pb-6">
        <h1 className="text-2xl font-semibold">Jobs</h1>
        <button className="px-8 py-2 text-lg text-white bg-[#18b1a6] rounded-md">
          Post a job
        </button>
      </div>
      <div className="w-full ">
        <div className="w-[30%] relative max-lg:w-[100%]">
          <input
            type="text"
            id="filterData"
            value={jobFilter.filterData}
            onChange={handleJobFilter}
            placeholder="Filter and search jobs"
            className="w-[100%] py-2 px-3 rounded-md text-[#18b1a6] border border-black outline-[#18b1a6]"
          />
          <AiOutlineControl className="absolute text-2xl top-2 right-2" />
        </div>
      </div>
      <div className="w-full h-auto px-4 py-20 flex flex-col justify-center items-center gap-5">
        <div className="w-full flex justify-center">
          <img src={calendar} alt="" className="w-[200px]" />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl text-center max-md:text-sm">
            No jobs posted. Post your first job directly in CareerCraze
          </h1>
          <button className="w-[20%] px-8 py-2 text-lg text-white bg-[#18b1a6] rounded-md max-lg:w-[50%] max-md:w-[70%] max-sm:w-[100%]">
            Post a job
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
