import { scheduledAppointmentsForPatient } from "@/axiosApi/ApiHelper";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useTodaysAppoinmentBookings = () => {
  let navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAppointments = async (role) => {
    try {
      setLoading(true);
      const response = await scheduledAppointmentsForPatient(role);
      if (response.status === 1) {
        setAppointments(response.data.appointments);
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const url = window.location.href;
    if (url.includes("reception")) {
      fetchAppointments("receptionist");
    }else{
      fetchAppointments("patient");
    }
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
    doctorQualification : appointment?.doctorId?.metaData?.doctorData?.qualification,
    doctorEveningSession : appointment?.doctorId?.metaData?.doctorData?.eveningSession,
    doctorEveningSession : appointment?.doctorId?.metaData?.doctorData?.morningSession,
    doctorExperience : appointment?.doctorId?.metaData?.doctorData?.experience,
    doctorSpeciality : appointment?.doctorId?.metaData?.doctorData?.speciality,
    doctorEmergencyContactNo : appointment?.doctorId?.metaData?.doctorData?.emergencyContactNo,
    doctorGender: appointment?.doctorId?.gender,
    doctorFullName : appointment?.doctorId?.fullName,
    doctorDescription : appointment?.doctorId?.metaData?.doctorData?.description
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