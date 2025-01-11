import React, { useState, useEffect } from "react";
import { AppointmentScheduler, NHButton, NHCard, NHDatePicker, NHInput, NHModal, NHSelect } from "@/components";
import { appointmentBooking } from "@/axiosApi/ApiHelper";
import toast from "react-hot-toast";
import { useDecodeToken } from "@/hook";
import { useAppointmentData } from "./useAppointmentData";

export const AppointmentSchedularPage = () => {
  const {
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
  } = useAppointmentData();

  const [isAppointmentModal, setIsAppointmentModal] = useState(false);
  const { token } = useDecodeToken();

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = () => {
    if (selectedTime) {
      setIsAppointmentModal(true);
    } else {
      toast.error("Please choose doctor and time slot.");
    }
  };

  const handleCloseModal = () => {
    setIsAppointmentModal(false);
  };

  const razorPay = async () => {
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
            await handleBooking()
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
      toast.error("Payment failed!");
    }
  };

  const handleBooking = async () => {
    const payload = {
      doctorId: selectedDoctor,
      date: data.appointmentDate,
      appointmentTime: selectedTime,
      type: data.appointmentType,
      patient_issue: data.patientIssue,
      dieseas_name: data.diseaseName,
      city: filters.city,
      state: filters.state,
      country: filters.country,
      paymentType: data.paymentType,
      paymentStatus: data.paymentType === 'Cash' ? false : true
    }
    try {
      const response = await appointmentBooking(payload);
      toast.success("Appointment booked successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment. Please try again.");
    }
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

  return (
    <>
      <NHCard className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <NHSelect
            label="Country"
            name="country"
            placeholder="Select Country"
            onChange={(value) => handleSelectChange(value, "country")}
            options={data.countries}
          />
          <NHSelect
            label="State"
            name="state"
            placeholder="Select State"
            onChange={(value) => handleSelectChange(value, "state")}
            options={data.states}
          />
          <NHSelect
            label="City"
            name="city"
            placeholder="Select City"
            onChange={(value) => handleSelectChange(value, "city")}
            options={data.cities}
          />
          <NHSelect
            label="Hospital"
            name="hospital"
            placeholder="Select Hospital"
            onChange={(value) => handleSelectChange(value, "hospital")}
            options={data.hospitals}
          />
          <NHSelect
            label="Speciality"
            name="speciality"
            placeholder="Select Speciality"
            onChange={(value) => handleSelectChange(value, "speciality")}
            options={data.specialities}
          />
          <NHSelect
            label="Doctor"
            name="doctor"
            placeholder="Select Doctor"
            onChange={(value) => handleDoctorChange(value)}
            options={data.doctors}
          />
          <NHSelect
            label="Appointment Type"
            name="appointmentType"
            placeholder="Appointment Type"
            onChange={(value) => handleSelectChange(value, "appointmentType")}
            options={appointmentTypes}
          />
          <NHDatePicker
            label="Appointment Date"
            name="appointmentDate"
            onChange={(value, dateString) => handleDateChange(value, dateString)}
            format={"YYYY-MM-DD"}
          />
          <NHInput
            label="Patient Issue"
            name="patientIssue"
            placeholder="Patient Issue"
            onChange={(e) => handleInputChanges(e.target.value, "patientIssue")}
          />
          <NHInput
            label="Disease Name"
            name="diseaseName"
            placeholder="Disease Name"
            onChange={(e) => handleInputChanges(e.target.value, "diseaseName")}
          />
        </div>
      </NHCard>

      <div className="mt-10">
        <NHCard>
          <h3 className="mb-3 text-3xl font-semibold pb-7">Available Time Slots</h3>
          <div className="">
            <p className="mb-8 text-2xl font-semibold text-center">Morning Session</p>
            <div className="grid grid-cols-8 gap-2">
              {timeSlots?.morningSlots?.map(({ start }) => (
                <NHButton
                  key={start}
                  className={`p-2 border rounded-lg ${selectedTime === start ? "bg-blue-500 text-white" : ""}`}
                  onClick={() => handleTimeSelect(start)}
                >
                  {start}
                </NHButton>
              ))}
            </div>
          </div>
          <div className="">
            <p className="my-8 text-2xl font-semibold text-center">Evening Session</p>
            <div className="grid grid-cols-8 gap-2">
              {timeSlots?.eveningSlots?.map(({ start }) => (
                <NHButton
                  key={start}
                  className={`p-2 border rounded-lg ${selectedTime === start ? "bg-blue-500 text-white" : ""}`}
                  onClick={() => handleTimeSelect(start)}
                >
                  {start}
                </NHButton>
              ))}
            </div>
          </div>

          <NHButton className="p-3 px-5 mt-10 text-white bg-blue-500 rounded" onClick={handleBookAppointment}>
            Book Appointment
          </NHButton>
        </NHCard>
      </div>

      <div className="mt-7">
        <NHCard className="w-full h-auto p-6 mx-auto mt-4 sm:w-3/4 md:w-2/3 lg:w-full xl:w-full">
          <AppointmentScheduler />
        </NHCard>

        <NHModal
          title={
            <div className="flex items-center justify-between w-full">
              <h1 className="text-xl font-semibold">Appointment</h1>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {/* Close icon */}
              </button>
            </div>
          }
          open={isAppointmentModal}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-gray-700">Appointment Type</p></div>
              <div><p className="text-gray-600">{data.appointmentType}</p></div>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-gray-700">Doctor Name</p></div>
              <div><p className="text-gray-600">{data.doctors.find(d => d.value === selectedDoctor)?.label || 'Not selected'}</p></div>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-gray-700">Appointment Date</p></div>
              <div><p className="text-gray-600">{data.appointmentDate}</p></div>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-gray-700">Appointment Time</p></div>
              <div><p className="text-gray-600">{selectedTime}</p></div>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-gray-700">Patient Issue</p></div>
              <div><p className="text-gray-600">{data.patientIssue}</p></div>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-gray-700">Disease Name</p></div>
              <div><p className="text-gray-600">{data.diseaseName}</p></div>
            </div>

            <NHSelect
              label="Payment Type"
              name="paymentType"
              placeholder="Payment Type"
              onChange={(value) => handleSelectChange(value, "paymentType")}
              options={paymentTypes}
            />

            <div className="flex justify-end mt-6 space-x-4">
              <NHButton className="px-4 py-2 text-black bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none" onClick={handleCloseModal}>
                Cancel
              </NHButton>
              <NHButton className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none" onClick={razorPay}>
                Book Appointment
              </NHButton>
            </div>
          </div>
        </NHModal>
      </div>
    </>
  );
};
