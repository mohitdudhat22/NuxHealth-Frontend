import { useState, useEffect } from 'react';
import { fetchAppointmentsByPatient, fetchDoctorSession } from "@/axiosApi/ApiHelper";
import { useDecodeToken } from '@/hook';
import { useLocation } from 'react-router-dom';
import { identifyRole } from '@/utils/identifyRole';

export const useAppointmentData = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [data, setData] = useState({
        countries: [],
        states: [],
        cities: [],
        hospitals: [],
        specialities: [],
        doctors: [],
        appointmentDate: '',
        appointmentType: '',
        paymentType: '',
        patientIssue: '',
        diseaseName: '',
        patientList: [],
        patientId: queryParams.get('patientId'),
    });
    const { token } = useDecodeToken();
    const [filters, setFilters] = useState({});
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [timeSlots, setTimeSlots] = useState(null);
    const [role, setRole] = useState(false)


    useEffect(() => {
        setRole(token?.userData?.role);
    }, [])
    useEffect(() => {
        role && fetchData(role);
    }, [role])

    const fetchData = async (role) => {
        try {
            const response = await fetchAppointmentsByPatient(role);
            const specialities = response.specialties.map((speciality) => ({
                value: speciality,
                label: speciality,
                doctors: speciality,
            })) || [];
            setData((prev) => ({ ...prev, specialities, responseDoctors:response?.doctors }));

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSelectChange = (value, key) => {
        setFilters((prev) => ({ ...prev, [key]: value }));

        if (key === "speciality") {
            const selectedSpeciality = data.specialities.find((sp) => sp.value === value);
            const doctors = data.responseDoctors.filter((doctor)=> doctor.speciality == selectedSpeciality.value)?.map((doctor) => ({
                value: doctor.doctorId,
                label: doctor.fullName,
            })) || [];
            setData((prev) => ({ ...prev, doctors }));
        } else if (key === "appointmentType" || key === "paymentType" || key === "patientList" || key == "doctor") {
            setData((prev) => ({ ...prev, [key]: value }));
        }
    };

    const handleDoctorChange = async (value, appointmentDate) => {
        const doctorId = value;
        setSelectedDoctor(doctorId);
        if (doctorId) {
            try {
                const response = await fetchDoctorSession(doctorId, appointmentDate, identifyRole());
                setTimeSlots(response.data);
            } catch (error) {
                console.error("Error fetching time slots:", error);
            }
        }
    };

    const handleDateChange = (value, dateString) => {
        setData((prevData) => ({
            ...prevData,
            appointmentDate: dateString,
        }));
        handleDoctorChange(selectedDoctor, dateString);
    };

    const handleInputChanges = (value, key) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    return {
        data,
        filters,
        selectedTime,
        selectedDoctor,
        timeSlots,
        setSelectedTime,
        handleSelectChange,
        handleDoctorChange,
        handleDateChange,
        handleInputChanges,
    };
};

