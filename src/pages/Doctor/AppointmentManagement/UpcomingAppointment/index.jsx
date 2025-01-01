import React, { useState } from "react";
import { NHButton, NHCard, NHInput, NHTable } from "@/components";
import { Space, Tag } from "antd";
import Icons from "@/constants/icons";
import { useUpcomingAppointments } from "@/hook/Admin/PatientManagement/UpcomingAppointment"; 
import { PatientDetailModal } from "@/components/NHModalComponents/ModalTemplate/PatientDetailModal";

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
          onClick={() => handleViewBill(record)}
          className="view-btn bg-white"
      />
       <NHButton
          type="primary"
          size="small"
          icon={Icons.BlueCalenderIcon}
          onClick={() => handleViewBill(record)}
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

  const handleViewPatient = (record) => {
    setSelectedPatient(record);
    console.log(record, "Viewing patient details");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <NHCard
        title="Upcoming Appointments"
        headerContent={
          <>
          <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
          <NHButton>{Icons.CalenderIcon}Any Date</NHButton>
          <NHButton>{Icons.CalenderIcon}Appointment Time Slot</NHButton>
          </>
        }
      >
        <NHTable
          loading={loading}
          tableColumn={columns(handleViewPatient)}
          tableDataSource={data}
        />
      </NHCard>

      {selectedPatient && (
        <PatientDetailModal
          isModalOpen={isModalOpen}
          onCancel={handleCloseModal}
          handleClose={handleCloseModal}
          Title="Patient Details"
          patientData={selectedPatient}
        />
      )}
    </>
  );
};
