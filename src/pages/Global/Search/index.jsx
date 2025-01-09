import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ReceptionData } from "./ReceptionData";
import { DoctorData } from "./DoctorData";
import { PatientData } from "./PatientData";
import { useGlobalSearch } from "@/hook";

export const GlobalSearch = () => {
  const location = useLocation();
  const [role, setRole] = useState("");

  const { doctorData, patientData, receptionData, loading, error } =
    useGlobalSearch(role);

  const isDoctor = location.pathname.startsWith("/doctor");
  const isPatient = location.pathname.startsWith("/patient");
  const isReception = location.pathname.startsWith("/reception");

  console.log(doctorData, ":::::::doctorData");
  console.log(patientData, ":::::::patientData");
  console.log(receptionData, ":::::::receptionData");

  return (
    <div>
      {isDoctor && <DoctorData tableData={doctorData} loading={loading} />}
      {isPatient && <PatientData tableData={patientData} loading={loading} />}
      {isReception && (
        <ReceptionData tableData={receptionData} loading={loading} />
      )}
      {!isDoctor && !isPatient && !isReception && (
        <>
          <DoctorData tableData={DoctorData} loading={loading} />
          <PatientData tableDat={PatientData} loading={loading} />
          <ReceptionData tableDat={ReceptionData} loading={loading} />
        </>
      )}
    </div>
  );
};
