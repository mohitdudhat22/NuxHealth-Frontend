import { Space } from "antd/lib";
import Icons from "@/constants/icons";
import { NHButton, NHCard, NHHead, NHInput, NHTable } from "@/components";
import { Avatar } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchPatient } from "@/axiosApi/ApiHelper";

export const PatientHealthRecord = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const debounceTimeout = useRef(null);

  const handleSearch = async (value) => {
    setLoading(true);
    try {
      const url = window.location.href;
      let role = url.includes("reception") ? "receptionist" : "patient";
      const response = await SearchPatient(value, role);
      const searchResults = response.data;
      setFilteredData(searchResults);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      handleSearch(searchValue);
    }, 1000);

    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, [searchValue]);

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "fullName",
      render: (fullName, record) => (
        <Space>
          <Avatar src={record.avatar} alt={fullName} size={40} />
          <span>{fullName}</span>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "patientEmail",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "patientNumber",
      key: "phone",
    },
    {
      title: "Gender",
      dataIndex: "patientGender",
      key: "gender",
    },
    {
      title: "Age",
      dataIndex: "patientAge",
      key: "age",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NHButton
            isView
            onClick={() => {
              navigate(`view-patient/${record.patientId}`, {
                state: { patient: record },
              });
            }}
          />

          <NHButton
            isReschedule
            title={"Book Appointment"}
            onClick={() => {
              navigate("/reception/appointment?patientId=" + record.patientId);
            }}
          ></NHButton>
        </Space>
      ),
    },
  ];

  return (
    <>
      <NHHead title="Patient Health Record" />

      <NHInput
        prefix={Icons.SearchIcon}
        placeholder="Search by Name, Email or Phone"
        className="mb-10 max-w-[850px] mx-auto"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <NHCard title="Our All Patients">
        <NHTable
          showPagination={true}
          tableColumn={columns}
          tableDataSource={filteredData}
          loading={loading}
          scroll={{ x: 768 }}
        />
      </NHCard>
    </>
  );
};
