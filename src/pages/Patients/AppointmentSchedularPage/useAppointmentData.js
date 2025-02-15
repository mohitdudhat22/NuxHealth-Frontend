import { useState, useEffect } from 'react';
import { fetchAppointmentsByPatient, fetchDoctorSession } from "@/axiosApi/ApiHelper";
import { useDecodeToken } from '@/hook';

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
        diseaseName: '',
        patientList: []
    });

    const { token } = useDecodeToken();

    const [filters, setFilters] = useState({});
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [timeSlots, setTimeSlots] = useState(null);
    const [role, setRole] = useState('')

    useEffect(() => {
        setRole(token?.userData?.role)
    }, [token])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAppointmentsByPatient(role);
                console.log(response.data,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
                if (response.data && response.data.length > 0) {
                    const countries = response.data.map((item) => ({
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
        role && fetchData();
    }, [role]);

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
        } else if (key === "appointmentType" || key === "paymentType" || key === "patientList") {
            setData((prev) => ({ ...prev, [key]: value }));
        }
    };

    const handleDoctorChange = async (value, appointmentDate) => {
        const doctorId = value;

        setSelectedDoctor(doctorId);
        if (doctorId) {
            try {
                const response = await fetchDoctorSession(doctorId, appointmentDate, role);
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

