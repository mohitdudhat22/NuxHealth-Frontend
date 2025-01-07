import { todaysTeleconsultationAccessForPatient } from "@/axiosApi/ApiHelper";
import { useState, useEffect } from "react";

export const useTodaysTeleconsultationModule = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await todaysTeleconsultationAccessForPatient();
        console.log("API Response:", response);

        if (response && response?.data) {
          setData(response?.data?.appointments);
          console.log(response.data.appointments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return { data };
};