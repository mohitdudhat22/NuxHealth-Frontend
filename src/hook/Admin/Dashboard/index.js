import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { adminDoctor, adminPatient } from '@/axiosApi/ApiHelper';

export const useDashboard = () => {
  const navigate = useNavigate();
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [patientsRes, doctorsRes] = await Promise.all([
        adminPatient(),
        adminDoctor()
      ]);
      if (patientsRes && patientsRes.data && Array.isArray(patientsRes.data)) {
        setTotalPatients(patientsRes.data.length);
        console.log('Total Patients:', patientsRes.data.length);    
      } else {
        console.error('Unexpected patients response structure:', patientsRes);
      }

      if (doctorsRes && doctorsRes.data && Array.isArray(doctorsRes.data)) {
        setTotalDoctors(doctorsRes.data.length);
        console.log('Total Doctors:>>>>>>>>>>', doctorsRes.data.length);
      } else {
        console.error('Unexpected doctors response structure:', doctorsRes);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    totalPatients,
    totalDoctors,
    loading,
    navigate
  };
};
