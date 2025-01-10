import { Space } from "antd/lib";
import Icons from "@/constants/icons";
import { NHButton, NHCard, NHHead, NHInput, NHTable } from "@/components";
import { Avatar } from "antd";
import { useDoctorManagement } from "@/hook";

export const PatientHealthRecord = () => {
  const { navigate } = useDoctorManagement();

  const data = [
    {
      _id: "1",
      PatientName: "John Doe",
      phone: "1234567890",
      email: "john@gmail.com",
      age: "25",
      gender: "male",
    },
    {
      _id: "2",
      PatientName: "John Doe",
      phone: "1234567890",
      email: "john@gmail.com",
      age: "25",
      gender: "male",
    },
    {
      _id: "3",
      PatientName: "John Doe",
      phone: "1234567890",
      email: "john@gmail.com",
      age: "25",
      gender: "male",
    },
    {
      _id: "4",
      PatientName: "John Doe",
      phone: "1234567890",
      email: "john@gmail.com",
      age: "25",
      gender: "male",
    },
  ];

  const handleViewClick = async (record) => {
    const patientData = await fetchPatientData(record._id);
    if (patientData) {
      navigate(`view-patient/${record._id}`, {
        state: { patient: patientData },
      });
    }
  };

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "PatientName",
      key: "PatienttName",
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
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record, patient) => {
        console.log("patient", record);
        return (
          <Space size="middle">
            <NHButton
              size={"small"}
              icon={Icons.View}
              className="view-btn"
              onClick={() =>
                navigate(`view-patient/${record?._id}`, { state: { patient } })
              }
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <NHHead title="Patient Health Record" />

      <NHInput
        prefix={Icons.SearchIcon}
        placeholder={"Search by Name, Email or Phone"}
        className="mb-10 max-w-[850px] mx-auto"
        // value={""}
        // onChange={(e) => onSearch(e.target.value)}
      />

      <NHCard title="Patient Health Record">
        <NHTable
          showPagination={true}
          tableColumn={columns}
          tableDataSource={data}
        />
      </NHCard>
    </>
  );
};
