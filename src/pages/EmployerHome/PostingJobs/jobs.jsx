import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import calendar from "../../../assets/calendar.png";
import { useNavigate } from "react-router-dom";
import { getJobData, InitializeApi, putJobPostData } from "../../../api";
import { setGetPostedJobs } from "../../../store/UserSlices/postedJobDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Skeleton } from "antd";
{
  /* <Skeleton active /> */
}

const Jobs = () => {
  const [jobFilter, setJobFilter] = useState("");
  const [items, setItems] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [skel, setSkel] = useState(false);

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

  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleJobEdit = async (id, data) => {
    try {
      const response = await putJobPostData(id, { isActive: data });
      toast.success(response.data.message);
      dispatch(
        setGetPostedJobs(
          setPostedJobs.map((job) =>
            job._id === id ? { ...job, isActive: data } : job
          )
        )
      );
      console.log(response.data.message);
      setOpenDropdown(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setSkel(true);
    setTimeout(() => {
      setSkel(false);
    }, 1000);
  },[]);

  return (
    <div className="w-[100%] h-[88vh] px-10 py-10 flex flex-col items-center">
      <div className="w-[90%]">
        <div className="w-full flex justify-between items-center pb-6">
          <h1 className="text-2xl font-semibold">Jobs</h1>
          <button
            className="px-8 py-2 text-lg text-white bg-[#18b1a6] rounded-md active:scale-95 duration-150 max-sm:px-5 max-sm:text-sm"
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
              className="w-[100%] py-2 px-3 rounded-md text-[#18b1a6] border border-gray-700 outline-[#18b1a6]"
            />
            <IoFilter className="absolute text-2xl top-2 right-2 text-[#18b1a6]" />
          </div>
        </div>
      </div>
      <div className="w-[100%] h-auto py-5 flex justify-center">
        <div className="w-[90%] h-full rounded-xl flex flex-col gap-4 max-md:w-[100%]">
          <div className="w-full flex justify-between rounded-xl bg-[#c2f1ed] px-8 py-3 font-semibold max-sm:hidden">
            <h1>Job title</h1>
            <h1>candidates</h1>
            <div>Job status</div>
          </div>
          <div className="w-full h-auto flex flex-col gap-4">
            {CompanyFilter.length > 0 ? (
              items.length > 0 ? (
                items.map((value, i) => {
                  if (
                    value.companyName === compareData.employerSignCompanyName
                  ) {
                    return skel ? (
                      <div className="w-full px-3 py-3 rounded-md border border-[#d4d3d8]">
                        <Skeleton active/>
                      </div>
                    ) : (
                      <div
                        key={i}
                        className="w-full h-auto bg-white flex items-center justify-between rounded-6xl px-6 py-5 shadow-md shadow-slate-300 rounded-xl max-sm:flex-col max-sm:gap-4"
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
                        <div className="w-[20%] max-sm:w-[100%]">
                          <div className="w-full relative max-sm:w-[100%]">
                            <div
                              className={`w-[100%] py-1 px-3 flex justify-between items-center rounded-md border border-gray-700 outline-[#18b1a6] cursor-pointer ${
                                openDropdown === i &&
                                "border-b-4 border-b-[#18b1a6]"
                              }`}
                              onClick={() => handleDropdownToggle(i)}
                            >
                              {value?.isActive !== undefined &&
                                (value.isActive ? (
                                  <>
                                    <div className="px-1 py-1 mr-1 rounded-[50%] bg-green-600"></div>
                                    <span>Open</span>
                                  </>
                                ) : (
                                  <>
                                    <div className="px-1 py-1 mr-1 rounded-[50%] bg-red-600"></div>
                                    <span>Close</span>
                                  </>
                                ))}
                              {openDropdown === i ? (
                                <FaChevronUp className="text-sm" />
                              ) : (
                                <FaChevronDown className="text-sm" />
                              )}
                            </div>

                            {openDropdown === i && (
                              <div className="w-full text-gray-600 flex flex-col gap-1 absolute bg-white border-x border-b border-gray-700 rounded-b-md transition-all ease-out duration-150 z-30 overflow-hidden">
                                <h1
                                  className="px-3 pt-1 flex gap-3 items-center cursor-pointer hover:bg-green-100"
                                  onClick={() =>
                                    handleJobEdit(value?._id, true)
                                  }
                                >
                                  <div className="px-1 py-1 rounded-[50%]  bg-green-600"></div>
                                  Open
                                </h1>
                                <h1
                                  className="px-3 pb-1 flex gap-3 items-center cursor-pointer hover:bg-red-100"
                                  onClick={() =>
                                    handleJobEdit(value?._id, false)
                                  }
                                >
                                  <div className="px-1 py-1 rounded-[50%] bg-red-600"></div>
                                  Close
                                </h1>
                              </div>
                            )}
                          </div>
                        </div>
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
