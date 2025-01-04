import { patientPrescriptionData } from "@/axiosApi/ApiHelper";
import React, { useState, useEffect } from "react";

export const usePatientPrescriptionData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrescriptionData = async () => {
            try {
                setLoading(true);
                const response = await patientPrescriptionData();
                if (response.status === 1) {
                    setData(response.data);
                } else {
                    setError("Failed to Prescription Data");
                }
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchPrescriptionData();
    }, []);

    return { loading, error, data };
};


