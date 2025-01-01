import { useState, useEffect } from "react";
import { adminDoctor } from "@/axiosApi/ApiHelper";
import { useNavigate } from "react-router-dom";

export const useDoctorManagement = () => {
  let navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await adminDoctor();
      if (response.status === 1) {
        setDoctors(response.data);
        console.log("Doctors:", response.data.length);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor?.doctorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor?.specialty?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor?.gender?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  const data = filteredDoctors?.map((doctor) => ({
    key: doctor?._id,
    avatar: doctor?.profilePicture,
    doctorName: doctor?.fullName,
    gender: doctor?.gender,
    qualification: doctor?.metaData?.doctorData?.qualification,
    specialty: doctor?.metaData?.doctorData?.speciality,
    sessionDuration: doctor?.metaData?.doctorData?.duration + " min",
    morningSession: doctor?.metaData?.doctorData?.morningSession,
    eveningSession: doctor?.metaData?.doctorData?.eveningSession,
  }));

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return {
    doctors,
    isDrawerVisible,
    loading,
    openDrawer,
    closeDrawer,
    data,
    fetchDoctors,
    navigate,
    onSearch,
  };
};
