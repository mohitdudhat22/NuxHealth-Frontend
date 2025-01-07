import { NHButton, NHCard, NHInput, NHTable, NHTabs, PrescriptionCard } from "@/components";
import Icons from "@/constants/icons";
import { Space, Tag } from "antd";
import { PatientDetailModal } from "@/components/NHModalComponents/ModalTemplate/PatientDetailModal";
import { useState } from "react";
import { useTodayManagePriscription } from "@/hook/Doctor/PriscriptionTools/Manage/TodayPriscription";
import { useOlderManagePrescription } from "@/hook/Doctor/PriscriptionTools/Manage/OlderPriscription";


export const Manage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const { data: today } = useTodayManagePriscription(selectedPatient?.id);
    const { data: older } = useOlderManagePrescription(selectedPatient?.id);


    //hook -> data
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
                    <NHTable columns={columns} dataSource={today} showPagination={true} />
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
                    <NHTable columns={columns} dataSource={older} showPagination={true} />
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

            <PrescriptionCard
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
