import {
  AppointmentCard,
  NHButton,
  NHCard,
  NHInput,
  PrescriptionCard,
} from "@/components";
import Icons from "@/constants/Icons";
import { usePatientPrescriptionData } from "@/hook/Patients";
import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import "./PrescriptionAccess.css";

export const PrescriptionAccess = () => {
  const { loading, data, error } = usePatientPrescriptionData();
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setPrescriptionData(data);
    }
  }, [data]);

  const handlePresctiptionDetails = (data) => {
    setPrescriptionData(data);
    setIsModalOpen(true);
  };

  return (
    <>
    <div className="precription-access">
      <NHCard
        title={
          <span className="text-[#030229] text-[26px] font-semibold">
            Prescriptions
          </span>
        }
        headerContent={
          <>
            <div className="me-10">
              <NHInput prefix={Icons.SearchIcon} placeholder="Search Prescription" />
            </div>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-8 prescriptions-card md:grid-cols-2 lg:grid-cols-4">
          {data?.map((prescriptions, index) => (
            <AppointmentCard
              key={index}
              title={
                <span className="text-[#030229] text-[18px] font-medium">
                  {prescriptions.DoctorName}
                </span>
              }
              headerContent={
                <>
                  <div className="flex items-center gap-x-3">
                    <span
                      onClick={() => handleDownload()}
                      className="cursor-pointer"
                    >
                      {Icons.Download}
                    </span>

                      <NHButton
                        isView
                        onClick={() => handlePresctiptionDetails(prescriptions)}
                      ></NHButton>
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
          {prescriptionData && (
            <PrescriptionCard
              isModalOpen={isModalOpen}
              clickEvent={true}
              onCancel={() => setIsModalOpen(false)}
              handleClose={() => setIsModalOpen(false)}
              Title="Prescription"
              handleOk={() => setIsModalOpen(false)}
              patientData={prescriptionData}
            />
          )}
        </NHCard>
      </div>
    </>
  );
};
