// Api is not available so I have used static data for now.
import { getSinglePatient, getSinglePatientForDoctor } from "@/axiosApi/ApiHelper";
import { NHButton } from "@/components";
import Icons from "@/constants/Icons";
import { Space, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const usePatientViewDetails = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await getSinglePatient(id);
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch patient data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const columns = [
    {
      title: "Disease Name",
      dataIndex: "dieseasName",
      key: "diseaseName",
    },
    {
      title: "Patient Issue",
      dataIndex: "patientIssue",
      key: "patientIssue",
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
      title: "Appointment Type",
      dataIndex: "appointmentType",
      key: "appointmentType",
      render: (type) => (
        <Tag color={type === "Online" ? "blue" : "orange"}>{type}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NHButton isView onClick={() => navigate("record")} />
        </Space>
      ),
    },
  ];

  return { data, error, columns };
};
