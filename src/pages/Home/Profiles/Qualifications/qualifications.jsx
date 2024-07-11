import React, { useState } from "react";
import {
  PlusOutlined,
  ContactsOutlined,
  FileDoneOutlined,
  LinkOutlined,
  ProfileOutlined,
  GlobalOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";

import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import ExperienceModal from "./Modals/experienceModal";
import EducationModal from "./Modals/educationModal";
import SkillModal from "./Modals/skillModal";
import LanguageModal from "./Modals/languageModal";

const Qualifications = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useState("");

  return (
    <div className="w-[100%] h-auto pt-3 relative">
      <div className="w-[50%] h-auto m-auto px-6 py-4 bg-white max-lg:w-[80%] max-md:w-[100%]">
        <div
          className="w-10 py-2 text-2xl flex justify-center rounded-md hover:bg-gray-200 hover:text-[#015f4d]"
          onClick={() => navigate("/profile")}
        >
          <FaArrowLeftLong className="cursor-pointer" />
        </div>
        <div className="w-[100%] py-2">
          <h1 className="text-3xl font-semibold pb-4">Qualifications</h1>
          <p className="text-[#a6a8a6] pb-6">
            We use these details to show you jobs that match your unique skills
            and experience.
          </p>
          {/* Qualification */}
          <div
            className="py-8 px-3 flex justify-between items-center border-t border-gray-300 cursor-pointer hover:bg-gray-100"
            onClick={() => setModal("experience")}
          >
            <div className="flex gap-5">
              <ContactsOutlined className="text-xl" />
              <h1 className="text-md font-semibold">
                Add most recent work experience
              </h1>
            </div>
            <PlusOutlined />
          </div>
          <div className="py-8 px-3 flex justify-between items-center border-t border-gray-300 cursor-pointer hover:bg-gray-100" onClick={() => setModal("education")}>
            <div className="flex gap-5">
              <FileDoneOutlined className="text-xl" />
              <h1 className="text-md font-semibold">Add education</h1>
            </div>
            <PlusOutlined />
          </div>
          <div className="py-8 px-3 flex justify-between items-center border-t border-gray-300 cursor-pointer hover:bg-gray-100" onClick={()=>setModal("skills")}>
            <div className="flex gap-5">
              <ProfileOutlined className="text-xl" />
              <h1 className="text-md font-semibold">Add skill</h1>
            </div>
            <PlusOutlined />
          </div>
          <div className="py-8 px-3 flex justify-between items-center border-b border-t border-gray-300 cursor-pointer hover:bg-gray-100" onClick={()=>setModal("languages")}>
            <div className="flex gap-5">
              <GlobalOutlined className="text-xl" />
              <h1 className="text-md font-semibold">Add languages</h1>
            </div>
            <PlusOutlined />
          </div>
        </div>
      </div>
      <div className="w-[100%] flex justify-center py-2 text-sm">
        &copy;2024 CareerCraze
      </div>
      <div className="w-[100%] bg-[#0000006a] absolute top-0">
        {modal && (
          <IoMdClose className="text-2xl absolute top-[32%] right-[31%] cursor-pointer" onClick={()=>setModal("")}/> 
        )}
        {modal === "experience" && <ExperienceModal modal={modal} />}
        {modal === "education" && <EducationModal modal={modal} />}
        {modal === "skills" && <SkillModal modal={modal} />}
        {modal === "languages" && <LanguageModal modal={modal} />}
      </div>
    </div>
  );
};

export default Qualifications;
