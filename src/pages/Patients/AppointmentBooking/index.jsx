import {
  AppointmentCard,
  NHButton,
  NHCard,
  NHInput,
  NHTabs,
  PatientDetailCard,
} from "@/components";
import { CustomDateModal } from "@/components/NHModalComponents/ModalTemplate/CustomDateModal";
import { RescheduleAppointmentModal } from "@/components/NHModalComponents/ModalTemplate/ResheduleAppointmentModal";
import Icons from "@/constants/Icons";
import React, { useState } from "react";
import { Drawer } from "antd";
import "./AppointmentBooking.css";
import modalImg from "../../../assets/images/cover/view_modal_bg.png";
import maleIcon from "../../../assets/images/cover/male_icon.svg";
import doctorLogo from "../../../assets/images/cover/Avatar_6.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  cancelAppointmentForPatient,
  doctorSession,
  reschedule,
  rescheduleForPatient,
} from "@/axiosApi/ApiHelper";
import { AppointmentSchedularPage } from "..";
import {
  useCancelAppoinmentBookings,
  usePatientDashboardData,
  usePreviousAppoinmentBookings,
  useTodaysAppoinmentBookings,
  useUpcomingAppoinmentBookings,
} from "@/hook/Patients";
import { AppointmentSchedularPageForReception } from "@/pages/Reception";
import { identifyRole } from "@/utils/identifyRole";
import { CancelOnlineAppointmentModal } from "@/components/NHModalComponents/ModalTemplate/CancelOnlineAppointmentModal";

