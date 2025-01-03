import { useState, useEffect } from "react";
import { todaysAppointmentForDoctor } from "@/axiosApi/ApiHelper";
import {user} from "@/assets/images";

export const useTodayAppointment= () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await todaysAppointmentForDoctor();
      console.log("API Response:", response);

      if (response && response?.data) {
        setAppointments(response?.data?.appointments);
        console.log(response.data.appointments);
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

  console.log(data)

  useEffect(() => {
    fetchAppointments();
  }, []);

  return { data, loading };
};
