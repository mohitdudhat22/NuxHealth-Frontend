import { useState, useEffect } from "react";
import { previousAppointmentForAdmin } from "@/axiosApi/ApiHelper";
import { user } from "@/assets/images";
import { filterByQuery } from "@/utils/FilterSearch";

export const usePreviousAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAppointments = async () => {
    try {
      const response = await previousAppointmentForAdmin();
      console.log("API Response:", response);

      if (response && response?.data) {
        setAppointments(response?.data?.appointments);
        console.log(response.data.appointments);
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

  const filteredAppointments = filterByQuery(mappedAppointments, searchQuery, [
    "diseaseName",
    "patientName",
    "doctorName",
    "appointmentType"
  ]);

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return { data: filteredAppointments, loading, onSearch };
};