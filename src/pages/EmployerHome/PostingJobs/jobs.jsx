import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import calendar from "../../../assets/calendar.png";
import { useNavigate } from "react-router-dom";
import { getJobData, InitializeApi } from "../../../api";
import { setGetPostedJobs } from "../../../store/UserSlices/postedJobDataSlice";
import { useSelector, useDispatch } from "react-redux";

const Jobs = () => {
  const [jobFilter, setJobFilter] = useState("");
  const [items, setItems] = useState([]);

  const setPostedJobs = useSelector((state) => state.jobPost);
  const compareData = useSelector((state) => state.employData);
  const apply = useSelector((state) => state.apply);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const CompanyFilter = setPostedJobs.filter(
    (data) => data.companyName === compareData.employerSignCompanyName
  );

  const filteredApplyData = apply.filter((application) =>
    CompanyFilter.some(
      (job) =>
        application.applyId === job._id &&
        application.applyCompanyName === job.companyName &&
        application.applyJobTitle === job.jobTitle
    )
  );

  const handleJobFilter = (e) => {
    setJobFilter(e.target.value.toLowerCase());
  };

  const getDataJob = async () => {
    try {
      const response = await getJobData();
      dispatch(setGetPostedJobs(response.data[0].jobPosts));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    InitializeApi();
    getDataJob();
  }, []);

  useEffect(() => {
    const filteredItems = setPostedJobs.filter((val) => {
      const matchesTitle = jobFilter
        ? val.jobTitle.toLowerCase().includes(jobFilter)
        : true;
      return matchesTitle;
    });
    setItems(filteredItems);
  }, [jobFilter, setPostedJobs]);

  return (
    <div className="w-[100%] h-[88vh] px-10 py-10 flex flex-col items-center">
      <div className="w-[90%]">
        <div className="w-full flex justify-between items-center pb-6">
          <h1 className="text-2xl font-semibold">Jobs</h1>
          <button
            className="px-8 py-2 text-lg text-white bg-[#18b1a6] rounded-md active:scale-95 duration-150"
            onClick={() => navigate("/posting-jobs")}
          >
            Post a job
          </button>
        </div>
        <div className="w-full ">
          <div className="w-[30%] relative max-lg:w-[100%]">
            <input
              type="text"
              id="filterData"
              value={jobFilter}
              onChange={handleJobFilter}
              placeholder="Filter and search jobs"
              className="w-[100%] py-2 px-3 rounded-md text-[#18b1a6] border border-black outline-[#18b1a6]"
            />
            <IoFilter className="absolute text-2xl top-2 right-2 text-gray-700" />
          </div>
        </div>
      </div>
      <div className="w-[100%] h-auto py-5 flex justify-center">
        <div className="w-[90%] h-full bg-transparent rounded-xl flex flex-col gap-4 shadow-md shadow-slate-300 overflow-hidden max-md:w-[100%]">
          <div className="w-full flex justify-between bg-[#c2f1ed] px-8 py-3 font-semibold max-sm:hidden">
            <h1>Job title</h1>
            <h1>candidates</h1>
            <div>Job status</div>
          </div>
          <div className="w-full hidden text-xl font-semibold pl-3 max-sm:block">
            <h1>Posted jobs</h1>
          </div>
          <div className="w-full h-auto flex flex-col gap-4">
            {CompanyFilter.length > 0 ? (
              items.length > 0 ? (
                items.map((value, i) => {
                  if (value.companyName === compareData.employerSignCompanyName) {
                    return (
                      <div
                        key={i}
                        className="w-full bg-white flex items-center justify-between rounded-6xl px-6 py-5 shadow-md shadow-slate-300 max-sm:flex-col max-sm:gap-4"
                      >
                        <div className="w-[100%]">
                          <h1 className="text-lg font-semibold">
                            {value.jobTitle}
                          </h1>
                          <h2 className="text-[#595959]">{value.jobStreet}</h2>
                        </div>
                        <div className="w-[100%] flex gap-1">
                          <div className="font-semibold">
                            {
                              filteredApplyData.filter(
                                (val) => val.applyJobTitle === value.jobTitle
                              ).length
                            }
                          </div>
                          Active
                        </div>
                        <div className="w-[10%] max-sm:w-[100%]">drop</div>
                      </div>
                    );
                  }
                })
              ) : (
                <div className="w-full h-auto px-4 py-10 flex flex-col justify-center items-center gap-5">
                  <h1 className="text-2xl text-center max-md:text-sm">
                    No matches found
                  </h1>
                </div>
              )
            ) : (
              <div className="w-full h-auto px-4 py-10 flex flex-col justify-center items-center gap-5">
                <div className="w-full flex justify-center">
                  <img src={calendar} alt="" className="w-[200px]" />
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-4">
                  <h1 className="text-3xl text-center max-md:text-sm">
                    No jobs posted. Post your first job directly in CareerCraze
                  </h1>
                  <button
                    className="w-[20%] px-8 py-2 text-lg text-white bg-[#18b1a6] rounded-md active:scale-95 duration-150 max-lg:w-[50%] max-md:w-[70%] max-sm:w-[100%]"
                    onClick={() => navigate("/posting-jobs")}
                  >
                    Post a job
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
