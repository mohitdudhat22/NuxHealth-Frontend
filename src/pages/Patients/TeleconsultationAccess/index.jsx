import {
  AppointmentCard,
  NHButton,
  NHCard,
  NHInput,
  NHTabs,
} from "@/components";
import Icons from "@/constants/icons";
import React, { useEffect, useState } from "react";
import { usePreviousTeleconsultationModule } from "@/hook/Patients/TeleconsultationModule/PreviousTeleconsultationModule";
import { useTodaysTeleconsultationModule } from "@/hook/Patients/TeleconsultationModule/TodaysTeleconsultationModule";
import { useUpcomingTeleconsultationModule } from "@/hook/Patients/TeleconsultationModule/UpcomingTeleconsultationModule";
import { useCancelTeleconsultationModule } from "@/hook/Patients/TeleconsultationModule/CancelTeleconsultationModule";
import { CustomDateModal } from "@/components/NHModalComponents/ModalTemplate/CustomDateModal";
import { RescheduleAppointmentModal } from "@/components/NHModalComponents/ModalTemplate/ResheduleAppointmentModal";
import {
  cancelAppointmentForPatient,
  rescheduleForPatient,
} from "@/axiosApi/ApiHelper";
import { AppointmentModal } from "@/components/NHModalComponents/ModalTemplate/AppointmentModal";
import { AppointmentSchedularPage } from "..";
import "./Teleconsulation.css"
import { CancelOnlineAppointmentModal } from "@/components/NHModalComponents/ModalTemplate/CancelOnlineAppointmentModal";
import { useNavigate } from "react-router-dom";

