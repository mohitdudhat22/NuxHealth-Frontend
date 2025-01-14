import { useState, useEffect } from "react";
import { getSinglePatientDashboard, patientDashboard } from "@/axiosApi/ApiHelper";
import { useParams } from "react-router-dom";
import { useDecodeToken } from "@/hook/useDecodeToken";

export const usePatientDashboardData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const {token} = useDecodeToken();
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const url = window.location.href;
                const role = url.includes("reception") ? "receptionist" : "patient"
                    const response = (id) ? await getSinglePatientDashboard(id ,role) : await patientDashboard();
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
    }, [token]);

    return { data, loading, error };
};