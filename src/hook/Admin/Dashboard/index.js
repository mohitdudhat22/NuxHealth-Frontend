import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminDoctor, adminPatient } from "@/axiosApi/ApiHelper";
import Cookies from "js-cookie";

export const useDashboard = () => {
  const navigate = useNavigate();
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);

  const fetchData = async () => {
    const [patientsRes, doctorsRes] = await Promise.all([
      adminPatient(),
      adminDoctor(),
    ]);

    if (patientsRes && patientsRes.data && Array.isArray(patientsRes.data)) {
      setTotalPatients(patientsRes.data.length);
    }

    if (doctorsRes && doctorsRes.data && Array.isArray(doctorsRes.data)) {
      setTotalDoctors(doctorsRes.data.length);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    totalPatients,
    totalDoctors,
    navigate,
  };
};
