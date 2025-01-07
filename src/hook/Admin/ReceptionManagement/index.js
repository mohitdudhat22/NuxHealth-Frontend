import { useState, useEffect } from 'react';
import { adminReceptionist, DeleteData } from '@/axiosApi/ApiHelper';
import { useNavigate } from 'react-router-dom';
import { filterByQuery } from '@/utils/FilterSearch';

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

  const filteredReception = filterByQuery(reception, searchQuery, [
    "fullName",
    "gender",
    "metaData.receptionistData.qualification",
    "age",
    "email",
    "phone"
  ]);

  const onSearch = (query) => {
    setSearchQuery(query);
  }

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

  return {
    reception,
    loading,
    data,
    searchQuery,
    onSearch,
    fetchReception
  };
};