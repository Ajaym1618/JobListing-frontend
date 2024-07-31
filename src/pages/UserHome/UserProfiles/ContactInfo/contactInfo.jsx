import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { contactInfo } from "../../../../api";
import { toast } from "react-toastify";
import { setContactInfo } from "../../../../store/UserSlices/contactInfoSlice";
import { InitializeApi, contactInfoData } from "../../../../api";
import { useDispatch } from "react-redux";
import { IoMdCheckmark } from "react-icons/io";

const ContactInfo = () => {
  const [file, setFile] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.getData);
  const contactData = useSelector((state) => state.contactInfo);

  const [userContact, setUserContact] = useState({
    contactId: userData?._id,
    contactFullName: userData?.userSignFullName,
    contactEmail: userData?.userSignEmail,
    contactPhoneNo: userData?.userSignMobileNo,
    resume: "",
    contactCountry: "",
    contactStreet: "",
    contactCity: "",
    contactPincode: "",
  });

  // handling the data entered by the user
  const handleUserContact = (e) => {
    const { id, value } = e.target;
    setUserContact((prevData) => ({ ...prevData, [id]: value }));
  };


  const handleContactData = async (e) => {
    e.preventDefault();
    const isDataComplete = Object.values(userContact).every(
      (value) => value !== undefined && value !== ""
    );

    if (!isDataComplete) {
      toast.error("Please enter all the details");
      return;
    }
    try {
      const response = await contactInfo(userContact);
      toast.success(response.data.message);
      contact();
    } catch (err) {
      console.error(err);
    }
  };

  const contact = async () => {
    try {
      const response = await contactInfoData();
      dispatch(setContactInfo(response.data));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredContactData = contactData.filter((data) => {
    const filter = data.contactId === userData?._id;
    return filter;
  });

  const updateData = () => {
    setUserContact(
      filteredContactData.length
        ? filteredContactData[0]
        : {
            contactId: userData?._id,
            contactFullName: userData?.userSignFullName,
            contactEmail: userData?.userSignEmail,
            contactPhoneNo: userData?.userSignMobileNo,
            resume: "",
            contactCountry: "",
            contactStreet: "",
            contactCity: "",
            contactPincode: "",
          }
    );
  };

  useEffect(() => {
    InitializeApi();
    contact();
  }, []);

  useEffect(() => {
    if (userData?._id) {
      updateData();
    }
  }, [userData?._id]);

  useEffect(() => {
    setUserContact((prevData) => ({ ...prevData, resume: file }));
  }, [file]);


  return (
    <div className="w-[100%] h-auto pt-3">
      <div className="w-[50%] h-auto m-auto px-6 py-4 bg-white max-lg:w-[80%] max-md:w-[100%]">
        <div
          className="w-10 py-2 text-2xl flex justify-center rounded-md hover:bg-gray-200 hover:text-[#015f4d]"
          onClick={() => navigate("/profile")}
        >
          <FaArrowLeftLong className="cursor-pointer" />
        </div>
        <div className="w-[100%] py-2">
          <h1 className="text-3xl font-semibold pb-4">Contact information</h1>
        </div>
        {/* getting details */}
        <div className="py-8 px-3 flex justify-between items-center border-y border-gray-300 cursor-pointer">
          <form
            className="w-[100%]  flex flex-wrap gap-4 flex-col"
            onSubmit={handleContactData}
          >
            <div className="w-[100%] shrink flex flex-col gap-1 ">
              <label htmlFor="contactFullName" className="block font-semibold">
                Full Name<span className="text-[#f14c4c]">*</span>
              </label>
              <input
                type="text"
                id="contactFullName"
                value={userData?.userSignFullName}
                onChange={handleUserContact}
                disabled
                className="w-[100%] bg-[#c2f1ed] rounded-md py-2 shrink px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 ">
              <label htmlFor="contactEmail" className="block font-semibold">
                Email<span className="text-[#f14c4c]">*</span>
              </label>
              <input
                type="text"
                id="contactEmail"
                value={userData?.userSignEmail}
                onChange={handleUserContact}
                disabled
                className="w-[100%] bg-[#c2f1ed] rounded-md py-2 shrink px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-auto py-4 flex flex-col gap-4">
              <h1 className="text-xl font-semibold">Resume</h1>
              <input
                id="file-input"
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
              <div className="flex gap-3 items-center">
                <label
                  htmlFor="file-input"
                  className="min-w-fit max-w-fit px-5 py-2 text-center text-lg text-white font-semibold rounded-md bg-[#18b1a6] active:scale-95 duration-150 cursor-pointer max-md:text-sm max-md:w-[60%]"
                >
                  {!filteredContactData[0]?.resume ||
                  filteredContactData[0]?.resume === ""
                    ? !file.name || file.name === ""
                      ? "Upload resume"
                      : file.name
                    : filteredContactData[0]?.resume.slice(13)}
                </label>
                {file ? (
                  <IoMdCheckmark className="text-2xl text-green-500" />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
              <label htmlFor="contactPhoneNo" className="block font-semibold">
                Phone<span className="text-[#f14c4c]">*</span>
              </label>
              <input
                type="tel"
                id="contactPhoneNo"
                value={userData?.userSignMobileNo}
                onChange={handleUserContact}
                pattern="[0-9]{10}"
                maxlength="10"
                disabled
                className="w-[100%] bg-[#c2f1ed] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Location</h1>
              <p className="text-sm text-gray-500">
                This will match you with nearby jobs.
              </p>
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
              <label htmlFor="contactCountry" className="block font-semibold">
                Country
              </label>
              <input
                id="contactCountry"
                value={userContact.contactCountry}
                onChange={handleUserContact}
                className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
              <label htmlFor="contactStreet" className="block font-semibold">
                Street address
              </label>
              <input
                id="contactStreet"
                value={userContact.contactStreet}
                onChange={handleUserContact}
                className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
              <label htmlFor="contactCity" className="block font-semibold">
                City, State<span className="text-[#f14c4c]">*</span>
              </label>
              <input
                id="contactCity"
                value={userContact.contactCity}
                onChange={handleUserContact}
                className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-[100%] shrink flex flex-col gap-1 relative border-b">
              <label htmlFor="contactPincode" className="block font-semibold">
                Pincode
              </label>
              <input
                type="tel"
                id="contactPincode"
                value={userContact.contactPincode}
                onChange={handleUserContact}
                pattern="[0-9]{6}"
                maxlength="6"
                className="w-[100%] rounded-md py-2 px-3 text-md font-semibold text-[#18b1a6] outline-[#18b1a6] border border-[#191919]"
              />
            </div>
            <div className="w-full flex justify-end mt-4">
              <button
                type="submit"
                className=" w-full px-6 py-2 font-semibold text-lg bg-[#18b1a6] rounded-md text-white"
              >
                save
              </button>
            </div>
          </form>
        </div>
        <div className="w-[100%] flex justify-center py-2 text-sm">
          &copy;2024 CareerCraze
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
