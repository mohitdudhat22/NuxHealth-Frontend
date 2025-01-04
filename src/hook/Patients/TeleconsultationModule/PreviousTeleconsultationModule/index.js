import { useState, useEffect } from "react";
import { previousTeleconsultationAccessForPatient } from "@/axiosApi/ApiHelper";

export const usePreviousTeleconsultationModule = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await previousTeleconsultationAccessForPatient();
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
