import React from "react";
import { NHInput, NHTable, NHButton, NHSelect, NHCard } from "@/components";
import Logo from "@/assets/images/logo/logo.png";

export const PrescriptionCard = ({
  hospitalName,
  doctorName = "Dr. Bharat Patel",
  doctorspecialty = "Obstetrics and Gynecology",
  prescriptionDate = "2 Jan, 2022",
  patientName = "Altabrao Bhajirao",
  age = "36 Years",
  gender = "Male",
  address= "B-105 Viral Bungalows PunaGam Motavaracha Jamnagar.",
  medications = [
    {
      medicineName: "Calcium carbonate",
      strength: "100 Mg",
      dose: "1-0-1",
      duration: "2 Day",
      whenToTake: "Before Food",
    },
    {
      medicineName: "Cyclobenzaprine",
      strength: "200 Mg",
      dose: "1-1-1",
      duration: "4 Day",
      whenToTake: "With Food",
    },
    {
      medicineName: "Fluticasone Almeterol",
      strength: "150 Mg",
      dose: "0-1-0",
      duration: "5 Day",
      whenToTake: "Before Food",
    },
    {
      medicineName: "Hydrochlorothiazide",
      strength: "250 Mg",
      dose: "0-0-1",
      duration: "2 Day",
      whenToTake: "After Food",
    },
    {
      medicineName: "Flonase Allergy Relief",
      strength: "100 Mg",
      dose: "1-0-0",
      duration: "1 Day",
      whenToTake: "Before Food",
    },
  ],
  additionalNote = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  patientData,
}) => {
  // Medicine Table Columns
  const columns = [
    { title: "Medicine Name", dataIndex: "medicineName", key: "medicineName" },
    { title: "Strength", dataIndex: "strength", key: "strength" },
    { title: "Dose", dataIndex: "dose", key: "dose" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "When to take", dataIndex: "whenToTake", key: "whenToTake" },
  ];
  console.log(patientData, "<<<<<<<<<<<<<<<<<<<<<<<<<");

  return (
    <NHCard className="min-h-full">
      {/* Header Section */}
      <div className="p-6 mb-8 rounded-lg bg-slate-100">
        <div className="flex items-center justify-between pb-4 mb-4 ">
          <div>
            <img src={Logo} className="w-1/4 h-auto" alt="Logo" />
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold">
              {(patientData && patientData.DoctorName) || doctorName}
            </h2>
            <p className="text-sm text-gray-500">
              {" "}
              {(patientData && patientData.doctorspecialty) || doctorspecialty}
            </p>
          </div>
        </div>

        {/* Patient Info Section */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p>
              <span className="text-xl text-[#818194]">Hospital Name:</span>
              <span className={`text-xl font-bold text-[#4F4F4F]`}>
                {(patientData && patientData.hospitalName) || hospitalName}
              </span>
            </p>
            <p>
              <span className="text-xl text-[#818194]">Patient Name:</span>
              <span className={`text-xl font-bold text-[#4F4F4F]`}>
                {(patientData && patientData.patientName) || patientName}
              </span>
            </p>
            <p>
              <span className="text-xl text-[#818194]">Gender:</span>
              <span className={`text-xl font-bold text-[#4F4F4F]`}>
                {(patientData && patientData.gender) || gender}
              </span>
            </p>
            <p>
              <span className="text-xl text-[#818194]">Address:</span>
              <span className={`text-xl font-bold text-[#4F4F4F]`}>
                {(patientData && patientData.address) || address}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p>
              <span className="text-xl text-[#818194]">Prescription Date:</span>
              <span className={`text-xl font-bold text-[#4F4F4F]`}>
                {(patientData && patientData.prescriptionDate) ||
                  prescriptionDate}
              </span>
            </p>
            <p>
              <span className="text-xl text-[#818194]">Age:</span>
              <span className={`text-xl font-bold text-[#4F4F4F]`}>
                {(patientData && patientData.age) || age}
                {/* {patient.age} */}
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* Medicine Table */}
      <NHTable
      loading={loading} showPagination={true}
        columns={columns}
        dataSource={
          (patientData && patientData.medications) || // Use medicines from patientData
          medications.map((medications, index) => ({
            key: index.toString(),
            ...medications,
          }))
        }
        pagination={false}
        className="mb-4"
      />

      {/* Additional Note Section */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-600">Additional Note</h3>
        <p className="text-sm text-gray-500">{(patientData && patientData.additionalNote) ||
                  additionalNote}</p>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-500">Doctor Signature</p>
        <NHButton variant="primary">Send</NHButton>
      </div>
    </NHCard>
  );
};
