import { useState, useEffect } from "react";
import { previousTeleconsultationAccessForPatient } from "@/axiosApi/ApiHelper";

export const usePreviousTeleconsultationModule = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await previousTeleconsultationAccessForPatient();
        if (response && response?.data) {
          setData(response?.data?.appointments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return { data };
};
