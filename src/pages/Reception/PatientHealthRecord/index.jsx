import { Space } from "antd/lib";
import Icons from "@/constants/icons";
import { NHButton, NHCard, NHHead, NHInput, NHTable } from "@/components";
import { Avatar } from "antd";
import { useEffect, useRef, useState } from "react";
import { SearchHeader } from "@/axiosApi/ApiHelper";
import { useNavigate } from "react-router-dom";

export const PatientHealthRecord = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);

  const [filteredData, setFilteredData] = useState(data);
  const debounceTimeout = useRef(null);

  const handleSearch = async (value) => {
    setLoading(true);
    try {
      const response = await SearchHeader(value, "patient");
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
      if (!searchValue) {
        setFilteredData(data);
      } else {
        handleSearch(searchValue);
      }
    }, 1000);

    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, [searchValue, data]);

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (fullName, record) => (
        <Space>
          <Avatar src={record.avatar} alt={name} size={40} />
          <span>{fullName}</span>
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
      render: (_, record) => (
        <Space size="middle">
          <NHButton
            size="small"
            icon={Icons.View}
            className="view-btn"
            onClick={() => {
              console.log("r",record)
              return navigate(`view-patient/${record._id}`, {
                state: { patient: record },
              });
            }}
          />
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

      <NHCard title="Patient Health Record">
        <NHTable
          showPagination={true}
          tableColumn={columns}
          tableDataSource={filteredData}
          loading={loading}
        />
      </NHCard>
    </>
  );
};
