import {
  AppointmentCard,
  NHButton,
  NHCard,
  NHInput,
  NHTabs,
} from "@/components";
import { CustomDateModal } from "@/components/NHModalComponents/ModalTemplate/CustomDateModal";
import Icons from "@/constants/icons";
import React, { useState } from "react";
import { Drawer } from "antd";
import "./AppointmentBooking.css";
import modalImg from "../../../assets/images/cover/view_modal_bg.png";
import maleIcon from "../../../assets/images/cover/male_icon.svg";
import doctorLogo from "../../../assets/images/cover/Avatar_6.png";
import { useNavigate } from "react-router-dom";

export const AppointmentBooking = () => {
  const [isReshceduleModal, setIsReshceduleModal] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [tempFromDate, setTempFromDate] = useState(null);
  const [tempToDate, setTempToDate] = useState(null);

  // State for OffCanvas
  const [isOffCanvasVisible, setIsOffCanvasVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const navigate = useNavigate();

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
    // Handle the apply action here
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);
    setFromDate(tempFromDate);
    setToDate(tempToDate);
    handleCloseModal();
  };

  const handleReset = () => {
    setTempFromDate(null);
    setTempToDate(null);
  };

  // Function to format dates into a readable string (e.g., "2 March,2022 - 13 March, 2022")
  const formatDateRange = (fromDate, toDate) => {
    if (!fromDate || !toDate) return "Select Date Range";
    const options = { day: "numeric", month: "long", year: "numeric" };
    const fromDateStr = new Date(fromDate).toLocaleDateString("en-US", options);
    const toDateStr = new Date(toDate).toLocaleDateString("en-US", options);
    return `${fromDateStr} - ${toDateStr}`;
  };

  // Dummy data for appointments
  const appointmentData = [
    {
      id: 1,
      title: "Dr. Nolan George",
      hospitalName: "Artemis Hospital",
      doctorQualification: "MBBS",
      breakTime: "1 Hour",
      workingTime: "6 Hour",
      yearsOfExperience: "6+ Year",
      emergencyContactNumber: "48555-20103",
      specialtyType: "Obstetrics and genecology",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      appointmentType: "Online",
      appointmentDate: "2 Jan, 2022",
      appointmentTime: "10:20 AM",
      patientIssue: "Feeling Tired",
      gender: "Male",
    },
    {
        id: 2,
        title: "Dr. Geta Smith",
        hospitalName: "Krishana Hospital",
        doctorQualification: "MD",
        breakTime: "1 Hour",
        workingTime: "8 Hour",
        yearsOfExperience: "3+ Year",
        emergencyContactNumber: "24234-14482",
        specialtyType: "Obstetrics and genecology",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        appointmentType: "Offline",
        appointmentDate: "6 Feb, 2022",
        appointmentTime: "08:30 AM",
        patientIssue: "Feeling Tired",
        gender: "Female",
      },
    // Add more appointment data as needed
  ];

  // Function to handle "View Details" button click
  const handleViewDetails = (id) => {
    const appointment = appointmentData.find((item) => item.id === id);
    setSelectedAppointment(appointment);
    setIsOffCanvasVisible(true); // Show OffCanvas
  };

  const tabItems = [
    {
      key: "Scheduled",
      label: "Scheduled Appointment",
      children: (
        <NHCard
          title={
            <span className="text-[#030229] text-[26px] font-semibold">
              Scheduled Appointment
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
              <NHButton variant="default" className="">
                {Icons.CalenderIcon}Book Appointment
              </NHButton>
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* {patientData.map((data, index) => {
                            const { name, patientIssue, diseaseName, appointmentDate, appointmentTime } = data;
                            return ( */}
            {appointmentData.map((data) => (
              <AppointmentCard
                key={data.id}
                headerBg={true}
                headerContent={
                  <button
                    className="p-2 bg-white rounded-xl hover:bg-gray-300"
                    aria-label="View Details"
                    onClick={() => handleViewDetails(data.id)}
                  >
                    {Icons.ViewBillIcon}
                  </button>
                }
                title={
                  <span className="text-[#030229] text-[18px] font-medium">
                    {data.title}
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
                    //   onClick={() => handleJoinCall(data)}
                    >
                      Cancel
                    </NHButton>
                    <NHButton
                      size={"small"}
                      icon={Icons.CalenderIcon}
                      className={"w-full py-9"}
                      onClick={() => navigate("/patient/appointment/rescheduler")}
                    >
                      Reschedule
                    </NHButton>
                  </div>
                }
                className="border border-slate-200"
              />
            ))}
            {/* );
                        })} */}
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
              Previous Appointment
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
              <NHButton variant="default" className="">
                {Icons.CalenderIcon}Book Appointment
              </NHButton>
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* {patientData.map((data, index) => {
                            const { name, patientIssue, diseaseName, appointmentDate, appointmentTime } = data;
                            return ( */}
            {appointmentData.map((data) => (
              <AppointmentCard
                key={data.id}
                headerBg={true}
                headerContent={
                  <button
                    className="p-2 bg-white rounded-xl hover:bg-gray-300"
                    aria-label="View Details"
                    onClick={() => handleViewDetails(data.id)}
                  >
                    {Icons.ViewBillIcon}
                  </button>
                }
                title={
                  <span className="text-[#030229] text-[18px] font-medium">
                    {data.title}
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
            {/* );
                        })} */}
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
              Cancel Appointment
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
              <NHButton variant="default" className="">
                {Icons.CalenderIcon}Book Appointment
              </NHButton>
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* {patientData.map((data, index) => {
                            const { name, patientIssue, diseaseName, appointmentDate, appointmentTime } = data;
                            return ( */}
            {appointmentData.map((data) => (
              <AppointmentCard
                key={data.id}
                headerBg={true}
                headerContent={
                  <button
                    className="p-2 bg-white rounded-xl hover:bg-gray-300"
                    aria-label="View Details"
                    onClick={() => handleViewDetails(data.id)}
                  >
                    {Icons.ViewBillIcon}
                  </button>
                }
                title={
                  <span className="text-[#030229] text-[18px] font-medium">
                    {data.title}
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
            {/* );
                        })} */}
          </div>
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
              Pending Appointment
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
              <NHButton variant="default" className="">
                {Icons.CalenderIcon}Book Appointment
              </NHButton>
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* {patientData.map((data, index) => {
                            const { name, patientIssue, diseaseName, appointmentDate, appointmentTime } = data;
                            return ( */}
            {appointmentData.map((data) => (
              <AppointmentCard
                key={data.id}
                headerBg={true}
                headerContent={
                  <button
                    className="p-2 bg-white rounded-xl hover:bg-gray-300"
                    aria-label="View Details"
                    onClick={() => handleViewDetails(data.id)}
                  >
                    {Icons.ViewBillIcon}
                  </button>
                }
                title={
                  <span className="text-[#030229] text-[18px] font-medium">
                    {data.title}
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
                    //   onClick={() => handleJoinCall(data)}
                    >
                      Cancel
                    </NHButton>
                    <NHButton
                      size={"small"}
                      icon={Icons.CalenderIcon}
                      className={"w-full py-9"}
                      onClick={() => navigate("/patient/appointment/rescheduler")}
                    >
                      Reschedule
                    </NHButton>
                  </div>
                }
                className="border border-slate-200"
              />
            ))}
            {/* );
                        })} */}
          </div>
        </NHCard>
      ),
    },
  ];

  return (
    <>
    <div className="appo_booking_sec">
      <NHCard
        headerContent={
          <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
        }
      >
        <NHTabs items={tabItems} defaultActiveKey="Scheduled" />
      </NHCard>

      <CustomDateModal
        isReshceduleModal={isReshceduleModal}
        handleClose={handleCloseModal}
        handleOk={handleOk}
        fromDate={tempFromDate} // Use temporary state for modal
        toDate={tempToDate}
        setFromDate={setTempFromDate} // Update temporary state
        setToDate={setTempToDate}
        handleReset={handleReset}
      />

      {/* Ant Design OffCanvas (Drawer) */}
      <Drawer
        title="Doctor Management"
        placement="right"
        onClose={() => setIsOffCanvasVisible(false)} // Close OffCanvas
        open={isOffCanvasVisible} // Control visibility
        width={400} // Set width of the OffCanvas
      >
        {selectedAppointment && (
          <div>
            <div
              className="bg-cover bg-no-repeat rounded-[10px] w-full py-6 px-5"
              style={{ backgroundImage: `url(${modalImg})` }}
            >
              <div className="flex items-center">
                <img src={doctorLogo} alt="Doctor" className="rounded-full" />
                <div className="ml-4">
                  <h3 className="text-[18px] font-semibold text-white">
                    {selectedAppointment.title}
                  </h3>
                  <div className="text-white bg-[#718EBF] rounded-full px-5 py-3 inline-flex items-center">
                    {/* Conditionally render gender icon */}
                    {selectedAppointment.gender.toLowerCase() === "male" ? (
                      <img
                        src={maleIcon} // Replace with your male icon import
                        alt="Male"
                        className="inline-block mr-1"
                      />
                    ) : (
                      <img
                        src={maleIcon} // Replace with your female icon import
                        alt="Female"
                        className="inline-block mr-1"
                      />
                    )}
                    <span className="ml-4 font-bold">
                      {selectedAppointment.gender}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 bg-[#F6F8FB] p-5 rounded-xl">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-semibold text-[14px]">Break Time</h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {selectedAppointment.breakTime}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-semibold text-[14px]">Working Time</h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {selectedAppointment.workingTime}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-semibold text-[14px]">
                    Years Of Experience
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {selectedAppointment.yearsOfExperience}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-semibold text-[14px]">
                    Emergency Contact Number{" "}
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {selectedAppointment.emergencyContactNumber}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-semibold text-[14px]">
                    Specialty Type
                  </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {selectedAppointment.specialtyType}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="flex flex-col">
                  <h4 className="text-[#A7A7A7] font-semibold text-[14px]">Description </h4>
                  <p className="text-[#141414] font-medium text-[16px] mt-1">
                    {selectedAppointment.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
      </div>
    </>
  );
};
