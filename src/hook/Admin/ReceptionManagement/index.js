import { useState, useEffect } from 'react';
import { adminReceptionist, DeleteData } from '@/axiosApi/ApiHelper';
import { useNavigation } from 'react-router-dom';

export const useReceptionManagement = () => {
  const navigation = useNavigation();
  const [reception, setReception] = useState([]);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const fetchReception = async () => {
    setLoading(true);
    const response = await adminReceptionist();
    if (response.status === 1) {
      setReception(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReception()
  }, []);

  const data = reception?.map((reception) => ({
    key: reception?._id,
    receptionistName: reception?.fullName,
    gender: reception?.gender,
    qualification: reception?.metaData?.receptionistData?.qualification,
    age: reception?.age,
    email: reception?.email,
    phone: reception?.phone,
  }));

  return {
    reception,
    isDrawerVisible,
    loading,
    openDrawer,
    closeDrawer,
    data,
    navigation,
    fetchReception
  };
};
