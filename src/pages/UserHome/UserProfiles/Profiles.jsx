import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";

const Profile = () => {
  const [FL, setFL] = useState("");

  const userData = useSelector((state) => state.getData);
  const qualify = useSelector((state) => state.qualify);
  const contactData = useSelector((state) => state.contactInfo);
  const navigate = useNavigate();

  const filteredContactData = contactData.filter((data) => {
    const filter = data.contactId === userData?._id;
    return filter;
  });

  const filteredQualifyData =
    qualify && Array.isArray(qualify)
      ? qualify.filter((data) => {
          return data.qualifyId === userData?._id;
        })
      : [];

  // To display in the Profile
  useEffect(() => {
    if (userData && userData.userSignFullName) {
      const names = userData.userSignFullName.split(" ");
      let initials = names[0]?.charAt(0)?.toUpperCase();
      if (names.length > 1) {
        initials += names[1]?.charAt(0)?.toUpperCase();
      }
      setFL(initials);
    }
  }, [userData]);

  return (
    <div className="w-[100%] h-[88vh] pt-3">
      <div className="w-[50%] h-auto m-auto px-6 py-4 bg-white max-lg:w-[80%] max-md:w-[100%] max-sm:px-4">
        {/* name container */}
        <div className="w-[100%] flex justify-between items-center">
          <div className="text-4xl font-semibold max-md:text-2xl">
            {userData?.userSignFullName}
          </div>
          <div className="w-[100px] h-[100px] flex justify-center items-center text-5xl font-semibold rounded-[50%] bg-[#18b1a6] text-white">
            {FL}
          </div>
        </div>
        {/* email and details */}
        <div
          className="w-[100%] flex justify-between items-center py-4 cursor-pointer"
          onClick={() => navigate("/contact-info")}
        >
          <div className=" w-full flex flex-col justify-center gap-2">
            <span>
              <i className="fa-solid fa-envelope pr-3 text-[#767676]"></i>
              {userData?.userSignEmail}
            </span>
            <span>
              <i className="fa-solid fa-phone pr-3 text-[#767676]"></i>
              {userData?.userSignMobileNo}
            </span>
            <span>
              <i className="fa-solid fa-location-dot pr-3 text-[#767676]"></i>{" "}
              {filteredContactData.length > 0
                ? `${filteredContactData[0]?.contactStreet},${filteredContactData[0]?.contactCity}, ${filteredContactData[0]?.contactCountry}`
                : "Location"}
            </span>
            <div className="w-auto py-4 flex flex-col gap-4">
              <h1 className="text-xl font-semibold">Resume</h1>
              <label
                htmlFor="file-input"
                className=" min-w-fit max-w-fit px-5 py-2 text-center text-lg text-white font-semibold rounded-md bg-[#18b1a6] active:scale-95 duration-150 cursor-pointer max-md:text-sm max-md:w-[60%]"
              >
                {filteredContactData.length > 0
                  ? filteredContactData[0]?.resume?.slice(13)
                  : "Upload resume"}
              </label>
            </div>
          </div>
          <div>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </div>
        {/* Education and further details */}
        <div className="w-[100%] py-2">
          {/* Qualification */}
          {filteredQualifyData.length > 0 ? (
            <>
              <div className="flex justify-between items-center pb-2 mb-4 border-b border-gray-300">
                <h1 className="text-2xl font-semibold max-sm:text-xl">
                  Qualification
                </h1>
                <button
                  type="button"
                  className="flex items-center gap-1 px-4 py-1 rounded-md bg-[#18b1a6] text-white font-semibold"
                  onClick={() => navigate("/qualifications")}
                >
                  <FaRegEdit className="text-lg" />
                  Edit
                </button>
              </div>
              <div className="w-full">
                <h1 className="text-xl font-semibold max-sm:text-lg">
                  Experience
                </h1>
                <ul className="list-disc pl-6 pb-3 border-b border-gray-300 max-sm:pl-5">
                  {filteredQualifyData[0]?.experience?.map((value, i) => (
                    <li key={i}>
                      <div className="px-4 flex flex-col gap-2 text-[#767676] max-sm:px-0">
                        <div className="flex gap-3 mt-3 max-sm:gap-1">
                              <h1 className="text-md font-semibold max-sm:text-sm">
                                {value?.experienceJobTitle}
                              </h1>
                          <h1 className="text-md font-medium max-sm:text-sm">
                            year of experience:{" "}
                            <span className="font-bold">
                              {value?.experienceYear}
                            </span>
                          </h1>
                        </div>
                        <div className="font-semibold max-sm:text-sm">
                          {value?.experienceCompany}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full mt-3">
                <h1 className="text-xl font-semibold max-sm:text-lg">
                  Education
                </h1>
                <ul className="list-disc pl-6 pb-3 border-b border-gray-300 max-sm:pl-5">
                  {filteredQualifyData[0]?.education?.map((value, i) => (
                    <li key={i}>
                      <div className="px-4 flex flex-col gap-2 text-[#767676] max-sm:px-0">
                        <div className="mt-3">
                          <h1 className="text-md font-semibold max-sm:text-sm">
                            {value?.course}
                          </h1>
                        </div>
                        <div className="font-semibold max-sm:text-sm">
                          {value?.fieldOfStudy}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full mt-3">
                <h1 className="text-xl font-semibold max-sm:text-lg">Skills</h1>
                <ul className="list-disc pl-6 pb-3 border-b border-gray-300 max-sm:pl-5">
                  {filteredQualifyData[0]?.skills?.map((value, i) => (
                    <li key={i}>
                      <div className="px-4 flex flex-col gap-2 text-[#767676] max-sm:text-sm max-sm:px-0">
                        <div className="mt-2">
                          <h1 className="text-md font-semibold">{value}</h1>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full mt-3">
                <h1 className="text-xl font-semibold max-sm:text-lg">
                  Languages
                </h1>
                <ul className="list-disc pl-6 max-sm:pl-5">
                  {filteredQualifyData[0]?.languages?.map((value, i) => (
                    <li key={i}>
                      <div className="px-4 flex flex-col gap-1 text-[#767676] max-sm:px-0">
                        <div className="mt-2">
                          <h1 className="text-md font-semibold max-sm:text-sm">
                            {value}
                          </h1>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div
              className="py-2 px-3 flex justify-between items-center border-b border-t border-gray-300 cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/qualifications")}
            >
              <div className="flex flex-col gap-1">
                <h1 className="text-md font-semibold">Qualifications</h1>
                <p className="text-sm text-gray-500">
                  Highlight your skills and experience
                </p>
              </div>
              <div>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-[100%] flex justify-center py-2 text-sm">
        {" "}
        &copy;2024 CareerCraze
      </div>
    </div>
  );
};

export default Profile;
