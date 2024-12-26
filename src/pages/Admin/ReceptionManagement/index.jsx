import { useReceptionManagement } from '@/hook';
import { Space, Tag } from 'antd/lib';
import Icons from '@/constants/icons'
import { DeleteModal, NHButton, NHCard, NHInput, NHTable } from '@/components'

export const ReceptionManagement = () => {
  const {
    data,
    loading,
    navigation,
    deleteComplaint,
    setDeleteComplaint
  } = useReceptionManagement();

  const columns = [
    {
      title: "Receptionist Name",
      dataIndex: "receptionistName",
      key: "receptionistName",
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
          <NHButton variant="primary" icon={Icons.EditIcon} />
          <NHButton variant="primary" icon={Icons.ViewIcon} />
          <NHButton variant="primary" icon={Icons.DeleteIcon}
          onClick={() => setDeleteComplaint(record)}
          />
        </Space>
      ),
    },
  ];


  return (
    <NHCard title="Reception Management" headerContent={
      <>
        <NHInput prefix={Icons.SearchIcon} placeholder={"Search"} />
        <NHButton onClick={() => navigation(true)} variant={"primary"}>Add New Doctor</NHButton>
      </>
    }>
      <NHTable
        loading={loading}
        tableColumn={columns}
        tableDataSource={data}
      />

      {/* Delete Complaint Modal */}
      <DeleteModal
        title={"Delete Complaint?"}
        isModalOpen={deleteComplaint}
        handleClose={() => setDeleteComplaint(false)}
        handleOk={() => setDeleteComplaint(false)}
        onCancel={() => setDeleteComplaint(false)}
      >
        Are you sure you want to delete this Reception?
      </DeleteModal>
    </NHCard>
  )
}
