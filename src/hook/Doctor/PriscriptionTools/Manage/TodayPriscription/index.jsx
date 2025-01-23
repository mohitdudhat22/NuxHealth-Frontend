import { todayManagePriscription } from "@/axiosApi/ApiHelper";
import React, { useEffect, useState } from "react";

export const useTodayManagePriscription = (id) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await todayManagePriscription();

        if (response && response.data) {
          setData(response.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    fetchData();
  }, [id]); // Include `id` if it's a dependency.

  const filteredData = data.filter((item) => {
    const patientName = item?.patientName || "";
    const patientNumber = item?.patientNumber || "";
    const appointmentType = item?.appointmentType || "";

    return (
      patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patientNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointmentType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  return { data: filteredData, error, onSearch, searchQuery };
};
