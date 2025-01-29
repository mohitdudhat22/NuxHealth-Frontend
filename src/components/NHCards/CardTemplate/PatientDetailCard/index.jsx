import { NHButton } from "@/components";
import Icons from "@/constants/Icons";
import { identifyRole } from "@/utils/identifyRole";
import { useAppNavigation } from "@/utils/useAppNavigation";
import React from "react";

export const PatientDetailCard = ({
  avatar,
  patientName,
  doctorName,
  patientNumber,
  patientIssue,
  patientGender,
  patientAge,
  appointmentType,
  patientAddress,
  lastAppointmentDate,
  lastAppointmentTime,
  onAddRecord,
  onEditProfile,
}) => {
  const { goToProfile, goBack } = useAppNavigation();
  return (
    <div className="p-4 xl:p-6 bg-white rounded-3xl">
      <div className="flex flex-col xl:flex-row items-center justify-between">
        <div className="title mb-4 xl:mb-0 flex items-center justify-between w-full">
          <p className="text-[#030229] text-2xl xl:text-[26px] font-bold">
            Patient Details
          </p>
         {identifyRole() === "doctor" && <button onClick={goBack} className="close-back-button mr-2">
            {Icons?.CloseCircle}
          </button>}
        </div>
        <div className="flex space-x-2">
          {onEditProfile && (
            <div className="edit-btn">
              <NHButton
                type="primary"
                size="small"
                icon={Icons.EditBillIcon}
                onClick={goToProfile}
              >
                Edit Profile
              </NHButton>
            </div>
          )}
          {onAddRecord && (
            <NHButton
              type="primary"
              size="small"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={onAddRecord}
            >
              + Add Record
            </NHButton>
          )}
        </div>
      </div>
      <div className="flex flex-col xl:flex-row items-center justify-between flex-1 pb-3 pt-6 xl:pt-9">
        {/* Avatar Section */}
        <div className="img w-full xl:w-[13%] pl-3 mb-6">
          <div className="img-box w-[100px] h-[100px] xl:w-[150px] xl:h-[150px] bg-[#D9D9D9] rounded-full border border-[#DFE0EB] mx-auto xl:mx-0">
            <img
              src={avatar || "https://i.pravatar.cc/300"}
              alt={patientName}
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
        {/* Details Section */}
        <div className="grid grid-cols-2 xl:grid-cols-5 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div>
            <p className="text-[#A7A7A7] text-[20px] font-medium">
              Patient Name
            </p>
            <p className="text-[#141414] text-[18px] font-normal">
              {patientName}
            </p>
          </div>
          <div>
            <p className="text-[#A7A7A7] text-[20px] font-medium">
              Patient Number
            </p>
            <p className="text-[#141414] text-[18px] font-normal">
              {patientNumber}
            </p>
          </div>
          <div>
            <p className="text-[#A7A7A7] text-[20px] font-medium">
              Patient Issue
            </p>
            <p className="text-[#141414] text-[18px] font-normal">
              {patientIssue}
            </p>
          </div>
          <div>
            <p className="text-[#A7A7A7] text-[20px] font-medium">
              Patient Gender
            </p>
            <p className="text-[#141414] text-[18px] font-normal">
              {patientGender}
            </p>
          </div>
          <div>
            <p className="text-[#A7A7A7] text-[20px] font-medium">
              Last Appointment Date
            </p>
            <p className="text-[#141414] text-[18px] font-normal">
              {lastAppointmentDate}
            </p>
          </div>
          <div>
            <p className="text-[#A7A7A7] text-[20px] font-medium">
              Doctor Name
            </p>
            <p className="text-[#141414] text-[18px] font-normal">
              {doctorName}
            </p>
          </div>
          <div>
            <p className="text-[#A7A7A7] text-[20px] font-medium">
              Patient Age
            </p>
            <p className="text-[#141414] text-[18px] font-normal">
              {patientAge}
            </p>
          </div>
          <div>
            <p className="text-[#A7A7A7] text-[20px] font-medium">
              Appointment Type
            </p>
            <p className="text-[#141414] text-[18px] font-normal">
              {appointmentType}
            </p>
          </div>
          <div>
            <p className="text-[#A7A7A7] text-[20px] font-medium">
              Patient Address
            </p>
            <p className="text-[#141414] text-[18px] font-normal">
              {patientAddress}
            </p>
          </div>
          <div>
            <p className="text-[#A7A7A7] text-[20px] font-medium">
              Last Appointment Time
            </p>
            <p className="text-[#141414] text-[18px] font-normal">
              {lastAppointmentTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};