import { AppointmentCard, NHButton, NHCard, NHInput } from "@/components";
import Icons from "@/constants/icons";
import { Space, Tag } from "antd";
import { useState } from "react";
import { CreatePrescription, PatientDetails } from "../..";
import { useTodayAppointments } from "@/hook/Doctor";
import "./DoctorPri.css";

export const Create = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [viewingPatientDetails, setViewingPatientDetails] = useState(null);

  const {
    appointments,
    isDrawerVisible,
    loading,
    openDrawer,
    closeDrawer,
    data,
    fetchAppointments,
    navigate,
    onSearch,
    searchQuery,
  } = useTodayAppointments();

  const appointmentData = appointments || [];

  const handlePatientDetails = (appointment) => {
    setViewingPatientDetails(appointment);
  };

  const handleBackToAppointments = () => {
    setViewingPatientDetails(null);
  };

  return (
    <>
      {!selectedAppointment && !viewingPatientDetails ? (
        <div className="doc-priscription">
        <NHCard
          title="Today Appointment"
          headerContent={
            <>
              <div className="me-10">
                <NHInput
                  prefix={Icons.SearchIcon}
                  placeholder="Search Patient"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
              <NHButton variant="default" className="text-black bg-white">
                {Icons.CalenderIcon}2 March, 2024
              </NHButton>
            </>
          }
        >
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-lg">
            {appointmentData?.map((appointment, index) => (
              <AppointmentCard
                key={index}
                headerContent={
                  <div className="flex items-center justify-between">
                    <Tag
                      color={appointment.status === "New" ? "blue" : "green"}
                    >
                      {appointment.status}
                    </Tag>
                    <NHButton
                      isView
                      variant={"default"}
                      onClick={() => handlePatientDetails(appointment)}
                    />
                  </div>
                }
                headerBg={true}
                title={
                  <span className="font-semibold text-[#030229] text-2xl">
                    {appointment.patientId.fullName}
                  </span>
                }
                appointmentType={appointment.type}
                patientAge={<>{appointment.patientId.age} Years</>}
                PatientGender={appointment.patientId.gender}
                appointmentTime={appointment.appointmentTime}
                footerContent={
                  <NHButton
                    size={"large"}
                    className={"w-full"}
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    Create Prescription
                  </NHButton>
                }
                className="border border-slate-200"
              />
            ))}
          </div>
        </NHCard>
        </div>
      ) : viewingPatientDetails ? (
        <PatientDetails />
      ) : (
        <CreatePrescription appointment={selectedAppointment} />
      )}
    </>
  );
};
