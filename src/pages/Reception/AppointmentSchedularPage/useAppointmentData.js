import { useState, useEffect } from 'react';
import { fetchAppointmentsByPatient, fetchDoctorSession } from "@/axiosApi/ApiHelper";
import { useDecodeToken } from '@/hook';
import { useLocation } from 'react-router-dom';
import { identifyRole } from '@/utils/identifyRole';
import toast from "react-hot-toast";

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
    const [role, setRole] = useState(false);
    const [showInvoice, setShowInvoice] = useState(false);
    const [billData, setBillData] = useState(null);
    const [isAppointmentModal, setIsAppointmentModal] = useState(false);

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
            setData((prev) => ({ ...prev, specialities, responseDoctors: response?.doctors }));

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSelectChange = (value, key) => {
        setFilters((prev) => ({ ...prev, [key]: value }));

        if (key === "speciality") {
            const selectedSpeciality = data.specialities.find((sp) => sp.value === value);
            const doctors = data.responseDoctors.filter((doctor) => doctor.speciality == selectedSpeciality.value)?.map((doctor) => ({
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
    const appointmentTypes = [
        { value: "onsite", label: "OnSite" },
        { value: "online", label: "Online" },
    ];

    const paymentTypes = [
        { value: "Cash", label: "Cash" },
        { value: "Online", label: "Online" },
        { value: "Insurance", label: "Insurance" },
    ];

    const validateAppointmentData = () => {
        if (!selectedDoctor) {
            toast.error("Please select a doctor");
            return false;
        }
        if (!data.appointmentDate) {
            toast.error("Please select appointment date");
            return false;
        }
        if (!selectedTime) {
            toast.error("Please select appointment time");
            return false;
        }
        if (!data.appointmentType) {
            toast.error("Please select appointment type");
            return false;
        }
        return true;
    };

    const handleBookAppointment = () => {
        if (validateAppointmentData()) {
            setIsAppointmentModal(true);
        }
    };

    const razorPay = async () => {
        if (!data.paymentType) {
            toast.error("Please select payment type");
            return;
        }

        if (data.paymentType === 'Cash') {
            await handleBooking();
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/payment/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    appointmentType: data.appointmentType,
                    doctorId: selectedDoctor
                })
            });
            const order = await response.json();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Your Company Name",
                description: "Test Transaction",
                order_id: order.id,
                handler: async function (response) {
                    const verifyResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/payment/verify-payment`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })
                    });

                    const data = await verifyResponse.json();
                    if (data.verified) {
                        toast.success("Payment successful!");
                        await handleBooking();
                        toast.success("Appointment successfully booked!");
                    } else {
                        toast.error("Payment verification failed!");
                    }
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Payment error:", error);
            toast.error(error.message || "Payment failed! Please try again.");
        }
    };

    const handleBooking = async () => {
        if (!validateAppointmentData()) return;

        const payload = {
            doctorId: selectedDoctor,
            patientId: data.patientList.length === 0 ? data.patientId : data.patientList,
            date: data.appointmentDate,
            appointmentTime: selectedTime,
            type: data.appointmentType,
            patient_issue: data.patientIssue,
            dieseas_name: data.diseaseName,
            city: filters.city,
            state: filters.state,
            country: filters.country,
            paymentType: data.paymentType,
            paymentStatus: data.paymentType === 'Cash' ? false : true,
        };

        try {
            const response = await appointmentBooking(payload, role);
            toast.success("Appointment booked successfully!");
            handleCloseModal();
            setBillData(response.data);
            setShowInvoice(true);
        } catch (error) {
            console.error("Error booking appointment:", error);
            toast.error(error.response?.data?.message || "Failed to book appointment. Please try again.");
        }
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleCloseModal = () => {
        setIsAppointmentModal(false);
    };

    return {
        appointmentTypes,
        paymentTypes,
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
        handleTimeSelect,
        handleBookAppointment,
        handleCloseModal,
        razorPay,
        isAppointmentModal,
        showInvoice,
        billData,
    };
};


