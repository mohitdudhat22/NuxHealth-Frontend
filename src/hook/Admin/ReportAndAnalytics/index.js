import { useEffect, useState } from 'react';
import { getReportandAnalytics } from '@/axiosApi/ApiHelper';

export const useReportandAnalytics = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const data = await getReportandAnalytics();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data };
};