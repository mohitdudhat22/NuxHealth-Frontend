import { NHButton, NHCard, NHInput, NHTable } from '@/components';
import { Space, Tag } from 'antd';
import Icons from '@/constants/icons';
import { useTodayAppointments } from '@/hook/Admin/PatientManagement/TodaysAppointment'; // Import the custom hook

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
    )
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
        <NHButton
          type="primary"
          size="small"
          icon={Icons.ViewBillIcon}
          onClick={() => handleViewBill(record)} // You need to implement this function
          className="view-btn bg-white"
        />
      </Space>
    ),
  },
];

export const TodayAppointment = () => {
  const { appointments, loading, error } = useTodayAppointments(); // Use the custom hook

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <NHCard
      title="Today's Appointments"
      headerContent={
        <NHInput
          prefix={Icons.SearchIcon}
          placeholder="Search Patient"
        />
      }
    >
      <NHTable columns={columns} dataSource={appointments} />
    </NHCard>
  );
};
