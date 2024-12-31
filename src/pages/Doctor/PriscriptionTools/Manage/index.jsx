import { NHButton, NHCard, NHInput, NHTable, NHTabs } from "@/components";
import Icons from "@/constants/icons";
import { Space, Tag } from "antd";
import { PatientDetailModal } from "@/components/NHModalComponents/ModalTemplate/PatientDetailModal";
import { useState } from "react";

export const Manage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleViewBill = (record) => {
        setSelectedPatient(record);
        setIsModalOpen(true);
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
            )
        },
        {
            title: "Patient Number",
            dataIndex: "patientNumber",
            key: "patientNumber",
        },
        {
            title: "Appointment Type",
            dataIndex: "appointmentType",
            key: "appointmentType",
            render: (type) => (
                <Tag color={type === "Online" ? "blue" : "orange"}>
                    {type}
                </Tag>
            ),
        },
        {
            title: "Appointment Time",
            dataIndex: "appointmentTime",
            key: "appointmentTime",
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
                        onClick={() => handleViewBill(record)}
                        className="bg-white view-btn"
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
            patientNumber: "92584 58475",
            appointmentType: "Online",
            appointmentTime: "4:30 PM",
            age: "27",
        },
        {
            key: "2",
            patientName: "Landyn Sheffey",
            avatar: "https://i.pravatar.cc/300",
            patientNumber: "91827 12345",
            appointmentType: "Onsite",
            appointmentTime: "5:00 AM",
            age: "34",
        },
        {
            key: "3",
            patientName: "Leslie Murray",
            avatar: "https://i.pravatar.cc/300",
            patientNumber: "92746 76358",
            appointmentType: "Online",
            appointmentTime: "7:30 PM",
            age: "29",
        },
    ];

    const tabItems = [
        {
            key: "today",
            label: "Today Prescription",
            children: (
                <NHCard
                    title="Patient Details"
                    headerContent={
                        <NHInput
                            prefix={Icons.SearchIcon}
                            placeholder="Search Patient"
                        />
                    }
                >
                    <NHTable columns={columns} dataSource={data} />
                </NHCard>
            )
        },
        {
            key: "older",
            label: "Older Prescription",
            children: (
                <NHCard
                    title="Patient Details"
                    headerContent={
                        <NHInput
                            prefix={Icons.SearchIcon}
                            placeholder="Search Patient"
                        />
                    }
                >
                    <NHTable columns={columns} dataSource={data} />
                </NHCard>
            )
        }
    ];

    return (
        <>
            <NHCard
                headerContent={
                    <NHInput
                        prefix={Icons.SearchIcon}
                        placeholder="Search Patient"
                    />
                }
            >
                <NHTabs
                    items={tabItems}
                    defaultActiveKey="today"
                />
            </NHCard>

            <PatientDetailModal
                isModalOpen={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                handleClose={() => setIsModalOpen(false)}
                Title="Prescription"
                handleOk={() => setIsModalOpen(false)}
                patientData={selectedPatient}
            />
        </>
    );
};
