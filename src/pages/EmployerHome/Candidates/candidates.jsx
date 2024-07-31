import React, { useEffect, useState } from "react";
import smartphone from "../../../assets/smartphone-hand.png";
import { useDispatch, useSelector } from "react-redux";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa6";
import { PiArrowsCounterClockwiseBold } from "react-icons/pi";
import { RiQuestionMark } from "react-icons/ri";
import { getApplyData, putApplyData } from "../../../api";
import { toast } from "react-toastify";
import { setApplyData } from "../../../store/UserSlices/applySlice";
import { Skeleton } from "antd";
import { useNavigate } from "react-router-dom";

const Candidates = () => {
  const [candidate, setCandidate] = useState();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [userView, setUserView] = useState([]);
  const [selectOption, setSelectOption] = useState("");
  const [selectedYear, setSelectedYear] = useState("Sort by experience");
  const [selectedOption, setSelectedOption] = useState("Sort by interest");
  const [selectYear, setSelectYear] = useState("");
  const [skel, setSkel] = useState(false);

  const navigate = useNavigate();
  const jobPost = useSelector((state) => state.jobPost);
  const apply = useSelector((state) => state.apply);
  const employData = useSelector((state) => state.employData);

  const dispatch = useDispatch();

  const handleCandidateFilter = (e) => {
    setCandidate(e.target.value.toLowerCase());
  };

  const CompanyFilter = jobPost.filter(
    (data) => data.companyName === employData.employerSignCompanyName
  );

  // apply.forEach((application) => {
  //   jobPost.forEach((job) => {
  //     console.log('Comparing:', application.applyId, 'with', job._id);
  //     console.log('Comparing:', application.applyCompanyName, 'with', job.companyName);
  //   });
  // });

  const filteredApplyData = apply.filter((application) =>
    CompanyFilter.some(
      (job) =>
        application.applyId === job._id &&
        application.applyCompanyName === job.companyName
    )
  );


  useEffect(() => {
    const filteredItems = filteredApplyData.filter((val) => {
      const matchesTitle = candidate
        ? val.applyJobTitle.toLowerCase().includes(candidate)
        : true;
      const matchesSelect = selectOption
        ? val.preferred === selectOption
        : true;
      const matchesYear = selectYear
        ? val.applyExperience[0].experienceYear === selectYear
        : true;
      return matchesTitle && matchesSelect && matchesYear;
    });
    setItems((prevItems) => {
      if (JSON.stringify(prevItems) !== JSON.stringify(filteredItems)) {
        return filteredItems;
      }
      return prevItems;
    });
  }, [candidate, selectOption, filteredApplyData]);

  const handlePreferred = async (id, data) => {
    try {
      const response = await putApplyData(id, { preferred: data });
      toast.success(response.data.message);
      getDataApply();
    } catch (err) {
      console.error(err);
      toast.error("Application not updated!");
    }
  };

  const handleNotPreferred = async (id, data) => {
    try {
      const response = await putApplyData(id, { preferred: data });
      toast.success(response.data.message);
      getDataApply();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUserView = (id) => {
    const view = filteredApplyData.find((data) => {
      return data._id === id;
    });
    setUserView(view);
    setOpenView(!openView);
  };

  const getDataApply = async () => {
    try {
      const response = await getApplyData();
      dispatch(setApplyData(response.data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectOption = (a, b) => {
    setSelectOption(a);
    setSelectedOption(b);
    setOpen(!open);
  };
  const handleSelectYear = (data) => {
    if (data === "All") {
      setSelectYear("");
      setSelectedYear("All");
    } else {
      setSelectYear(data);
      setSelectedYear(data);
    }
    setOpen2(!open2);
  };


  useEffect(() => {}, [selectOption, selectYear]);

  useEffect(() => {
    setSkel(true);
    setTimeout(() => {
      setSkel(false);
    }, 1000);
  }, []);

  return (
    <div
      className={`w-[100%] h-[88vh] py-5 relative ${
        openView ? "overflow-hidden" : ""
      }`}
    >
      <h1 className="py-3 px-12 text-2xl font-semibold max-sm:px-2">
        Candidates
      </h1>
      {filteredApplyData.length > 0 ? (
        <div className="w-full h-auto px-12 py-6 max-sm:px-2">
          <div className="w-full pb-4 flex gap-4 max-lg:flex-col">
            <div className="w-[30%] relative max-lg:w-[100%]">
              <input
                type="text"
                id="filterData"
                value={candidate}
                onChange={handleCandidateFilter}
                placeholder="Filter by Job role"
                className="w-[100%] py-2 px-3 rounded-md text-[#18b1a6] border border-gray-700 outline-[#18b1a6]"
              />
              <IoFilter className="absolute text-2xl top-2 right-2 text-[#18b1a6]" />
            </div>
            <div className="w-[15%] relative max-lg:w-[100%]">
              <div
                className="w-[100%] py-2 px-3 flex justify-between items-center rounded-md text-[#18b1a6] border border-gray-700 outline-[#18b1a6] cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                {selectedOption}
                {open ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {open && (
                <div className="w-full flex flex-col absolute bg-white border border-gray-700 rounded-md transition-all ease-out duration-150 overflow-hidden z-30">
                  <h1
                    className="px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-[#abdffe]"
                    onClick={() => handleSelectOption("", "All")}
                  >
                    <PiArrowsCounterClockwiseBold className="text-[#22a4f1]" />
                    All
                  </h1>
                  <h1
                    className="px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-green-100"
                    onClick={() => handleSelectOption("true", "Preferred")}
                  >
                    <IoMdCheckmark className="text-green-600" />
                    Preferred
                  </h1>
                  <h1
                    className="px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-red-100"
                    onClick={() => handleSelectOption("false", "Not preferred")}
                  >
                    <IoMdClose className="text-red-600" />
                    Not preferred
                  </h1>
                  <h1
                    className="px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSelectOption("none", "Pending")}
                  >
                    <RiQuestionMark className="text-sm text-gray-600" />
                    Pending
                  </h1>
                </div>
              )}
            </div>
            <div className="w-[15%] relative max-lg:w-[100%]">
              <div
                className="w-[100%] py-2 px-3 flex justify-between items-center rounded-md text-[#18b1a6] border border-gray-700 outline-[#18b1a6] cursor-pointer"
                onClick={() => setOpen2(!open2)}
              >
                {selectedYear}
                {open2 ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {open2 && (
                <div className="w-full flex flex-col absolute bg-white border border-gray-700 rounded-md transition-all ease-out duration-150 overflow-hidden">
                  {["All", "Fresher", ...Array(10).keys()].map(
                    (year, index) => (
                      <h1
                        key={index}
                        className="px-6 py-1 flex items-center cursor-pointer hover:bg-gray-200"
                        onClick={() =>
                          handleSelectYear(
                            year === "All" || year === "Fresher"
                              ? year
                              : `${year + 1} year`
                          )
                        }
                      >
                        {year === "All" || year === "Fresher"
                          ? year
                          : `${year + 1} year`}
                      </h1>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-auto rounded-lg overflow-hidden flex flex-col gap-2 shadow-md shadow-slate-300">
            <div className="w-full flex justify-between bg-[#c2f1ed] px-16 py-3 font-semibold max-sm:hidden max-lg:px-6">
              <div className="w-[100%]">Candidate</div>
              <div className="w-[100%] text-center">Applied for</div>
              <div className="w-[100%] text-center">Skills</div>
              <div className="w-[100%] text-center">Experience</div>
              <div className="w-[100%] text-end">Interested</div>
            </div>
            {items?.length > 0 ? (
              items?.map((data, i) =>
                skel ? (
                  <div className="w-full px-3 py-3 rounded-md border border-[#d4d3d8]">
                    <Skeleton active />
                  </div>
                ) : (
                  <div className="w-full bg-white py-4 px-9 flex items-center justify-between shadow-md shadow-slate-300 max-lg:px-3 max-sm:flex-col">
                    <div
                      className="w-full px-3 py-2 rounded-md cursor-pointer max-sm:border-b max-sm:py-2 border-gray-400 hover:bg-[#c2f1ed] hover:text-[#015f4d] max-sm:flex justify-between items-center"
                      onClick={() => handleUserView(data._id)}
                    >
                      <div>
                        <h1 className="text-lg font-semibold">
                          {data.applyFullName}
                        </h1>
                        <h1>{data.applyEmail}</h1>
                      </div>
                      <div className="hidden max-sm:inline-block">
                        <FaChevronRight />
                      </div>
                    </div>
                    <div
                      key={i}
                      className="w-full flex justify-center font-semibold text-lg max-sm:border-b max-sm:py-2 border-gray-400 max-sm:justify-start"
                    >
                      {data.applyJobTitle}
                    </div>
                    <div
                      key={i}
                      className="w-full flex justify-center flex-wrap gap-2 max-sm:border-b max-sm:py-2 border-gray-400 max-sm:justify-start"
                    >
                      {data?.applySkills.length > 0 ? (
                        data.applySkills.map((val) => (
                          <span className="rounded-sm px-2 bg-[#f3f2f1] text-gray-700">
                            {val}
                          </span>
                        ))
                      ) : (
                        <span className="rounded-sm px-2 bg-[#f3f2f1] text-gray-700 max-sm:border-b max-sm:py-2 border-gray-400 ">
                          No skills mentioned
                        </span>
                      )}
                    </div>
                    <div className="w-full flex justify-center max-sm:border-b max-sm:py-2 border-gray-400 max-sm:justify-start">
                      <h1 className="text-lg ">
                        {data.applyExperience[0].experienceYear}
                      </h1>
                    </div>
                    <div
                      key={i}
                      className={`w-full flex justify-end max-sm:w-auto max-sm:mt-3`}
                    >
                      {data?.preferred === "none" && (
                        <div className="max-w-fit min-w-fit rounded-md border border-gray-400 flex items-center">
                          <div
                            className="flex justify-center px-3 py-2 text-xl rounded-l-md border-gray-400 text-green-600 cursor-pointer hover:bg-green-100 max-lg:px-1 max-sm:px-3"
                            onClick={() => handlePreferred(data?._id, "true")}
                          >
                            <IoMdCheckmark />
                          </div>
                          <div className="flex justify-center px-3 py-2 text-xl border-x border-gray-400 text-gray-600 cursor-not-allowed hover:bg-gray-100 max-lg:px-1 max-sm:px-3">
                            <RiQuestionMark />
                          </div>
                          <div
                            className="px-3 py-2 text-xl rounded-r-md text-red-600 cursor-pointer hover:bg-red-100 max-lg:px-1 max-sm:px-3"
                            onClick={() =>
                              handleNotPreferred(data?._id, "false")
                            }
                          >
                            <IoMdClose />
                          </div>
                        </div>
                      )}
                      {data?.preferred === "true" && (
                        <div
                          className={`flex justify-center px-3 py-2 text-xl rounded-md border border-gray-400 text-green-600 cursor-not-allowed  max-lg:px-1 max-sm:px-3`}
                        >
                          <IoMdCheckmark />
                        </div>
                      )}
                      {data?.preferred === "false" && (
                        <div className="px-3 py-2 text-xl rounded-md text-red-600 border border-gray-400 cursor-not-allowed max-lg:px-1 max-sm:px-3">
                          <IoMdClose />
                        </div>
                      )}
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="w-full h-auto px-4 py-10 flex flex-col justify-center items-center gap-5">
                <h1 className="text-2xl text-center max-md:text-sm">
                  No matches found
                </h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4 bg-white rounded-xl shadow-md shadow-slate-600">
          <div className="w-full flex justify-center items-center">
            <img src={smartphone} alt="" className="w-[250px]" />
          </div>
          <h1 className="text-3xl max-md:text-2xl">No applicants available</h1>
          <p className="w-[40%] text-center px-4 max-md:text-sm max-lg:w-[60%] max-md:w-[100%]">
            You don't have any jobs posted directly on Indeed. Post a job today
            to seamlessly view and manage your applicants here.
          </p>
        </div>
      )}
      {openView && (
        <div className="absolute h-full py-4 flex justify-center items-start top-0 bg-[#c2f1ed97] w-full overflow-hidden max-sm:h-[88vh] overflow-y-scroll">
          <div className="w-[40%] h-auto m-auto px-6 py-4 bg-white rounded-md relative max-lg:w-[80%] max-sm:h-auto max-md:w-[100%] max-sm:px-4">
            {/* name container */}
            <div className="w-[100%] flex justify-between max-sm:flex-col">
              <div className=" w-full text-4xl font-semibold max-md:text-2xl">
                {userView?.applyFullName}
                <div className="w-auto py-4 flex flex-col gap-4" onClick={()=>navigate('/pdf-view', { state: { pdf: userView?.applyResume } })}>
                  <label
                    htmlFor="file-input"
                    className=" min-w-fit max-w-fit px-4 py-1 text-center text-lg text-white font-semibold rounded-md bg-[#18b1a6] active:scale-95 duration-150 cursor-pointer max-md:text-sm max-md:w-[60%]"
                  >
                    {userView?.applyResume?.slice(13)}
                  </label>
                </div>
              </div>
              {/* email and details */}
              <div className="w-[50%] items-start py-4 cursor-pointer max-sm:w-auto">
                <div className=" w-full flex flex-col justify-center gap-2">
                  <span>
                    <i className="fa-solid fa-envelope pr-3 text-[#767676]"></i>
                    {userView?.applyEmail}
                  </span>
                  <span>
                    <i className="fa-solid fa-phone pr-3 text-[#767676]"></i>
                    {userView?.applyMobileNo}
                  </span>
                </div>
              </div>
            </div>

            {/* Education and further details */}
            <div className="w-[100%] py-2">
              {/* Qualification */}
              <>
                <div className="flex justify-between items-center pb-2 mb-4 border-b border-gray-300">
                  <h1 className="text-2xl font-semibold max-sm:text-xl">
                    Qualification
                  </h1>
                </div>
                <div className="w-full">
                  <h1 className="text-xl font-semibold max-sm:text-lg">
                    Experience
                  </h1>
                  <ul className="list-disc pl-6 pb-3 border-b border-gray-300 max-sm:pl-5">
                    {userView?.applyExperience?.map((value, i) => (
                      <li key={i}>
                        <div className="px-4 flex flex-col gap-2 text-[#767676] max-sm:px-0">
                          <div className="flex gap-3 mt-3 max-sm:gap-1">
                            {value?.experienceJobTitle &&
                              (
                                <h1 className="text-md font-semibold max-sm:text-sm">
                                  {value?.experienceJobTitle}
                                </h1>
                              ) | ""}
                            <h1 className="text-md font-medium max-sm:text-sm">
                              year of experience:{" "}
                              <span className="font-bold">
                                {value?.experienceYear}
                              </span>
                            </h1>
                          </div>
                          <div className="font-semibold max-sm:text-sm">
                            {value?.experienceCompany}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full mt-3">
                  <h1 className="text-xl font-semibold max-sm:text-lg">
                    Education
                  </h1>
                  <ul className="list-disc pl-6 pb-3 border-b border-gray-300 max-sm:pl-5">
                    {userView?.applyEducation?.map((value, i) => (
                      <li key={i}>
                        <div className="px-4 flex flex-col gap-2 text-[#767676] max-sm:px-0">
                          <div className="mt-3">
                            <h1 className="text-md font-semibold max-sm:text-sm">
                              {value?.course}
                            </h1>
                          </div>
                          <div className="font-semibold max-sm:text-sm">
                            {value?.fieldOfStudy}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full mt-3">
                  <h1 className="text-xl font-semibold max-sm:text-lg">
                    Skills
                  </h1>
                  <ul className="list-disc pl-6 pb-3 border-b border-gray-300 max-sm:pl-5">
                    {userView?.applySkills?.map((value, i) => (
                      <li key={i}>
                        <div className="px-4 flex flex-col gap-2 text-[#767676] max-sm:text-sm max-sm:px-0">
                          <div className="mt-2">
                            <h1 className="text-md font-semibold">{value}</h1>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full mt-3">
                  <h1 className="text-xl font-semibold max-sm:text-lg">
                    Languages
                  </h1>
                  <ul className="list-disc pl-6 max-sm:pl-5">
                    {userView?.applyLanguages?.map((value, i) => (
                      <li key={i}>
                        <div className="px-4 flex flex-col gap-1 text-[#767676] max-sm:px-0">
                          <div className="mt-2">
                            <h1 className="text-md font-semibold max-sm:text-sm">
                              {value}
                            </h1>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            </div>
            <div
              className="absolute top-3 right-3 text-md px-1 py-1 rounded-[50%] text-white bg-[#18b1a6] cursor-pointer"
              onClick={() => setOpenView(!openView)}
            >
              <IoMdClose />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
