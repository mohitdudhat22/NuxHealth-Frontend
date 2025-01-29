import { todaysTeleconsultationAccessForPatient, getAppointmentsTeleconsultationWithFromAndToForPatient } from "@/axiosApi/ApiHelper";
import { useState, useEffect } from "react";

export const useTodaysTeleconsultationModule = () => {

  const [data, setData] = useState([]);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await todaysTeleconsultationAccessForPatient();
      if (response && response?.data) {
        setData(response?.data?.appointments);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

      const filterAppointments = async(fromDate, toDate) => {
          if (fromDate && toDate) {
            const startDate = new Date(fromDate).toISOString().split('T')[0];
            const endDate = new Date(toDate).toISOString().split('T')[0];
            const response = await getAppointmentsTeleconsultationWithFromAndToForPatient(startDate, endDate);
            console.log(response);
            setData(response.data.appointments);
          } else {
            fetchData();
          }
          setIsDateModalOpen(false);
        };


  return { data,filterAppointments,setIsDateModalOpen,isDateModalOpen };
};
