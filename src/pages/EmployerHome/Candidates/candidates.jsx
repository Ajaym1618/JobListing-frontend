import React from "react";
import smartphone from "../../../assets/smartphone-hand.png";

const Candidates = () => {
  return (
    <div className="w-[100%] h-[88vh] py-5 px-5">
      <h1 className="py-3 px-2 text-2xl font-semibold">Candidates</h1>
      <div className="w-full h-[90%] flex flex-col items-center justify-center gap-4 bg-white rounded-xl shadow-xl shadow-slate-600">
        <div className="w-full flex justify-center items-center">
          <img src={smartphone} alt="" className="w-[250px]" />
        </div>
        <h1 className="text-3xl max-md:text-2xl">No applicants available</h1>
        <p className="w-[40%] text-center px-4 max-md:text-sm max-lg:w-[60%] max-md:w-[100%]">
          You don't have any jobs posted directly on Indeed. Post a job today to
          seamlessly view and manage your applicants here.
        </p>
      </div>
    </div>
  );
};

export default Candidates;
