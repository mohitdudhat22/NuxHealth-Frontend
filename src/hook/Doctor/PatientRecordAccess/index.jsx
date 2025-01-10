import { getPatientRecordAccess } from "@/axiosApi/ApiHelper";
import { NHButton } from "@/components";
import Icons from "@/constants/icons";
import { Space } from "antd";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const usePatientRecordAccess = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const fetchData = async () => {
    const data = await getPatientRecordAccess();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [filter, setFilter] = useState("month");
  const handleSelectChange = (value, name) => {
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

  const staticData = [
    {
      key: "1",
      patientName: "Marcus Phillips",
      avatar: "https://i.pravatar.cc/300",
      diseaseName: "Viral Infection",
      patientIssue: "Feeling Tired",
      lastAppointmentDate: "2 Jan, 2022",
      lastAppointmentTime: "4:30 PM",
      age: "22 Years",
      gender: "Male",
    },
    {
      key: "2",
      patientName: "London Shaffer",
      avatar: "https://i.pravatar.cc/300",
      diseaseName: "Diabetes",
      patientIssue: "Stomach Ache",
      lastAppointmentDate: "5 Jan, 2022",
      lastAppointmentTime: "5:00 PM",
      age: "45 Years",
      gender: "Female",
    },
    // Add more patient records here
  ];

  return { data, staticData, columns, handleSelectChange, filter };
};
