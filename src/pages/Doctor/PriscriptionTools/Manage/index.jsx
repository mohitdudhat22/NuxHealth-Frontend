import {
  NHButton,
  NHCard,
  NHInput,
  NHTable,
  NHTabs,
  PrescriptionCard,
} from "@/components";
import Icons from "@/constants/icons";
import { Space, Tag } from "antd";
import { PatientDetailModal } from "@/components/NHModalComponents/ModalTemplate/PatientDetailModal";
import { useState } from "react";
import { useTodayManagePriscription } from "@/hook/Doctor/PriscriptionTools/Manage/TodayPriscription";
import { useOlderManagePrescription } from "@/hook/Doctor/PriscriptionTools/Manage/OlderPriscription";
import { user } from "@/assets/images";
import CustomEmpty from "@/components/CustomEmpty/CustomEmpty";

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
      render: (text, record) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Patient Number",
      dataIndex: "patientNumber",
      key: "patientNumber",
      render: (text) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Appointment Type",
      dataIndex: "appointmentType",
      key: "appointmentType",
      render: (type) => (
        <Tag color={type === "Online" ? "blue" : "orange"}>{type || "N/A"}</Tag>
      ),
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
      render: (text) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (text) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NHButton isView onClick={() => handleViewBill(record)} />
        </Space>
      ),
    },
  ];

  const todayData = today?.map((content) => ({
    key: content?._id,
    patientName: content?.patientName,
    patientNumber: content?.patientNumber,
    appointmentType: content?.appointmentType,
    appointmentTime: content?.appointmentTime,
    age: content?.age,
    gender: content?.gender,
    hospitalName: content?.hospitalName,
    prescriptionDate: content?.prescriptionDate,
    medications: content?.medications,
    additionalNote: content?.additionalNote,
  }));

  const oldData = older?.map((content) => ({
    key: content?._id,
    patientName: content?.patientName,
    patientNumber: content?.patientNumber,
    appointmentType: content?.appointmentType,
    appointmentTime: content?.appointmentTime,
    age: content?.age,
    gender: content?.gender,
    hospitalName: content?.hospitalName,
    prescriptionDate: content?.prescriptionDate,
    medications: content?.medications,
    additionalNote: content?.additionalNote,
  }));

  const tabItems = [
    {
      key: "today",
      label: "Today Prescription",
      children: (
        <NHCard
          title="Patient Details"
          headerContent={
            <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
          }
          rootClass={"p-0"}
        >
          {todayData.length !== 0 ? (
            <NHTable
              columns={columns}
              dataSource={todayData}
              showPagination={true}
            />
          ) : (
            <CustomEmpty route={"/doctor"} />
          )}
        </NHCard>
      ),
    },
    {
      key: "older",
      label: "Older Prescription",
      children: (
        <NHCard
          title="Patient Details"
          headerContent={
            <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
          }
          rootClass={"p-0"}
        >
          <NHTable
            columns={columns}
            dataSource={oldData}
            showPagination={true}
          />
        </NHCard>
      ),
    },
  ];

  return (
    <>
      <NHCard
        headerContent={
          <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
        }
      >
        <NHTabs items={tabItems} defaultActiveKey="today" />
      </NHCard>

      <PrescriptionCard
        isModalOpen={isModalOpen}
        clickEvent={true}
        onCancel={() => setIsModalOpen(false)}
        handleClose={() => setIsModalOpen(false)}
        Title="Prescription"
        handleOk={() => setIsModalOpen(false)}
        patientData={selectedPatient}
      />
    </>
  );
};
