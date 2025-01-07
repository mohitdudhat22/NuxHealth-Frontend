import React, { useState } from "react";
import { NHButton, NHCard, NHInput, NHTable } from "@/components";
import { Space, Tag } from "antd";
import Icons from "@/constants/icons";
import { useCancelAppointments } from "@/hook/Admin/PatientManagement/CancelAppointment";
import { PatientDetailModal } from "@/components/NHModalComponents/ModalTemplate/PatientDetailModal";

export const CancelAppointment = () => {
  const { data, loading, error, onSearch } = useCancelAppointments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleViewBill = (record) => {
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
            icon={Icons.ViewBillIcon}
            onClick={() => handleViewBill(record)}
            className="bg-white view-btn"
          />
        </Space>
      ),
    },
  ];

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <NHCard
        title="Cancel Appointments"
        headerContent={
          <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" onChange={(e) => onSearch(e.target.value)} />
        }
      >
        <NHTable loading={loading} showPagination={true} tableColumn={columns} tableDataSource={data} />
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