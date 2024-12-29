import { useState, useEffect } from 'react';
import { getbill } from '@/axiosApi/ApiHelper';
import { useNavigate } from 'react-router-dom';

export const useBillingAndPayments = () => {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const response = await getbill();
      if (response) { 
        setBills(response.data); 
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const data = bills?.map((bill) => ({
    key: bill?._id, 
    billNumber: bill?.billNumber,
    patientName: bill?.patientName,
    diseaseName: bill?.diseaseName,
    phoneNumber: bill?.phoneNumber,
    status: bill?.status ? 'Paid' : 'Unpaid',
    date: new Date(bill?.date).toLocaleDateString(),
    time: bill?.time,
  }));

  console.log(data, "data>>>>>>>>>>>>");

  return {
    bills,
    loading,
    data,
    fetchBills,
    navigate
  };
};
