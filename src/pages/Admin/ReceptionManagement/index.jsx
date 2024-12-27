import { useDeleteModal, useReceptionManagement } from '@/hook';
import { Space } from 'antd/lib';
import Icons from '@/constants/icons'
import { DeleteModal, NHButton, NHCard, NHInput, NHTable } from '@/components'
import { Avatar } from 'antd';

export const ReceptionManagement = () => {
  const {
    data,
    loading,
    navigate,
    fetchReception
  } = useReceptionManagement();

  const { deleteData, isDelete, setDelete } = useDeleteModal(fetchReception);

  const columns = [
    {
      title: "Receptionist Name",
      dataIndex: "receptionistName",
      key: "receptionistName",
      render: (name, record) => (
        <Space>
          <Avatar src={record.avatar} alt={name} size={40} />
          <span>{name}</span>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NHButton size={"small"} icon={Icons.View} className="view-btn" />
          <NHButton size={"small"} icon={Icons.Delete} className="delete-btn" onClick={() => setDelete(record)} />
        </Space>
      ),
    },
  ];

  return (
    <NHCard title="Reception Management" headerContent={
      <>
        <NHInput prefix={Icons.SearchIcon} placeholder={"Search"} />
        <NHButton icon={Icons.PlusSquare} onClick={() => navigate("create")} variant={"primary"}>Add New Reception</NHButton>
      </>
    }>
      <NHTable
        loading={loading}
        tableColumn={columns}
        tableDataSource={data}
      />

      {/* Delete Complaint Modal */}
      <DeleteModal
        title={"Delete Receptionist?"}
        isModalOpen={isDelete}
        handleClose={() => setDelete(false)}
        handleOk={() => deleteData("admin/deleteReceptionist", isDelete.key)}
        onCancel={() => setDelete(false)}
      >
        Are you sure you want to delete this Reception?
      </DeleteModal>
    </NHCard>
  )
}
