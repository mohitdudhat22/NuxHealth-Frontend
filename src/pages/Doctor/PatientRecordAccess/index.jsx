import { NHButton, NHCard, NHInput, NHTable } from "@/components"
import Icons from "@/constants/icons"
import { Space, Tag } from "antd"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PatientRecordAccess = () => {
    const navigate = useNavigate();

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
            )
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
                        type="primary"
                        size="small"
                        icon={Icons.ViewBillIcon}
                        onClick={() => navigate("patientviewdetails")}
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

    return (
        <NHCard
            title="Patient Record Access"
            headerContent={
                <div className="flex items-center gap-4">
                    <NHInput
                        prefix={Icons.SearchIcon}
                        placeholder="Search Patient"
                    />
                    <NHButton>{Icons.CalenderIcon}Month</NHButton>
                </div>
            }
        >
            <NHTable columns={columns} dataSource={data} />
        </NHCard>
    );
};
