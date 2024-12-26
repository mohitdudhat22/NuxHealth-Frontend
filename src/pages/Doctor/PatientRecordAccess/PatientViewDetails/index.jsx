import { NHButton, NHCard, NHInput, NHTable, NHTabs } from "@/components";
import Icons from "@/constants/icons";
import { Space, Tag } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PatientViewDetails = () => {
  const navigate = useNavigate();

  const PatientDetailsSection = () => (
    <div className="mb-6">
      <div className="flex items-start gap-6">
        <img
          src="https://i.pravatar.cc/300"
          alt="Patient"
          className="w-20 h-20 rounded-full"
        />

        <div className="flex-1 grid grid-cols-3 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Patient Name</p>
            <p className="font-medium">Marcus Phillips</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Patient Number</p>
            <p className="font-medium">99130 44537</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Patient Issue</p>
            <p className="font-medium">Feeling tired</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Patient Gender</p>
            <p className="font-medium">Male</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Doctor Name</p>
            <p className="font-medium">Dr. Marcus Phillips</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Patient Age</p>
            <p className="font-medium">20 Years</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Patient Address</p>
            <p className="font-medium">
              B-408 Swastik society, mota varacha rajkot
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Last Appointment Date</p>
            <p className="font-medium">4:30 PM</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Last Appointment Time</p>
            <p className="font-medium">4:30 PM</p>
          </div>
        </div>
      </div>
    </div>
  );

  const columns = [
    {
      title: "Disease Name",
      dataIndex: "diseaseName",
      key: "diseaseName",
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
            className="view-btn bg-white"
          />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      patientName: "Marcus Phillips",
      avatar: "https://i.pravatar.cc/300",
      diseaseName: "Viral Infection",
      doctorName: "Dr. Matthew Best",
      appointmentTime: "4:30 PM",
      appointmentType: "Online",
      appointmentDate: "2 Jun, 2022",
      phoneNumber: "92584 58475",
      age: "27",
      gender: "Male",
      issue: "Stomach ache",
      address: "B-408 Swastik society, Shivaji marg mota varacha rajkot",
    },
    {
      key: "2",
      patientName: "Landyn Sheffey",
      avatar: "https://i.pravatar.cc/300",
      diseaseName: "Blood Pressure",
      doctorName: "Dr. Annabella Porter",
      appointmentTime: "5:00 AM",
      appointmentType: "Onsite",
    },
    {
      key: "3",
      patientName: "Leslie Murray",
      avatar: "https://i.pravatar.cc/300",
      diseaseName: "Diabetes",
      doctorName: "Dr. Steven Ralph",
      appointmentTime: "7:30 PM",
      appointmentType: "Online",
    },
  ];
  

  return (
    <>
    <div className="mb-[20px]">
    <NHCard
        title="Patient Details"
        headerContent={<NHButton type="primary">Add Record</NHButton>}
      >
          <PatientDetailsSection />
      </NHCard>
    </div>
      <NHCard>
      <NHTable columns={columns} dataSource={data} />
      </NHCard>
    </>
  );
};