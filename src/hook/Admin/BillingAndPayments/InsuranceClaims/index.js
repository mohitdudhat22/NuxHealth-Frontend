import { useState, useEffect } from 'react';
import { getInsuranceClaimBills } from '@/axiosApi/ApiHelper';
import { useNavigate } from 'react-router-dom';
import { filterByQuery } from '@/utils/FilterSearch';

export const useInsuranceClaims = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setSearchQuery] = useState('');

  const fetchClaims = async () => {
    try {
      setLoading(true);
      const response = await getInsuranceClaimBills();
      if (response) {
        setClaims(response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const filteredClaims = filterByQuery(claims, query, [
    "patientName",
    "billNumber",
    "diseaseName",
    "doctorName",
    "insuranceCompany",
    "insurancePlan",
    "billDate"
  ]);

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  const data = filteredClaims.map((claim) => ({
    key: claim._id,
    billNumber: claim.billNumber,
    doctorName: claim.doctorName,
    patientName: claim.patientName,
    diseaseName: claim.diseaseName,
    insuranceCompany: claim.insuranceCompany,
    insurancePlan: claim.insurancePlan,
    billDate: new Date(claim.billDate).toLocaleDateString(),
  }));


  return {
    claims,
    loading,
    data,
    fetchClaims,
    onSearch,
    navigate,
  };
};
