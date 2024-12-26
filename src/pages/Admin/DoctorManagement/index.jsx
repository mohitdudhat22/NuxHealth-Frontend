import { useDoctorManagement } from '@/hook';
import { Space, Tag } from 'antd/lib';
import Icons from '@/constants/icons'
import { NHButton, NHCard, NHInput, NHTable } from '@/components'

export const DoctorManagement = () => {
  const {
    doctors,
    data,
    loading,
    isDrawerVisible,
    openDrawer,
    closeDrawer,
  } = useDoctorManagement();
  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Qualification",
      dataIndex: "qualification",
      key: "qualification",
    },
    {
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "Working Time",
      dataIndex: "workingTime",
      key: "workingTime",
      render: (plan) => (
        <Tag color={"blue"}>
          {plan}
        </Tag>
      ),
    },
    {
      title: "Patient Check Up Time",
      dataIndex: "patientCheckUpTime",
      key: "patientCheckUpTime",
      render: (plan) => (
        <Tag color={"blue"}>
          {plan}
        </Tag>
      ),
    },
    {
      title: "Break Time",
      dataIndex: "breakTime",
      key: "breakTime",
      render: (plan) => (
        <Tag color={"blue"}>
          {plan}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NHButton type="primary" variant="secondary" size="small" icon={Icons.EditIcon} className="bg-white edit-btn" />
          <NHButton type="primary" variant="secondary" size="small" icon={Icons.ViewIcon} className="bg-white edit-btn" />
          <NHButton type="primary" variant="secondary" size="small" icon={Icons.DeleteIcon} className="bg-white edit-btn" />
        </Space>
      ),
    },
  ];


  return (
    <NHCard title="Doctor Management" headerContent={
      <>
        <NHInput suffix={Icons.SerachIcon} placeholder={"Search"} />
        <NHButton onClick={() => setVisible(true)} variant={"primary"}>Add New Doctor</NHButton>
      </>
    }>
      <NHTable loading={loading} tableColumn={columns} tableDataSource={data} />
    </NHCard >
  )
}
