import { useEffect, useState } from 'react';
import { getReportandAnalytics } from '@/axiosApi/ApiHelper';

export const useReportandAnalytics = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await getReportandAnalytics();
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data };
};