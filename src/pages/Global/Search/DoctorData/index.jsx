import React from "react";
import { NHButton, NHTable } from "@/components";
import { Avatar, Space, Tag } from "antd";
import Icons from "@/constants/Icons";

const DoctorData = ({ tableData, loading }) => {
  const columns = [
    {
      title: "Doctor Name ",
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
            <NHButton isView />
          </Space>
        );
      },
    },
  ];

  // const handleView = (record) => {
  //   console.log("View record:", record);
  // };

  return (
    <NHTable
      loading={loading}
      showPagination={true}
      tableColumn={columns}
      tableDataSource={tableData}
      scroll={{
        x: 1200,
        y: 300,
      }}
    />
  );
};

export default DoctorData;
