import React from "react";
import Button from "../../../components/Button";
import notify from "../../../assets/robot.png"
const Notifications = () => {
  return (
    <div className="w-[100%] h-[88vh]">
      <div className="w-[100%] h-[70%] flex gap-3 flex-col justify-center items-center ">
        <img src={notify} alt="notify" width={"10%"} className="max-lg:w-[20%] max-md:w-[30%]"/>
        <h1 className="text-3xl font-semibold max-md:text-xl max-sm:text-[16px]">
          Nothing right now. Check back later!
        </h1>
        <p className="w-[35%] text-center max-lg:w-[80%] max-md:w-[90%] max-md:text-[12px]">
          This is where we'll notify you about your job applications and other
          useful information to help you with your job search.
        </p>
        <div className="w-[20%] max-md:w-[50%]">
          <Button BtName={"Find jobs"} route={"/jobs"}/>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
