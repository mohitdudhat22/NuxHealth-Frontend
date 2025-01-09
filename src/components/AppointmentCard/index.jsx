import React from "react";
import PropTypes from "prop-types";
import { NHCard } from "..";

export const AppointmentCard = ({ appointment }) => {
  const { patientName, doctorName, diseaseName, appointmentTime, type } =
    appointment;
  return (
    <NHCard className={"border border-[#F4F4F4] rounded-xl "}>
      <div className="flex justify-between bg-[#F6F8FB] rounded-lg p-3">
        <h3 className="text-gray-900 font-medium text-sm">{patientName}</h3>
        <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
          {type === "Online" ? "Offsite" : "Onsite"}
        </span>
      </div>

      <div className="p-3">
        <div className="mt-2">
          <p className="text-[#818194] text-sm">Doctor Name</p>
          <p className="text-[#4F4F4F] font-semibold">Dr. {doctorName}</p>
        </div>

        <div className="mt-2">
          <p className="text-[#818194] text-sm">Disease Name</p>
          <p className="text-[#4F4F4F] font-semibold">{diseaseName}</p>
        </div>

        <div className="mt-2">
          <p className="text-[#818194] text-sm">Appointment Time</p>
          <p className="text-[#4F4F4F] font-semibold">{appointmentTime}</p>
        </div>
      </div>
    </NHCard>
  );
};
