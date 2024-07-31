import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import { FaCircleChevronRight } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { timeAgo } from "../../../api";

const Companies = () => {
  const [companyFilter, setCompanyFilter] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [items, setItems] = useState([]);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyView, setCompanyView] = useState([]);
  const [overJobs, setOverJobs] = useState("over");

  const companies = useSelector((state) => state.jobPost);
  console.log(companies);

  const companyViewFilter = companies.filter((val)=>{
    return val.companyName === companyView.companyName
  })

  console.log(companyViewFilter);

  const handleCompanyFilter = (e) => {
    setCompanyFilter(e.target.value.toLowerCase());
  };

  console.log(companyFilter);

  const handleCompanyView = (id) => {
    const view = filteredCompanies.find((val) => {
      return val._id === id;
    });
    setCompanyView(view);
    setCompanyOpen(!companyOpen);
  };
  console.log(companyView);

  useEffect(() => {
    const uniqueCompanies = [];
    const companyNames = new Set();

    companies.forEach((company) => {
      if (!companyNames.has(company.companyName)) {
        companyNames.add(company.companyName);
        uniqueCompanies.push(company);
      }
    });

    setFilteredCompanies(uniqueCompanies);
  }, [companies]);

  useEffect(() => {
    const filteredItems = filteredCompanies.filter((val) => {
      const matchesTitle = companyFilter
        ? val.companyName.toLowerCase().includes(companyFilter)
        : true;
      return matchesTitle;
    });
    setItems(filteredItems);
  }, [companyFilter, filteredCompanies]);

  return (
    <div className="w-[100%] h-[88vh] bg-[#f6f5fa] relative max-lg:h-auto">
      <div className="w-[90%] h-auto py-10 px-10 flex flex-col gap-4 items-start m-auto max-lg:w-[100%] max-md:px-4">
        <h1 className="text-4xl font-semibold max-md:text-2xl">
          Discover Your Dream Workplace
        </h1>
        <p className="text-lg text-gray-500 max-md:text-sm">
          Get insider access to what it's really like to work at top companies
          around the world.
        </p>
        <div className="w-[100%] flex gap-4 py-2 pb-4 max-md:block">
          <div className="w-[60%] relative max-md:w-[100%] max-md:pb-2">
            <input
              type="text"
              id="searchData"
              value={companyFilter}
              onChange={handleCompanyFilter}
              placeholder="search by company name"
              className="w-[100%] font-semibold text-[#18b1a6] py-2 px-4 pr-10 rounded-md border border-gray-500 outline-[#18b1a6] max-md:text-sm"
            />
            <SearchOutlined className="absolute text-xl top-[10px] right-3" />
          </div>
          <button className="py-2 px-4 bg-[#18b1a6] text-white font-semibold rounded-md active:scale-95 duration-100 ease-in-out max-md:text-sm max-md:w-[100%]">
            Find companies
          </button>
        </div>
        {/* companies list */}
        <div className="w-[100%] h-auto">
          <h1 className="text-2xl font-semibold pb-4 max-md:text-xl">
            Best Companies to Work For
          </h1>
          {filteredCompanies.length > 0 ? (
            <div className="max-w-fit min-w-fit h-auto grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
              {items.map((Company, i) => (
                <div
                  key={i}
                  className="w-[100%] px-3 py-4 rounded-lg bg-white shadow-lg shadow-slate-400 flex gap-3 cursor-pointer"
                  onClick={() => handleCompanyView(Company?._id)}
                >
                  <div className="flex">
                    <div className="w-[100%] flex items-center text-6xl px-2 py-2 rounded-md bg-[#c2f1ed] max-sm:text-xl">
                      <PiBuildingOfficeDuotone className="text-[#015f4d]" />
                    </div>
                  </div>
                  <div className="w-[100%] flex flex-col gap-1">
                    <h1 className="pb-1 px-2 text-md font-bold">
                      {Company?.companyName}
                    </h1>
                    <div className=" max-w-fit min-w-fit px-2 text-[12px] border border-gray-300 rounded-xl">
                      {Company?.companyIndustry}
                    </div>
                    <div className="text-[12px] px-2">{Company?.jobCity}</div>
                  </div>
                  <div className="flex justify-end items-center text-xl text-[#015f4d]">
                    <FaCircleChevronRight />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-[40vh] text-3xl font-medium flex justify-center items-center ">
              No companies have joined Our platform yet..
            </div>
          )}
        </div>
      </div>
      {companyOpen && (
        <div className="absolute top-0 w-full h-full flex items-center flex-col py-2 bg-[#f2f1ff] overflow-y-scroll overflow-x-hidden">
          <div className="w-[60%] h-[30vh] py-3 flex items-center px-10 gap-6 rounded-lg bg-white relative max-lg:w-[90%] max-sm:px-2">
            <div className=" text-[100px] border border-[#015f4d] px-2 py-1 rounded-md bg-[#c2f1ed] max-sm:text-[30px]">
              <PiBuildingOfficeDuotone className="text-[#015f4d]" />
            </div>
            <div className="font-bold flex flex-col gap-3">
              <h1 className="text-3xl text-[#121224] max-sm:text-lg">
                {companyView?.companyName.toUpperCase()}
              </h1>
              <h1 className="text-md border border-gray-500 rounded-2xl px-4 py-1 max-w-fit main-w-fit max-sm:text-[10px]">
                {companyView?.companyIndustry.toUpperCase()}
              </h1>
            </div>
            <div className="px-1 py-1 bg-[#18b1a6] text-white rounded-[50%] absolute top-3 right-3 cursor-pointer max-sm:-top-1 max-sm:-right-2" onClick={()=>setCompanyOpen(!companyOpen)}><IoMdClose /></div>
          </div>
          <div className="w-[60%] max-sm:w-[100%]">
            <div className="w-[100%] flex pt-10 justify-between">
              <div
                className={`w-[100%] text-center text-lg cursor-pointer font-semibold pb-2 border-b-4 ${
                  overJobs === "over"
                    ? "border-[#18b1a6]"
                    : "border-[#cdd3db] text-gray-500"
                }`}
                onClick={() => setOverJobs("over")}
              >
                Overview
              </div>
              <div
                className={`w-[100%] text-center text-lg cursor-pointer font-semibold pb-2 border-b-4 ${
                  overJobs === "jobs"
                    ? "border-[#18b1a6]"
                    : "border-[#cdd3db] text-gray-500"
                }`}
                onClick={() => setOverJobs("jobs")}
              >
                Jobs
              </div>
            </div>
          </div>

          {overJobs === "over" ? (
            <div className="w-[60%] py-5 px-5 max-sm:w-[100%]">
              <div className="w-[100%] bg-white rounded-xl px-5 py-6 flex flex-col gap-3 max-sm:py-1">
                <div>
                  <h1 className="text-xl font-semibold pb-1">
                    About {companyView?.companyName}
                  </h1>
                  <div className="break-words indent-4 text-sm">
                    {companyView?.companyDescription}
                  </div>
                </div>
                <div>
                <h1 className="text-xl font-semibold pb-2 ">Industry</h1>
                <div className="indent-4">{companyView?.companyIndustry}</div>
                </div>
                <div>
                <h1 className="text-xl font-semibold pb-2 ">Company size</h1>
                <div className="indent-4">{companyView?.noOfEmployers} +employers</div>
                </div>
                <div>
                <h1 className="text-xl font-semibold pb-2 ">Location</h1>
                <div className="indent-4">{companyView?.jobStreet}, {companyView?.jobArea}, {companyView?.jobCity}.</div>
                </div>
              </div>
            </div>
          ):(
            <div className="w-[60%] py-5 px-5 flex flex-col justify-center gap-3 max-sm:w-[100%] ">
                {companyViewFilter?.length > 0 && companyViewFilter?.map((value,i)=>(
                  <div
                  key={i}
                  className="w-[100%] h-auto rounded-md flex justify-between bg-white border-2 border-[#d4d2d0] py-6 px-6 cursor-pointer active:border-[#015f4d] focus:border-[#18b1a6] max-lg:flex-col"
                  tabindex="0"
                >
                  <div className="h-[30px] flex items-center justify-between text-xl font-semibold overflow-hidden">
                    <h1 className="text-[#2d2d2d]cursor-pointer">
                      {value?.jobTitle}
                    </h1>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    Posted {timeAgo(new Date(value?.timeStamp))}
                  </div>
                </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Companies;
