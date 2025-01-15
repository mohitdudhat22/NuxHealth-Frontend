import { useState, useEffect } from 'react';
import { getAppointmentsTeleconsultationWithFromAndTo, getPrivousTeleconsultation } from '@/axiosApi/ApiHelper';
import { useNavigate } from 'react-router-dom';

export const usePrivousTeleconsultation = () => {
    let navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);


    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await getPrivousTeleconsultation();
            if (response.status === 1) {
                setAppointments(response.data.appointments);
                console.log('Today’s Appointments:', response.data.length);
            }
        } finally {
            setLoading(false);
        }
    };
    const filterAppointments = async(fromDate, toDate) => {
        if (fromDate && toDate) {
          const startDate = new Date(fromDate).toISOString().split('T')[0];
          const endDate = new Date(toDate).toISOString().split('T')[0];

          const response = await getAppointmentsTeleconsultationWithFromAndTo(startDate, endDate);
          console.log(response);
          setAppointments(response.data.appointments);
        } else {
            fetchAppointments();
        }
        setIsDateModalOpen(false);
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
        filterAppointments,
        isDateModalOpen,
        setIsDateModalOpen
    };
};
