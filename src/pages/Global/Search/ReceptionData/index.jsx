import { NHTable, NHButton } from "@/components";
import { Avatar, Space } from "antd";
import Icons from "@/constants/icons";

export const ReceptionData = ({ loading, tableData }) => {
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
        </Space>
      ),
    },
  ];

  return (
    <NHTable
      loading={loading}
      showPagination={true}
      tableColumn={columns}
      tableDataSource={tableData}
    />
  );
};
