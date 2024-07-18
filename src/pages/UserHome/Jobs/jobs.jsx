import React, { useEffect, useState } from "react";
import {
  SearchOutlined,
  EnvironmentOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { bookmark, getJobData, getBookMark, InitializeApi, deletedBookMark } from "../../../api";
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
import {
  setBookData,
  addSaved,
  removeSaved,
} from "../../../store/UserSlices/savedSlice";
import { toast } from "react-toastify";

const Jobs = () => {
  //state for handling search
  const [searchFilter, setSearchFilter] = useState({
    companyTitle: "",
    city: "",
  });

  // get the data from the employer posted jobs
  const setPostedJobs = useSelector((state) => state.jobPost);
  // setting the referId for the secondary div which display the info
  const [referId, setReferId] = useState("");
  console.log(referId);

  const saved = useSelector((state) => state.saved);
  const dispatch = useDispatch();

  // finding the one match the id
  const jobs = setPostedJobs.find((value) => value?._id === referId);
  console.log(jobs);

  // handling filter data
  const handleSearchFilter = (e) => {
    const { id, value } = e.target;
    setSearchFilter((prevData) => ({ ...prevData, [id]: value }));
  };

  //log for checking
  console.log(searchFilter);

  console.log(setPostedJobs);

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
      getsData()
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBookmark = async(id) =>{
    try{
      const response = await deletedBookMark(id)
      console.log(response.data);
      toast.success(response.data.message);
      getsData();
    }catch(err){
      toast.error("Failed to remove bookmark")
      console.error(err);
    }
  }

  useEffect(() => {
    if (setPostedJobs.length > 0 && !referId) {
      setReferId(setPostedJobs[0]?._id);
    }
  }, [setPostedJobs, referId]);

  const bookmarks = useSelector((state) => state.bookmark);
  console.log(bookmarks);

  const getsData = async () => {
    try {
      const response = await getBookMark();
      console.log(response.data);
      dispatch(setBookData(response.data));
    } catch (err) {
      console.error("error");
    }
  };

  useEffect(() => {
    InitializeApi();
    getData();
    getsData();
  }, []);


  return (
    <div className="w-[100%] h-auto">
      <div className="w-[100%]">
        <div className="w-[100%] py-6 flex justify-center">
          <form className="w-auto h-auto flex justify-center items-center bg-white rounded-md pr-4 shadow-lg shadow-slate-500 max-lg:block max-lg:w-[90%] max-lg:py-2 max-lg:pr-0">
            <div className="relative max-lg:border-b border-gray-400">
              <SearchOutlined className="absolute text-xl top-[18px] left-5 max-md:top-[10px] max-md:text-sm" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                id="companyTitle"
                value={searchFilter.companyTitle}
                onChange={handleSearchFilter}
                className="w-[350px] py-4 pl-14 text-[17px] text-[#18b1a6] rounded-l-md outline-none max-lg:w-[90%] max-md:text-[12px] max-md:py-2 max-md:pl-12"
              />
            </div>
            <div className="relative max-lg:border-b border-gray-400 max-lg:mb-2">
              <EnvironmentOutlined className="absolute text-xl top-[18px] left-5 max-md:top-[10px] max-md:text-sm" />
              <input
                type="text"
                placeholder='City, state, zip code, or "remote"'
                id="city"
                value={searchFilter.city}
                onChange={handleSearchFilter}
                className="w-[350px] py-4 pl-14 text-[17px] text-[#18b1a6] rounded-r-md outline-none max-lg:w-[90%] max-md:text-[12px] max-md:py-2 max-md:pl-12"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 ml-4 text-lg text-white font-semibold rounded-md bg-[#18b1a6] active:scale-95 duration-150 max-lg:w-[95%] max-lg:ml-4 max-md:ml-2 max-md:py-1 max-md:px-3"
            >
              search
            </button>
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
          <div className="w-[100%] flex flex-col gap-2 items-end py-6 max-lg:items-center">
            {/* mapping div below */}
            {setPostedJobs?.map((value, i) => (
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
                    {bookmarks.some((item) => item.bookmarkId === value._id) ? (
                      <FaBookmark className="cursor-pointer text-[#18b1a6]" onClick={()=>handleDeleteBookmark(value?._id)}/>
                    ) : (
                      <FaRegBookmark
                        className="cursor-pointer text-[#015f4d]"
                        onClick={() =>handleBookmark(value?._id)}
                      />
                    )}
                  </button>
                </div>
                <div className="text-gray-700 text-[14px] py-2">
                  <h1>{value?.companyName}</h1>
                  <h2>{value?.jobCity}</h2>
                </div>
                <div className="text-gray-700 text-[14px] py-2">
                  {/* <ul className="list-disc list-outside pl-6">
                    <li>Experience in workin on Rest API.</li>
                    <li>
                      Experience working with both relational and NoSQL dai
                      (e.g., SQL Server, MongoDB).
                    </li>
                    <li>
                      Experience in Node JS / React / SQL DB (or) MongoDB.
                    </li>
                  </ul> */}
                  <ul className="list-disc list-outside pl-6 break-words">
                    <li>{value?.companyDescription}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {/* content displaying div */}
          <div className="w-[100%] py-6 max-lg:hidden">
            {jobs && (
              <div className="w-[600px] h-[125vh] py-6 bg-white rounded-md border-2 border-[#d4d2d0] sticky top-0 overflow-hidden">
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
                    <button className="py-2 px-6 bg-[#18b1a6] text-white rounded-md font-semibold active:scale-95 duration-150 ease-in-out">
                      Apply Now
                    </button>
                    <button className="px-4 py-2 text-xl bg-[#d4d2d0] rounded-md">
                      <i className="fa-regular fa-bookmark cursor-pointer"></i>
                    </button>
                  </div>
                </div>
                {/* Content part */}
                <div className="w-[100%] h-[90vh] overflow-y-scroll overscroll-x-none">
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
                        {jobs?.jobStreet}, {jobs?.jobArea}, {jobs?.jobCity}
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
        </div>
      </div>
    </div>
  );
};

export default Jobs;
