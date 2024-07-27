import React, { useEffect, useState } from "react";
import {
  SearchOutlined,
  EnvironmentOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import folder from "../../../assets/folders.png";
import {
  bookmark,
  getJobData,
  getBookMark,
  InitializeApi,
  deletedBookMark,
} from "../../../api";
import { setGetPostedJobs } from "../../../store/UserSlices/postedJobDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { TbBulb } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { GoClockFill } from "react-icons/go";
import { FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { setBookData } from "../../../store/UserSlices/savedSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  //state for handling search
  const [searchFilter, setSearchFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [items, setItems] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setPostedJobs = useSelector((state) => state.jobPost);
  const saved = useSelector((state) => state.saved);
  const userData = useSelector((state) => state.getData);
  const contactData = useSelector((state) => state.contactInfo);
  const apply = useSelector((state) => state.apply);
  const bookmarks = useSelector((state) => state.bookmark);

  // setting the referId for the secondary div which display the info
  const [referId, setReferId] = useState("");
  console.log(referId);

  // finding the one match the id
  const jobs = setPostedJobs.find((value) => value?._id === referId);
  console.log(jobs);

  const handleSearchFilter = (e) => {
    setSearchFilter(e.target.value.toLowerCase());
  };

  const handleLocationFilter = (e) => {
    setLocationFilter(e.target.value.toLowerCase());
  };

  console.log(items);

  const getData = async () => {
    try {
      const response = await getJobData();
      console.log(response.data);
      dispatch(setGetPostedJobs(response.data[0].jobPosts));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleBookmark = async (id) => {
    try {
      const response = await bookmark({ bookmarkId: id });
      console.log(response.data);
      toast.success(response.data.message);
      getDataBookmark();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBookmark = async (id) => {
    try {
      const response = await deletedBookMark(id);
      console.log(response.data);
      toast.success(response.data.message);
      getDataBookmark();
    } catch (err) {
      toast.error("Failed to remove bookmark");
      console.error(err);
    }
  };


  const appliedFilter = apply.filter((val) => {
    return (
      referId === val.applyId &&
      userData.userSignFullName === val.applyFullName &&
      userData.userSignEmail === val.applyEmail
    );
  });

  console.log(appliedFilter);

  const getDataBookmark = async () => {
    try {
      const response = await getBookMark();
      console.log(response.data);
      dispatch(setBookData(response.data));
    } catch (err) {
      console.error("error");
    }
  };

  useEffect(() => {
    if (items.length > 0 && !referId) {
      setReferId(items[0]?._id);
    }
  }, [items, referId, jobs]);

  useEffect(() => {
    InitializeApi();
    getData();
    getDataBookmark();
  }, []);

  useEffect(() => {
    setItems(setPostedJobs);
  }, [setPostedJobs]);

  useEffect(() => {
    const filteredItems = setPostedJobs.filter((val) => {
      const matchesTitle = searchFilter
        ? val.jobTitle.toLowerCase().includes(searchFilter) || val.companyName.toLowerCase().includes(searchFilter)
        : true;
      const matchesLocation = locationFilter
        ? val.jobCity.toLowerCase().includes(locationFilter)
        : true;
      return matchesTitle && matchesLocation;
    });

    setItems(filteredItems);

    if (filteredItems.length > 0) {
      setReferId(filteredItems[0]._id);
    } else {
      setReferId("");
    }
  }, [searchFilter, locationFilter, setPostedJobs]);

  return (
    <div className="w-[100%] h-auto">
      <div className="w-[100%] relative">
        <div className="w-[100%] py-6 flex justify-center">
          <form className="w-auto h-auto flex justify-center items-center bg-white rounded-md pr-4 shadow-lg shadow-slate-500 max-lg:block max-lg:w-[90%] max-lg:py-2 max-lg:pr-0">
            <div className="relative max-lg:border-b border-gray-400">
              <SearchOutlined className="absolute text-[#18b1a6] text-xl top-[18px] left-5 max-md:top-[10px] max-md:text-sm" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                id="companyTitle"
                value={searchFilter}
                onChange={handleSearchFilter}
                className="w-[350px] py-4 pl-14 text-[17px] text-[#18b1a6] rounded-l-md outline-none max-lg:w-[90%] max-md:text-[12px] max-md:py-2 max-md:pl-12"
              />
            </div>
            <div className="relative max-lg:border-b border-gray-400 max-lg:mb-2">
              <EnvironmentOutlined className="absolute text-[#18b1a6] text-xl top-[18px] left-5 max-md:top-[10px] max-md:text-sm" />
              <input
                type="text"
                placeholder='City, state, or "remote"'
                id="city"
                value={locationFilter}
                onChange={handleLocationFilter}
                className="w-[350px] py-4 pl-14 text-[17px] text-[#18b1a6] rounded-r-md outline-none max-lg:w-[90%] max-md:text-[12px] max-md:py-2 max-md:pl-12"
              />
            </div>
          </form>
        </div>
        <div className="w-[100%] flex justify-center items-center flex-col gap-3 pt-4 mb-6">
          <h1 className="text-[#18b1a6] text-2xl font-semibold max-md:text-xl">
            Find Your Dream Job Today
          </h1>
          <h2 className="text-[#015f4d] text-xl max-lg:text-[16px] max-md:text-[14px] max-lg:text-center max-sm:text-[13px]">
            "Your dream job is out there. Let us help you find it with our
            advanced job search features."
          </h2>
        </div>
        <div className="flex justify-center text-2xl border-b border-gray-300 max-md:text-xl">
          <p className=" text-center w-[200px] border-b-[4px] pb-2 font-medium border-[#18b1a6] ">
            Job feed
          </p>
        </div>
        <div className="w-[100%] h-auto flex gap-5 max-lg:gap-0">
          {setPostedJobs.length > 0 ? (
            <>
              <div className="w-[100%] flex flex-col gap-2 items-end py-6 relative max-lg:items-center">
                {/* mapping div below */}
                {items.length > 0 ? (
                  items?.map((value, i) => (
                    <div
                      key={i}
                      className="w-[500px] h-auto rounded-md bg-white border-2 border-[#d4d2d0] py-6 px-6 cursor-pointer active:border-[#015f4d] focus:border-[#18b1a6] max-lg:w-[80%] max-md:w-[90%]"
                      tabindex="0"
                      onClick={() => setReferId(value?._id)}
                    >
                      <div className="h-[30px] flex items-center justify-between text-xl font-semibold overflow-hidden">
                        <h1 className="text-[#2d2d2d]cursor-pointer hover:border-b-2 border-black">
                          {value?.jobTitle}
                        </h1>
                        <button>
                          {bookmarks.some(
                            (item) => item.bookmarkId === value._id
                          ) ? (
                            <FaBookmark
                              className="cursor-pointer text-[#18b1a6]"
                              onClick={() => handleDeleteBookmark(value?._id)}
                            />
                          ) : (
                            <FaRegBookmark
                              className="cursor-pointer text-[#015f4d]"
                              onClick={() => handleBookmark(value?._id)}
                            />
                          )}
                        </button>
                      </div>
                      <div className="text-gray-700 text-[14px] py-2">
                        <h1>{value?.companyName}</h1>
                        <h2>{value?.jobCity}</h2>
                      </div>
                      <div className="text-gray-700 text-[14px] py-2">
                        <ul className="list-disc list-outside pl-6 break-words">
                          <li>{value?.companyDescription}</li>
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-[500px] h-auto rounded-md bg-white border-2 border-[#d4d2d0] py-6 px-6 flex justify-center items-center absolute left-[50%] transform -translate-x-1/2 max-lg:w-[80%] max-md:w-[90%]">
                    <h1 className="text-[#2d2d2d] text-xl font-semibold">
                      No matches found
                    </h1>
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="w-[100%] py-6 max-lg:hidden">
                  {jobs && (
                    <div className="w-[600px] h-[95vh] py-6 bg-white rounded-md border-2 border-[#d4d2d0] sticky top-0">
                      {/* header part */}
                      <div className="shadow-md shadow-slate-300 px-6 pb-6">
                        <h1 className="text-2xl font-semibold text-[#2d2d2d]">
                          {jobs?.jobTitle}
                        </h1>
                        <div className="text-gray-700 text-md py-3">
                          <span className="pb-[1px] border-b border-gray-500 cursor-pointer">
                            {jobs?.companyName} <ExportOutlined />
                          </span>
                          <h2 className="pt-2">{jobs?.jobCity}</h2>
                          <h2 className="pt-2 flex items-center">
                            <MdOutlineCurrencyRupee />
                            {jobs?.jobMinValue} - <MdOutlineCurrencyRupee />
                            {jobs?.jobMaxValue} a {jobs?.jobRate}
                          </h2>
                        </div>
                        <div className="flex gap-4">
                          {appliedFilter[0]?.jobApplied === true ? (
                            <button
                              type="button"
                              className="py-2 px-5 flex items-center gap-2 bg-[#18b1a6] text-white rounded-md font-semibold"
                              disabled
                            >
                              <IoMdCheckmarkCircleOutline className="text-lg" />
                              Applied
                            </button>
                          ) : (
                            <button
                              className="py-2 px-6 bg-[#18b1a6] text-white rounded-md font-semibold active:scale-95 duration-150 ease-in-out"
                              onClick={() =>
                                navigate("/apply", {
                                  state: {
                                    id: jobs?._id,
                                    companyName: jobs?.companyName,
                                    jobTitle: jobs?.jobTitle,
                                  },
                                })
                              }
                            >
                              Apply Now
                            </button>
                          )}
                          <button className="px-4 py-2 text-xl bg-[#f3f2f1] rounded-md">
                            {bookmarks.some(
                              (item) => item.bookmarkId === jobs._id
                            ) ? (
                              <FaBookmark
                                className="cursor-pointer text-[#18b1a6]"
                                onClick={() => handleDeleteBookmark(jobs?._id)}
                              />
                            ) : (
                              <FaRegBookmark
                                className="cursor-pointer text-[#015f4d]"
                                onClick={() => handleBookmark(jobs?._id)}
                              />
                            )}
                          </button>
                        </div>
                      </div>
                      {/* Content part */}
                      <div className="w-[100%] h-[61vh] overflow-y-scroll overscroll-x-none">
                        <div className="w-full py-6 px-6 border-b border-[#e4e2e0]">
                          <h1 className="text-xl font-semibold text-[#2d2d2d]">
                            Job details
                          </h1>
                          <div className="w-full flex flex-col gap-2">
                            <div className="w-full text-md flex items-center gap-2 pt-4 font-semibold text-[#2d2d2d]">
                              <TbBulb className="text-xl mb-1" />
                              Skills:
                            </div>
                            <ul className="list-disc list-inside pl-9 break-words text-gray-700 text-sm">
                              <li>{jobs.jobSkill}</li>
                            </ul>
                          </div>
                          <div className="w-full flex flex-col gap-3">
                            <div className="w-full text-md flex items-center gap-2 pt-4 font-semibold text-[#2d2d2d]">
                              <GiMoneyStack className="text-xl" />
                              Pay:
                            </div>
                            <div className="flex items-center pl-9 break-words text-gray-700 text-sm">
                              <GoDotFill className="text-[9px] mr-2" />
                              <MdOutlineCurrencyRupee />
                              {jobs.jobMinValue} - <MdOutlineCurrencyRupee />
                              {jobs.jobMaxValue} {jobs.jobRate}
                            </div>
                          </div>
                          <div className="w-full flex flex-col gap-3">
                            <div className="w-full text-md flex items-center gap-3 pt-4 font-semibold text-[#2d2d2d]">
                              <FaBriefcase className="text-md" />
                              Job type
                            </div>
                            <div className="flex gap-2 items-center pl-9 break-words text-gray-700 text-sm">
                              {jobs.jobType?.map((shift, i) => (
                                <h1
                                  className="px-3 py-2 bg-[#f3f2f1] rounded-md"
                                  key={i}
                                >
                                  {shift}
                                </h1>
                              ))}
                            </div>
                          </div>
                          <div className="w-full flex flex-col gap-3">
                            <div className="w-full text-md flex items-center gap-2 pt-4 font-semibold text-[#2d2d2d]">
                              <GoClockFill className="text-lg" />
                              Shift and schedule
                            </div>
                            <div className="flex gap-2 items-center pl-9 break-words text-gray-700 text-sm">
                              {jobs.jobSchedule?.map((shift, i) => (
                                <h1
                                  className="px-3 py-2 bg-[#f3f2f1] rounded-md"
                                  key={i}
                                >
                                  {shift}
                                </h1>
                              ))}
                            </div>
                          </div>
                          <div className="w-full flex flex-col gap-3">
                            <div className="w-full text-md flex items-center gap-2 pt-4 font-semibold text-[#2d2d2d]">
                              <FaLocationDot className="text-lg" />
                              Location
                            </div>
                            <div className="flex items-center pl-9 break-words text-gray-700 ">
                              {jobs?.jobStreet}, {jobs?.jobArea},{" "}
                              {jobs?.jobCity}
                            </div>
                          </div>
                        </div>
                        <div className="W-full py-6 px-6">
                          <h1 className="text-xl pb-2 font-semibold text-[#2d2d2d]">
                            Job description
                          </h1>
                          <div className="w-full break-words indent-4">
                            {jobs?.companyDescription}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="w-[100%] h-[50vh] flex flex-col gap-4 justify-center items-center">
              <div className="w-full flex justify-center">
                <img src={folder} alt="jobs" className="w-[15%]" />
              </div>
              <h1 className="text-3xl">No jobs posted still!</h1>
              <p>when the company post a job it will list here... </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
