import { useState, useEffect } from "react";
import { getSinglePatientDashboard, patientDashboard } from "@/axiosApi/ApiHelper";
import { useParams } from "react-router-dom";

export const usePatientDashboardData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams()
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const url = window.location.href;
                const role = url.includes("reception") ? "receptionist" : "patient"
                const response = await getSinglePatientDashboard(id,role);
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