import Icons from '@/constants/icons';
import { NHButton, NHCard, NHInput, NHTable } from '@/components'
import { Space, Tag } from 'antd';

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
      <Tag color={type === "Online" ? "blue" : "orange"}>
        {type}
      </Tag>
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

const data = [
  {
    key: "1",
    patientName: "Marcus Phillips",
    avatar: "https://i.pravatar.cc/300",
    diseaseName: "Viral Infection",
    doctorName: "Dr. Matthew Best",
    appointmentTime: "4:30 PM",
    appointmentType: "Online",
    appointmentDate: "2 Jun, 2022",
    phoneNumber: "92584 58475",
    age: "27",
    gender: "Male",
    issue: "Stomach ache",
    address: "B-408 Swastik society, Shivaji marg mota varacha rajkot"
  },
  {
    key: "2",
    patientName: "Landyn Sheffey",
    avatar: "https://i.pravatar.cc/300",
    diseaseName: "Blood Pressure",
    doctorName: "Dr. Annabella Porter",
    appointmentTime: "5:00 AM",
    appointmentType: "Onsite",
  },
  {
    key: "3",
    patientName: "Leslie Murray",
    avatar: "https://i.pravatar.cc/300",
    diseaseName: "Diabetes",
    doctorName: "Dr. Steven Ralph",
    appointmentTime: "7:30 PM",
    appointmentType: "Online",
  },
];


export const TodayAppointment = () => {
  return (
    <NHCard
      title="Today Appointment"
      headerContent={
        <NHInput
          prefix={Icons.SearchIcon}
          placeholder="Search Patient"
        />
      }
    >
      <NHTable columns={columns} dataSource={data} />
    </NHCard>
  )
}
