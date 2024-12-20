import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { all } from "axios";
import Calendar from "./Calendar";
import { useDoctor } from "../../hooks/useDoctor";
import { useGlobal } from "../../hooks/useGlobal";
import DoctorDetails from "./DoctorDetails";
import apiService from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { usePatient } from "@/hooks/usePatient";

const ReceptionAppoinmentBooking = () => {
    const { getAllDoctors, allDoctors } = useDoctor();
    const {
        getAllHospitals,
        allHospitals,
        getAllAppointments,
        onClickNotification,
    } = useGlobal();
    const { user } = useAuth();
    const { getAllPatients, allPatients } = usePatient();
    const [specialty, setSpecialty] = useState("nuero");
    const [country, setCountry] = useState("IN");
    const [state, setState] = useState("GJ");
    const [city, setCity] = useState("Surat");
    const [hospital, setHospital] = useState("pm city hospital");
    const [doctor, setDoctor] = useState(null);
    const [patient, setPatient] = useState(null);
    const [appointmentType, setAppointmentType] = useState("Offline");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [patientIssue, setPatientIssue] = useState("");

    useEffect(() => {
        toast.success(
            "hospital might not work due to data inefficiency !!  You can continue without it!"
        );
        getAllDoctors();
        getAllHospitals();
        getAllAppointments();
        getAllPatients();
        loadRazorpayScript(); // Call the loadRazorpayScript function first
    }, []);

    console.log("filteredDoctors", allDoctors, hospital);
    // Load Razorpay script
    const loadRazorpayScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    };
    // Handle Razorpay Payment
    const handlePayment = async (appointmentData, amount) => {
        try {
            if (!isAllSelected() || !selectedDate || !selectedTime) {
                toast.error("Please select all required fields");
                return;
            }

            // Get appointment fee
            const { data: feeData } = await apiService.AppointmentFee(
                doctor,
                appointmentType
            );
            const amount = feeData.fee;
            // Create Razorpay order
            const { data: orderData } = await apiService.createRazorpayOrder({
                amount,
            });
            console.log("Razorpay order created successfully");
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Doctor Appointment",
                description: "Consultation Fee Payment",
                order_id: orderData.id,
                handler: async function (response) {
                    try {
                        // Verify payment
                        await apiService.verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        console.log(response, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                        console.log("Payment verified successfully");
                        // Create appointment
                        const newAppointmentData = {
                            ...appointmentData,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                            amount: amount,
                            patientId : patient,
                        };
                        console.log(newAppointmentData, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                        await apiService.createAppointmentWithPayment(newAppointmentData);
                        toast.success("Appointment booked successfully!");
                    } catch (error) {
                        console.error("Appointment creation error:", error);
                        toast.error("Failed to create appointment. Please try again.");
                    }
                },
                prefill: {
                    name: user?.firstName + " " + user?.lastName,
                    email: user?.email,
                    contact: user?.phone,
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment error:", error);
            toast.error("Payment failed. Please try again.");
        }
    };
    const isAllSelected = () => {
        return doctor && appointmentType;
    };

    // Update Calendar component to set selected date and time
    const handleDateTimeSelect = (date, time) => {
        setSelectedDate(date);
        setSelectedTime(time);
    };
    console.log(patient, "============================== patient");
    return (
        <div className="container">
            <div className="p-4 shadow-lg m-3 rounded-lg" style={{ height: "auto" }}>
                <h1 className="text-[26px] text-[#030229] font-bold mb-2 md:mb-0 pb-5">
                    Appointment Booking
                </h1>
                <div className="w-full border-2 h-auto rounded-md px-3 py-2 bg-white">
                    <div className="flex flex-col m-2">
                        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-4">
                            {/* Specialty Select */}
                            <SelectInput
                                label="Specialty"
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)}
                                options={[...new Set(allDoctors.map((doc) => doc.speciality))]}
                            />

                            {/* Doctor Select */}
                            <SelectInput
                                label="Doctor"
                                value={doctor}
                                onChange={(e) => setDoctor(e.target.value)}
                                options={allDoctors.map((doc) => ({
                                    value: doc._id,
                                    label: `Dr. ${doc.name}`,
                                }))}
                            />

                            {/* Patient Select */}
                            <SelectInput
                                 label="Patient"
                                 value={patient}
                                 onChange={(e) => setPatient(e.target.value)}
                                 options={allPatients.map((patient) => ({
                                     value: patient._id,
                                     label: `${patient.firstName} ${patient.lastName} (${patient.email})`,
                                 }))}
                                 />
                        </div>

                        {/* Conditionally Render Image and Paragraph */}
                        <div className="w-full h-auto border my-2 py-5 rounded-md flex flex-col items-center justify-center">
                            {!isAllSelected() ? (
                                <>
                                    <img src="./image/Invoice.png" alt="" className="w-60" />
                                    <p className="mt-2 text-center">No Appointment Found Yet</p>
                                </>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
                                    <div className="new-xxl:col-span-7 new-xl:col-span-7 new-lg:col-span-6 p-3">
                                        <Calendar
                                            filterData={{
                                                hospital,
                                                doctor,
                                                state,
                                                city,
                                                country,
                                                appointmentType,
                                                patient,
                                            }}
                                            selectedDoctor={allDoctors.find(
                                                (doc) => doc._id === doctor
                                            )}
                                            onDateTimeSelect={handleDateTimeSelect}
                                            handlePayment={handlePayment}
                                        />
                                    </div>
                                    <div className="new-xxl:col-span-3 new-xl:col-span-3 new-lg:col-span-4 p-3">
                                        <DoctorDetails doctorId={doctor} allDoctors={allDoctors} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SelectInput = ({ label, value, onChange, options }) => (
    <div className="relative border border-gray-300 rounded-md px-2">
        <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm font-semibold text-gray-800">
            {label}
        </label>
        <select
            value={value}
            onChange={onChange}
            className="block w-full px-3 py-3 text-gray-500 bg-white border-0 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
        >
            <option value="" disabled>
                Select {label}
            </option>
            {options?.map((option) => (
                <option key={option?.value || option} value={option?.value || option}>
                    {option?.label || option}
                </option>
            ))}
        </select>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <i className="fa-solid fa-chevron-down text-gray-400"></i>
        </span>
    </div>
);

export default ReceptionAppoinmentBooking
