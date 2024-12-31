import { useState, useEffect } from 'react';
import { adminDoctor, adminPatient } from '@/axiosApi/ApiHelper';

export const useCreateBill = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsResponse = await adminPatient();
        const doctorsResponse = await adminDoctor();
        setPatients(patientsResponse.data);
        setDoctors(doctorsResponse.data);
      } catch (error) {
        setError("Error fetching patients or doctors");
      }
    };
    fetchData();
  }, []);

  const getPatientById = async (patientId) => {
    try {
      const patient = await adminPatient({ params: { id: patientId } });
      return patient.data;
    } catch (error) {
      setError("Error fetching patient details");
    }
  };

  const submitBill = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Here you would call the appropriate function to create the bill
      // Example:
      // await createBill(formData);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    submitBill,
    patients,
    doctors,
    getPatientById,
  };
};
