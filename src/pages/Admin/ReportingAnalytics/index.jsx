import React from "react";
import {
  StatisticsCard,
  DepartmentCard,
  PatientDistributionCard,
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
  const appointmentData = [
    { year: 2020, onlineConsultation: 30, otherAppointment: 40 },
    { year: 2021, onlineConsultation: 45, otherAppointment: 35 },
    { year: 2022, onlineConsultation: 50, otherAppointment: 45 },
    { year: 2023, onlineConsultation: 55, otherAppointment: 50 },
  ];

  const patientDepartmentData = [
    { key: "1", name: "Cardiology", count: "105" },
    { key: "2", name: "Endocrinologist", count: "254" },
    { key: "3", name: "Gastroenterologist", count: "657" },
    { key: "4", name: "Anesthesiologist", count: "02" },
    { key: "5", name: "Pediatrician", count: "784" },
    { key: "6", name: "Ophthalmologist", count: "254" },
  ];

  const doctorDepartmentData = [
    { key: "1", name: "Cardiology", count: "08" },
    { key: "2", name: "Endocrinologist", count: "22" },
    { key: "3", name: "Gastroenterologist", count: "15" },
    { key: "4", name: "Anesthesiologist", count: "11" },
    { key: "5", name: "Pediatrician", count: "10" },
    { key: "6", name: "Ophthalmologist", count: "08" },
  ];
  const PatientData = [
    { age: "0-2 Years", value: 8, color: "#E91E63" },
    { age: "3-12 Years", value: 12, color: "#3F51B5" },
    { age: "13-19 Years", value: 20, color: "#03A9F4" },
    { age: "20-39 Years", value: 18, color: "#FFC107" },
    { age: "40-59 Years", value: 8, color: "#009688" },
    { age: "60 And Above", value: 34, color: "#FF9F83" },
  ];

  return (
    <>
      <NHHead title="Reporting & Analytics" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* <StatisticsCard
            title="Total Patients"
            count={data?.totalPatients}
            icon={Icons.Patient}
          /> */}

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
              data={data?.appointmentData || appointmentData}
              title="Appointment Analytics"
            />
          </div>
          <div className="md:col-span-2">
            <PatientSummaryChart data={data?.patientSummary} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-2">
            <DepartmentCard
              title="Patients Count Department"
              departments={data?.patientDepartmentData || patientDepartmentData}
              icon={Icons.Patient}
              type="patient"
              image={NoPatientFound}
              discrition="No Patient Found Yet"
            />
          </div>
          <div className="md:col-span-2">
            <DepartmentCard
              title="Doctor Count Department"
              departments={data?.patientDepartmentData || doctorDepartmentData}
              icon={Icons.Doctor}
              type="doctor"
              image={NoDoctorCountFound}
              discrition="No Doctor Found Yet"
            />
          </div>
          <div className="md:col-span-2">
            <PatientAgeDistribution
              data={data?.PatientAgeDistribution || PatientData}
            />
          </div>
        </div>
      </div>
    </>
  );
};
