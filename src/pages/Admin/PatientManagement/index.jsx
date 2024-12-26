import { NHButton, NHCard, NHInput, NHTable, NHTabs } from "@/components"
import Icons from "@/constants/icons"
import { Space, Tag } from "antd"
import { PatientDetailModal } from "@/components/NHModalComponents/ModalTemplate/PatientDetailModal";
import { useState } from "react";

export const PatientManagement = () => {
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
            title: "Disease Name",
            dataIndex: "diseaseName",
            key: "diseaseName",
        },
        {
            title: "Doctor Name",
            dataIndex: "doctorName",
            key: "doctorName",
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
                <Tag color={type === "Online" ? "blue" : "orange"}>
                    {type}
                </Tag>
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
                        onClick={() => handleViewBill(record)}
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
            address: "B-408 Swastik society, Shivaji marg mota varacha rajkot"
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

    const tabItems = [
        {
            key: "today",
            label: "Today Appointment",
            children: (
                <NHCard
                    title="Today Appointment"
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
            key: "upcoming",
            label: "Upcoming Appointment",
            children: (
                <NHCard
                    title="Upcoming Appointment"
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
            key: "previous",
            label: "Previous Appointment",
            children: (
                <NHCard
                    title="Previous Appointment"
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
            key: "cancel",
            label: "Cancel Appointment",
            children: (
                <NHCard
                    title="Cancel Appointment"
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
                    defaultActiveKey="upcoming"
                />
            </NHCard>

            <PatientDetailModal
                isModalOpen={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                handleClose={() => setIsModalOpen(false)}
                Title="Patient Details"
                handleOk={() => setIsModalOpen(false)}
                patientData={selectedPatient}
            />
        </>
    );
};

export default PatientManagement;