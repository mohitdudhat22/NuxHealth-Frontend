import { useState, useEffect } from 'react';
import { getSinglePatientForAdmin } from '@/axiosApi/ApiHelper';

export const usePatientDetails = (patientId, isModalOpen) => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isModalOpen && patientId) {
      const fetchPatientDetails = async () => {
        setLoading(true);
        try {
          const response = await getSinglePatientForAdmin(patientId);
          setPatientData(response.data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchPatientDetails();
    }
  }, [patientId, isModalOpen]);

  return { patientData, loading, error };
};
