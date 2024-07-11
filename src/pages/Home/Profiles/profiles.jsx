import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="w-[100%] h-[88vh] pt-3">
      <div className="w-[50%] h-auto m-auto px-6 py-4 bg-white max-lg:w-[80%] max-md:w-[100%]">
        {/* name container */}
        <div className="w-[100%] flex justify-between items-center">
          <div className="text-4xl font-semibold max-md:text-2xl">Name</div>
          <div className="w-[100px] h-[100px] rounded-[50%] bg-gray-400">
            <img src="#" alt="" width={"100%"} />
          </div>
        </div>
        {/* email and details */}
        <div className="w-[100%] flex justify-between items-center py-4 cursor-pointer" onClick={()=>navigate("/contact-info")}>
          <div className="flex flex-col justify-center gap-2">
            <span>
              <i class="fa-solid fa-envelope pr-3 text-[#767676]"></i>
              user@gmail.com
            </span>
            <span>
              <i class="fa-solid fa-phone pr-3 text-[#767676]"></i>987654321
            </span>
            <span>
              <i class="fa-solid fa-location-dot pr-3 text-[#767676]"></i>{" "}
              ingathaa pakkathula
            </span>
          </div>
          <div>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
        {/* resume details */}
        <div className="w-[100%] py-4 flex flex-col gap-4">
          <h1 className="text-xl font-semibold">Resume</h1>
          <input
            id="file-input"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label
            htmlFor="file-input"
            className="w-[40%] px-5 py-2 text-center text-lg text-white font-semibold rounded-md bg-[#18b1a6] active:scale-95 duration-150 cursor-pointer max-md:text-sm max-md:w-[60%]"
          >
            {selectedFile ? selectedFile.name : "Upload resume"}
          </label>
        </div>
        {/* Education and further details */}
        <div className="w-[100%] py-2">
          <h1 className="text-xl font-semibold pb-4">Improve your job matches</h1>
          {/* Qualification */}
          <div className="py-2 px-3 flex justify-between items-center border-b border-t border-gray-300 cursor-pointer hover:bg-gray-100" onClick={()=>navigate('/qualifications')}>
            <div className="flex flex-col gap-1">
              <h1 className="text-md font-semibold">Qualifications</h1>
              <p className="text-sm text-gray-500">Highlight your skills and experience</p>
            </div>
            <div>
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] flex justify-center py-2 text-sm"> &copy;2024 CareerCraze</div>
    </div>
  );
};

export default Profile;
