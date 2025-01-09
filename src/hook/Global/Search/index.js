import { useState, useEffect } from "react";
import { SearchHeader } from "@/axiosApi/ApiHelper";
import { useLocation } from "react-router-dom";
import { useSearch } from "@/context";

export const useGlobalSearch = () => {
  const location = useLocation();
  const { searchValue, role } = useSearch();

  const [doctorData, setDoctorData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [receptionData, setReceptionData] = useState([]);
  const [fullDoctorData, setFullDoctorData] = useState([]);
  const [fullPatientData, setFullPatientData] = useState([]);
  const [fullReceptionData, setFullReceptionData] = useState([]);
  const [loading, setLoading] = useState(false);

  const effectiveRole = location.pathname.startsWith("/patient")
    ? "doctor"
    : role;

  const fetchData = async () => {
    if (searchValue.length > 0) {
      setLoading(true);
      try {
        const response = await SearchHeader(searchValue, effectiveRole);
        const data = response.data;
        const doctorData = data?.filter((item) => item.role === "doctor");
        const patientData = data?.filter((item) => item.role === "patient");
        const receptionData = data?.filter(
          (item) => item.role === "receptionist"
        );

        setDoctorData(
          doctorData?.map((doctor) => ({
            key: doctor?._id,
            avatar: doctor?.profilePicture,
            doctorName: doctor?.fullName,
            gender: doctor?.gender,
            qualification: doctor?.metaData?.doctorData?.qualification,
            specialty: doctor?.metaData?.doctorData?.speciality,
            sessionDuration: doctor?.metaData?.doctorData?.duration + " min",
            morningSession: doctor?.metaData?.doctorData?.morningSession,
            eveningSession: doctor?.metaData?.doctorData?.eveningSession,
          }))
        );
        setPatientData(
          patientData?.map((patient) => ({
            key: patient._id,
            name: patient.fullName,
            number: patient.phone,
            appointmentType: patient.metaData?.appointmentType || "null",
            appointmentDate: patient.metaData?.appointmentDate || "null",
            appointmentTime: patient.metaData?.appointmentTime || "null",
            age: patient.age,
            gender: patient.gender,
          }))
        );
        setReceptionData(
          receptionData?.map((receptionist) => ({
            key: receptionist._id,
            avatar: receptionist.profilePicture,
            receptionistName: receptionist.fullName,
            email: receptionist.email,
            phone: receptionist.phone,
            gender: receptionist.gender,
            qualification:
              receptionist.metaData?.receptionistData?.qualification,
            age: receptionist.age,
          }))
        );
        setFullDoctorData(doctorData);
        setFullPatientData(patientData);
        setFullReceptionData(receptionData);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchValue, role]);

  return {
    doctorData,
    patientData,
    receptionData,
    fullDoctorData,
    fullPatientData,
    fullReceptionData,
    loading,
  };
};
