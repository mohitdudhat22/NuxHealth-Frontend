import { getSinglePatientForDoctor } from "@/axiosApi/ApiHelper";
import { NHButton } from "@/components";
import Icons from "@/constants/icons";
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
      const response = await getSinglePatientForDoctor(id);
      setData(response);
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
          <NHButton
            type="primary"
            size="small"
            icon={Icons.ViewBillIcon}
            onClick={() => navigate("patientrecordaccess")}
            className="bg-white view-btn"
          />
        </Space>
      ),
    },
  ];

  const staticData = [
    {
      key: "1",
      patientName: "Marcus Phillips",
      profilePicture: "https://i.prprofilePicture.cc/300",
      diseaseName: "Viral Infection",
      doctorName: "Dr. Matthew Best",
      appointmentTime: "4:30 PM",
      type: "Online",
      date: "2 Jun, 2022",
      phoneNumber: "92584 58475",
      age: "27",
      gender: "Male",
      issue: "Stomach ache",
      address: "B-408 Swastik society, Shivaji marg mota varacha rajkot",
    },
    {
      key: "2",
      patientName: "Landyn Sheffey",
      profilePicture: "https://i.prprofilePicture.cc/300",
      diseaseName: "Blood Pressure",
      doctorName: "Dr. Annabella Porter",
      appointmentTime: "5:00 AM",
      type: "Onsite",
    },
    {
      key: "3",
      patientName: "Leslie Murray",
      profilePicture: "https://i.prprofilePicture.cc/300",
      diseaseName: "Diabetes",
      doctorName: "Dr. Steven Ralph",
      appointmentTime: "7:30 PM",
      type: "Online",
    },
  ];

  return { data, error, columns, staticData };
};