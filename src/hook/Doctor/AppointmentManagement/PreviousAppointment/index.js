import { useState, useEffect } from "react";
import { previousAppointmentForDoctor } from "@/axiosApi/ApiHelper";
import { user } from "@/assets/images";

export const usePreviousAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAppointments = async () => {
    try {
      const response = await previousAppointmentForDoctor();
      if (response && response?.data) {
        setAppointments(response?.data?.appointments);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const patientName = appointment?.patientId?.fullName || "N/A";
    return patientName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const data = filteredAppointments?.map((appointment) => ({
    key: appointment?._id,
    avatar: appointment?.profilePicture || user,
    diseaseName: appointment?.dieseas_name,
    patientName: appointment?.patientId?.fullName || "N/A",
    doctorName: appointment?.doctorId?.fullName || "N/A",
    appointmentTime: appointment?.appointmentTime,
    appointmentType: appointment?.type,
  }));

  useEffect(() => {
    fetchAppointments();
  }, []);

  return { data, loading, searchQuery, setSearchQuery, onSearch };
};
