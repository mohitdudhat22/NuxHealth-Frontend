import React from "react";
import {
  DepartmentCard,
  AppointmentChart,
  PatientSummaryChart,
  PatientAgeDistribution,
  NHHead,
} from "@/components";
import Icons from "@/constants/icons";
import { useReportandAnalytics } from "@/hook/Admin/ReportAndAnalytics";
import NoPatientFound from "../../../assets/images/cover/no-patient-found.png";
import NoDoctorCountFound from "../../../assets/images/cover/no-doctor-count-found.png";

export const ReportingAnalytics = () => {
  const { data } = useReportandAnalytics();
  return (
    <>
      <NHHead title="Reporting & Analytics" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 px-8 rounded-2xl shadow-md">
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-x-4">
                <div className="flex items-center justify-center w-[45px] h-[45px] text-blue-500">
                  {Icons.Patient}
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#030229]">
                    Total Patients
                  </h3>
                </div>
              </div>
              <div>
                <p className="text-[26px] font-extrabold text-[#030229]">
                  {data?.totalPatients}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 px-8 rounded-2xl shadow-md">
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-x-4">
                <div className="flex items-center justify-center w-[45px] h-[45px] text-blue-500">
                  {Icons.Doctor}
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#030229]">
                    Repeat Patients
                  </h3>
                </div>
              </div>
              <div>
                <p className="text-[26px] font-extrabold text-[#030229]">
                  {data?.repeatPatients}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 px-8 rounded-2xl shadow-md">
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-x-4">
                <div className="flex items-center justify-center w-[45px] h-[45px] text-blue-500">
                  {Icons.AdmittedPatient}
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#030229]">
                    Admitted Patient
                  </h3>
                </div>
              </div>
              <div>
                <p className="text-[26px] font-extrabold text-[#030229]">{0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 px-8 rounded-2xl shadow-md">
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-x-4">
                <div className="flex items-center justify-center w-[45px] h-[45px] text-blue-500">
                  {Icons.TotalClaim}
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#030229]">
                    Total Claim
                  </h3>
                </div>
              </div>
              <div>
                <p className="text-[26px] font-extrabold text-[#030229]">{0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <AppointmentChart
              data={data?.appointmentData}
              title="Appointment Analytics"
            />
          </div>
          <div className="md:col-span-2">
            <PatientSummaryChart data={data?.patientSummary} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div className="md:col-span-2">
            <DepartmentCard
              title="Patients Count Department"
              departments={data?.patientDepartmentData}
              icon={Icons.Patient}
              type="patient"
              image={NoPatientFound}
              discrition="No Patient Found Yet"
            />
          </div>
          <div className="md:col-span-2">
            <DepartmentCard
              title="Doctor Count Department"
              departments={data?.patientDepartmentData}
              icon={Icons.Doctor}
              type="doctor"
              image={NoDoctorCountFound}
              discrition="No Doctor Found Yet"
            />
          </div>
          <div className="md:col-span-2">
            <PatientAgeDistribution
              data={data?.patientAgeDistribution}
            />
          </div>
        </div>
      </div>
    </>
  );
};
