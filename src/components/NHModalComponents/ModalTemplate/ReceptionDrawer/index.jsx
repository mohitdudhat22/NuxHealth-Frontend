import React from "react";
import { Drawer } from "antd";
import "./ReceptionDrawer.css";
import modalImg from "../../../../assets/images/cover/view_modal_bg.png";
import maleIcon from "../../../../assets/images/cover/male_icon.svg";
import hospitalLogo from "../../../../assets/images/cover/hospital_logo.svg";
import hospitalLink from "../../../../assets/images/cover/hospital_link.svg";
import hospitalPhone from "../../../../assets/images/cover/hospital_phone.svg";
import hospitalLoc from "../../../../assets/images/cover/hospital_loc.svg";
import rightNav from "../../../../assets/images/cover/right_nav_icon.svg";

const ReceptionDrawer = ({ visible, onClose, doctor, receptionist }) => {
    console.log(receptionist,",,,,,,,,,,,,,,,,,")
  return (
    <div className="doctor_drawer">
      <Drawer
        title="Receptionist Management"
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
                src={receptionist?.avatar}
                alt="Doctor"
                className="rounded-full w-16 h-16"
              />
              <div className="ml-4">
                <h3 className="text-[18px] font-medium text-white">
                  {receptionist?.receptionistName}
                </h3>
                <div className="text-white bg-[#718EBF] rounded-full px-5 py-3 inline-flex items-center">
                  {receptionist?.gender === "male" ? (
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
                  <span className="ml-4 font-bold">{receptionist?.gender}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      
  
            <div className="mt-5 bg-[#F6F8FB] p-5 rounded-xl">
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                  Receptionist Qualification
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {receptionist?.qualification}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Working Time
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {receptionist?.workingTime}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Break Time
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {receptionist?.breakTime}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Emergency Contact No
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {receptionist?.emergencyContactNo}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 bg-[#F6F8FB] p-5 rounded-xl">
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Email
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {receptionist?.email}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Phone
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {receptionist?.phone}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Country
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {receptionist?.country}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    State
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {receptionist?.state}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Zip Code
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {receptionist?.zipCode}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    City
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {receptionist?.city}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-medium text-[14px]">
                    Address
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {receptionist?.fullAddress}
                  </p>
                </div>
              </div>
            </div>
      </Drawer>
    </div>
  );
};

export default ReceptionDrawer;
