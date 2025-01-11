import { olderManagePriscription } from "@/axiosApi/ApiHelper";
import React, { useEffect, useState } from "react";

export const useOlderManagePrescription = (id) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await olderManagePriscription();
        console.log("API Response:", response);

        if (response && response.data) {
          setData(response.data);
          console.log("Appointments:", response.data.appointments);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    fetchData();
  }, [id]); // Include `id` if it's a dependency.

  return { data, error };
};
