import { useState, useEffect } from "react";
import { getCancleTeleconsultation } from "@/axiosApi/ApiHelper";
import { useNavigate } from "react-router-dom";

export const useCancleTeleconsultation = () => {
  let navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await getCancleTeleconsultation();
      if (response.status === 1) {
        setAppointments(response.data.appointments);
        console.log("Today’s Appointments:", response.data.length);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appointment) => {
    const patientName = appointment?.patientId?.fullName || "";
    const appointmentType = appointment?.appointmentType || "";
    const status = appointment?.status || "";

    return (
      patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointmentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  const data = filteredAppointments?.map((appointment) => ({
    key: appointment?._id,
    patientName: appointment?.patientId?.fullName,
    appointmentType: appointment?.appointmentType,
    appointmentDate: appointment?.date,
    patientAge: appointment?.patientAge || "28",
    patientGender: appointment?.gender,
    patientIssue: appointment?.patient_issue,
    diseaseName: appointment?.dieseas_name,
    doctorName: appointment?.doctorId?.fullName,
    appointmentTime: appointment?.appointmentTime,
    status: appointment?.status,
  }));

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return {
    appointments: filteredAppointments,
    isDrawerVisible,
    loading,
    openDrawer,
    closeDrawer,
    data,
    fetchAppointments,
    navigate,
    onSearch,
    searchQuery,
  };
};
