import React from "react";
import notify from "../../../assets/notify.gif";

const EmployerNotifications = () => {
  return (
    <div className="w-[300px] h-[400px] bg-white border border-[#015f4d] rounded-lg px-4 py-4">
      <div className="w-full h-full flex flex-col items-center gap-3 text-[#015f4d]">
        <img src={notify} alt="" className="w-[150px]" />
        <h1 className="text-lg font-semibold">Nothing to do here right now</h1>
        <p className="text-sm text-center">
          Expect to receive more notifications as we improve your experience
        </p>
      </div>
    </div>
  );
};

export default EmployerNotifications;
