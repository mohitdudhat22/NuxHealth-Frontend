import { useState, useEffect } from "react";
import { adminDoctor } from "@/axiosApi/ApiHelper";
import { useNavigate } from "react-router-dom";
import { filterByQuery } from "@/utils/FilterSearch";

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
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredDoctors = filterByQuery(doctors, searchQuery, [
    "fullName",
    "gender",
    "metaData.doctorData.speciality",
    "metaData.doctorData.qualification",
  ]);

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
    searchQuery,
  };
};
