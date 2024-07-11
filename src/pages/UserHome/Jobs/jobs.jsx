import React from "react";
import {
  SearchOutlined,
  EnvironmentOutlined,
  ExportOutlined,
} from "@ant-design/icons";
const Jobs = () => {
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
                className="w-[350px] py-4 pl-14 text-[17px] text-[#18b1a6] rounded-l-md outline-none max-lg:w-[90%] max-md:text-[12px] max-md:py-2 max-md:pl-12"
              />
            </div>
            <div className="relative max-lg:border-b border-gray-400 max-lg:mb-2">
              <EnvironmentOutlined className="absolute text-xl top-[18px] left-5 max-md:top-[10px] max-md:text-sm"/>
              <input
                type="text"
                placeholder='City, state, zip code, or "remote"'
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
            <div
              className="w-[500px] h-auto rounded-md bg-white border-2 border-[#d4d2d0] py-6 px-6 cursor-pointer active:border-[#015f4d] focus:border-[#18b1a6] max-lg:w-[80%] max-md:w-[90%]"
              tabindex="0"
            >
              <div className="h-[30px] flex items-center justify-between text-xl font-semibold overflow-hidden">
                <h1 className="text-[#2d2d2d]cursor-pointer hover:border-b-2 border-black">
                  Frontend developer
                </h1>
                <button>
                  <i className="fa-regular fa-bookmark cursor-pointer"></i>
                </button>
              </div>
              <div className="text-gray-700 text-[14px] py-2">
                <h1>Crud operations private limited</h1>
                <h2>Nagercoil, Tamilnadu</h2>
              </div>
              <div className="text-gray-700 text-[14px] py-2">
                <ul className="list-disc list-outside pl-6">
                  <li>Experience in workin on Rest API.</li>
                  <li>
                    Experience working with both relational and NoSQL dai (e.g.,
                    SQL Server, MongoDB).
                  </li>
                  <li>Experience in Node JS / React / SQL DB (or) MongoDB.</li>
                </ul>
              </div>
            </div>
          </div>
          {/* content displaying div */}
          <div className="w-[100%] py-6 max-lg:hidden">
            <div className="w-[600px] h-[110vh] py-6 bg-white rounded-md border-2 border-[#d4d2d0] sticky top-0 overflow-hidden">
              {/* headerpart */}
              <div className="shadow-md shadow-slate-300 px-6 pb-6">
                <h1 className="text-2xl font-semibold text-[#2d2d2d]">
                  Frontend developer
                </h1>
                <div className="text-gray-700 text-md py-3">
                  <span className="pb-[1px] border-b border-gray-500 cursor-pointer">
                    Crud operations private limited <ExportOutlined />
                  </span>
                  <h2 className="pt-2">Nagercoil, Tamilnadu</h2>
                  <h2 className="pt-2">&#8377;8,000 - &#8377;10,000 a month</h2>
                </div>
                <div className="flex  gap-4">
                  <button className="py-2 px-6 bg-[#18b1a6] text-white rounded-md font-semibold active:scale-95 duration-150 ease-in-out">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 text-xl bg-[#d4d2d0] rounded-md">
                    <i className="fa-regular fa-bookmark cursor-pointer"></i>
                  </button>
                </div>
              </div>
              {/* Content part */}
              <div className="w-[100%] h-[100vh] py-6 px-6 overflow-y-scroll overscroll-x-none">
                <div>
                  <h1 className="text-xl font-semibold">Profile insights</h1>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
