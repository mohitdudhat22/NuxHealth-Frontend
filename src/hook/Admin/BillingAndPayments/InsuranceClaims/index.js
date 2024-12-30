import { useState, useEffect } from 'react';
import { getInsuranceClaimBills } from '@/axiosApi/ApiHelper';
import { useNavigate } from 'react-router-dom';

export const useInsuranceClaims = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredClaims = claims.filter((claim) =>
    claim.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return {
    claims,
    loading,
    data,
    fetchClaims,
    handleSearch,
    navigate,
  };
};
