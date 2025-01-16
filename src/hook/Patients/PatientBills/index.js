import { getPaidBills } from '@/axiosApi/ApiHelper';
import { useEffect, useState } from 'react';

export const usePatientPaidBills = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await getPaidBills();
            setData(response.data);
        } catch (error) {
            console.error("Error in fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return { data };
};