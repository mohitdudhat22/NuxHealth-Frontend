import React, { useState } from "react";
import { NHButton, NHCard, NHInput, NHTable } from "@/components";
import { Space, Tag } from "antd";
import Icons from "@/constants/icons";
import "./CancelAppo.css";
import { useCancelAppointments } from "@/hook/Admin/PatientManagement/CancelAppointment";
import { PatientDetailModal } from "@/components/NHModalComponents/ModalTemplate/PatientDetailModal";
import Avatar from "antd/es/avatar/avatar";

export const CancelAppointment = () => {
  const { data, loading, error, onSearch } = useCancelAppointments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleViewPatient = (record) => {
    setSelectedPatient(record);
    setIsModalOpen(true);
    console.log("Viewing bill for", record);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} alt={name} size={40} />
          <span>{text}</span>
        </Space>
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
        <Tag color={appointmentTime === "#F6F8FB"}>
          {appointmentTime || "N/A"}
        </Tag>
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
          <NHButton isView onClick={() => handleViewPatient(record)} />
        </Space>
      ),
    },
  ];

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="cancel_appo">
        <NHCard
          title="Cancel Appointments"
          headerContent={
            <NHInput
              prefix={Icons.SearchIcon}
              placeholder="Search Patient"
              onChange={(e) => onSearch(e.target.value)}
            />
          }
        >
          <NHTable
            loading={loading}
            showPagination={true}
            tableColumn={columns}
            tableDataSource={data}
            scroll={{
              x: 900,
              y: 500,
            }}
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
