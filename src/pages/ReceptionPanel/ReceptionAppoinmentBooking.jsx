import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { useDoctor } from "../../hooks/useDoctor";
import { useGlobal } from "../../hooks/useGlobal";
import DoctorDetails from "./DoctorDetails";
import { toast } from "react-hot-toast";
import { all } from "axios";
import apiService from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

const ReceptionAppoinmentBooking = () => {
    const { getAllDoctors, allDoctors } = useDoctor();
    const {
        getAllHospitals,
        allHospitals,
        getAllAppointments,
        onClickNotification,
    } = useGlobal();
    const { user } = useAuth();
    const [specialty, setSpecialty] = useState("nuero");
    const [country, setCountry] = useState("IN");
    const [state, setState] = useState("GJ");
    const [city, setCity] = useState("Surat");
    const [hospital, setHospital] = useState("pm city hospital");
    const [doctor, setDoctor] = useState("673de70674ea959e623329d0");
    const [appointmentType, setAppointmentType] = useState("follow_up");
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
        loadRazorpayScript(); // Call the loadRazorpayScript function first
    }, []);

    // Get unique values for each filter based on allDoctors data
    const getUniqueValues = (key, filterKey, filterValue) => {
        const data = filterKey
            ? allDoctors.filter((doctor) => doctor[filterKey] === filterValue)
            : allDoctors;
        return [...new Set(data.map((doctor) => doctor[key]))];
    };

    const filteredHospitals = allHospitals.filter((hospital) => {
        return (
            (!country || hospital.country === country) &&
            (!state || hospital.state === state) &&
            (!city || hospital.city === city)
        );
    });

    const filteredDoctors = allDoctors.filter((doctor) => {
        return (
            (!specialty || doctor.speciality === specialty) &&
            (!country || doctor.country === country) &&
            (!state || doctor.state === state) &&
            (!city || doctor.city === city) &&
            (!hospital || doctor.hospitalName === hospital)
        );
    });
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
                        };

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
    return (
        <div className="container">
            <div className="p-4 shadow-lg m-3 rounded-lg" style={{ height: "auto" }}>
                <h1 className="text-xl font-semibold mb-2 md:mb-0">
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

                            {/* Country Select */}
                            <SelectInput
                                label="Country"
                                value={country}
                                onChange={(e) => {
                                    setCountry(e.target.value);
                                    setState("");
                                    setCity("");
                                    setHospital("");
                                    setDoctor("");
                                }}
                                options={getUniqueValues("country")}
                            />

                            {/* State Select */}
                            <SelectInput
                                label="State"
                                value={state}
                                onChange={(e) => {
                                    setState(e.target.value);
                                    setCity("");
                                    setHospital("");
                                    setDoctor("");
                                }}
                                options={getUniqueValues("state", "country", country)}
                            />

                            {/* City Select */}
                            <SelectInput
                                label="City"
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value);
                                    setHospital("");
                                    setDoctor("");
                                }}
                                options={getUniqueValues("city", "state", state)}
                            />

                            {/* Hospital Select */}
                            <SelectInput
                                label="Hospital"
                                value={hospital}
                                onChange={(e) => {
                                    setHospital(e.target.value);
                                    setDoctor("");
                                }}
                                options={filteredHospitals.map((hospital) => hospital.name)}
                            />
                            {/* Doctor Select */}
                            <SelectInput
                                label="Doctor"
                                value={doctor}
                                onChange={(e) => setDoctor(e.target.value)}
                                options={filteredDoctors.map((doc) => ({
                                    value: doc._id,
                                    label: `Dr. ${doc.name}`,
                                }))}
                            />

                            {/* Appointment Type Select */}
                            <SelectInput
                                label="Appointment Type"
                                value={appointmentType}
                                onChange={(e) => setAppointmentType(e.target.value)}
                                options={[
                                    { value: "consultation", label: "Consultation" },
                                    { value: "follow_up", label: "Follow-Up" },
                                    { value: "emergency", label: "Emergency" },
                                    { value: "routine_checkup", label: "Routine Checkup" },
                                    { value: "Online", label: "Online" },
                                ]}
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
    <div className="relative border border-gray-300 rounded-md">
        <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm font-semibold text-gray-800">
            {label}
        </label>
        <select
            value={value}
            onChange={onChange}
            className="block w-full px-3 py-3 text-gray-500 bg-white border-0 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
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
