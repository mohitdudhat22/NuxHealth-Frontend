import { useState, useEffect } from "react";
import { getbillForReception } from "@/axiosApi/ApiHelper";
import { filterByQuery } from "@/utils/FilterSearch";

export const useBillingAndPayments = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setSearchQuery] = useState("");

  const fetchBills = async () => {
    try {
      setLoading(true);
      const response = await getbillForReception();
      if (response && response.status === 1) {
        setBills(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch bills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const filteredBills = filterByQuery(bills, query, [
    "billNumber",
    "patientName",
    "diseaseName",
    "phoneNumber",
    "status",
    "date",
    "time",
  ]);

  const onSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  const dataPendingBills = filteredBills.map((bill) => ({
    key: bill._id,
    billNumber: bill.billNumber,
    patientName: bill.patientName,
    diseaseName: bill.diseaseName,
    phoneNumber: bill.phoneNumber,
    status: bill.status,
    date: new Date(bill.date).toLocaleDateString(),
    time: bill.time,
  }));

  const dataClaims = filteredBills;

  return {
    loading,
    dataPendingBills,
    dataClaims,
    onSearch,
  };
};
