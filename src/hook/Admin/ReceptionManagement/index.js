import { useState, useEffect } from 'react';
import { adminReceptionist, DeleteData } from '@/axiosApi/ApiHelper';
import { useNavigate } from 'react-router-dom';

export const useReceptionManagement = () => {
  const navigate = useNavigate();
  const [reception, setReception] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchReception = async () => {
    setLoading(true);
    try {
      const response = await adminReceptionist();
      if (response.status === 1) {
        setReception(response.data);
      }
    } catch (error) {
      console.error("Error fetching reception data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReception();
  }, []);

   const filteredReception = reception.filter((reception) =>
    String(reception?.fullName).toLowerCase().includes(String(searchQuery).toLowerCase()) ||
    String(reception?.email).toLowerCase().includes(String(searchQuery).toLowerCase()) ||
    String(reception?.phone).toLowerCase().includes(String(searchQuery).toLowerCase())
  );
  
  const data = filteredReception.map((reception) => ({
    key: reception?._id,
    avatar: reception?.profilePicture,
    receptionistName: reception?.fullName,
    gender: reception?.gender,
    qualification: reception?.metaData?.receptionistData?.qualification,
    age: reception?.age,
    email: reception?.email,
    phone: reception?.phone,
  }));

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  return {
    reception,
    loading,
    data,
    searchQuery,
    onSearch,
    fetchReception
  };
};
