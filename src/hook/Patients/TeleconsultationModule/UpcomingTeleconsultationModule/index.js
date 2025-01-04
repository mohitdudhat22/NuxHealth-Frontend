import { upcomingTeleconsultationAccessForPatient } from "@/axiosApi/ApiHelper";
import { useEffect, useState } from "react";

export const useUpcomingTeleconsultationModule = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await upcomingTeleconsultationAccessForPatient();
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
