import { useState, useEffect } from "react";
import { SearchHeader } from "@/axiosApi/ApiHelper";
import { useLocation } from "react-router-dom";
import { useSearch } from "@/context";

export const useGlobalSearch = (role) => {
  const location = useLocation();
  const { searchValue } = useSearch();

  const [doctorData, setDoctorData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [receptionData, setReceptionData] = useState([]);
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
        
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchValue, role]);

  return { doctorData, patientData, receptionData, loading, error };
};
