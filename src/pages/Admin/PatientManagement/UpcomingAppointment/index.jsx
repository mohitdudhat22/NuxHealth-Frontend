import React, { useState } from "react";
import { NHButton, NHCard, NHInput, NHTable } from "@/components";
import { Space, Tag } from "antd";
import Icons from "@/constants/icons";
import { useUpcomingAppointments } from "@/hook/Admin/PatientManagement/UpcomingAppointment";
import { PatientDetailModal } from "@/components/NHModalComponents/ModalTemplate/PatientDetailModal";

export const UpcomingAppointment = () => {
  const { data, loading, error, onSearch } = useUpcomingAppointments();
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
            className="view-btn bg-white"
          />
        </Space>
      ),
    },
  ];

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <NHCard
        title="Upcoming Appointments"
        headerContent={
          <NHInput
            prefix={Icons.SearchIcon}
            placeholder="Search Patient"
            onChange={(e) => onSearch(e.target.value)} // trigger onSearch on input change
          />
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