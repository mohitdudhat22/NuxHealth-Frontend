import {
  NHButton,
  NHCard,
  NHHead,
  NHInput,
  NHTable,
  NHTabs,
} from "@/components";
import Icons from "@/constants/Icons";
import { Space, Tag } from "antd";
import { PatientDetailModal } from "@/components/NHModalComponents/ModalTemplate/PatientDetailModal";
import { useState } from "react";
import { TodayAppointment } from "./TodayAppointment";
import { UpcomingAppointment } from "./UpcomingAppointment";
import { PreviousAppointment } from "./PreviousAppointment";
import { CancelAppointment } from "./CancelAppointment";

export const PatientManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleViewBill = (record) => {
    setSelectedPatient(record);
    setIsModalOpen(true);
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
      render: (time) => <Tag>{time}</Tag>,
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

  const tabItems = [
    {
      key: "today",
      label: "Today Appointment",
      children: <TodayAppointment />,
    },
    {
      key: "upcoming",
      label: "Upcoming Appointment",
      children: <UpcomingAppointment />,
    },
    {
      key: "previous",
      label: "Previous Appointment",
      children: <PreviousAppointment />,
    },
    {
      key: "cancel",
      label: "Cancel Appointment",
      children: <CancelAppointment />,
    },
  ];

  return (
    <>
      <NHHead />
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
    </>
  );
};

export default PatientManagement;
