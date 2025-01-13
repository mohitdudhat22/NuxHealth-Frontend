import { patientPrescriptionData } from "@/axiosApi/ApiHelper";
import React, { useState, useEffect } from "react";

export const usePatientPrescriptionData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrescriptionData = async (role) => {
            try {
                setLoading(true);
                
                const response = await patientPrescriptionData(role);
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
        const url = window.location.href;
        if (url.includes("reception")) {
            fetchPrescriptionData("receptionist");
        }else{
            fetchPrescriptionData("patient");
        }
    }, []);

    return { loading, error, data };
};