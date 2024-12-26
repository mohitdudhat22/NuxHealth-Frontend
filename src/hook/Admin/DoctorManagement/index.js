import { useState, useEffect } from 'react';
import { adminDoctor } from '@/axiosApi/ApiHelper';

export const useDoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {

      setLoading(true);
      const response = await adminDoctor();
      if (response.status === 1) {
        setDoctors(response.data);
      }
      setLoading(false);
    };

    fetchDoctors();
  }, []);

  const data = doctors?.map((doctor) => ({
    key: doctor?._id,
    doctorName: doctor?.fullName,
    gender: doctor?.gender,
    qualification: doctor?.metaData?.doctorData?.qualification,
    specialty: doctor?.metaData?.doctorData?.speciality,
    workingTime: doctor?.metaData?.doctorData?.duration + " Hours",
    patientCheckUpTime: doctor?.metaData?.doctorData?.morningSession + " Hours",
    breakTime: doctor?.metaData?.doctorData?.eveningSession + " Hours",
  }));

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return {
    doctors,
    isDrawerVisible,
    loading,
    openDrawer,
    closeDrawer,
    data
  };
};
