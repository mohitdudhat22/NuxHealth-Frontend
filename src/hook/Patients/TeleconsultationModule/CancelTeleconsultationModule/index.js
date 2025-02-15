import { cancelTeleconsultationAccessForPatient } from "@/axiosApi/ApiHelper";
import { useState, useEffect } from "react";

export const useCancelTeleconsultationModule = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await cancelTeleconsultationAccessForPatient();
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
