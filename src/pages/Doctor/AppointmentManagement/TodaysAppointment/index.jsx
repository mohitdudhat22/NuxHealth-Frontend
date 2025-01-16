import React, { useState } from "react";
import { NHButton, NHCard, NHInput, NHTable } from "@/components";
import { Space } from "antd";
import Icons from "@/constants/icons";
import { useTodayAppointment } from "@/hook/Doctor/AppointmentManagement/TodaysAppointment";
import { CancelOnlineAppointmentModal } from "@/components/NHModalComponents/ModalTemplate/CancelOnlineAppointmentModal";
import { CancelOnsiteAppointmentModal } from "@/components/NHModalComponents/ModalTemplate/CancelOnsiteAppointmentModal";
import { CustomDateModal } from "@/components/NHModalComponents/ModalTemplate/CustomDateModal";
import moment from "moment";

export const TodayAppointments = () => {
  const { data, loading } = useTodayAppointment();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filteredAppointments, setFilteredAppointments] = useState(data);

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Dieses Name",
      dataIndex: "diseaseName",
      key: "diseaseName",
    },
    {
      title: "Patient Issue",
      dataIndex: "patientIssue",
      key: "patientIssue",
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
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <NHButton isReschedule onClick={() => handleViewPatient(record)} />
          <NHButton isCancel onClick={() => handleViewPatient(record)} />
        </Space>
      ),
    },
  ];

  const handleViewPatient = (record) => {
    setSelectedPatient(record);
    if (record.appointmentType === "online") {
      setModalType("online");
    } else {
      setModalType("onsite");
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
    setModalType(null);
  };

  const handleOpenDateModal = () => {
    setIsDateModalOpen(true);
  };

  const handleCloseDateModal = () => {
    setIsDateModalOpen(false);
  };

  const handleApplyDateFilter = () => {
    const filtered = data.filter((appointment) => {
      const appointmentDate = moment(appointment.appointmentTime);
      return (
        (!fromDate || appointmentDate.isSameOrAfter(moment(fromDate))) &&
        (!toDate || appointmentDate.isSameOrBefore(moment(toDate)))
      );
    });

    setFilteredAppointments(filtered);
    setIsDateModalOpen(false);
  };

  return (
    <>
      <NHCard
        title="Today's Appointments"
        headerContent={
          <>
            <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
            <NHButton onClick={handleOpenDateModal} icon={Icons?.CalenderIcon}>
              Any Date
            </NHButton>
            <NHButton icon={Icons?.CalenderIcon}>
              Appointment Time Slot
            </NHButton>
          </>
        }
      >
        <NHTable
          loading={loading}
          showPagination={true}
          tableColumn={columns}
          tableDataSource={filteredAppointments}
        />
      </NHCard>

      {modalType === "online" && selectedPatient && (
        <CancelOnlineAppointmentModal
          isModalOpen={isModalOpen}
          onCancel={handleCloseModal}
          handleClose={handleCloseModal}
          Title="Cancel Online Appointment"
          patientData={selectedPatient}
        />
      )}

      {modalType === "onsite" && selectedPatient && (
        <CancelOnsiteAppointmentModal
          isModalOpen={isModalOpen}
          onCancel={handleCloseModal}
          handleClose={handleCloseModal}
          Title="Cancel Onsite Appointment"
          patientData={selectedPatient}
        />
      )}

      <CustomDateModal
        Title="Select Custom Date Range"
        handleOk={handleApplyDateFilter}
        onCancel={handleCloseDateModal}
        handleClose={handleCloseDateModal}
        customDate={isDateModalOpen}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />
    </>
  );
};
