import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGlobalSearch } from "@/hook/Global";
import DoctorData from "./DoctorData";
import PatientData from "./PatientData";
import { NHCard } from "@/components";
import { ReceptionData } from "./ReceptionData";

export const GlobalSearch = () => {
  const location = useLocation();
  const [role, setRole] = useState("");

  const { doctorData, patientData, receptionData, loading, error } =
    useGlobalSearch();

  console.log(patientData);

  const isPatient = location.pathname.startsWith("/patient");

  return (
    <>
      {isPatient && (
        <NHCard title="Patients" className="w-full">
          <DoctorData tableData={doctorData} loading={loading} />
        </NHCard>
      )}
      {/* <DoctorData tableData={DoctorData} loading={loading} /> */}
      {/* {isDoctor && <DoctorData tableData={doctorData} loading={loading} />}
      {isReception && (
        <ReceptionData tableData={receptionData} loading={loading} />
      )}
      {!isDoctor && !isPatient && !isReception && (
         */}
      <div className="flex flex-col gap-xl">
        <NHCard title="Doctors" className="w-full">
          <DoctorData tableData={doctorData} loading={loading} />
        </NHCard>
        <NHCard title="Patients" className="w-full">
          <PatientData tableData={patientData} loading={loading} />
        </NHCard>
        <NHCard title="Reception" className="w-full">
          <ReceptionData tableData={receptionData} loading={loading} />
        </NHCard>
      </div>
      {/*
       )} */}
    </>
  );
};
