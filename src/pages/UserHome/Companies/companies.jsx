import React, { useEffect, useState } from "react";
import { SearchOutlined, RightOutlined } from "@ant-design/icons";
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import { FaCircleChevronRight } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Companies = () => {
  const [companyFilter, setCompanyFilter] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [items, setItems] = useState([]);

  const companies = useSelector((state) => state.jobPost);
  console.log(companies);

  const handleCompanyFilter = (e) => {
    setCompanyFilter(e.target.value.toLowerCase())
  };

  console.log(companyFilter);

  useEffect(() => {
    const uniqueCompanies = [];
    const companyNames = new Set();

    companies.forEach(company => {
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
    <div className="w-[100%] h-auto bg-[#f6f5fa]">
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
          {filteredCompanies.length > 0 ?<div className="max-w-fit min-w-fit h-auto grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
            {items.map((Company, i) => (
              <div key={i} className="w-[100%] px-3 py-4 rounded-lg bg-white shadow-lg shadow-slate-400 flex gap-3 cursor-pointer">
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
                  <div className="text-[12px] px-2">
                  {Company?.jobCity}
                  </div>
                </div>
                <div className="flex justify-end items-center text-xl text-[#015f4d]">
                  <FaCircleChevronRight />
                </div>
              </div>
            ))}
          </div> : <div className="w-full h-[40vh] text-3xl font-medium flex justify-center items-center ">No companies have joined Our platform yet..</div>}
        </div>
      </div>
    </div>
  );
};

export default Companies;
