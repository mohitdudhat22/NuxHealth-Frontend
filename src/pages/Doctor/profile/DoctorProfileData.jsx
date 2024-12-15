import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useGlobal } from "../../../hooks/useGlobal";

const DoctorProfileData = () => {
  const { user } = useAuth();
  const { getDoctorProfile, userData } = useGlobal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hospitalName: "",
    gender: "",
    city: "",
    state: "",
    country: "",
  });
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getDoctorProfile(user.id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        hospitalName: userData.hospitalName || "",
        gender: userData.gender || "",
        city: userData.city || "",
        state: userData.state || "",
        country: userData.country || "",
      });
    }
  }, [userData]);

  return (
    <div className="content new-xxl:px-[30px] new-xl:px-[20px] new-lg:px-[15px] new-xxl:py-[20px] new-xl:py-[15px] new-lg:py-[15px] bg-white rounded-2xl">
      <div className="head flex items-center justify-between mb-6">
        <div className="title">
          <p className="new-xxl:text-[34px] new-xl:text-[30px] new-lg:text-[28px] text-[#030229] font-semibold ">Profile</p>
        </div>
        <div className="edit">
          <NavLink to={"/doctor/edit"}>
            <button className="flex items-center bg-[#0EABEB] px-[14px] py-[12px] rounded-lg">
              <FaEdit className="text-white new-xxl:text-[20px] text-white new-xl:text-[18px] text-white new-lg:text-[18px] " />
              <span className="text-white new-xxl:text-[20px] text-white new-xl:text-[18px] text-white new-lg:text-[18px]  font-semibold pl-2">
                Edit Profile
              </span>
            </button>
          </NavLink>
        </div>
      </div>
      <div className="form-box pt-5">
        <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="input-box relative w-[100%]">
            <label className="absolute top-[-14px] left-4 bg-white px-1 text-[#030229] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              Doctor Name <span className="text-red-500">*</span>
            </label>
            <input
              disabled
              type="text"
              placeholder="Enter Name"
              value={userData?.name}
              className="w-full px-4 py-3 border border-[#A7A7A7] border-[#D9D9D9] text-[#A7A7A7] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errorMessages.name && (
              <p className="text-red-500 text-sm mt-1">{errorMessages.name}</p>
            )}
          </div>
          <div className="input-box relative w-[100%]">
            <label className="absolute top-[-14px] left-4 bg-white px-1 text-[#030229] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              disabled
              type="text"
              placeholder="Email Address"
              value={userData?.email}
              className="w-full px-4 py-3 border border-[#A7A7A7] text-[#A7A7A7] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errorMessages.email && (
              <p className="text-red-500 text-sm mt-1">{errorMessages.email}</p>
            )}
          </div>
          <div className="input-box relative w-[100%]">
            <label className="absolute top-[-14px] left-4 bg-white px-1 text-[#030229] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              disabled
              type="text"
              placeholder="Phone Number"
              value={userData?.phone}
              className="w-full px-4 py-3 border border-[#A7A7A7] text-[#A7A7A7] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errorMessages.phone && (
              <p className="text-red-500 text-sm mt-1">{errorMessages.phone}</p>
            )}
          </div>
          <div className="input-box relative w-[100%]">
            <label className="absolute top-[-14px] left-4 bg-white px-1 text-[#030229] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              Hospital Name <span className="text-red-500">*</span>
            </label>
            <input
              disabled
              type="text"
              placeholder="Hospital Name"
              value={userData?.hospitalName}
              className="w-full px-4 py-3 border border-[#A7A7A7] text-[#A7A7A7] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errorMessages.hospitalName && (
              <p className="text-red-500 text-sm mt-1">
                {errorMessages.hospitalName}
              </p>
            )}
          </div>
          <div className="input-box relative w-[100%]">
            <label className="absolute top-[-14px] left-4 bg-white px-1 text-[#030229] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              Gender <span className="text-red-500">*</span>
            </label>
            <input
              disabled
              type="text"
              placeholder="Gender"
              value={userData?.gender}
              className="w-full px-4 py-3 border border-[#A7A7A7] text-[#A7A7A7] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errorMessages.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errorMessages.gender}
              </p>
            )}
          </div>
          <div className="input-box relative w-[100%]">
            <label className="absolute top-[-14px] left-4 bg-white px-1 text-[#030229] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              City <span className="text-red-500">*</span>
            </label>
            <input
              disabled
              type="text"
              placeholder="City"
              value={userData?.city}
              className="w-full px-4 py-3 border border-[#A7A7A7] text-[#A7A7A7] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errorMessages.city && (
              <p className="text-red-500 text-sm mt-1">{errorMessages.city}</p>
            )}
          </div>
          <div className="input-box relative w-[100%]">
            <label className="absolute top-[-14px] left-4 bg-white px-1 text-[#030229] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              State <span className="text-red-500">*</span>
            </label>
            <input
              disabled
              type="text"
              placeholder="State"
              value={userData?.state}
              className="w-full px-4 py-3 border border-[#A7A7A7] text-[#A7A7A7] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errorMessages.state && (
              <p className="text-red-500 text-sm mt-1">{errorMessages.state}</p>
            )}
          </div>
          <div className="input-box relative w-[100%]">
            <label className="absolute top-[-14px] left-4 bg-white px-1 text-[#030229] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              disabled
              type="text"
              placeholder="Country"
              value={userData?.country}
              className="w-full px-4 py-3 border border-[#A7A7A7] text-[#A7A7A7] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errorMessages.country && (
              <p className="text-red-500 text-sm mt-1">
                {errorMessages.country}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfileData;
