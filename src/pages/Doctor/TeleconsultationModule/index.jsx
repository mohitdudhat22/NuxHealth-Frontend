import {
  AppointmentCard,
  NHButton,
  NHCard,
  NHInput,
  NHModal,
  NHTable,
  NHTabs,
} from "@/components";
import Icons from "@/constants/icons";
import { Space, Tag } from "antd";
import { PatientDetailModal } from "@/components/NHModalComponents/ModalTemplate/PatientDetailModal";
import { useState } from "react";
import { CustomDateModal } from "@/components/NHModalComponents/ModalTemplate/CustomDateModal";
import {
  useCancleTeleconsultation,
  usePrivousTeleconsultation,
  useTodayTeleconsultation,
  useUpcomingTeleconsultation,
} from "@/hook/Doctor";
import { useNavigate } from "react-router-dom";
import { reschedule } from "@/axiosApi/ApiHelper";
import { RescheduleAppointmentModal } from "@/components/NHModalComponents/ModalTemplate/ResheduleAppointmentModal";

export const Teleconsultation = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectedPatientModel, setPatientModel] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [isReshceduleModal, setIsReshceduleModal] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const {
    data: privousTeleconsultation,
    loading: privousLoader,
    fetchAppointments,
    filterAppointments,
    setIsDateModalOpen,
    isDateModalOpen,
  } = usePrivousTeleconsultation();
  const { data: upcomingTeleconsultation, loading: upcomingLoader } =
    useUpcomingTeleconsultation();
  const { data: todayTeleconsultation, loading: todayLoader } =
    useTodayTeleconsultation();
  const { data: cancleTeleconsultation, loading: cancleLoader } =
    useCancleTeleconsultation();

  const rescheduleAppointment = async (selectedDate, selectedTime) => {
    const payload = {
      date: selectedDate,
      appointmentTime: selectedTime,
    };

    console.log("Appointment ID:", appointmentId);
    console.log("Payload:", payload);

    try {
      const response = await reschedule(appointmentId, payload);
      console.log("Response:", response);
      setIsReshceduleModal(false); // Close modal after successful reschedule
      fetchAppointments();
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  const handleViewBill = (record) => {
    setSelectedPatient(record);
    setIsModalOpen(true);
  };

  const handleJoinCall = (patient) => {
    setSelectedPatientData(patient);
    setPatientModel(true);
  };

  const handelReschedule = (id) => {
    setIsReshceduleModal(true);
    setAppointmentId(id);
  };
  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <img
            src={record.avatar}
            alt={text}
            className="w-8 h-8 rounded-full"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Disease Name",
      dataIndex: "diseaseName",
      key: "diseaseName",
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
    },
    {
      title: "Appointment Type",
      dataIndex: "appointmentType",
      key: "appointmentType",
      render: (type) => (
        <Tag color={type === "Online" ? "blue" : "orange"}>{type}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NHButton isView onClick={() => handleViewBill(record)} />
        </Space>
      ),
    },
  ];

  // const patientData = appointments.appointments || [];

  const tabItems = [
    {
      key: "today",
      label: "Teleconsultation Module",
      children: (
        <>
          <NHCard
            rootClass={"p-0"}
            title="Teleconsultation Module"
            headerContent={
              <div className="flex items-center justify-between">
                <NHButton
                  variant="default"
                  className="text-black bg-white"
                  onClick={() => setIsDateModalOpen(true)}
                >
                  {Icons.CalenderIcon} {fromDate ? fromDate : "From"} -{" "}
                  {toDate ? toDate : "To"}
                  {Icons.CloseCircle}
                </NHButton>
              </div>
            }
          >
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-lg">
              {privousTeleconsultation.map((data, index) => {
                const {
                  name,
                  patientIssue,
                  diseaseName,
                  appointmentDate,
                  appointmentTime,
                  date,
                  patientName,
                  doctorId,
                  hospitalId,
                  patientId,
                } = data;
                return (
                  <AppointmentCard
                    key={index}
                    headerBg={true}
                    title={
                      <span className="font-semibold text-[#030229] text-2xl">
                        {patientName}
                      </span>
                    }
                    patientIssue={patientIssue}
                    diseaseName={diseaseName}
                    appointmentDate={appointmentDate || date}
                    appointmentTime={appointmentTime}
                    footerContent={
                      <div className="flex justify-between w-full gap-4">
                        <NHButton
                          size={"small"}
                          className={"w-full py-3 px-4"}
                          onClick={() => handleJoinCall(data)}
                        >
                          Join Call
                        </NHButton>
                        <NHButton
                          size={"small"}
                          icon={Icons.CalenderIcon}
                          className={"w-full py-3 px-4"}
                          onClick={() => handelReschedule(data?.key)}
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
          </NHCard>
          <RescheduleAppointmentModal
            handleOk={rescheduleAppointment}
            handleClose={() => setIsReshceduleModal(false)}
            Title="Reschedule Appointment"
            rescheduleAppo={isReshceduleModal}
          />
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
        </>
      ),
    },
    {
      key: "upcoming",
      label: "Upcoming Appointment",
      children: (
        <NHCard
          title="Upcoming Appointment"
          rootClass={"p-0"}
          headerContent={
            <>
              <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
              <NHButton variant="default" className="text-black bg-white">
                {Icons.CalenderIcon}2 March,2022 - 13 March, 2022
                {Icons.CloseCircle}
              </NHButton>
            </>
          }
        >
          <NHTable
            columns={columns}
            dataSource={upcomingTeleconsultation}
            loading={upcomingLoader}
            showPagination={true}
          />
        </NHCard>
      ),
    },
    {
      key: "previous",
      label: "Previous Appointment",
      children: (
        <NHCard
          title="Previous Appointment"
          rootClass={"p-0"}
          headerContent={
            <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
          }
        >
          <NHTable
            columns={columns}
            dataSource={privousTeleconsultation}
            loading={privousLoader}
            showPagination={true}
          />
        </NHCard>
      ),
    },
    {
      key: "cancel",
      label: "Cancel Appointment",
      children: (
        <NHCard
          title="Cancel Appointment"
          rootClass={"p-0"}
          headerContent={
            <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
          }
        >
          <NHTable
            columns={columns}
            dataSource={cancleTeleconsultation}
            loading={cancleLoader}
            showPagination={true}
          />
        </NHCard>
      ),
    },
  ];

  return (
    <>
      <NHCard
        headerContent={
          <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
        }
      >
        <NHTabs items={tabItems} defaultActiveKey="today" />
      </NHCard>

      <PatientDetailModal
        isModalOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        handleClose={() => setIsModalOpen(false)}
        Title="Patient Details"
        handleOk={() => setIsModalOpen(false)}
        patientData={selectedPatient}
      />
      <NHModal
        title={
          <div className="flex items-center justify-between">
            <h3>Reminder</h3>
            <button
              onClick={() => setPatientModel(false)}
              className="hover:opacity-80"
            >
              {Icons.CloseCircle}
            </button>
          </div>
        }
        open={isSelectedPatientModel}
        onCancel={() => setPatientModel(false)}
        footer={null}
        width={350}
        className="patient-details-modal"
      >
        {selectedPatientData && (
          <AppointmentCard
            key={selectedPatientData.name}
            patientName={selectedPatientData.name}
            patientIssue={selectedPatientData.patientIssue}
            diseaseName={selectedPatientData.diseaseName}
            appointmentTime={selectedPatientData.appointmentTime}
            reminder={"You have a meeting with him in 15 minutes"}
            footerContent={
              <div className="flex justify-between gap-4">
                <NHButton
                  size={"small"}
                  className={"w-full"}
                  onClick={() => setPatientModel(false)}
                >
                  Cancel
                </NHButton>
                <NHButton
                  size={"small"}
                  className={"w-full"}
                  onClick={() =>
                    navigate("videoCall?room=" + selectedPatientData.key)
                  }
                >
                  {console.log(selectedPatientData)}
                  Join
                  {console.log(selectedPatientData._id)}
                </NHButton>
              </div>
            }
            className="p-0"
          />
        )}
      </NHModal>
    </>
  );
};
