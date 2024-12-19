import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useGlobal } from "@/hooks/useGlobal";
import {
  GetallAppointmentsForCount,
  GetAllDoctors,
  GetAllPatients,
  GetAllTodayAppointments,
} from "@/axiosApi/ApiHelper";

const useDashboardData = () => {
  const { getBills, allBills } = useGlobal();
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          appointmentsResponse,
          todaysAppointmentsResponse,
          patientsResponse,
          doctorsResponse,
        ] = await Promise.all([
          GetallAppointmentsForCount(),
          GetAllTodayAppointments(),
          GetAllPatients(),
          GetAllDoctors(),
        ]);

        if (appointmentsResponse) {
          setTotalAppointments(appointmentsResponse);
        } else {
          console.error("Unexpected response structure:", appointmentsResponse);
          setTotalAppointments(0);
        }

        const today = new Date().toISOString().split("T")[0];
        const filteredAppointments = todaysAppointmentsResponse.data?.filter(
          (appointment) => {
            const appointmentDate = new Date(appointment.date)
              .toISOString()
              .split("T")[0];
            return appointmentDate === today;
          }
        );
        setTodaysAppointments(filteredAppointments);
        console.log(filteredAppointments);

        setTotalPatients(patientsResponse?.data?.length || 0);
        setTotalDoctors(doctorsResponse?.data?.length || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
    };

    fetchData();
    getBills();
  }, []);

  return {
    totalAppointments,
    todaysAppointments,
    totalPatients,
    totalDoctors,
    allBills,
  };
};

export default useDashboardData;
