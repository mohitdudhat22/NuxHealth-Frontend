import { olderManagePriscription } from "@/axiosApi/ApiHelper";
import React, { useEffect, useState } from "react";

export const useOlderManagePrescription = (id) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await olderManagePriscription();
        if (response && response.data) {
          setData(response.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    fetchData();
  }, [id]);

  return { data, error };
};
