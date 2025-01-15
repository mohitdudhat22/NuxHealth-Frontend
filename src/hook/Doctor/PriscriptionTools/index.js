import { useState, useEffect } from 'react';
import { todayAppointment } from '@/axiosApi/ApiHelper';
import { useNavigate } from 'react-router-dom';

export const useTodayAppointments = () => {
    let navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await todayAppointment();
            console.log("🚀 ~ fetchAppointments ~ response:", response)
            if (response.success === true) {
                setAppointments(response.data);
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
        patientName: appointment?.patientName,
        appointmentType: appointment?.type,
        patientAge: appointment?.patientId?.age,
        patientGender: appointment?.patientId?.gender,
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
