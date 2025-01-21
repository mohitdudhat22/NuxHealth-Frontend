import React, { useState, useEffect } from "react";
import { AppointmentScheduler, NHButton, NHCard, NHDatePicker, NHInput, NHModal, NHSelect, PatientDetailCard } from "@/components";
import { appointmentBooking, getPatientListForReceptionist } from "@/axiosApi/ApiHelper";
import toast from "react-hot-toast";
import { useDecodeToken } from "@/hook";
import { useAppointmentData } from "./useAppointmentData";
import { useLocation, useNavigate } from "react-router-dom";
import { Invoice } from "@/pages/Patients";
import { usePatientDashboardData } from "@/hook/Patients";

export const AppointmentSchedularPage = () => {
  const {
    data,
    filters,
    selectedTime,
    selectedDoctor,
    timeSlots,
    isAppointmentModal,
    setSelectedTime,
    handleSelectChange,
    handleDoctorChange,
    handleDateChange,
    handleInputChanges,
    appointmentTypes,
    paymentTypes,
    handleTimeSelect,
    handleBookAppointment,
    handleCloseModal,
    razorPay,
    showInvoice,
    billData,
  } = useAppointmentData();
   const { data:patientData, loading, error } = usePatientDashboardData();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const patientId = queryParams.get('patientId');
  const { token } = useDecodeToken();
  const [role, setRole] = useState('');
  const [patientList, setPatientList] = useState([]);

  useEffect(() => {
    setRole(token?.userData?.role);
    const fetchData = async () => {
      if (role === "receptionist") {
        try {
          const response = await getPatientListForReceptionist();
          setPatientList(
            response.data.map((patient) => ({
              value: patient._id,
              label: patient.fullName,
            }))
          );
        } catch (error) {
          console.error("Error fetching Patient List:", error);
        }
      }
    };
    fetchData();
  }, [token, role]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      {showInvoice ?
        <Invoice billData={billData} />
        :

        <>
           <PatientDetailCard
                      patientName={patientData?.patientProfile?.fullName || "N/A"}
                      doctorName="Dr. Marcus Philips"
                      patientNumber={patientData?.patientProfile?.phone || "N/A"}
                      patientIssue="Feeling tired"
                      patientGender={patientData?.patientProfile?.gender || "N/A"}
                      patientAge={`${patientData?.patientProfile?.age || 0} Years`}
                      appointmentType="Online"
                      patientAddress={`${
                        patientData?.patientProfile?.address?.fullAddress || "N/A"
                      }, ${patientData?.patientProfile?.address?.city || ""}`}
                      lastAppointmentDate="2 Jan, 2022"
                      lastAppointmentTime="4:30 PM"
                      onEditProfile={() => {}}
                    />
        <div className="mt-9">
       { patientId && (<NHCard className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
              {/* {role === "receptionist" &&
                <NHSelect
                  label="Patient List"
                  name="patientList"
                  placeholder="Patient List"
                  onChange={(value) => handleSelectChange(value, "patientList")}
                  options={patientList}
                />} */}
            </div>
          </NHCard>)}

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
        </div>
        </>
      }
    </>
  );
};
