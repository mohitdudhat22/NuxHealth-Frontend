import React from "react";
import { NHCard } from "..";
import { AppointmentCard } from "../AppointmentCard";
import NoDataFoundImage from "@/assets/images/cover/no-appointment-found.png";

export const AppointmentsList = ({ data }) => {
  const appointments = data || [
    {
      patientName: "Roger Lubin",
      doctorName: "Leo Geidt",
      diseaseName: "Meningococcal Disease",
      appointmentTime: "10:00 AM",
      type: "Online",
    },
    {
      patientName: "Jakob Kongsaard",
      doctorName: "Leo Geidt",
      diseaseName: "Meningococcal Disease",
      appointmentTime: "10:00 AM",
      type: "Online",
    },
    {
      patientName: "Roger Lubin",
      doctorName: "Leo Geidt",
      diseaseName: "Meningococcal Disease",
      appointmentTime: "10:00 AM",
      type: "Online",
    },
  ];

  return (
    <NHCard
      title={"Today's Appointments List"}
      className={"max-h-[200px] overflow-auto"}
      headerContent={
        <button className="text-blue-500 text-sm">View All</button>
      }
    >
      {appointments.length > 0 ? (
        <div className="space-y-1 grid grid-cols-1 md:grid-cols-3 gap-3">
          {appointments.map((appointment, index) => (
            <AppointmentCard key={index} appointment={appointment} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4">
          <img
            src={NoDataFoundImage}
            alt="No Data Found"
            style={{ width: "150px", height: "150px" }}
          />
        </div>
      )}
    </NHCard>
  );
};
