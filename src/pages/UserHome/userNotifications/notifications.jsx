import React, { useEffect } from "react";
import Button from "../../../components/Button";
import notify from "../../../assets/notify.gif";
import confetti from "../../../assets/confetti2.png";
import unfortunate from "../../../assets/unfortunate3.png";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { setApplyData } from "../../../store/UserSlices/applySlice";
import { getApplyData, putNotifyApplyData } from "../../../api";

const Notifications = () => {
  const apply = useSelector((state) => state.apply);
  const userData = useSelector((state) => state.getData);
  const dispatch = useDispatch();

  const appliedFilter = apply.filter((val) => {
    return (
      userData.userSignFullName === val.applyFullName &&
      userData.userSignEmail === val.applyEmail
    );
  });

  const getApply = async () => {
    try {
      const response = await getApplyData();
      dispatch(setApplyData(response.data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotifyViewed = async (id, data) => {
    try {
      const response = await putNotifyApplyData(id, { viewed: data });
      getApply();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getApply();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getApply(); 
    }, 1000); 
    return () => clearInterval(interval);
  }, [dispatch]);

  const showDefaultMessage =
    appliedFilter.length === 0 ||
    appliedFilter.every((item) => item.preferred === "none" || item.viewed === "false");

  return (
    <div className="w-[100%] h-auto py-5 flex justify-center">
      {showDefaultMessage ? (
        <div className="w-[50%] h-[70vh] bg-white py-6 rounded-xl flex gap-3 flex-col justify-center items-center max-sm:w-[100%] max-lg:w-[80%]">
          <img
            src={notify}
            alt="notify"
            width={"20%"}
            className="max-lg:w-[20%] max-md:w-[30%]"
          />
          <h1 className="text-3xl font-semibold max-md:text-xl max-sm:text-[16px]">
            Nothing right now. Check back later!
          </h1>
          <p className="w-[80%] text-center max-lg:w-[80%] max-md:w-[90%] max-md:text-[12px]">
            This is where we'll notify you about your job applications and other
            useful information to help you with your job search.
          </p>
          <div className="w-[20%] max-md:w-[50%]">
            <Button BtName={"Find jobs"} route={"/jobs"} />
          </div>
        </div>
      ) : (
        <div className="w-[50%] rounded-lg px-5 py-5 shadow-md shadow-slate-500 max-lg:w-[90%] max-sm:w-[100%]">
          {appliedFilter.map((item, index) => (
            <div key={index} className="text-gray-700 ">
              {item.preferred !== "none" && (
                <>
                  {item.preferred === "true" && item.viewed === "true" && (
                    <div className="h-auto bg-white rounded-lg px-5 py-4 shadow-md shadow-slate-400 flex gap-2 mb-3 relative">
                      <div className="w-[200px] h-[100px] max-sm:h-[20px]">
                        <img src={confetti} alt="" className="w-[100%]" />
                      </div>
                      <div className="w-100% flex justify-center items-start flex-col">
                        <h1 className="text-xl font-semibold pb-1 max-sm:text-[16px]">
                          Congratulations from{" "}
                          <span className="font-bold text-[#18b1a6]">
                            {item?.applyCompanyName}
                          </span>
                          !
                        </h1>
                        <p className="font-semibold text-sm indent-4 px-2 leading-5 max-sm:text-[10px] max-sm:px-0">
                          You have been selected for the{" "}
                          <span className="font-bold text-[#18b1a6]">
                            {item?.applyJobTitle}
                          </span>{" "}
                          at{" "}
                          <span className="font-bold text-[#18b1a6]">
                            {item?.applyCompanyName}
                          </span>
                          . Our team will reach out to you soon with further
                          details. Thank you for your application and interest
                          in joining our team.
                        </p>
                      </div>
                      <div
                        className="text-lg absolute top-3 right-3 px-1 py-1 rounded-[50%] hover:bg-[#18b1a6] hover:text-white cursor-pointer"
                        onClick={() => handleNotifyViewed(item?._id, "false")}
                      >
                        <IoMdClose />
                      </div>
                    </div>
                  )}
                  {item.preferred === "false" && item.viewed === "true" && (
                    <div className="h-auto bg-white rounded-lg px-5 py-4 shadow-md shadow-slate-400 flex gap-2 relative">
                      <div className="w-[200px] h-[100px] flex items-center max-sm:items-start max-sm:pt-2">
                        <img src={unfortunate} alt="" className="w-[90%]" />
                      </div>
                      <div className="w-100% flex justify-center items-start flex-col">
                        <h1 className="text-xl font-semibold pb-1 max-sm:text-[16px]">
                          We're Sorry from{" "}
                          <span className="font-bold text-red-400">
                            {item?.applyCompanyName}
                          </span>
                          !
                        </h1>
                        <p className="font-semibold text-sm indent-4 px-2 leading-5 max-sm:text-[10px]">
                          Unfortunately, you were not selected for the{" "}
                          <span className="font-bold text-red-400">
                            {item?.applyJobTitle}
                          </span>{" "}
                          at{" "}
                          <span className="font-bold text-red-400">
                            {item?.applyCompanyName}
                          </span>
                          . We appreciate your interest and encourage you to
                          consider future openings with us. Thank you for your
                          application.
                        </p>
                      </div>
                      <div
                        className="text-lg absolute top-3 right-3 px-1 py-1 rounded-[50%] hover:bg-[#18b1a6] hover:text-white cursor-pointer"
                        onClick={() => handleNotifyViewed(item?._id, "false")}
                      >
                        <IoMdClose />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
