import React, { useEffect, useState } from "react";
import smartphone from "../../../assets/smartphone-hand.png";
import { useSelector } from "react-redux";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoFilter } from "react-icons/io5";

const Candidates = () => {

  const [candidate,setCandidate] = useState();
  const [items, setItems] = useState([]);
  const jobPost = useSelector((state) => state.jobPost);
  const apply = useSelector((state) => state.apply);
  const employData = useSelector((state) => state.employData);

  const handleCandidateFilter = (e) => {
    setCandidate(e.target.value.toLowerCase())
  }

  const CompanyFilter = jobPost.filter(
    (data) => data.companyName === employData.employerSignCompanyName
  );

  // apply.forEach((application) => {
  //   jobPost.forEach((job) => {
  //     console.log('Comparing:', application.applyId, 'with', job._id);
  //     console.log('Comparing:', application.applyCompanyName, 'with', job.companyName);
  //   });
  // });

  const filteredApplyData = apply.filter((application) =>
    CompanyFilter.some(
      (job) =>
        application.applyId === job._id &&
        application.applyCompanyName === job.companyName
    )
  );

  console.log("Filtered Apply Data:", filteredApplyData);

  useEffect(() => {
    const filteredItems = filteredApplyData.filter((val) => {
      const matchesTitle = candidate
        ? val.applyJobTitle.toLowerCase().includes(candidate)
        : true;
      return matchesTitle;
    });
    setItems(filteredItems);
  }, [candidate, filteredApplyData]);

  return (
    <div className="w-[100%] h-[88vh] py-5 px-5">
      <h1 className="py-3 px-8 text-2xl font-semibold">Candidates</h1>
      {filteredApplyData.length > 0 ? (
        <div className="w-full px-8">
          <div className="w-full pb-4">
            <div className="w-[30%] relative max-lg:w-[100%]">
              <input
                type="text"
                id="filterData"
                value={candidate}
                onChange={handleCandidateFilter}
                placeholder="Filter and search jobs"
                className="w-[100%] py-2 px-3 rounded-md text-[#18b1a6] border border-black outline-[#18b1a6]"
              />
              <IoFilter className="absolute text-2xl top-2 right-2 text-gray-700" />
            </div>
          </div>
          <div className="w-full rounded-lg overflow-hidden flex flex-col gap-2 shadow-md shadow-slate-300">
            <div className="w-full flex justify-between bg-[#c2f1ed] px-8 py-3 font-semibold max-sm:hidden">
              <h1>Candidate</h1>
              <h1>Applied for</h1>
              <div>Skills</div>
              <div>Interested</div>
            </div>
            {items?.map((data) => (
              <div className="w-full bg-white py-4 px-9 flex items-center justify-between shadow-md shadow-slate-300">
                <div className="w-full">
                  <h1 className="text-lg font-semibold">
                    {data.applyFullName}
                  </h1>
                  <h1>{data.applyEmail}</h1>
                </div>
                <div className="w-full font-semibold text-lg">{data.applyJobTitle}</div>
                <div className="w-full flex flex-wrap gap-2">
                  {data?.applySkills.length > 0 ? (
                    data.applySkills.map((val) => (
                      <span className="rounded-sm px-2 bg-[#f3f2f1] text-gray-700">
                        {val}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-sm px-2 bg-[#f3f2f1] text-gray-700">
                      No skills mentioned
                    </span>
                  )}
                </div>
                <div className="w-[10%] flex border rounded-md border-black">
                  <div className="px-3 py-2 text-xl border-r border-black text-green-600 cursor-pointer">
                    <IoMdCheckmark />
                  </div>
                  <div className="px-3 py-2 text-xl text-red-600 cursor-pointer">
                    <IoMdClose />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-[90%] flex flex-col items-center justify-center gap-4 bg-white rounded-xl shadow-md shadow-slate-600">
          <div className="w-full flex justify-center items-center">
            <img src={smartphone} alt="" className="w-[250px]" />
          </div>
          <h1 className="text-3xl max-md:text-2xl">No applicants available</h1>
          <p className="w-[40%] text-center px-4 max-md:text-sm max-lg:w-[60%] max-md:w-[100%]">
            You don't have any jobs posted directly on Indeed. Post a job today
            to seamlessly view and manage your applicants here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Candidates;
