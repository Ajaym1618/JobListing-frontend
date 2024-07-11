import React, { useState } from "react";
import Button from "../../../components/Button";
import bookmark from "../../../assets/bookmark.png";
import tablesheet from "../../../assets/tablesheet.png";

const Saved = () => {
  const [saAp, setSaAp] = useState("saved");
  return (
    //If data is not there below will be displayed
    <div className="w-[100%] h-[88vh]">
      <div className="w-[60%] m-auto py-5 max-md:w-[80%]">
        <h1 className="text-4xl font-semibold max-md:text-2xl">My jobs</h1>
        <div className="w-[100%] flex pt-10 justify-between">
          <div
            className={`w-[100%] text-center text-lg cursor-pointer font-semibold pb-2 border-b-4 ${
              saAp === "saved"
                ? "border-[#18b1a6]"
                : "border-[#cdd3db] text-gray-500"
            }`}
            onClick={() => setSaAp("saved")}
          >
            Saved
          </div>
          <div
            className={`w-[100%] text-center text-lg cursor-pointer font-semibold pb-2 border-b-4 ${
              saAp === "applied"
                ? "border-[#18b1a6]"
                : "border-[#cdd3db] text-gray-500"
            }`}
            onClick={() => setSaAp("applied")}
          >
            Applied
          </div>
        </div>
      </div>
      {saAp === "saved" ? (
        <div className="w-[100%] h-[70%] flex flex-col gap-3 justify-center items-center">
          <img src={bookmark} alt="bookmark" width={"15%"} className="max-md:w-[50%]"/>
          <h1 className="text-2xl font-semibold">No jobs saved yet.</h1>
          <h2 className="text-sm">Jobs you save appear here</h2>
          <div>
            <Button BtName={"Find jobs"} route={"/jobs"} />
          </div>
        </div>
      ) : (
        <div className="w-[100%] h-[70%] flex flex-col gap-3 justify-center items-center">
          <img src={tablesheet} alt="bookmark" width={"15%"} className="max-md:w-[50%]"/>
          <h1 className="text-2xl font-semibold">No application yet.</h1>
          <h2 className="text-sm">Keep track of job applications here.e</h2>
          <div>
            <Button BtName={"Find jobs"} route={"/jobs"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Saved;
