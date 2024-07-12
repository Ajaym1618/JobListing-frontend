import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const LanguageModal = () => {
  const [drop, setDrop] = useState(false);

  const [userLan, setUserLan] = useState({
    languages:"",
    proficiency:""
  })

  const handleUserLan = (e) =>{
    const {id, value} = e.target;
    setUserLan((prevData)=>({...prevData,[id]:value}))
  }

  console.log(userLan);

  return (
    <div className="w-[100%] h-[88vh] flex justify-center items-center">
      <div className="w-[40%] h-auto rounded-xl py-3 bg-white flex justify-center items-center flex-col gap-6 max-lg:w-[90%]">
        <div className="w-[100%] text-xl flex justify-between items-center border-b border-gray-300 px-5 pb-4">
          <h1 className="font-semibold">Add education</h1>
        </div>
        <form className="w-[80%] flex flex-wrap gap-2 flex-col">
          <div className="w-[100%] shrink flex flex-col gap-1 ">
            <label htmlFor="languages" className="block font-semibold">
              Languages<span className="text-[#f14c4c]">*</span>
            </label>
            <input
              type="text"
              id="languages"
              value={userLan.languages}
              onChange={handleUserLan}
              className="w-[100%] rounded-md py-2 shrink px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
            />
          </div>
          <div className="w-[100%] shrink flex flex-col gap-1 border-b relative">
            <label htmlFor="proficiency" className="block font-semibold">
              Proficiency<span className="text-[#f14c4c]">*</span>
            </label>
            <div
              id="proficiency"
              value={userLan.proficiency}
              onChange={handleUserLan}
              className="w-[100%] rounded-md flex justify-between items-center py-2 px-5 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              onClick={() => setDrop(!drop)}
            >
              Select
              <FaChevronDown />
            </div>
            {drop && (
              <div className="w-[100%] px-4 py-2 h-auto rounded-lg bg-white border border-gray-900 absolute top-20 left-0">
                <h1 className="cursor-pointer">Select</h1>
                <h1 className="cursor-pointer">Beginner</h1>
                <h1 className="cursor-pointer">Expert</h1>
                <h1 className="cursor-pointer">Fluent</h1>
                <h1 className="cursor-pointer">Intermediate</h1>
                <h1 className="cursor-pointer">native</h1>
              </div>
            )}
          </div>
        </form>
        <div className="w-[100%] text-md flex justify-end items-center gap-3 border-t border-gray-300 px-5 pt-4">
          <button className="px-3 py-1 rounded-md text-white  bg-[#18b1a6]">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
