import { useState, useEffect } from 'react';
import { fetchAppointmentsByPatient, fetchDoctorSession } from "@/axiosApi/ApiHelper";

export const useAppointmentData = () => {
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
        diseaseName: ''
    });

    const [filters, setFilters] = useState({});
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [timeSlots, setTimeSlots] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAppointmentsByPatient();
                if (response && response.length > 0) {
                    const countries = response.map((item) => ({
                        value: item.country,
                        label: item.country,
                        states: item.states,
                    }));
                    setData((prev) => ({ ...prev, countries }));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleSelectChange = (value, key) => {
        setFilters((prev) => ({ ...prev, [key]: value }));

        if (key === "country") {
            const selectedCountry = data.countries.find((c) => c.value === value);
            const states = selectedCountry?.states.map((state) => ({
                value: state.state,
                label: state.state,
                cities: state.cities,
            })) || [];
            setData((prev) => ({ ...prev, states, cities: [], hospitals: [], specialities: [], doctors: [] }));
        } else if (key === "state") {
            const selectedState = data.states.find((s) => s.value === value);
            const cities = selectedState?.cities.map((city) => ({
                value: city.city,
                label: city.city,
                hospitals: city.hospitals,
            })) || [];
            setData((prev) => ({ ...prev, cities, hospitals: [], specialities: [], doctors: [] }));
        } else if (key === "city") {
            const selectedCity = data.cities.find((c) => c.value === value);
            const hospitals = selectedCity?.hospitals.map((hospital) => ({
                value: hospital.name,
                label: hospital.name,
                specialties: hospital.specialties,
            })) || [];
            setData((prev) => ({ ...prev, hospitals, specialities: [], doctors: [] }));
        } else if (key === "hospital") {
            const selectedHospital = data.hospitals.find((h) => h.value === value);
            const specialities = selectedHospital?.specialties.map((speciality) => ({
                value: speciality.speciality,
                label: speciality.speciality,
                doctors: speciality.doctors,
            })) || [];
            setData((prev) => ({ ...prev, specialities, doctors: [] }));
        } else if (key === "speciality") {
            const selectedSpeciality = data.specialities.find((sp) => sp.value === value);
            const doctors = selectedSpeciality?.doctors.map((doctor) => ({
                value: doctor.id,
                label: doctor.name,
            })) || [];
            setData((prev) => ({ ...prev, doctors }));
        } else if (key === "appointmentType" || key === "paymentType") {
            setData((prev) => ({ ...prev, [key]: value }));
        }
    };

    const handleDoctorChange = async (value, appointmentDate) => {
        const doctorId = value;

        setSelectedDoctor(doctorId);
        if (doctorId) {
            try {
                const response = await fetchDoctorSession(doctorId, appointmentDate);
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

