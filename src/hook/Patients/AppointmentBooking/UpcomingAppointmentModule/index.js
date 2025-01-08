import { penddingAppointmentsForPatient } from "@/axiosApi/ApiHelper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUpcomingAppoinmentBookings = () => {
  let navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await penddingAppointmentsForPatient();
      if (response.status === 1) {
        setAppointments(response.data.appointments);
        console.log('Today’s Appointments:', response.data.length);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // const filteredAppointments = appointments.filter((appointment) =>
  // (appointment?.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     appointment?.appointmentType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     appointment?.status?.toLowerCase().includes(searchQuery.toLowerCase()))
  // );

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  const data = appointments?.map((appointment) => ({
    key: appointment?._id,
    patientName: appointment?.patientId?.fullName,
    appointmentType: appointment?.type,
    appointmentDate: appointment?.date,
    patientAge: appointment?.patientAge || '28',
    patientGender: appointment?.gender,
    patientIssue: appointment?.patient_issue,
    diseaseName: appointment?.dieseas_name,
    doctorName: appointment?.doctorId?.fullName,
    hospitalName: appointment?.hospitalId?.name,
    appointmentTime: appointment?.appointmentTime,
    status: appointment?.status,
  }));

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return {
    appointments,
    isDrawerVisible,
    loading,
    openDrawer,
    closeDrawer,
    data,
    fetchAppointments,
    navigate,
    onSearch,
  };
};
