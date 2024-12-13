import { useContext } from "react";
import { PatientContext } from "../context/PatientContext";
export const usePatient = () => useContext(PatientContext);
