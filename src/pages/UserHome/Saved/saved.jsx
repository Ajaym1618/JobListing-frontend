import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import bookmark from "../../../assets/bookmark.png";
import tableSheet from "../../../assets/tablesheet.png";
import { deletedBookMark, getBookMark, InitializeApi } from "../../../api";
import { setBookData } from "../../../store/UserSlices/savedSlice";
import { useSelector, useDispatch } from "react-redux";
import { FaBookmark } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { PiBuildingOfficeDuotone } from "react-icons/pi";

const Saved = () => {
  const [saAp, setSaAp] = useState("saved");

  const userData = useSelector((state) => state.getData);

  const bookmarks = useSelector((state) => state.bookmark);
  console.log("bookmarks details", bookmarks);

  const jobPost = useSelector((state) => state.jobPost);
  console.log("postedDataSave", jobPost);

  const apply = useSelector((state) => state.apply);
  console.log(apply);

  const dispatch = useDispatch();

  const getDataBookmark = async () => {
    try {
      const response = await getBookMark();
      console.log(response.data);
      dispatch(setBookData(response.data));
    } catch (err) {
      console.error("error");
    }
  };

  const handleDeleteBookmark = async (id) => {
    try {
      const response = await deletedBookMark(id);
      console.log(response.data);
      toast.success(response.data.message);
      getDataBookmark();
    } catch (err) {
      toast.error("Failed to remove bookmark");
      console.error(err);
    }
  };

  const filteredJobs = jobPost.filter((job) => {
    return bookmarks.some((bookmark) => bookmark.bookmarkId === job._id);
  });

  const applyFilter = apply.filter((val) => {
    return (
      userData?.userSignFullName === val.applyFullName &&
      userData?.userSignEmail === val.applyEmail
    );
  });

  console.log(applyFilter);

  useEffect(() => {
    InitializeApi();
    getDataBookmark();
  }, []);

  return (
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
        <div>
          {filteredJobs.length > 0 ? (
            <div className="w-full h-auto flex flex-col gap-4 items-center">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="w-[50%] px-8 py-4 flex items-center justify-between h-full bg-white rounded-md shadow-md shadow-slate-600 cursor-pointer max-lg:w-[60%] max-md:w-[90%] max-sm:px-4"
                >
                  <div className="flex items-center gap-5 max-sm:gap-4">
                    <div className="text-6xl px-2 py-2 rounded-md bg-[#c2f1ed] max-sm:text-xl">
                      <PiBuildingOfficeDuotone className="text-[#015f4d]" />
                    </div>
                    <div>
                      <h1 className="text-xl font-semibold max-sm:text-[16px]">
                        {job.jobTitle}
                      </h1>
                      <h2 className="text-gray-700 max-sm:text-sm">
                        {job.companyName}
                      </h2>
                      <h2 className="text-gray-700 max-sm:text-sm">
                        {job.jobCity}
                      </h2>
                    </div>
                  </div>
                  <div className="cursor-pointer">
                    <FaBookmark
                      className="text-[#18b1a6] text-2xl max-sm:text-lg"
                      onClick={() => handleDeleteBookmark(job._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-[100%] h-[70%] flex flex-col gap-3 justify-center items-center">
              <img
                src={bookmark}
                alt="bookmark"
                width={"15%"}
                className="max-md:w-[50%]"
              />
              <h1 className="text-2xl font-semibold">No jobs saved yet.</h1>
              <h2 className="text-sm">Jobs you save appear here</h2>
              <div>
                <Button BtName={"Find jobs"} route={"/jobs"} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {applyFilter.length > 0 ? (
            <div className="w-full h-auto flex flex-col gap-4 items-center">
              {applyFilter.map((apply) => (
                <div
                  key={apply._id}
                  className="w-[50%] px-8 py-4 flex items-center justify-between h-full bg-white rounded-md shadow-md shadow-slate-600 cursor-pointer max-lg:w-[60%] max-md:w-[90%] max-sm:px-4"
                >
                  <div className="flex items-center gap-5 max-sm:gap-4">
                    <div className="text-6xl px-2 py-2 rounded-md bg-[#c2f1ed] max-sm:text-xl">
                      <PiBuildingOfficeDuotone className="text-[#015f4d]" />
                    </div>
                    <div>
                      <h1 className="text-xl font-semibold max-sm:text-[16px]">
                        {apply.applyJobTitle}
                      </h1>
                      <h2 className="text-gray-700 max-sm:text-sm">
                        {apply.applyCompanyName}
                      </h2>
                      <h2 className="text-gray-700 max-sm:text-sm">
                        {apply.jobCity}
                      </h2>
                    </div>
                  </div>
                  <div className="cursor-pointer flex items-center gap-2">
                    <IoMdCheckmarkCircleOutline className="text-xl text-green-600" />
                    Applied
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-[100%] h-[60vh] flex flex-col gap-3 justify-center items-center">
              <img
                src={tableSheet}
                alt="bookmark"
                width={"15%"}
                className="max-lg:w-[50%]"
              />
              <h1 className="text-2xl font-semibold">No application yet.</h1>
              <h2 className="text-sm">Keep track of job applications here</h2>
              <div>
                <Button BtName={"Find jobs"} route={"/jobs"} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Saved;

// saAp === "saved" ? (
//   <div className="w-[100%] h-[70%] flex flex-col gap-3 justify-center items-center">
//     <img
//       src={bookmark}
//       alt="bookmark"
//       width={"15%"}
//       className="max-md:w-[50%]"
//     />
//     <h1 className="text-2xl font-semibold">No jobs saved yet.</h1>
//     <h2 className="text-sm">Jobs you save appear here</h2>
//     <div>
//       <Button BtName={"Find jobs"} route={"/jobs"} />
//     </div>
//   </div>
// ) : (
//   <div className="w-[100%] h-[70%] flex flex-col gap-3 justify-center items-center">
//     <img
//       src={tablesheet}
//       alt="bookmark"
//       width={"15%"}
//       className="max-lg:w-[50%]"
//     />
//     <h1 className="text-2xl font-semibold">No application yet.</h1>
//     <h2 className="text-sm">Keep track of job applications here.e</h2>
//     <div>
//       <Button BtName={"Find jobs"} route={"/jobs"} />
//     </div>
//   </div>
