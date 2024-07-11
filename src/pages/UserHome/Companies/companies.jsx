import React from "react";
import { SearchOutlined, RightOutlined } from "@ant-design/icons";
import robot from "../../../assets/robot.png";

const Companies = () => {
  return (
    <div className="w-[100%] h-auto bg-[#f6f5fa]">
      <div className="w-[70%] h-auto py-10 px-10 flex flex-col gap-4 items-start m-auto max-lg:w-[100%] max-md:px-4">
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
          <div className="w-[100%] h-auto grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
            <div className="w-[100%] px-3 py-4 rounded-lg bg-white shadow-lg shadow-slate-400 flex gap-2">
              <div className="100%">
                <div className="w-[80px] h-[80px] rounded-xl">
                  <img src={robot} alt="img" width={"100%"} />
                </div>
              </div>
              <div className="w-[100%]">
                <h1 className="pb-1">Company Name</h1>
                <div className="flex flex-wrap gap-1">
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    corporate
                  </span>
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    IT consulting
                  </span>
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    education / training
                  </span>
                </div>
              </div>
              <div className=" flex justify-end items-center">
                <RightOutlined />
              </div>
            </div>

            {/* cutting divs */}
            <div className="w-[100%] px-3 py-4 rounded-lg bg-white shadow-lg shadow-slate-400 flex gap-2">
              <div className="100%">
                <div className="w-[80px] h-[80px] rounded-xl">
                  <img src={robot} alt="img" width={"100%"} />
                </div>
              </div>
              <div className="w-[100%]">
                <h1 className="pb-1">Company Name</h1>
                <div className="flex flex-wrap gap-1">
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    corporate
                  </span>
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    IT consulting
                  </span>
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    education / training
                  </span>
                </div>
              </div>
              <div className=" flex justify-end items-center">
                <RightOutlined />
              </div>
            </div>
            <div className="w-[100%] px-3 py-4 rounded-lg bg-white shadow-lg shadow-slate-400 flex gap-2">
              <div className="100%">
                <div className="w-[80px] h-[80px] rounded-xl">
                  <img src={robot} alt="img" width={"100%"} />
                </div>
              </div>
              <div className="w-[100%]">
                <h1 className="pb-1">Company Name</h1>
                <div className="flex flex-wrap gap-1">
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    corporate
                  </span>
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    IT consulting
                  </span>
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    education / training
                  </span>
                </div>
              </div>
              <div className=" flex justify-end items-center">
                <RightOutlined />
              </div>
            </div>
            <div className="w-[100%] px-3 py-4 rounded-lg bg-white shadow-lg shadow-slate-400 flex gap-2">
              <div className="100%">
                <div className="w-[80px] h-[80px] rounded-xl">
                  <img src={robot} alt="img" width={"100%"} />
                </div>
              </div>
              <div className="w-[100%]">
                <h1 className="pb-1">Company Name</h1>
                <div className="flex flex-wrap gap-1">
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    corporate
                  </span>
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    IT consulting
                  </span>
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    education / training
                  </span>
                </div>
              </div>
              <div className=" flex justify-end items-center">
                <RightOutlined />
              </div>
            </div>
            <div className="w-[100%] px-3 py-4 rounded-lg bg-white shadow-lg shadow-slate-400 flex gap-2">
              <div className="100%">
                <div className="w-[80px] h-[80px] rounded-xl">
                  <img src={robot} alt="img" width={"100%"} />
                </div>
              </div>
              <div className="w-[100%]">
                <h1 className="pb-1">Company Name</h1>
                <div className="flex flex-wrap gap-1">
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    corporate
                  </span>
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    IT consulting
                  </span>
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    education / training
                  </span>
                </div>
              </div>
              <div className=" flex justify-end items-center">
                <RightOutlined />
              </div>
            </div>
            <div className="w-[100%] px-3 py-4 rounded-lg bg-white shadow-lg shadow-slate-400 flex gap-2">
              <div className="100%">
                <div className="w-[80px] h-[80px] rounded-xl">
                  <img src={robot} alt="img" width={"100%"} />
                </div>
              </div>
              <div className="w-[100%]">
                <h1 className="pb-1">Company Name</h1>
                <div className="flex flex-wrap gap-1">
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    corporate
                  </span>
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    IT consulting
                  </span>
                  <span className=" px-1 text-[10px] border border-gray-300 rounded-xl">
                    education / training
                  </span>
                </div>
              </div>
              <div className=" flex justify-end items-center">
                <RightOutlined />
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
