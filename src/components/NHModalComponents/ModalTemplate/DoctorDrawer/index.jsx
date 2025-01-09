import React from "react";
import { Drawer } from "antd";
import "./DoctorDrawer.css";
import modalImg from "../../../../assets/images/cover/view_modal_bg.png";
import maleIcon from "../../../../assets/images/cover/male_icon.svg";
import doctorLogo from "../../../../assets/images/cover/Avatar_6.png";
import doctorSign from "../../../../assets/images/cover/doc_signature.png";
import hospitalLogo from "../../../../assets/images/cover/hospital_logo.svg";
import hospitalLink from "../../../../assets/images/cover/hospital_link.svg";
import hospitalPhone from "../../../../assets/images/cover/hospital_phone.svg";
import hospitalLoc from "../../../../assets/images/cover/hospital_loc.svg";
import rightNav from "../../../../assets/images/cover/right_nav_icon.svg";

const DoctorDrawer = ({ visible, onClose, doctor, receptionist }) => {
  const dummyDoctor = {
    doctorName: "Dr. Cristofer Pasquinades",
    avatar: doctorLogo, // Assuming doctorLogo is imported
    gender: "male",
    hospitalName: "General Hospital",
    qualification: "MBBS",
    breakTime: "1 Hour",
    workingTime: "4 Hours",
    yearsOfExperience: "4 Years",
    emergencyContactNumber: "89564 25462",
    specialty: "Obstetrics and Gynecology",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    signature: doctorSign,
    status: "Onsite", // "Online or Onsite"
    hospitalWebsite: "https://generalhospital.com",
    hospitalAddress: "123 Hospital St, City, Country",
    age: "36 Years",
    doctorMail: "kenzi.lawson@example.com",
    phone: "89564 25462",
    rate: "1,000",
    country: "India",
    state: "Gujarat",
    zipCode: "382002",
    city: "Gandhinagar",
    address: "B-105 Virat Bungalows Punagam Motavaracha Jamnagar.",
  };

  const displayDoctor = receptionist
    ? { ...dummyDoctor, ...receptionist }
    : { ...dummyDoctor, ...doctor };

  const displayName = receptionist
    ? displayDoctor.receptionistName
    : displayDoctor.doctorName;

  return (
    <div className="doctor_drawer">
      <Drawer
        title="Doctor Management"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={500}
        closeIcon={<img src={rightNav} alt="Close" className="" />}
      >
        <div
          className="bg-cover bg-no-repeat rounded-[10px] w-full py-6 px-5"
          style={{ backgroundImage: `url(${modalImg})` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={displayDoctor.avatar}
                alt="Doctor"
                className="rounded-full w-16 h-16"
              />
              <div className="ml-4">
                <h3 className="text-[18px] font-medium text-white">
                  {displayName}
                </h3>
                <div className="text-white bg-[#718EBF] rounded-full px-5 py-3 inline-flex items-center">
                  {displayDoctor.gender === "male" ? (
                    <img
                      src={maleIcon}
                      alt="Male"
                      className="inline-block mr-1"
                    />
                  ) : (
                    <img
                      src={maleIcon}
                      alt="Female"
                      className="inline-block mr-1"
                    />
                  )}
                  <span className="ml-4 font-bold">{displayDoctor.gender}</span>
                </div>
              </div>
            </div>
            <span
              className={`${
                displayDoctor.status === "Onsite"
                  ? "bg-[#39973D]"
                  : "bg-[#39973D]"
              } text-white border border-solid border-white py-2 px-5 rounded-[30px]`}
            >
              {displayDoctor.status}
            </span>
          </div>
        </div>

        {displayDoctor.status === "Onsite" ? (
          <>
            <div className="mt-5 bg-[#F6F8FB] p-5 rounded-xl">
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Doctor Qualification
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.qualification}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Years Of Experience
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.yearsOfExperience}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Specialty Type
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.specialty}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Working Time
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.workingTime}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Patient Check Up Time
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.morningSession}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Break Time
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.breakTime}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Description
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.description}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Signature
                  </h4>
                  <img
                    src={displayDoctor.signature}
                    alt="Doctor"
                    className="rounded-lg w-full mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 bg-[#F6F8FB] p-5 rounded-xl">
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Age
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.age}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Email
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.doctorMail}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Phone
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.phone}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Online Consultation Rate
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.rate}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Country
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.country}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    State
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.state}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Zip Code
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.zipCode}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    City
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.city}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Address
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.address}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-5 bg-[#F6F8FB] p-5 rounded-xl">
            <div className="flex items-center justify-between mb-6 border-b border-solid border-white pb-4">
              <h4 className="text-lg text-[#141414] font-semibold">
                Working On Online
              </h4>
              <h6 className="font-bold text-[#718EBF] text-lg">Hospital</h6>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="flex items-center">
                <img src={hospitalLogo} alt="doctorlogo" className="mr-3" />
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Hospital Name
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.hospitalName}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="flex items-center">
                <img src={hospitalLink} alt="doctorlogo" className="mr-3" />
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Hospital Website Link
                  </h4>
                  <a
                    href={displayDoctor.hospitalWebsite}
                    className="text-[#141414] font-medium text-[16px] mt-1 underline"
                  >
                    {displayDoctor.hospitalWebsite}
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="flex items-center">
                <img src={hospitalPhone} alt="doctorlogo" className="mr-3" />
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Emergency Contact Number
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.emergencyContactNumber}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="flex items-center">
                <img src={hospitalLoc} alt="doctorlogo" className="mr-3" />
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Hospital Address
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {displayDoctor.hospitalAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default DoctorDrawer;
