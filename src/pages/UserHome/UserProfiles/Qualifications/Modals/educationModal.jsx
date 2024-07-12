import React, { useState } from "react";

const EducationModal = () => {

  const [userEdu, setUserEdu] = useState({
    educationLevel:"",
    educationField:""
  })

  const handleUserEdu = (e) =>{
    const {id, value} = e.target;
    setUserEdu((prevData)=>({...prevData,[id]:value}))
  }

  console.log(userEdu);
 
  return (
    <div className="w-[100%] h-[88vh] flex justify-center items-center">
      <div className="w-[40%] h-auto rounded-xl py-3 bg-white flex justify-center items-center flex-col gap-6 max-lg:w-[90%]">
        <div className="w-[100%] text-xl flex justify-between items-center border-b border-gray-300 px-5 pb-4">
          <h1 className="font-semibold">Add education</h1>
        </div>
        <form className="w-[80%] flex flex-wrap gap-2 flex-col">
          <div className="w-[100%] shrink flex flex-col gap-1 ">
            <label htmlFor="educationLevel" className="block font-semibold">
              Level of education<span className="text-[#f14c4c]">*</span>
            </label>
            <input
              type="text"
              id="educationLevel"
              value={userEdu.educationLevel}
              onChange={handleUserEdu}
              className="w-[100%] rounded-md py-2 shrink px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
            />
          </div>
          <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
            <label htmlFor="educationField" className="block font-semibold">
              Field of study
            </label>
            <input
              id="educationField"
              value={userEdu.educationField}
              onChange={handleUserEdu}
              className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
            />
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

export default EducationModal;
