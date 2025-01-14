import { AppointmentCard, NHButton, NHCard, NHInput } from "@/components";
import Icons from "@/constants/icons";
import { usePatientPrescriptionData } from "@/hook/Patients";
import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import "./PrescriptionAccess.css";

export const PrescriptionAccess = () => {
  const { loading, data, error } = usePatientPrescriptionData();
  console.log("🚀 ~ PrescriptionAccess ~ data:", data);
  const [prescriptionData, setPrescriptionData] = useState([]);

  useEffect(() => {
    if (data) {
      setPrescriptionData(data);
    }
  }, [data]);
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
        <div className="prescriptions-card grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {prescriptionData.map((prescriptions, index) => (
            <AppointmentCard
              key={index}
              title={
                <span className="text-[#030229] text-[18px] font-medium">
                  {prescriptions.DoctorName}
                </span>
              }
              headerContent={
                <>
                  <div className="flex gap-x-3">
                    <span
                      onClick={() => handlePatientDetails()}
                      className="cursor-pointer"
                    >
                      {Icons.Download}
                    </span>

                    <span
                      onClick={() => handlePatientDetails()}
                      className="cursor-pointer"
                    >
                      {Icons.View}
                    </span>
                  </div>
                </>
              }
              footerContent={
                <>
                  <NHInput type="file" />
                </>
              }
              headerBg={true}
              hospitalName={prescriptions.hospitalName}
              diseaseName={prescriptions.DiseaseName}
              date={prescriptions.prescriptionDate}
              appointmentTime={prescriptions.time}
              className="border border-slate-200"
            />
          ))}
        </div>
      </NHCard>
    </>
  );
};
