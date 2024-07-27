import React, { useEffect, useState } from "react";
import {
  PlusOutlined,
  ContactsOutlined,
  FileDoneOutlined,
  ProfileOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { qualifyGetData, qualifyInfo } from "../../../../api";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setQualifyData } from "../../../../store/UserSlices/qualificationSlice";

const Qualifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modal, setModal] = useState("");
  const userData = useSelector((state) => state.getData);
  const qualify = useSelector((state) => state.qualify);
  console.log("q", qualify);

  const filteredQualify = (Array.isArray(qualify) ? qualify : [])?.filter(
    (val) => {
      const filter = val.qualifyId === userData?._id;
      return filter;
    }
  );
  console.log(filteredQualify);

  // state for all

  const [experience, setExperience] = useState([
    {
      experienceJobTitle: "",
      experienceCompany: "",
      experienceYear: "Fresher",
    },
  ]);
  console.log(experience);

  const [education, setEducation] = useState([
    {
      course: "",
      fieldOfStudy: "",
    },
  ]);

  const [skills, setSkills] = useState([""]);

  const [languages, setLanguages] = useState([""]);

  const qualifications = {
    qualifyId: userData?._id,
    experience,
    education,
    skills,
    languages,
  };

  console.log(qualifications);

  // onChange functions
  const handleExperienceChange = (e, index) => {
    const { id, value } = e.target;
    setExperience((prevExperiences) => {
      const updatedExperiences = [...prevExperiences];
      updatedExperiences[index] = { ...updatedExperiences[index], [id]: value };
      return updatedExperiences;
    });
  };
  const handleEducationChange = (e, index) => {
    const { id, value } = e.target;
    setEducation((prevList) =>
      prevList.map((edu, i) => (i === index ? { ...edu, [id]: value } : edu))
    );
  };
  const handleSkillsChange = (e, index) => {
    const { value } = e.target;
    setSkills((prevSkills) =>
      prevSkills.map((skill, i) => (i === index ? value : skill))
    );
  };
  const handleLanguageChange = (e, index) => {
    const { value } = e.target;
    setLanguages((prevLanguages) =>
      prevLanguages.map((language, i) => (i === index ? value : language))
    );
  };

  // Adding functions

  const handleAddExperience = () => {
    setExperience((prevExperiences) => [
      ...prevExperiences,
      {
        experienceJobTitle: "",
        experienceCompany: "",
        experienceYear: "Fresher",
      },
    ]);
    console.log("success");
  };

  const handleAddEducation = () => {
    setEducation((prevEducation) => [
      ...prevEducation,
      {
        course: "",
        fieldOfStudy: "",
      },
    ]);
    console.log("success");
  };

  const handleAddSkill = () => {
    setSkills((prevSkills) => [...prevSkills, ""]);
  };

  const handleAddLanguage = () => {
    setLanguages((prevLanguages) => [...prevLanguages, ""]);
  };

  // delete function
  const handleExperienceDelete = (index) => {
    setExperience((prevList) => prevList.filter((_, i) => i !== index));
  };
  const handleEducationDelete = (index) => {
    setEducation((prevList) => prevList.filter((_, i) => i !== index));
  };
  const handleSkillsDelete = (index) => {
    setSkills((prevList) => prevList.filter((_, i) => i !== index));
  };
  const handleLanguageDelete = (index) => {
    setLanguages((prevList) => prevList.filter((_, i) => i !== index));
  };

  const handleSubmitQualify = async (e) => {
    e.preventDefault();
    try {
      const response = await qualifyInfo(qualifications);
      console.log(response.data.message);
      toast.success(response.data.message);
      Qualification();
    } catch (err) {
      console.error(err);
    }
  };

  const getQualify = async () => {
    try {
      if (filteredQualify && Array.isArray(filteredQualify[0].experience)) {
        setExperience(
          filteredQualify[0].experience
            ? filteredQualify[0].experience
            : [
                {
                  experienceJobTitle: "",
                  experienceCompany: "",
                },
              ]
        );
        console.log(filteredQualify[0].experience);
      }
      if (filteredQualify && Array.isArray(filteredQualify[0].education)) {
        setEducation(
          filteredQualify[0].education
            ? filteredQualify[0].education
            : [
                {
                  course: "",
                  fieldOfStudy: "",
                },
              ]
        );
        console.log(filteredQualify[0].education);
      }
      if (filteredQualify && Array.isArray(filteredQualify[0].skills)) {
        setSkills(filteredQualify[0].skills ? filteredQualify[0].skills : [""]);
        console.log(filteredQualify[0].skills);
      }
      if (filteredQualify && Array.isArray(filteredQualify[0].languages)) {
        setLanguages(
          filteredQualify[0].languages ? filteredQualify[0].languages : [""]
        );
        console.log(filteredQualify[0].languages);
      }
    } catch (err) {
      console.error("get experience", err);
    }
  };

  const Qualification = async () => {
    try {
      const response = await qualifyGetData();
      dispatch(setQualifyData(response.data));
      console.log("qua", qualify);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userData?._id) {
      getQualify();
    }
  }, [userData?._id]);

  return (
    <div className="w-[100%] h-auto pt-3 relative">
      <div className="w-[50%] h-auto m-auto px-6 py-4 max-lg:w-[80%] max-md:w-[100%]">
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
          <form onSubmit={handleSubmitQualify}>
            <div
              className="py-8 px-3 flex flex-col justify-between items-center border-t border-gray-300 cursor-pointer hover:bg-gray-100"
              onClick={() => setModal("experience")}
            >
              <div className="w-full flex justify-between gap-5">
                <div className="flex gap-6">
                  <ContactsOutlined className="text-xl" />
                  <h1 className="text-md font-semibold">
                    Add most recent work experience
                  </h1>
                </div>
                {modal === "experience" ? (
                  <PlusOutlined onClick={handleAddExperience} />
                ) : (
                  <PlusOutlined />
                )}
              </div>
              {modal === "experience" && (
                <div className="w-[100%] h-auto rounded-xl pt-6 py-3 flex justify-center items-center flex-col gap-6 max-lg:w-[90%] max-sm:w-[100%]">
                  {experience?.map((e, index) => (
                    <div
                      key={index}
                      className="w-[80%] flex items-center gap-3 max-sm:w-[100%] px-6 py-5 rounded-xl bg-white"
                    >
                      <div className="w-full flex flex-wrap gap-2 flex-col">
                      <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
                          <label
                            htmlFor="experienceYear"
                            className="block font-semibold"
                          >
                            Year {experience.length > 1 ? index + 1 : ""}
                          </label>
                          <select
                            id="experienceYear"
                            value={e.experienceYear}
                            onChange={(e) => handleExperienceChange(e, index)}
                            className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
                          >
                            <option value="Fresher" defaultChecked>
                              Fresher
                            </option>
                            <option value="1 year">1 year</option>
                            <option value="2 year">2 year</option>
                            <option value="3 year">3 year</option>
                            <option value="4 year">4 year</option>
                            <option value="5 year">5 year</option>
                            <option value="6 year">6 year</option>
                            <option value="7 year">7 year</option>
                            <option value="8 year">8 year</option>
                            <option value="9 year">9 year</option>
                            <option value="10 year">10 year</option>
                          </select>
                        </div>
                        <div className="w-[100%] shrink flex flex-col gap-1">
                          <label
                            htmlFor="experienceJobTitle"
                            className="block font-semibold"
                          >
                            Job title {experience.length > 1 ? index + 1 : ""}
                            <span className="text-[#f14c4c]">*</span>
                          </label>
                          <input
                            type="text"
                            id="experienceJobTitle"
                            value={e.experienceJobTitle}
                            onChange={(e) => handleExperienceChange(e, index)}
                            placeholder="Not required if 'Fresher'"
                            className="w-[100%] rounded-md py-2 shrink px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919] disabled:bg-gray-200 disabled:cursor-not-allowed"
                            disabled={e.experienceYear === "Fresher"}
                          />
                        </div>
                        <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
                          <label
                            htmlFor="experienceCompany"
                            className="block font-semibold"
                          >
                            Company {experience.length > 1 ? index + 1 : ""}
                          </label>
                          <input
                            id="experienceCompany"
                            value={e.experienceCompany}
                            onChange={(e) => handleExperienceChange(e, index)}
                            placeholder="Not required if 'Fresher'"
                            className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919] disabled:bg-gray-200 disabled:cursor-not-allowed"
                            disabled={e.experienceYear === "Fresher"}
                          />
                        </div>
                      </div>
                      {experience.length > 1 && (
                        <button
                          type="button"
                          className="px-2 py-2 mt-7 bg-red-500 text-white rounded-md"
                          onClick={() => handleExperienceDelete(index)}
                        >
                          <RiDeleteBin6Line className="text-xl" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              className="py-8 px-3 flex flex-col justify-between items-center border-t border-gray-300 cursor-pointer hover:bg-gray-100"
              onClick={() => setModal("educations")}
            >
              <div className="w-full flex justify-between gap-5">
                <div className="flex gap-6">
                  <FileDoneOutlined className="text-xl" />
                  <h1 className="text-md font-semibold">Add education</h1>
                </div>
                {modal === "educations" ? (
                  <PlusOutlined onClick={handleAddEducation} />
                ) : (
                  <PlusOutlined />
                )}
              </div>
              {modal === "educations" && (
                <div className="w-[100%] h-auto rounded-xl pt-6 py-3 flex justify-center items-center flex-col gap-6 max-lg:w-[90%] max-sm:w-[100%]">
                  {education?.map((e, index) => (
                    <div
                      key={index}
                      className="w-[80%] flex items-center gap-3 max-sm:w-[100%] px-6 py-5 rounded-xl bg-white"
                    >
                      <div className="w-full flex flex-wrap gap-2 flex-col">
                        <div className="w-[100%] shrink flex flex-col gap-1 ">
                          <label
                            htmlFor="course"
                            className="block font-semibold"
                          >
                            Course name {education.length > 1 ? index + 1 : ""}
                            <span className="text-[#f14c4c]">*</span>
                          </label>
                          <input
                            type="text"
                            id="course"
                            value={e.course}
                            onChange={(e) => handleEducationChange(e, index)}
                            className="w-[100%] rounded-md py-2 shrink px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
                          />
                        </div>
                        <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
                          <label
                            htmlFor="fieldOfStudy"
                            className="block font-semibold"
                          >
                            Field of study{" "}
                            {education.length > 1 ? index + 1 : ""}
                          </label>
                          <input
                            id="fieldOfStudy"
                            value={e.fieldOfStudy}
                            onChange={(e) => handleEducationChange(e, index)}
                            className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
                          />
                        </div>
                      </div>
                      {education.length > 1 && (
                        <button
                          type="button"
                          className="px-2 py-2 mt-7 bg-red-500 text-white rounded-md"
                          onClick={() => handleEducationDelete(index)}
                        >
                          <RiDeleteBin6Line className="text-xl" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              className="py-8 px-3 flex flex-col justify-between items-center border-t border-gray-300 cursor-pointer hover:bg-gray-100"
              onClick={() => setModal("skills")}
            >
              <div className="w-full flex justify-between gap-5">
                <div className="flex gap-6">
                  <ProfileOutlined className="text-xl" />
                  <h1 className="text-md font-semibold">Add skill</h1>
                </div>
                {modal === "skills" ? (
                  <PlusOutlined onClick={handleAddSkill} />
                ) : (
                  <PlusOutlined />
                )}
              </div>
              {modal === "skills" && (
                <div className="w-[100%] h-auto rounded-xl pt-6 py-3 flex justify-center items-center flex-col gap-6 max-lg:w-[90%] max-sm:w-[100%] ">
                  {skills?.map((skill, index) => (
                    <div
                      key={index}
                      className="w-[80%] flex flex-wrap gap-2 flex-col max-sm:w-full px-6 py-5 rounded-xl bg-white"
                    >
                      <div className="w-[100%] shrink flex flex-col gap-1 ">
                        <label htmlFor="skills" className="block font-semibold">
                          Skill {skills.length > 1 ? index + 1 : ""}
                          <span className="text-[#f14c4c]">*</span>
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="text"
                            id="skills"
                            value={skill}
                            onChange={(e) => handleSkillsChange(e, index)}
                            className="w-[100%] rounded-md py-2 shrink px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
                          />
                          {skills.length > 1 && (
                            <button
                              type="button"
                              className="px-2 py-2 bg-red-500 text-white rounded-md"
                              onClick={() => handleSkillsDelete(index)}
                            >
                              <RiDeleteBin6Line className="text-xl" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              className="py-8 px-3 flex flex-col justify-between items-center border-b border-t border-gray-300 cursor-pointer hover:bg-gray-100"
              onClick={() => setModal("languages")}
            >
              <div className="w-full flex justify-between gap-5">
                <div className="flex gap-6">
                  <GlobalOutlined className="text-xl" />
                  <h1 className="text-md font-semibold">Add languages</h1>
                </div>
                {modal === "languages" ? (
                  <PlusOutlined onClick={handleAddLanguage} />
                ) : (
                  <PlusOutlined />
                )}
              </div>
              {modal === "languages" && (
                <div className="w-[100%] h-auto rounded-xl pt-6 py-3 flex justify-center items-center flex-col gap-6 max-lg:w-[90%] max-sm:w-[100%]">
                  {languages?.map((language, index) => (
                    <div
                      key={index}
                      className="w-[80%] flex flex-wrap gap-2 flex-col max-sm:w-full px-6 py-5 rounded-xl bg-white"
                    >
                      <div className="w-[100%] shrink flex flex-col gap-1 ">
                        <label
                          htmlFor="languages"
                          className="block font-semibold"
                        >
                          Language {languages.length > 1 ? index + 1 : ""}
                          <span className="text-[#f14c4c]">*</span>
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="text"
                            id="languages"
                            value={language}
                            onChange={(e) => handleLanguageChange(e, index)}
                            className="w-[100%] rounded-md py-2 shrink px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
                          />
                          {languages.length > 1 && (
                            <button
                              type="button"
                              className="px-2 py-2 bg-red-500 text-white rounded-md"
                              onClick={() => handleLanguageDelete(index)}
                            >
                              <RiDeleteBin6Line className="text-xl" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {modal && (
              <div className="w-full flex justify-end pt-6">
                <button
                  type="submit"
                  className="py-2 px-8 rounded-md bg-[#18b1a6] text-white"
                >
                  Save
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="w-[100%] flex justify-center py-2 text-sm">
        &copy;2024 CareerCraze
      </div>
    </div>
  );
};

export default Qualifications;
