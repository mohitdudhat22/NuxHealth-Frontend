import React, { useState, useEffect } from "react";
import { NHButton, NHCard, NHInput, NHTable } from "@/components";
import { Space, Tag } from "antd";
import Icons from "@/constants/icons";
import { useUpcomingAppointments } from "@/hook/Doctor/AppointmentManagement/UpcomingAppointment";
import { CancelOnlineAppointmentModal } from "@/components/NHModalComponents/ModalTemplate/CancelOnlineAppointmentModal";
import { CancelOnsiteAppointmentModal } from "@/components/NHModalComponents/ModalTemplate/CancelOnsiteAppointmentModal";
import { CustomDateModal } from "@/components/NHModalComponents/ModalTemplate/CustomDateModal";
import moment from "moment";

const columns = (handleViewPatient) => [
  {
    title: "Patient Name",
    dataIndex: "patientName",
    key: "patientName",
    render: (text, record) => (
      <div className="flex items-center gap-2">
        <img src={record.avatar} alt={text} className="w-8 h-8 rounded-full" />
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
      <Tag color={type === "online" ? "blue" : "orange"}>{type}</Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <NHButton
          type="primary"
          size="small"
          icon={Icons.RedCalenderIcon}
          onClick={() => handleViewPatient(record)}
          className="view-btn bg-white"
        />
        <NHButton
          type="primary"
          size="small"
          icon={Icons.BlueCalenderIcon}
          onClick={() => handleViewPatient(record)}
          className="view-btn bg-white"
        />
      </Space>
    ),
  },
];

export const UpcomingAppointments = () => {
  const { data, loading, error } = useUpcomingAppointments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [filteredAppointments, setFilteredAppointments] = useState(data);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleViewPatient = (record) => {
    setSelectedPatient(record);
    if (record.appointmentType === "online") {
      setModalType("online");
    } else {
      setModalType("onsite");
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
    setModalType(null);
  };

  const handleOpenDateModal = () => {
    setIsDateModalOpen(true);
  };

  const handleCloseDateModal = () => {
    setIsDateModalOpen(false);
  };

  const handleApplyDateFilter = () => {
    const filtered = data.filter((appointment) => {
      const appointmentDate = moment(appointment.appointmentTime);
      return (
        (!fromDate || appointmentDate.isSameOrAfter(moment(fromDate))) &&
        (!toDate || appointmentDate.isSameOrBefore(moment(toDate)))
      );
    });

    setFilteredAppointments(filtered);
    setIsDateModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <NHCard
        title="Upcoming Appointments"
        headerContent={
          <>
            <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
            <NHButton onClick={handleOpenDateModal}>
              {Icons.CalenderIcon} Any Date
            </NHButton>
            <NHButton>{Icons.CalenderIcon} Appointment Time Slot</NHButton>
          </>
        }
      >
        <NHTable
          loading={loading}
          showPagination={true}
          tableColumn={columns(handleViewPatient)}
          tableDataSource={filteredAppointments}
          route="/doctor"
        />
      </NHCard>

      {modalType === "online" && selectedPatient && (
        <CancelOnlineAppointmentModal
          isModalOpen={isModalOpen}
          onCancel={handleCloseModal}
          handleClose={handleCloseModal}
          Title="Cancel Online Appointment"
          patientData={selectedPatient}
        />
      )}

      {modalType === "onsite" && selectedPatient && (
        <CancelOnsiteAppointmentModal
          isModalOpen={isModalOpen}
          onCancel={handleCloseModal}
          handleClose={handleCloseModal}
          Title="Cancel Onsite Appointment"
          patientData={selectedPatient}
        />
      )}

      <CustomDateModal
        handleOk={handleApplyDateFilter}
        onCancel={handleCloseDateModal}
        handleClose={handleCloseDateModal}
        customDate={isDateModalOpen}
        Title="Select Custom Date Range"
        loading={false}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />
    </>
  );
};
