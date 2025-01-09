import React, { useState } from "react";
import { NHButton, NHCard, NHInput, NHTable } from "@/components";
import { Space, Tag } from "antd";
import Icons from "@/constants/icons";
import "./TodayAppo.css"
import { useTodaysAppointment } from "@/hook/Admin/PatientManagement/TodaysAppointment";
import { PatientDetailModal } from "@/components/NHModalComponents/ModalTemplate/PatientDetailModal";

const columns = (handleViewPatient) => [
  {
    title: "Patient Name",
    dataIndex: "patientName",
    key: "patientName",
    render: (text, record) => (
      <div className="flex items-center gap-2">
        <img src={record.avatar} alt={text} className="w-8 h-8 rounded-full" />
        <span>{text || "N/A"}</span>
      </div>
    ),
  },
  {
    title: "Patient Issue",
    dataIndex: "patientIssue",
    key: "patientIssue",
    render: (text) => <span>{text || "N/A"}</span>,
  },
  {
    title: "Doctor Name",
    dataIndex: "doctorName",
    key: "doctorName",
    render: (text) => <span>{text || "N/A"}</span>,
  },
  {
    title: "Disease Name",
    dataIndex: "diseaseName",
    key: "diseaseName",
    render: (text) => <span>{text || "N/A"}</span>,
  },
  {
    title: "Appointment Time",
    dataIndex: "appointmentTime",
    key: "appointmentTime",
    render: (appointmentTime) => (
      <Tag color={appointmentTime === "#F6F8FB"}>{appointmentTime || "N/A"}</Tag>
    ),
  },
  {
    title: "Appointment Type",
    dataIndex: "appointmentType",
    key: "appointmentType",
    render: (type) => (
      <Tag color={type === "online" ? "blue" : "orange"}>{type || "N/A"}</Tag>
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
          icon={Icons.ViewBillIcon}
          onClick={() => handleViewPatient(record)}
          className="view-btn bg-white"
        />
      </Space>
    ),
  },
];

export const TodayAppointment = () => {
  const { data, loading, error, onSearch } = useTodaysAppointment();
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
    <div className="today_appo">
      <NHCard
        title="Today's Appointments"
        headerContent={
          <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" onChange={(e) => onSearch(e.target.value)} />
        }
      >
        <NHTable
          loading={loading}
          showPagination={true}
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
      </div>
    </>
  );
};