export const AppointmentBooking = () => {
  const [isReshceduleModal, setIsReshceduleModal] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [tempFromDate, setTempFromDate] = useState(null);
  const [tempToDate, setTempToDate] = useState(null);
  const [bookAppoinment, setBookAppointment] = useState(false);
  const [canceledAppointments, setCanceledAppointments] = useState([]);
  const [isOffCanvasVisible, setIsOffCanvasVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedAppointmentForModal, setSelectedAppointmentForModal] =
    useState(null);
  const [activeTab, setActiveTab] = useState("Scheduled");
  const { data: patientData, loading, error } = usePatientDashboardData();
  const { data: todayAppointments, patientId } = useTodaysAppoinmentBookings();
  const { data: previousAppointments, fetchAppointments } =
    usePreviousAppoinmentBookings();
  const { data: upcomingAppointments } = useUpcomingAppoinmentBookings();
  const { data: cancelAppointments } = useCancelAppoinmentBookings();
  const [timeSlote, setTimeSlote] = useState([]);
  const navigate = useNavigate();
  const [cancelModal, setIsCancleModal] = useState(false);
  const rescheduleAppointment = async (selectedDate, selectedTime) => {
    const payload = {
      date: selectedDate,
      appointmentTime: selectedTime,
    };
    try {
      const response = await reschedule(
        selectedAppointmentForModal,
        payload,
        identifyRole()
      );
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
      console.log("Appointment canceled successfully:", response);

      setIsCancleModal(false);
      const canceledAppointment = todayAppointments.find(
        (appointment) => appointment.id === id
      );
      setCanceledAppointments((prev) => [...prev, canceledAppointment]);

      // Filter out the canceled appointment from today's list
      setTodaysAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  const handleOpenModal = () => {
    setTempFromDate(fromDate);
    setTempToDate(toDate);
    setIsReshceduleModal(true);
  };

  const handleCloseModal = () => {
    setTempFromDate(null);
    setTempToDate(null);
    setIsReshceduleModal(false);
  };

  const handleOk = () => {
    setFromDate(tempFromDate);
    setToDate(tempToDate);
    handleCloseModal();
  };

  const handleReset = () => {
    setTempFromDate(null);
    setTempToDate(null);
  };

  const formatDateRange = (fromDate, toDate) => {
    if (!fromDate || !toDate) return "Select Date Range";
    const options = { day: "numeric", month: "long", year: "numeric" };
    const fromDateStr = new Date(fromDate).toLocaleDateString("en-US", options);
    const toDateStr = new Date(toDate).toLocaleDateString("en-US", options);
    return `${fromDateStr} - ${toDateStr}`;
  };

  const handleViewDetails = (id) => {
    let appointment;
    if (activeTab === "Scheduled") {
      appointment = todayAppointments.find((item) => item.id === id);
    } else if (activeTab === "Previous") {
      appointment = previousAppointments.find((item) => item.id === id);
    } else if (activeTab === "Cancel") {
      appointment = cancelAppointments.find((item) => item.id === id);
    } else if (activeTab === "Pending") {
      appointment = upcomingAppointments.find((item) => item.id === id);
    }

    if (appointment) {
      setSelectedAppointment(appointment);
      setIsOffCanvasVisible(true);
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleAppointment = () => {
    setBookAppointment(true);
  };

  const handleReschedule = async (appointment) => {
    // navigate("/patient/appointment/reschedule", { state: { appointment } });
    setSelectedAppointmentForModal(appointment.key);
    setIsReshceduleModal(true);
    try {
      const response = await doctorSession(appointment.doctorId);
      setTimeSlote(response.data);
    } catch (error) {
      console.error("Error fetching doctor sessions:", error);
    }
  };

  const handleCancleModal = (appointment) => {
    setSelectedAppointmentForModal(appointment.key);
    setIsCancleModal(true);
  };
  const closeCancleModal = () => setIsCancleModal(false);
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
                onClick={handleOpenModal}
              >
                {Icons.CalenderIcon} {formatDateRange(fromDate, toDate)}{" "}
                {Icons.CloseCircle}
              </NHButton>
              {(patientId || identifyRole() == "patient") && (
                <NHButton
                  variant="default"
                  className=""
                  onClick={() => handleAppointment()}
                >
                  {Icons.CalenderIcon}Book Appointment
                </NHButton>
              )}
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {todayAppointments.map((data) => (
              <AppointmentCard
                key={data.id}
                headerBg={true}
                headerContent={
                  <NHButton
                    isView
                    onClick={() => handleViewDetails(data.id)}
                  ></NHButton>
                }
                title={
                  <span className="text-[#030229] text-[18px] font-medium">
                    Dr. {data.doctorName}
                  </span>
                }
                appointmentType={
                  <span className="text-[#FFC313]">{data.appointmentType}</span>
                }
                hospitalName={data.hospitalName}
                appointmentDate={data.appointmentDate}
                appointmentTime={data.appointmentTime}
                patientIssue={data.patientIssue}
                footerContent={
                  <div className="flex justify-between gap-4">
                    <NHButton
                      size={"small"}
                      className={"w-full py-9"}
                      onClick={() => handleCancleModal(data)}
                      // onClick={() => cancelAppointment(data?.key)}
                      //   onClick={() => handleJoinCall(data)}
                    >
                      Cancel
                    </NHButton>
                    <NHButton
                      size={"small"}
                      icon={Icons.CalenderIcon}
                      className={"w-full py-9"}
                      onClick={() => handleReschedule(data)}
                    >
                      Reschedule
                    </NHButton>
                  </div>
                }
                className="border border-slate-200"
              />
            ))}
          </div>
          <RescheduleAppointmentModal
            timeSlote={timeSlote}
            handleOk={rescheduleAppointment}
            handleClose={() => setIsReshceduleModal(false)}
            Title="Reschedule Appointment"
            rescheduleAppo={isReshceduleModal}
          />
        </NHCard>
      ),
    },
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
                onClick={handleOpenModal}
              >
                {Icons.CalenderIcon} {formatDateRange(fromDate, toDate)}{" "}
                {Icons.CloseCircle}
              </NHButton>
              {(patientId ||
                identifyRole() == "patient" ||
                identifyRole() !== "reception" ||
                window.location.pathname !== "/reception/appointment") && (
                <NHButton
                  variant="default"
                  className=""
                  onClick={() => handleAppointment()}
                >
                  {Icons.CalenderIcon}Book Appointment
                </NHButton>
              )}
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {upcomingAppointments.map((data) => (
              <AppointmentCard
                key={data.id}
                headerBg={true}
                headerContent={
                  <NHButton
                    isView
                    onClick={() => handleViewDetails(data.id)}
                  ></NHButton>
                }
                title={
                  <span className="text-[#030229] text-[18px] font-medium">
                    Dr. {data.doctorName}
                  </span>
                }
                appointmentType={
                  <span className="text-[#FFC313]">{data.appointmentType}</span>
                }
                hospitalName={data.hospitalName}
                appointmentDate={data.appointmentDate}
                appointmentTime={data.appointmentTime}
                patientIssue={data.patientIssue}
                footerContent={
                  <div className="flex justify-between gap-4">
                    <NHButton
                      size={"small"}
                      className={"w-full py-9"}
                      onClick={() => handleCancleModal(data)}
                      // onClick={() => cancelAppointment(data?.key)}
                    >
                      Cancel
                    </NHButton>
                    <NHButton
                      size={"small"}
                      icon={Icons.CalenderIcon}
                      className={"w-full py-9"}
                      onClick={() => handleReschedule(data)}
                    >
                      Reschedule
                    </NHButton>
                  </div>
                }
                className="border border-slate-200"
              />
            ))}
          </div>
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
                onClick={handleOpenModal}
              >
                {Icons.CalenderIcon} {formatDateRange(fromDate, toDate)}{" "}
                {Icons.CloseCircle}
              </NHButton>
              {(patientId || identifyRole() == "patient") && (
                <NHButton
                  variant="default"
                  className=""
                  onClick={() => handleAppointment()}
                >
                  {Icons.CalenderIcon}Book Appointment
                </NHButton>
              )}
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {previousAppointments.map((data) => (
              <AppointmentCard
                key={data.id}
                headerBg={true}
                headerContent={
                  <NHButton
                    isView
                    onClick={() => handleViewDetails(data.id)}
                  ></NHButton>
                }
                title={
                  <span className="text-[#030229]  text-[18px] font-medium">
                    Dr. {data.doctorName}
                  </span>
                }
                appointmentType={
                  <span className="text-[#FFC313]">{data.appointmentType}</span>
                }
                hospitalName={data.hospitalName}
                appointmentDate={data.appointmentDate}
                appointmentTime={data.appointmentTime}
                patientIssue={data.patientIssue}
                className="border border-slate-200"
              />
            ))}
          </div>
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
                onClick={handleOpenModal}
              >
                {Icons.CalenderIcon} {formatDateRange(fromDate, toDate)}{" "}
                {Icons.CloseCircle}
              </NHButton>

              {(patientId || identifyRole() == "patient") && (
                <NHButton
                  variant="default"
                  className=""
                  onClick={() => handleAppointment()}
                >
                  {Icons.CalenderIcon}Book Appointment
                </NHButton>
              )}
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cancelAppointments.map((data) => (
              <AppointmentCard
                key={data.id}
                headerBg={true}
                headerContent={
                  <NHButton
                    isView
                    onClick={() => handleViewDetails(data.id)}
                  ></NHButton>
                }
                title={
                  <span className="text-[#030229] text-[18px] font-medium">
                    Dr. {data.doctorName}
                  </span>
                }
                appointmentType={
                  <span className="text-[#FFC313]">{data.appointmentType}</span>
                }
                hospitalName={data.hospitalName}
                appointmentDate={data.appointmentDate}
                appointmentTime={data.appointmentTime}
                patientIssue={data.patientIssue}
                className="border border-slate-200"
              />
            ))}
          </div>
        </NHCard>
      ),
    },
  ];

  return (
    <>
      {bookAppoinment ? (
        patientId ? (
          <AppointmentSchedularPageForReception />
        ) : (
          <AppointmentSchedularPage />
        )
      ) : (
        <div className="appo_booking_sec">
          {patientId && (
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
          )}

          <div className="all-appo pt-[30px]">
            <NHCard
              className={""}
              headerContent={
                <NHInput
                  prefix={Icons.SearchIcon}
                  placeholder="Search Patient"
                />
              }
            >
              <NHTabs
                items={tabItems}
                defaultActiveKey="Scheduled"
                onChange={handleTabChange}
              />
            </NHCard>
          </div>
        </div>
      )}

      <Drawer
        title="Doctor Management"
        placement="right"
        onClose={() => setIsOffCanvasVisible(false)}
        open={isOffCanvasVisible}
        width={400}
      >
        {selectedAppointment && (
          <div>
            <div
              className="bg-cover bg-no-repeat rounded-[10px] w-full py-6 px-5"
              style={{ backgroundImage: `url(${modalImg})` }}
            >
              <div className="flex items-center">
                <img
                  src={selectedAppointment.doctorImage || doctorLogo}
                  alt="Doctor"
                  className="rounded-full w-[65px]"
                />
                <div className="ml-4">
                  <h3 className="text-[18px] font-semibold text-white">
                    {selectedAppointment.doctorFullName}
                  </h3>
                  <div className="text-white bg-[#718EBF] rounded-full px-5 py-3 inline-flex items-center">
                    {/* Conditionally render gender icon */}
                    {selectedAppointment.doctorGender === "male" ? (
                      <img
                        src={maleIcon}
                        alt="Male"
                        className="inline-block mr-1"
                      />
                    ) : (
                      <img
                        src={maleIcon}
                        alt="Female"
                        className="inline-block mr-1"
                      />
                    )}
                    <span className="ml-4 font-bold">
                      {selectedAppointment.doctorGender}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 bg-[#F6F8FB] p-5 rounded-xl">
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-semibold text-[14px]">
                    Hospital Name
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {selectedAppointment.hospitalName}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-semibold text-[14px]">
                    Doctor Qualification
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {selectedAppointment.doctorQualification}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-semibold text-[14px]">
                    Evening Session
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {selectedAppointment.doctorEveningSession}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-semibold text-[14px]">
                    Morning Session
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {selectedAppointment.doctorMorningSession}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-semibold text-[14px]">
                    Years Of Experience
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {selectedAppointment.doctorExperience}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-semibold text-[14px]">
                    Emergency Number{" "}
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {selectedAppointment.doctorEmergencyContactNo}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-semibold text-[14px]">
                    Specialty Type
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {selectedAppointment.doctorSpeciality}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-semibold text-[14px]">
                    Description{" "}
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {selectedAppointment.doctorDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
      <CancelOnlineAppointmentModal
        handleOk={() => cancelAppointment(selectedAppointmentForModal)}
        open={cancelModal}
        handleClose={closeCancleModal}
      />
    </>
  );
};

export default AppointmentBooking;
