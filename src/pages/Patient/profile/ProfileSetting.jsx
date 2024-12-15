import { useState, useEffect } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { useGlobal } from "../../../hooks/useGlobal";
import { useAuth } from "../../../hooks/useAuth";

const ProfileSetting = () => {
  const { user } = useAuth();
  const { userData, editPatientProfile } = useGlobal();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    age: "",
    height: "",
    weight: "",
    bloodGroup: "",
    country: "",
    state: "",
    city: "",
    address: "",
    profilePic: null,
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        gender: userData.gender || "",
        dob: userData.dob
          ? new Date(userData.dob).toISOString().substring(0, 10)
          : "",
        age: userData.age || "",
        height: userData.height || "",
        weight: userData.weight || "",
        bloodGroup: userData.bloodGroup || "",
        country: userData.country || "",
        state: userData.state || "",
        city: userData.city || "",
        address: userData.address || "",
        profilePic: null,
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "profilePic") {
      setFormData((prevData) => ({
        ...prevData,
        profilePic: files[0] || null,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formToSubmit = new FormData();
    for (const key in formData) {
      formToSubmit.append(key, formData[key]);
    }
    await editPatientProfile(user?.id, formToSubmit);
  };

  return (
    <div className="bg-gray-100 w-full h-[100vh]">
      <div className="py-5 bg-[#4C49ED] text-[44px] h-[296px] font-bold">
        <div className="container mx-auto w-[90%] new-xxl:w-[80%]">
          <h1 className="new-xxl:text-[44px] new-xl:text-[40px] new-lg:text-[36px] new-sm:text-[32px] text-[25px] font-bold text-white">Profile Setting </h1>
        </div>
      </div>

      <div className="mt-[-60%] new-xxl:mt-[-10%] new-xl:mt-[-16%] new-lg:mt-[-19%] new-sm:mt-[-35%]  container mx-auto py-5 bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-[90%] new-xxl:w-[80%]">
        {/* Section 1 */}
        <div className="w-full md:w-[20%] new-xxl:p-5 new-xl:p-3 border-b md:border-b-0 md:border-r border-gray-300 flex flex-col items-center">
          <img
            src={userData?.avatar || "/image/Ellipse 1101.png"}
            alt="Profile"
            className="new-xll:mx-auto new-xxl:w-[160px] new-xl:w-[140px] new-lg:w-[120px] new-sm:w-[170px] w-[150px] rounded-full mx-auto"
          />
          <label
            htmlFor="profilePic"
            className="cursor-pointer flex items-center px-3 py-2 bg-slate-100 rounded-lg text-gray-600 mt-4 md:w-[30%] new-lg:w-[80%] new-xxl:w-[80%]  new-xxl:text-[18px] new-xl:text-[14px] new-lg:text-[14px] font-semibold text-[#4F4F4F]"
          >
            <UserIcon className="w-5 h-4  new-xxl:h-5 new-xxl:w-5 new-xl:h-4 new-xl:w-4 new-lg:h-4 new-lg:w-4  mr-2" />
            Change Profile
          </label>
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </div>

        {/* Section 2 */}
        <div className="w-full md:w-[80%] new-xxl:w-[77%] new-xl:w-[75%] new-lg:w-[73%] p-6">
          <h2 className=" new-xxl:text-[44px] new-xl:text-[40px] new-lg:text-[36px] new-sm:text-[32px] text-[25px] font-bold pb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
              {/* Name */}
              <div className="col-span-3 sm:col-span-1 relative">
                <label
                  htmlFor="firstName"
                  className="absolute top-[-12px] left-[14px] bg-white text-[#030229] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px]"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="w-full py-[12px] px-[14px] border-[1px] border-[#A7A7A7] rounded-[10px] focus:border-[#718ebf] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal text-[#141414]"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter Name"
                />
              </div>

              {/* Phone */}
              <div className="col-span-3 sm:col-span-1 relative">
                <label
                  htmlFor="phone"
                  className="absolute top-[-12px] left-[14px] bg-white text-[#030229] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px]"
                >
                  Number
                </label>
                <input
                  type="text"
                  className="w-full py-[12px] px-[14px] border-[1px] border-[#A7A7A7] rounded-[10px] focus:border-[#718ebf] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal text-[#141414]"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="col-span-3 sm:col-span-1 relative">
                <label
                  htmlFor="email"
                  className="absolute top-[-12px] left-[14px] bg-white text-[#030229] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px]"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full py-[12px] px-[14px] border-[1px] border-[#A7A7A7] rounded-[10px] focus:border-[#718ebf] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal text-[#141414]"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Gender */}
              <div className="col-span-3 sm:col-span-1 relative">
                <label
                  htmlFor="gender"
                  className="absolute top-[-12px] left-[14px] bg-white text-[#030229] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px]"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  className="w-full py-[12px] px-[14px] border-[1px] border-[#A7A7A7] rounded-[10px] focus:border-[#718ebf] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal text-[#141414]"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* DOB */}
              <div className="col-span-3 sm:col-span-1 relative">
                <label
                  htmlFor="dob"
                  className="absolute top-[-12px] left-[14px] bg-white text-[#030229] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px]"
                >
                  DOB
                </label>
                <input
                  type="date"
                  className="w-full py-[12px] px-[14px] border-[1px] border-[#A7A7A7] rounded-[10px] focus:border-[#718ebf] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal text-[#141414]"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              {/* Age */}
              <div className="col-span-3 sm:col-span-1 relative">
                <label
                  htmlFor="age"
                  className="absolute top-[-12px] left-[14px] bg-white text-[#030229] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px]"
                >
                  Age
                </label>
                <input
                  type="number"
                  className="w-full py-[12px] px-[14px] border-[1px] border-[#A7A7A7] rounded-[10px] focus:border-[#718ebf] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal text-[#141414]d"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter Age"
                />
              </div>

              {/* Additional fields (height, weight, blood group, country, state, city, address) */}
              {/* Use similar pattern as above for these fields */}
              {/* Example for Blood Group */}
              <div className="col-span-3 sm:col-span-1 relative">
                <label
                  htmlFor="bloodGroup"
                  className="absolute top-[-12px] left-[14px] bg-white text-[#030229] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px]"
                >
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  className="w-full py-[12px] px-[14px] border-[1px] border-[#A7A7A7] rounded-[10px] focus:border-[#718ebf] new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal text-[#141414]"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              {/* Add other fields similarly */}
            </div>

            {/* Buttons */}
            <div className="flex justify-center sm:justify-end gap-4">
              <NavLink to={"/patient"}>
                <button className="w-[230px] new-xxl:w-[160px] new-xl:w-[130px] new-lg:w-[110px] py-[12px] px-[14px] border-[1px] border-[#D3D3D3] rounded-[10px] text-black font-semibold new-xxl:text-[20px] font-semibold new-lg:text-[18px] font-semibold new-lg:text-[17px]">
                  Cancel
                </button>
              </NavLink>
              <button
                type="submit"
                className="w-[230px] new-xxl:w-[160px] new-xl:w-[130px] new-lg:w-[110px] py-[12px] px-[14px] bg-[#0EABEB] rounded-[10px] text-white new-xxl:text-[20px] text-white new-xl:text-[18px] text-white new-lg:text-[17px] font-semibold"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
