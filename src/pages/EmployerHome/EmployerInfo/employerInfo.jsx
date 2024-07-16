import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";
import {useSelector} from 'react-redux';

const EmployerInfo = () => {

  const employData = useSelector(state=>state.employData)

  return (
    <div className="w-[100%] h-[88vh] py-8 px-20 max-md:px-5">
      <div className="w-full h-auto px-3 py-3 flex flex-col gap-8 bg-white rounded-xl shadow-md shadow-slate-600">
        <div className="w-full h-auto px-5 py-5 rounded-lg border border-gray-300 text-[#595959]">
          <div className="flex items-center gap-4 ">
            <FaUserAlt className="px-2 py-1 text-4xl rounded-lg text-[#015f4d] bg-[#d8fffc]" />
            <h1 className="text-3xl font-semibold max-sm:text-2xl">Personal info</h1>
          </div>
          <div className="h-auto flex flex-col py-8">
            <div className="w-full h-auto flex pb-8 justify-between items-center border-b-2  border-gray-300 max-sm:block max-sm:pb-4">
              <h1 className="w-[50%] max-sm:pb-2">Name</h1>
              <div className="w-full flex justify-between">
                <h1 className="font-semibold">{employData?.employerSignName}</h1>
                <BiSolidPencil className="text-2xl text-[#015f4d] cursor-pointer" />
              </div>
            </div>
            <div className="w-full h-auto flex py-8 justify-between items-center border-b-2  border-gray-300 max-sm:block max-sm:pb-4">
              <h1 className="w-[50%] max-sm:pb-2">Email</h1>
              <div className="w-full flex justify-between">
                <h1 className="font-semibold">{employData?.employerSignEmail}</h1>
                <BiSolidPencil className="text-2xl text-[#015f4d] cursor-pointer" />
              </div>
            </div>
            <div className="w-full h-auto flex pt-8 justify-between items-center max-sm:block max-sm:pt-4">
              <h1 className="w-[50%] max-sm:pb-2">Phone</h1>
              <div className="w-full flex justify-between">
                <h1 className="font-semibold">{employData?.employerSignMobileNo}</h1>
                <BiSolidPencil className="text-2xl text-[#015f4d] cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto px-5 py-10 rounded-lg border border-gray-300 text-[#595959]">
          <div className="w-full flex justify-between max-sm:block">
            <h1 className="w-[50%] max-sm:pb-2">Language</h1>
            <div className="w-full flex justify-between">
              <h1>English</h1>
              <BiSolidPencil className="text-2xl text-[#015f4d] cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerInfo;
