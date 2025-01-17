import { useState, useEffect } from "react";
import { cancelAppointmentForDoctor } from "@/axiosApi/ApiHelper";
import { user } from "@/assets/images";

export const useCancelAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await cancelAppointmentForDoctor();

      if (response && response?.data) {
        setAppointments(response?.data?.appointments);
      }
    } finally {
      setLoading(false);
    }
  };

  const data = appointments?.map((appointment) => ({
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

  return { data, loading };
};
