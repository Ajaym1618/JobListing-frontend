import React from "react";
import notify from "../../../assets/notify.gif";
import { useSelector } from "react-redux";

const EmployerNotifications = () => {
  const applyData = useSelector((state) => state.apply);
  const userData = useSelector((state) => state.getData);
  const appliedFilter = applyData.filter((val) => {
    return (
      userData.userSignFullName === val.applyFullName &&
      userData.userSignEmail === val.applyEmail
    );
  });

  return (
    <div className="w-[500px] h-[400px] bg-white border border-[#015f4d] rounded-lg px-4 py-4">
      {appliedFilter.length > 0 ? (
        <div className="w-full h-full flex flex-col items-center gap-3 text-[#015f4d]">
          <img src={notify} alt="" className="w-[150px]" />
          <h1 className="text-lg font-semibold">
            Nothing to do here right now
          </h1>
          <p className="text-sm text-center">
            Expect to receive more notifications as we improve your experience
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default EmployerNotifications;
