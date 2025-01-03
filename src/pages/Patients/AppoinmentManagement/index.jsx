import { NHButton, NHCard, NHInput, NHTable, NHTabs } from "@/components";
import Icons from "@/constants/icons";
import { Space, Tag } from "antd";
import { PatientDetailModal } from "@/components/NHModalComponents/ModalTemplate/PatientDetailModal";
import { useState } from "react";
import { TodayAppointment } from "./TodayAppointment";
import { render } from "react-dom";
import { UpcomingAppointment } from "./UpcomingAppointment";
import { PreviousAppointment } from "./PreviousAppointment";
import { CancelAppointment } from "./CancelAppointment";

export const AppoinmentManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

 

  const tabItems = [
    {
      key: "today",
      label: "Today Appointment",
      children: <TodayAppointment />,
    },
    {
      key: "upcoming",
      label: "Upcoming Appointment",
      children: <UpcomingAppointment />,
    },
    {
      key: "previous",
      label: "Previous Appointment",
      children: <PreviousAppointment />
    },
    {
      key: "cancel",
      label: "Cancel Appointment",
      children: <CancelAppointment />
    },
  ];

  return (
    <>
      <NHCard
        headerContent={
          <>
          <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
          <NHButton type="submit" variant="primary">
          Add Receptionist
        </NHButton>
        </>
        }
      >
        <NHTabs items={tabItems} defaultActiveKey="today" />
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

export default AppoinmentManagement;
