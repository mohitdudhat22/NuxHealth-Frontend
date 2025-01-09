import { useState, useEffect } from "react";
import { SearchHeader } from "@/axiosApi/ApiHelper";
import { useSearch } from "@/context";

export const useGlobalSearch = (role) => {
  const { searchValue } = useSearch();

  const [doctorData, setDoctorData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [receptionData, setReceptionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await SearchHeader(searchValue, role);
        const data = response.data;
        console.log(response);

        if (role === "doctor") {
          setDoctorData(data);
        } else if (role === "patient") {
          setPatientData(data);
        } else if (role === "reception") {
          setReceptionData(data);
        } else {
          setDoctorData(data.doctors || []);
          setPatientData(data.patients || []);
          setReceptionData(data.receptions || []);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [role]);

  return { doctorData, patientData, receptionData, loading, error };
};
