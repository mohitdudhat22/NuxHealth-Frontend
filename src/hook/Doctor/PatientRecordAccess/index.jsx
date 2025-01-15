import { useEffect, useState } from "react";
import { Space } from "antd";
import { getPatientRecordAccess } from "@/axiosApi/ApiHelper";
import { NHButton } from "@/components";
import { useNavigate } from "react-router-dom";

export const usePatientRecordAccess = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const fetchData = async () => {
    const data = await getPatientRecordAccess();
    setData(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [filter, setFilter] = useState("month");
  const handleSelectChange = (value) => {
    setFilter(value);
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

  return { data, columns, handleSelectChange, filter };
};
