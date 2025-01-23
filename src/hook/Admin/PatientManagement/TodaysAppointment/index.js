import { useState, useEffect } from "react";
import { todaysAppointmentForAdmin } from "@/axiosApi/ApiHelper";
import { user } from "@/assets/images";
import { filterByQuery } from "@/utils/FilterSearch";

export const useTodaysAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAppointments = async () => {
    try {
      const response = await todaysAppointmentForAdmin();

      if (response && response?.data) {
        setAppointments(response?.data?.appointments);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = filterByQuery(appointments, searchQuery, [
    "patientId.fullName",
    "dieseas_name",
    "doctorId.fullName",
    "type",
  ]);

  const onSearch = (query) => {
    setSearchQuery(query);
  };

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

  return { data, loading, onSearch };
};
