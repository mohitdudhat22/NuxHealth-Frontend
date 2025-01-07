import { useState, useEffect } from "react";
import { patientDashboard } from "@/axiosApi/ApiHelper";

export const usePatientDashboardData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const response = await patientDashboard();
                if (response.status === "success") {
                    setData(response.data);
                } else {
                    throw new Error(response.data?.message || "Failed to fetch data");
                }
            } catch (err) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return { data, loading, error };
};