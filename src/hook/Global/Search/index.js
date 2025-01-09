import { useState, useEffect } from "react";
import { SearchHeader } from "@/axiosApi/ApiHelper";
import { useLocation } from "react-router-dom";
import { useSearch } from "@/context";

export const useGlobalSearch = (role) => {
  const location = useLocation();
  const { searchValue } = useSearch();

  const [doctorData, setDoctorData] = useState([]);
  const [patientData, setPatientData] = useState();
  const [receptionData, setReceptionData] = useState();
  const [fullDoctorData, setFullDoctorData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const effectiveRole = location.pathname.startsWith("/patient")
    ? "doctor"
    : role;

  const fetchData = async () => {
    if (searchValue.length > 0) {
      setLoading(true);
      setError(null);
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
        setPatientData(patientData);
        setReceptionData(receptionData);
        setFullDoctorData(doctorData);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchValue]);

  return {
    doctorData,
    patientData,
    receptionData,
    fullDoctorData,
    loading,
    error,
  };
};
