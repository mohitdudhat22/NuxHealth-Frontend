import { useState, useEffect } from "react";
import { upcomingAppointmentForAdmin } from "@/axiosApi/ApiHelper";
import { user } from "@/assets/images";

export const useUpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await upcomingAppointmentForAdmin();
      if (response && response?.data) {
        setAppointments(response?.data?.appointments);
      }
    } finally {
      setLoading(false);
    }
  };

  const mappedAppointments = appointments?.map((appointment) => ({
    key: appointment?._id,
    avatar: appointment?.profilePicture || user,
    diseaseName: appointment?.dieseas_name,
    patientName: appointment?.patientId?.fullName || "N/A",
    doctorName: appointment?.doctorId?.fullName || "N/A",
    appointmentTime: appointment?.appointmentTime,
    appointmentType: appointment?.type,
  }));

  const filteredAppointments = mappedAppointments.filter(
    (appointment) =>
      appointment?.diseaseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment?.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment?.doctorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment?.appointmentType?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return { data: filteredAppointments, loading, onSearch };
};
