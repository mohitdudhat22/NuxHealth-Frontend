import { useEffect, useState } from 'react';
import { getDashboardAndReport } from '@/axiosApi/ApiHelper';
import { Teleconsultation } from '@/pages';

export const useDashboardAndReport = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const fetchData = async () => {
    const response = await getDashboardAndReport();
    setDashboardData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const data = {
    totalPatients: dashboardData?.patientSummary?.totalPatients,
    totalDoctors: dashboardData?.totalDoctors,
    pendingBills: dashboardData?.UnpaindBills,
    todaysTotalAppointments: dashboardData?.todayAppointments,
    patientSummary:{
        totalPatients:dashboardData?.patientSummary?.totalPatients,
        totalOldPatients:dashboardData?.patientSummary?.oldPatients,
        totalNewPatients:dashboardData?.patientSummary?.newPatients,
    },
    patientStats:dashboardData?.patientStats,
    appointments: dashboardData?.appointments.map(appointment => ({
      patientName: appointment.patientId.fullName,
      doctorName: appointment.doctorId.fullName,
      appointmentTime: appointment.appointmentTime,
      type: appointment.type,
      diseaseName: appointment.dieseas_name
  })),
  billdata: dashboardData?.billdata
  }
  return { data };
};
