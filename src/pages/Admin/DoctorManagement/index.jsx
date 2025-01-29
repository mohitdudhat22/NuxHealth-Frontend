import { useDoctorManagement } from "@/hook";
import { Space, Tag } from "antd";
import Icons from "@/constants/Icons";
import {
  NHButton,
  NHCard,
  NHInput,
  NHTable,
  DeleteModal,
  NHHead,
} from "@/components";
import { Avatar } from "antd";
import { useDeleteModal } from "@/hook/Global";
import { useState } from "react";
import DoctorDrawer from "@/components/NHModalComponents/ModalTemplate/DoctorDrawer";

export const DoctorManagement = () => {
  const { data, loading, fetchDoctors, navigate, onSearch } =
    useDoctorManagement();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { deleteData, isDelete, setDelete } = useDeleteModal(fetchDoctors);

  const showDrawer = (doctor) => {
    setSelectedDoctor(doctor);
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedDoctor(null);
  };

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
      title: "Session Duration",
      dataIndex: "sessionDuration",
      key: "sessionDuration",
      render: (time) => <Tag>{time}</Tag>,
    },
    {
      title: "Morning Session(Hours)",
      dataIndex: "morningSession",
      key: "morningSession",
      render: (time) => <Tag>{time}</Tag>,
    },
    {
      title: "Evening Session(Hours)",
      dataIndex: "eveningSession",
      key: "eveningSession",
      render: (time) => <Tag>{time}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <NHButton isView onClick={() => showDrawer(record)} />
            <NHButton isDelete onClick={() => setDelete(record)} />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <NHHead title="Doctor Management" />
      <NHCard
        title="Doctor Management"
        headerContent={
          <>
            <NHInput
              prefix={Icons.SearchIcon}
              placeholder={"Search"}
              onChange={(e) => onSearch(e.target.value)}
            />
            <NHButton
              icon={Icons.PlusSquare}
              onClick={() => navigate("create")}
              variant={"primary"}
            >
              Add New Doctor
            </NHButton>
          </>
        }
      >
        <NHTable
          loading={loading}
          showPagination={true}
          tableColumn={columns}
          tableDataSource={data}
        />

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

        {/* Doctor Drawer */}
        <DoctorDrawer
          visible={drawerVisible}
          onClose={onCloseDrawer}
          doctor={selectedDoctor}
        />
      </NHCard>
    </>
  );
};
