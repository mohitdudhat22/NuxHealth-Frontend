
import { getUnpaidBills } from '@/axiosApi/ApiHelper';
import { useEffect, useState } from 'react';

export const usePatientUnpaidBills = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await getUnpaidBills();
            console.log("Data fetched:", response);
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