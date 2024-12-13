import { useEffect, useState } from "react";
import { FaUsers, FaUser, FaFileAlt } from "react-icons/fa";
import AppointmentGraph from "../Reporting-Analysis/ApointmentGraph";
import PatientSummary from "../Reporting-Analysis/PatientSummary";
import PatientsAge from "../Reporting-Analysis/PatientsAge";
import { useGlobal } from "../../hooks/useGlobal.jsx";
export default function ReportingAndAnalytics() {
  const { fetchReportingAndAnalytics, cardData } = useGlobal();
  useEffect(() => {
    fetchReportingAndAnalytics();
  }, []);
  return (
    <div>
      <div className="reportingAnalytics-section">
        <div className="row">
          <div className="main bg-[#F6F8FB]">
            <div className="total-data flex justify-between items-center p-1">
              <div className="total-Patients w-1/4 px-3 pt-3.5">
                <div className="content flex justify-between items-center bg-white rounded-lg p-3.5">
                  <div className="logo_details flex items-center">
                    <div className="logo w-[45px] h-[45px]  rounded-full bg-[#2E779326] flex justify-center items-center">
                      <FaUsers className="text-2xl text-[#2E7793]" />
                    </div>
                    <div className="details pl-5">
                      <p className="text-[#030229] font-semibold text-base">
                        Total Patients
                      </p>
                    </div>
                  </div>
                  <div className="count">
                    <span className="text-[#030229] text-[26px] font-extrabold">
                      {cardData.totalPatientCount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="total-Doctors w-1/4 px-3 pt-3.5">
                <div className="content flex justify-between items-center bg-white rounded-lg p-3.5">
                  <div className="logo_details flex items-center">
                    <div className="logo w-[45px] h-[45px] rounded-full bg-[#5E5E9E26] flex justify-center items-center">
                      <FaUser className="text-2xl text-[#5E5E9E]" />
                    </div>
                    <div className="details pl-5">
                      <p className="text-[#030229] text-[16px] font-semibold text-base">
                        Repeat Patient
                      </p>
                    </div>
                  </div>
                  <div className="count">
                    <span className="text-[#030229] text-[26px] font-extrabold">
                      {cardData.repeatPatientCount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="total-Appointments w-1/4 px-3 pt-3.5">
                <div className="content flex justify-between items-center bg-white rounded-lg p-3.5">
                  <div className="logo_details flex items-center">
                    <div className="logo w-[45px] h-[45px] rounded-full bg-[#41B16126] flex justify-center items-center">
                      <FaFileAlt className="text-2xl text-[#41B161]" />
                    </div>
                    <div className="details pl-5">
                      <p className="text-[#030229] text-[16px] font-semibold text-base">
                        Total Doctors
                      </p>
                    </div>
                  </div>
                  <div className="count">
                    <span className="text-[#030229] text-[26px] font-extrabold">
                      {cardData.totalDoctorCount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="total-Appointments w-1/4 px-3 pt-3.5">
                <div className="content flex justify-between items-center bg-white rounded-lg p-3.5">
                  <div className="logo_details flex items-center">
                    <div className="logo w-12 h-12 rounded-full bg-[#2E779326] flex justify-center items-center">
                      <FaFileAlt className="text-2xl text-[#9A5BD4]" />
                    </div>
                    <div className="details pl-5">
                      <p className="text-[#030229] text-[16px] font-semibold text-base">
                        Total Claim
                      </p>
                    </div>
                  </div>
                  <div className="count">
                    <span className="text-[#030229] text-[26px] font-extrabold">
                      {cardData.insuranceClaimCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="top flex p-1">
              <div className="w-1/2 p-3">
                <AppointmentGraph />
              </div>
              <div className="w-1/2 p-3">
                <PatientSummary />
              </div>
            </div>

            <div className="bottom flex justify-between py-1 px-3">
              <div className="patient-count-data w-[32.5%] p-[10px]">
                <div className="content h-[330px] bg-white p-5 rounded-lg">
                  <div className="head">
                    <div className="title">
                      <p className="new-xxl:text-[24px] new-xl:text-[22px] new-lg:text-[18px] font-bold text-[#030229] pb-3">
                        Patients Count by Disease
                      </p>
                    </div>
                  </div>
                  <div className="pending-bill h-[85%]">
                    <div className="pending-bill-data pt-2.5 h-[90%]">
                      <div className="bill-table h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-[#030229] scrollbar-track-[#F4F4F4]">
                        <table className="w-full px-2.5 text-lg">
                          <thead className="sticky top-0 bg-gray-100 z-10">
                            <tr className="flex bg-[#f6f8fb] justify-between items-center">
                              <th className="w-[40%] text-[#030229] text-[16px] font-semibold py-3.5 px-3.5">
                                Disease Name
                              </th>
                              <th className="w-[40%] text-[#030229] text-[16px] font-semibold py-3.5 px-3.5">
                                Patient Count
                              </th>
                            </tr>
                          </thead>
                          <tbody className="w-full">
                            {cardData?.patientCountByDisease?.length > 0 ? (
                              cardData?.patientCountByDisease?.map(
                                (patient) => (
                                  <tr
                                    key={patient._id}
                                    className="flex justify-between items-center border-b border-[#F6F8FB] py-1 px-3.5"
                                  >
                                    <td className="d-name text-center">
                                      <p className="text-[#4F4F4F] text-[15px] font-medium">
                                        {patient._id || "N/A"}
                                      </p>
                                    </td>
                                    <td className="status pr-3.5 text-center w-[20%]">
                                      <p className="bg-[#39973D1A] text-[#39973D] rounded-full flex justify-center items-center">
                                        <FaUsers />
                                        <span className="text-[13px] font-semibold py-1 px-2.5">
                                          {patient.count}
                                        </span>
                                      </p>
                                    </td>
                                  </tr>
                                ),
                              )
                            ) : (
                              <tr>
                                <td colSpan="2" className="text-center">
                                  No data available
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="doctor-count-data w-[32.5%] p-[10px]">
                <div className="content h-[330px] bg-white p-5 rounded-lg">
                  <div className="head">
                    <div className="title">
                      <p className="new-xxl:text-[24px] new-xl:text-[22px] new-lg:text-[18px] font-bold text-[#030229] pb-3">
                        Doctor Count by Department
                      </p>
                    </div>
                  </div>
                  <div className="pending-bill h-[85%]">
                    <div className="pending-bill-data pt-2.5 h-[90%]">
                      <div className="bill-table h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-[#030229] scrollbar-track-[#F4F4F4]">
                        <table className="w-full px-2.5">
                          <thead className="sticky top-0 bg-gray-100 z-10">
                            <tr className="flex bg-[#f6f8fb] justify-between items-center">
                              <th className="w-[40%] text-[#030229] text-[16px] font-semibold py-3.5 px-3.5">
                                Department Name
                              </th>
                              <th className="w-[40%] text-[#030229] text-[16px] font-semibold py-3.5 px-3.5">
                                Doctor Count
                              </th>
                            </tr>
                          </thead>
                          <tbody className="w-full">
                            {cardData?.doctorCountByDepartment?.map(
                              (specialty) => (
                                <tr
                                  key={specialty._id}
                                  className="flex justify-between items-center border-b border-[#F6F8FB] py-1 px-3.5"
                                >
                                  <td className="d-name text-center">
                                    <p className="text-[#4F4F4F] text-[15px] font-medium">
                                      {specialty._id || "N/A"}
                                    </p>
                                  </td>
                                  <td className="status pr-3.5 text-center w-[20%]">
                                    <p className="bg-[#39973D1A] text-[#39973D] rounded-full flex justify-center items-center">
                                      <FaUsers />
                                      <span className="text-[13px] font-semibold py-1 px-2.5">
                                        {specialty.count}
                                      </span>
                                    </p>
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <PatientsAge />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
