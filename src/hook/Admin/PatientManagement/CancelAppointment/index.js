import { useState, useEffect } from "react";
import { cancelAppointmentForAdmin } from "@/axiosApi/ApiHelper";
import {user} from "@/assets/images";
import { filterByQuery } from "@/utils/FilterSearch";

export const useCancelAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAppointments = async () => {
    try {
      const response = await cancelAppointmentForAdmin();
      console.log("API Response:", response);

      if (response && response?.data) {
        setAppointments(response?.data?.appointments);
        console.log(response.data.appointments);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = filterByQuery(appointments, searchQuery, [
    "patientId.fullName",
    "dieseas_name",
    "doctorId.fullName",
    "type"
  ]);
  console.log("Filtered Appointments", filteredAppointments);

  const onSearch = (query) => {
    setSearchQuery(query);
  }


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
