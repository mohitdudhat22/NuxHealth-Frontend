import { getAllUnpaidBills } from "@/axiosApi/ApiHelper";
import React, { useState, useEffect } from "react";

export const usePendingBills = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                setLoading(true);
                const response = await getAllUnpaidBills();
                if (response.status === 1) {
                    setBills(response.data.bills);
                } else {
                    setError("Failed to fetch bills");
                }
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchBills();
    }, []);

    return { loading, error, bills };
};