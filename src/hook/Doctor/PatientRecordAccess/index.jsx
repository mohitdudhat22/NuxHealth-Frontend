import { useEffect, useState } from "react";
import { Space } from "antd";
import { getPatientRecordAccess } from "@/axiosApi/ApiHelper";
import { NHButton } from "@/components";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const usePatientRecordAccess = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getPatientRecordAccess();
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching patient records:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const now = moment();
    let filtered = data;

    // Apply time filter
    switch (filter) {
      case "day":
        filtered = filtered.filter((record) =>
          moment(record.lastAppointmentDate).isSame(now, "day")
        );
        break;
      case "month":
        filtered = filtered.filter((record) =>
          moment(record.lastAppointmentDate).isSame(now, "month")
        );
        break;
      case "year":
        filtered = filtered.filter((record) =>
          moment(record.lastAppointmentDate).isSame(now, "year")
        );
        break;
      default:
        filtered = data;
    }

    if (searchQuery) {
      filtered = filtered.filter((record) =>
        record.patientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [filter, data, searchQuery]);

  const handleSelectChange = (value) => {
    setFilter(value);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <img
            src={record.avatar}
            alt={text}
            className="w-8 h-8 rounded-full"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Disease Name",
      dataIndex: "diseaseName",
      key: "diseaseName",
    },
    {
      title: "Patient Issue",
      dataIndex: "patientIssue",
      key: "patientIssue",
    },
    {
      title: "Last Appointment Date",
      dataIndex: "lastAppointmentDate",
      key: "lastAppointmentDate",
    },
    {
      title: "Last Appointment Time",
      dataIndex: "lastAppointmentTime",
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
      render: (_, record) => (
        <Space size="middle">
          <NHButton
            isView
            onClick={() => navigate("patientviewdetails/" + record.patientId)}
          />
        </Space>
      ),
    },
  ];

  return {
    data: filteredData,
    columns,
    handleSelectChange,
    filter,
    handleSearch,
  };
};
