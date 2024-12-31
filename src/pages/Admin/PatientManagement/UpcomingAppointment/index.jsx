import React from "react";
import { NHButton, NHCard, NHInput, NHTable } from "@/components";
import { Space, Tag } from "antd";
import Icons from "@/constants/icons";
import { useUpcomingAppointments } from "@/hook/Admin/PatientManagement/UpcomingAppointment"; // Import the custom hook

const columns = [
  {
    title: "Patient Name",
    dataIndex: "patientName",
    key: "patientName",
    render: (text, record) => (
      <div className="flex items-center gap-2">
        <img  src={record.avatar} alt={text} className="w-8 h-8 rounded-full" />
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
  
const handleViewBill = (record) => {
  // Implement your view bill logic here
  console.log("Viewing bill for", record);
};

export const UpcomingAppointment = () => {
  const { data, loading, error } = useUpcomingAppointments();

  if (error) return <div>Error: {error.message}</div>;

  return (
    <NHCard
      title="Upcoming Appointments"
      headerContent={
        <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
      }
    >
      <NHTable loading={loading} tableColumn={columns} tableDataSource={data} />
    </NHCard>
  );
};
