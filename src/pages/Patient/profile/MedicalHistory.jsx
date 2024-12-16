import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../style.css";

const MedicalHistory = () => {
  const medicalhistory = [
    {
      doctorName: "Dr. Smith",
      date: "2024-10-01",
      patientIssue:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-",
    },
    {
      doctorName: "Dr. Johnson",
      date: "2024-09-28",
      patientIssue:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-",
    },
    {
      doctorName: "Dr. Lee",
      date: "2024-10-03",
      patientIssue:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-",
    },
    {
      doctorName: "Dr. Brown",
      date: "2024-09-30",
      patientIssue:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-",
    },
    {
      doctorName: "Dr. White",
      date: "2024-10-02",
      patientIssue:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-",
    },
    {
      doctorName: "Dr. Smith",
      date: "2024-10-01",
      patientIssue:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-",
    },
    {
      doctorName: "Dr. Johnson",
      date: "2024-09-28",
      patientIssue:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-",
    },
    {
      doctorName: "Dr. Lee",
      date: "2024-10-03",
      patientIssue:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-",
    },
    {
      doctorName: "Dr. Brown",
      date: "2024-09-30",
      patientIssue:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-",
    },
    {
      doctorName: "Dr. White",
      date: "2024-10-02",
      patientIssue:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-",
    },
    {
      doctorName: "Dr. Smith",
      date: "2024-10-01",
      patientIssue:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-",
    },
    {
      doctorName: "Dr. Johnson",
      date: "2024-09-28",
      patientIssue:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-",
    },
    {
      doctorName: "Dr. Lee",
      date: "2024-10-03",
      patientIssue:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-",
    },
    {
      doctorName: "Dr. Brown",
      date: "2024-09-30",
      patientIssue:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-",
    },
    {
      doctorName: "Dr. White",
      date: "2024-10-02",
      patientIssue:
        " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-",
    },
  ];

  return (
    <div className="bg-gray-100 h-[100vh]">
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg w-full h-auto p-4 rounded-xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-3">
            <h1 className="text-[18px] new-sm:text-[20px] new-lg:text-[22px] new-xl:text-[24px] new-xxl:text-[26px] font-bold mb-2 md:mb-0">
              Medical History
            </h1>
          </div>

          <div className="overflow-y-auto" style={{ height: "750px" }}>
            <div className="grid grid-cols-1 new-sm:grid-cols-2 new-lg:grid-cols-4 gap-4">
              {medicalhistory.map((val, index) => (
                <div
                  key={index}
                  className="w-full rounded-lg bg-white border border-gray-200 shadow-md"
                >
                  <div className="flex justify-between items-center py-2 bg-gray-100 px-3">
                    <h6 className="text-[18] text-[#030229] font-semibold">
                      {val.doctorName}
                    </h6>
                    <NavLink to={"/patient/allAppointment"}>
                      <button className="w-7 h-7 flex justify-center text-[#0EABEB] items-center bg-white rounded-lg">
                        <FaEye />
                      </button>
                    </NavLink>
                  </div>
                  <div className="flex justify-between items-center pt-3 px-3">
                    <p className="text-[#4F4F4F] text-[16px] font-bold">Date</p>
                    <span className="text-[#4F4F4F] text-[16px] font-normal">
                      {val.date}
                    </span>
                  </div>
                  <div className="px-3 pb-3">
                    <p className="text-[#4F4F4F] text-[16px] font-bold">
                      Patient Issue
                    </p>
                    <span className="text-[#4F4F4F] text-[16px] font-normal">
                      {val.patientIssue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