export const TeleconsultationAccess = () => {
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [canceledAppointments, setCanceledAppointments] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [isReshceduleModal, setIsReshceduleModal] = useState(false);
  const [toDate, setToDate] = useState(null);
  const [appointmentId, setAppointmentId] = useState(null);
  const [bookAppoinment, setBookAppointment] = useState(false);
  // API Calls
  const { data: previousData } = usePreviousTeleconsultationModule();
  const {
    data: todaysData,
    setIsDateModalOpen,
    isDateModalOpen,
    filterAppointments,
  } = useTodaysTeleconsultationModule();
  const navigate = useNavigate();
  const { data: upcomingData } = useUpcomingTeleconsultationModule();
  const { data: canceledData } = useCancelTeleconsultationModule();
  const [cancelModal, setIsCancleModal] = useState(false);
  const rescheduleAppointment = async (selectedDate, selectedTime) => {
    const payload = {
      date: selectedDate,
      appointmentTime: selectedTime,
    };

    console.log("Appointment ID:", appointmentId);
    console.log("Payload:", payload);

    try {
      const response = await rescheduleForPatient(appointmentId, payload);
      console.log("Response:", response);
      setIsReshceduleModal(false);
      fetchAppointments();
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      const response = await cancelAppointmentForPatient(id, {
        status: "canceled",
      });
      setIsCancleModal(false);
      setCanceledAppointments((prev) => [...prev, { id }]);
      setTodaysAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== id)
      );
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };
  const handelReschedule = (id) => {
    setIsReshceduleModal(true);
    setAppointmentId(id);
  };
  useEffect(() => {
    if (previousData) setPreviousAppointments(previousData);
    if (todaysData) setTodaysAppointments(todaysData);
    if (upcomingData) setUpcomingAppointments(upcomingData);
    if (canceledData) setCanceledAppointments(canceledData);
  }, [previousData, todaysData, upcomingData, canceledData]);
  console.log("🚀 ~ useEffect ~ previousData:", previousData);
  const [selectedAppointmentForModal, setSelectedAppointmentForModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancleModal = (id) => {
    // cancelAppointment(id)
    setSelectedAppointmentForModal(id);
    setIsCancleModal(true);
  };
  const closeCancleModal = () => setIsCancleModal(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAppointment = () => {
    setBookAppointment(true);
  };
  const tabItems = [
    {
      key: "Scheduled",
      label: "Scheduled Appointment",
      children: (
        <NHCard
          title={
            <span className="text-[#030229] text-[26px] font-semibold">
              My Appointment
            </span>
          }
          rootClass={"p-0"}
          headerContent={
            <>
              <NHButton
                variant="default"
                className="text-black bg-white"
                onClick={() => setIsDateModalOpen(true)}
              >
                {Icons.CalenderIcon} {fromDate ? fromDate : "From"} -{" "}
                {toDate ? toDate : "To"}
                {Icons.CloseCircle}
              </NHButton>
              <NHButton
                variant="default"
                className=""
                onClick={() => handleAppointment()}
              >
                {Icons.CalenderIcon}Book Appointment
              </NHButton>
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {todaysAppointments.map((data, index) => {
              const {
                name,
                type,
                patientIssue,
                diseaseName,
                appointmentDate,
                appointmentTime,
                date,
                patientName,
                doctorId,
                hospitalId,
                patientId,
                patient_issue,
              } = data;
              return (
                <AppointmentCard
                  key={"1"}
                  headerBg={true}
                  headerContent={
                    <>
                      <button
                        className="p-2 bg-white me-4 rounded-xl hover:bg-gray-300"
                        aria-label="View Details"
                        >
                        {/* // onClick={() => navigate("/patient/appointment/reschedule", { state: { appointment } })} */}
                        {Icons.BlueCalenderIcon}
                      </button>

                      <NHButton
                        isView
                        onClick={() => handleOpenModal()}
                      ></NHButton>
                    </>
                  }
                  title={
                    <span className="text-[#030229] text-[18px] font-medium">
                      Dr. {doctorId?.fullName}
                    </span>
                  }
                  appointmentType={
                    <span className="text-[#FFC313]">{type}</span>
                  }
                  hospitalName={hospitalId?.name}
                  appointmentDate={date}
                  appointmentTime={appointmentTime}
                  patientIssue={patient_issue}
                  footerContent={
                    <div className="flex justify-between gap-4">
                      <NHButton
                        size={"small"}
                        className={"w-full"}
                        onClick={() => handleCancleModal(data?._id)}
                      >
                        cancel
                      </NHButton>
                      <NHButton
                        size={"small"}
                        icon={Icons.call}
                        className={"w-full"}
                        // onClick={() => alert(data)}
                        onClick={() => navigate("videoCall?room=" + data._id)}
                      >
                        Join Call
                      </NHButton>
                    </div>
                  }
                  className="border border-slate-200"
                />
              );
            })}
          </div>
          <CustomDateModal
            handleOk={filterAppointments} // Apply filter
            onCancel={() => {
              setFromDate(null); // Reset fromDate
              setToDate(null); // Reset toDate
              setIsDateModalOpen(false); // Close modal without changes
            }}
            handleClose={() => {
              setIsDateModalOpen(false); // Close without applying
              setFromDate(null); // Reset fromDate
              setToDate(null); // Reset toDate
            }}
            Title="Filter by Date"
            isRescheduleModal={isDateModalOpen} // Control modal visibility
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate} // Update fromDate
            setToDate={setToDate} // Update toDate
          />

          <AppointmentModal open={isModalOpen} handleClose={handleCloseModal} />
        </NHCard>
      ),
    },
    ,
    {
      key: "Pending",
      label: "Pending Appointment",
      children: (
        <NHCard
          title={
            <span className="text-[#030229] text-[26px] font-semibold">
              My Appointment
            </span>
          }
          rootClass={"p-0"}
          headerContent={
            <>
              <NHButton
                variant="default"
                className="text-black bg-white"
                onClick={() => setIsDateModalOpen(true)}
              >
                {Icons.CalenderIcon} {fromDate ? fromDate : "From"} -{" "}
                {toDate ? toDate : "To"}
                {Icons.CloseCircle}
              </NHButton>
              <NHButton
                variant="default"
                className=""
                onClick={() => handleAppointment()}
              >
                {Icons.CalenderIcon}Book Appointment
              </NHButton>
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {upcomingAppointments.map((data, index) => {
              const {
                name,
                type,
                patientIssue,
                diseaseName,
                appointmentDate,
                appointmentTime,
                date,
                patientName,
                doctorId,
                hospitalId,
                patientId,
                patient_issue,
              } = data;
              return (
                <AppointmentCard
                  key={"1"}
                  headerBg={true}
                  headerContent={
                    <NHButton
                      isView
                      onClick={() => handleOpenModal()}
                    ></NHButton>
                  }
                  title={
                    <span className="text-[#030229] text-[18px] font-medium">
                      Dr. {doctorId?.fullName}
                    </span>
                  }
                  appointmentType={
                    <span className="text-[#FFC313]">{type}</span>
                  }
                  hospitalName={hospitalId?.name}
                  appointmentDate={date}
                  appointmentTime={appointmentTime}
                  patientIssue={patient_issue}
                  footerContent={
                    <div className="flex justify-between gap-4">
                      <NHButton
                        size={"small"}
                        className={"w-full"}
                        // onClick={() => cancelAppointment(data?._id)}
                        onClick={() => handleCancleModal(data?._id)}
                      >
                        cancel
                      </NHButton>
                      <NHButton
                        size={"small"}
                        icon={Icons.CalenderIcon}
                        className={"w-full"}
                        onClick={() => handelReschedule(data?._id)}
                      >
                        Reschedule
                      </NHButton>
                    </div>
                  }
                  className="border border-slate-200"
                />
              );
            })}
          </div>
          <RescheduleAppointmentModal
            handleOk={rescheduleAppointment}
            handleClose={() => setIsReshceduleModal(false)}
            Title="Reschedule Appointment"
            rescheduleAppo={isReshceduleModal}
          />

          <AppointmentModal
            open={isModalOpen}
            handleClose={() => setIsModalOpen(false)}
          />
        </NHCard>
      ),
    },
    {
      key: "Previous",
      label: "Previous Appointment",
      children: (
        <NHCard
          title={
            <span className="text-[#030229] text-[26px] font-semibold">
              My Appointment
            </span>
          }
          rootClass={"p-0"}
          headerContent={
            <>
              <NHButton
                variant="default"
                className="text-black bg-white"
                onClick={() => setIsDateModalOpen(true)}
              >
                {Icons.CalenderIcon} {fromDate ? fromDate : "From"} -{" "}
                {toDate ? toDate : "To"}
                {Icons.CloseCircle}
              </NHButton>
              <NHButton
                variant="default"
                className=""
                onClick={() => handleAppointment()}
              >
                {Icons.CalenderIcon}Book Appointment
              </NHButton>
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {previousAppointments.map((data, index) => {
              const {
                name,
                type,
                patientIssue,
                diseaseName,
                appointmentDate,
                appointmentTime,
                date,
                patientName,
                doctorId,
                hospitalId,
                patientId,
                patient_issue,
              } = data;
              return (
                <AppointmentCard
                  key={"1"}
                  headerBg={true}
                  headerContent={
                    <NHButton
                      isView
                      onClick={() => handleOpenModal()}
                    ></NHButton>
                  }
                  title={
                    <span className="text-[#030229] text-[18px] font-medium">
                      Dr. {doctorId?.fullName}
                    </span>
                  }
                  appointmentType={
                    <span className="text-[#FFC313]">{type}</span>
                  }
                  hospitalName={hospitalId?.name}
                  appointmentDate={date}
                  appointmentTime={appointmentTime}
                  patientIssue={patient_issue}
                  className="border border-slate-200"
                />
              );
            })}
          </div>

          <AppointmentModal
            open={isModalOpen}
            handleClose={() => setIsModalOpen(false)}
          />
        </NHCard>
      ),
    },
    {
      key: "Cancel",
      label: "Cancel Appointment",
      children: (
        <NHCard
          title={
            <span className="text-[#030229] text-[26px] font-semibold">
              My Appointment
            </span>
          }
          rootClass={"p-0"}
          headerContent={
            <>
              <NHButton
                variant="default"
                className="text-black bg-white"
                onClick={() => setIsDateModalOpen(true)}
              >
                {Icons.CalenderIcon} {fromDate ? fromDate : "From"} -{" "}
                {toDate ? toDate : "To"}
                {Icons.CloseCircle}
              </NHButton>
              <NHButton
                variant="default"
                className=""
                onClick={() => handleAppointment()}
              >
                {Icons.CalenderIcon}Book Appointment
              </NHButton>
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {canceledAppointments.map((data, index) => {
              const {
                name,
                type,
                patientIssue,
                diseaseName,
                appointmentDate,
                appointmentTime,
                date,
                patientName,
                doctorId,
                hospitalId,
                patientId,
                patient_issue,
              } = data;
              return (
                <AppointmentCard
                  key={"1"}
                  headerBg={true}
                  headerContent={
                    <NHButton
                      isView
                      onClick={() => handleOpenModal()}
                    ></NHButton>
                  }
                  title={
                    <span className="text-[#030229] text-[18px] font-medium">
                      Dr. {doctorId?.fullName}
                    </span>
                  }
                  appointmentType={
                    <span className="text-[#FFC313]">{type}</span>
                  }
                  hospitalName={hospitalId?.name}
                  appointmentDate={date}
                  appointmentTime={appointmentTime}
                  patientIssue={patient_issue}
                  className="border border-slate-200"
                />
              );
            })}
          </div>

          <AppointmentModal
            open={isModalOpen}
            handleClose={() => setIsModalOpen(false)}
          />
        </NHCard>
      ),
    },
  ];

  return (
    <>
      <>
        {bookAppoinment ? (
          <AppointmentSchedularPage />
        ) : (
          <div className="teleconsulation-card">
            <NHCard
              headerContent={
                <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
              }
            >
              <NHTabs items={tabItems} defaultActiveKey="upcoming" />
              <CancelOnlineAppointmentModal
                handleOk={() => cancelAppointment(selectedAppointmentForModal)}
                open={cancelModal}
                handleClose={closeCancleModal}
              />
            </NHCard>

          </div>
        )}
      </>
    </>
  );
};
