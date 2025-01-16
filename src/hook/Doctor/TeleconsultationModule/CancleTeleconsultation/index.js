import { useState, useEffect } from 'react';
import { getCancleTeleconsultation } from '@/axiosApi/ApiHelper';
import { useNavigate } from 'react-router-dom';

export const useCancleTeleconsultation = () => {
    let navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await getCancleTeleconsultation();
            if (response.status === 1) {
                setAppointments(response.data.appointments);
            }
        } finally {
            setLoading(false);
        }
    };
    const rescheduleAppointment = async (selectedDate, selectedTime) => {
        const payload = {
          date: selectedDate,
          appointmentTime: selectedTime,
        };
    
        try {
          const response = await reschedule(appointmentId, payload);
          setIsReshceduleModal(false);
        } catch (error) {
          console.error("Error rescheduling appointment:", error);
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
        appointmentType: appointment?.appointmentType,
        appointmentDate: appointment?.date,
        patientAge: appointment?.patientAge || '28',
        patientGender: appointment?.gender,
        patientIssue: appointment?.patient_issue,
        diseaseName: appointment?.dieseas_name,
        doctorName: appointment?.doctorId?.fullName,
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
        rescheduleAppointment
    };
};
