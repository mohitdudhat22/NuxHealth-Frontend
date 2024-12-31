import { useState, useEffect } from 'react';
import { todaysAppointment } from '@/axiosApi/ApiHelper'; // Assuming this is your API function

export const useTodayAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await todaysAppointment();  // API call to fetch today's appointments
        setAppointments(data);  // Assuming the response is an array of appointment data
      } catch (error) {
        setError(error);
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return { appointments, loading, error };
};
