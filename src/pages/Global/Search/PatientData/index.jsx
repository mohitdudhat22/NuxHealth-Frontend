import { NHButton, NHTable } from "@/components";
import Icons from "@/constants/icons";

const PatientData = ({ tableData }) => {
  const columns = [
    {
      title: "Patient Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Patient Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Appointment Type",
      dataIndex: "appointmentType",
      key: "appointmentType",
    },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <NHButton size={"small"} icon={Icons.View} className="edit-btn" />
        );
      },
    },
  ];

  const handleView = (record) => {
    console.log("View record:", record);
    // Add your view logic here
  };

  return (
    <NHTable tableColumn={columns} tableDataSource={tableData} rowKey="id" />
  );
};

export default PatientData;
