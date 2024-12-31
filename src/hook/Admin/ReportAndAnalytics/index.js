import { useEffect, useState } from 'react';
import { getReportandAnalytics } from '@/axiosApi/ApiHelper';

export const useReportandAnalytics = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const fetchData = async () => {
    const data = await getReportandAnalytics();
    console.log(data);
    setDashboardData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const data = {  
  }
  return { data };
};
