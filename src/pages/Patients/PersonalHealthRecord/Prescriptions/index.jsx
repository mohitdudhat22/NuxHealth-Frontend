import {
  AppointmentCard,
  NHButton,
  NHCard,
  NHInput,
  PrescriptionCard,
} from "@/components";
import Icons from "@/constants/icons";
import { usePatientPrescriptionData } from "@/hook/Patients";
import React, { useEffect, useState } from "react";

export const Prescriptions = () => {
  const { loading, data, error } = usePatientPrescriptionData();
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePatientDetails = (data) => {
    setPrescriptionData(data);
    setIsModalOpen(true);
  };

  return (
    <>
      <NHCard
        title={
          <span className="text-[#030229] text-[26px] font-semibold">
            Prescriptions
          </span>
        }
        headerContent={
          <>
            <div className="me-10">
              <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
            </div>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {data?.map((prescriptions, index) => (
            <AppointmentCard
              key={prescriptions.prescriptionId}
              headerContent={
                <>
                  <NHButton
                    isView
                    onClick={() => handlePatientDetails(prescriptions)}
                  />
                </>
              }
              headerBg={true}
              title={
                <span className="font-semibold text-[#030229] text-[18px]">
                  {prescriptions.DoctorName}
                </span>
              }
              hospitalName={prescriptions.hospitalName}
              diseaseName={prescriptions.DiseaseName}
              date={prescriptions.prescriptionDate}
              className="border border-slate-200"
            />
          ))}
        </div>
        {prescriptionData && (
          <PrescriptionCard
            isModalOpen={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            handleClose={() => setIsModalOpen(false)}
            Title="Prescription"
            handleOk={() => setIsModalOpen(false)}
            patientData={prescriptionData}
          />
        )}
      </NHCard>
    </>
  );
};
