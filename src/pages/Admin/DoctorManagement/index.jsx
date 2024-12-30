import { useDeleteModal, useDoctorManagement } from '@/hook';
import { Space, Tag } from 'antd/lib';
import Icons from '@/constants/icons'
import { NHButton, NHCard, NHInput, NHTable, DeleteModal } from '@/components'
import { Avatar } from 'antd';

export const DoctorManagement = () => {
  const {
    doctors,
    data,
    loading,
    fetchDoctors,
    navigate,
    onSearch
  } = useDoctorManagement();

  const { deleteData, isDelete, setDelete } = useDeleteModal(fetchDoctors);

  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
      render: (name, record) => (
        <Space>
          <Avatar src={record.avatar} alt={name} size={40} />
          <span>{name}</span>
        </Space>
      ),
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
      render: (_, record) => {
        return (
          <Space size="middle">
            <NHButton size={"small"} icon={Icons.View} className="edit-btn" />
            <NHButton size={"small"} icon={Icons.Delete} className="delete-btn" onClick={() => setDelete(record)} />
          </Space>
        )
      },
    },
  ];

  return (
    <>
      <NHCard title="Doctor Management" headerContent={
        <>
          <NHInput prefix={Icons.SearchIcon} placeholder={"Search"} onChange={(e) => onSearch(e.target.value)} />
          <NHButton icon={Icons.PlusSquare} onClick={() => navigate("create")} variant={"primary"}>Add New Doctor</NHButton>
        </>
      }>
        <NHTable loading={loading} tableColumn={columns} tableDataSource={data} />

        {/* Delete Complaint Modal */}
        <DeleteModal
          title={"Delete Doctor?"}
          isModalOpen={isDelete}
          handleClose={() => setDelete(false)}
          handleOk={() => deleteData("admin/deleteDoctor", isDelete.key)}
          onCancel={() => setDelete(false)}
        >
          Are you sure you want to delete this Doctor?
        </DeleteModal>
      </NHCard>

    </>
  )
}
