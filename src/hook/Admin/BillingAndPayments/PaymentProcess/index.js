import { useState, useEffect } from 'react';
import { getbill } from '@/axiosApi/ApiHelper';
import { useNavigate } from 'react-router-dom';

export const usePaymentProcess = () => {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBillingDetails = async () => {
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
    fetchBillingDetails();
  }, []);

  // Filter bills based on searchQuery
  const filteredBills = bills.filter((bill) =>
    bill.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.diseaseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.phoneNumber.includes(searchQuery)
  );

  const data = filteredBills.map((bill) => ({
    key: bill?.billNumber,
    billNumber: bill?.billNumber,
    patientName: bill?.patientName,
    diseaseName: bill?.diseaseName,
    phoneNumber: bill?.phoneNumber,
    status: bill?.status ? 'Paid' : 'Unpaid',
    date: new Date(bill?.date).toLocaleDateString(),
    time: bill?.time,
  }));

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  const onEdit = (record) => {
    console.log("Edit record:", record);
    navigate(`/admin/payment-process/edit-bill/${record.key}`);
  };

  const onViewDetails = (record) => {
    console.log("View details for:", record);
  };

  const onPayment = (record) => {
    console.log("Payment record:", record);
    setIsModalOpen(true);
  };

  return {
    bills,
    loading,
    data,
    fetchBillingDetails,
    navigate,
    onSearch,
    isModalOpen,
    setIsModalOpen,
    onEdit,
    onViewDetails,
    onPayment,
  };
};
