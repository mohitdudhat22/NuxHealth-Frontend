import { useEffect, useState } from "react";
import { getDashboardAndReport, getDashboardAndReportForReceptionist } from "@/axiosApi/ApiHelper";
import { useDecodeToken } from "@/hook/useDecodeToken";

export const useDashboardAndReport = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("reception")) {
      fetchData("receptionist");
    }else{
      fetchData("admin");
    }
  }, []);
  const fetchData = async (role) => {
      const response = await getDashboardAndReport(role);
      setDashboardData(response.data);
  };

  const data = {
    totalPatients: dashboardData?.patientSummary?.totalPatients,
    totalDoctors: dashboardData?.totalDoctors,
    pendingBills: dashboardData?.UnpaindBills,
    todaysTotalAppointments: dashboardData?.todayAppointments,
    patientSummary: {
      totalPatients: dashboardData?.patientSummary?.totalPatients,
      totalOldPatients: dashboardData?.patientSummary?.oldPatients,
      totalNewPatients: dashboardData?.patientSummary?.newPatients,
    },
    patientStats: dashboardData?.patientStats,
    appointments: dashboardData?.appointments.map((appointment) => ({
      patientName: appointment.patientId.fullName,
      doctorName: appointment.doctorId.fullName,
      appointmentTime: appointment.appointmentTime,
      type: appointment.type,
      diseaseName: appointment.dieseas_name,
    })),
    billdata: dashboardData?.billdata,
  };
  return { data };
};
