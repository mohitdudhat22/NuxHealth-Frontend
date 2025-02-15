import {
  AppointmentCard,
  NHButton,
  NHCard,
  NHInput,
  NHModal,
  NHTable,
  NHTabs,
} from "@/components";
import Icons from "@/constants/Icons";
import { Space, Tag } from "antd";
import { PatientDetailModal } from "@/components/NHModalComponents/ModalTemplate/PatientDetailModal";
import { useState } from "react";

export const TeleconsultationModule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectedPatientModel, setPatientModel] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPatientData, setSelectedPatientData] = useState(null);

  const handleViewBill = (record) => {
    setSelectedPatient(record);
    setIsModalOpen(true);
  };

  const handleJoinCall = (patient) => {
    setSelectedPatientData(patient);
    setPatientModel(true);
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
      ),
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
        <Tag color={type === "Online" ? "blue" : "orange"}>{type}</Tag>
      ),
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

  const patientData = [
    {
      name: "Ryan Vetrov",
      patientIssue: "Feeling Tired",
      diseaseName: "Viral Infection",
      appointmentDate: "2 Jan, 2022",
      appointmentTime: "10:10 AM",
    },
    {
      name: "Marcus Septimus",
      patientIssue: "Feeling Tired",
      diseaseName: "Viral Infection",
      appointmentDate: "2 Jan, 2022",
      appointmentTime: "10:10 AM",
    },
    {
      name: "Alfonso Dokidis",
      patientIssue: "Feeling Tired",
      diseaseName: "Viral Infection",
      appointmentDate: "2 Jan, 2022",
      appointmentTime: "10:10 AM",
    },
    {
      name: "Davis Korsgaard",
      patientIssue: "Feeling Tired",
      diseaseName: "Viral Infection",
      appointmentDate: "2 Jan, 2022",
      appointmentTime: "10:10 AM",
    },
    {
      name: "Ryan Botosh",
      patientIssue: "Feeling Tired",
      diseaseName: "Viral Infection",
      appointmentDate: "2 Jan, 2022",
      appointmentTime: "10:10 AM",
    },
    {
      name: "Nolan Dias",
      patientIssue: "Feeling Tired",
      diseaseName: "Viral Infection",
      appointmentDate: "2 Jan, 2022",
      appointmentTime: "10:10 AM",
    },
    {
      name: "Ahmad Arcand",
      patientIssue: "Feeling Tired",
      diseaseName: "Viral Infection",
      appointmentDate: "2 Jan, 2022",
      appointmentTime: "10:10 AM",
    },
    {
      name: "Wilson Arcand",
      patientIssue: "Feeling Tired",
      diseaseName: "Viral Infection",
      appointmentDate: "2 Jan, 2022",
      appointmentTime: "10:10 AM",
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

  const tabItems = [
    {
      key: "today",
      label: "Teleconsultation Module",
      children: (
        <NHCard
          rootClass={"p-0"}
          title="Teleconsultation Module"
          headerContent={
            <>
              <NHButton variant="default" className="text-black bg-white">
                {Icons.CalenderIcon}2 March,2022 - 13 March, 2022
                {Icons.CloseCircle}
              </NHButton>
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {patientData.map((data, index) => {
              const {
                name,
                patientIssue,
                diseaseName,
                appointmentDate,
                appointmentTime,
              } = data;
              return (
                <AppointmentCard
                  key={index}
                  headerBg={true}
                  doctorName={name}
                  patientIssue={patientIssue}
                  diseaseName={diseaseName}
                  appointmentDate={appointmentDate}
                  appointmentTime={appointmentTime}
                  footerContent={
                    <div className="flex justify-between gap-4">
                      <NHButton
                        size={"small"}
                        className={"w-full"}
                        onClick={() => handleJoinCall(data)}
                      >
                        Join Call
                      </NHButton>
                      <NHButton
                        size={"small"}
                        icon={Icons.CalenderIcon}
                        className={"w-full"}
                        onClick={() => setSelectedAppointment(data)}
                      >
                        Reschedule
                      </NHButton>
                    </div>
                  }
                  className="border border-slate-200"
                />
              );
            })}
          </div>
        </NHCard>
      ),
    },
    {
      key: "upcoming",
      label: "Upcoming Appointment",
      children: (
        <NHCard
          rootClass={"p-0"}
          title="Upcoming Appointment"
          headerContent={
            <>
              <NHButton variant="default" className="text-black bg-white">
                {Icons.CalenderIcon}2 March,2022 - 13 March, 2022
                {Icons.CloseCircle}
              </NHButton>
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {patientData.map((data, index) => {
              const {
                name,
                patientIssue,
                diseaseName,
                appointmentDate,
                appointmentTime,
              } = data;
              return (
                <AppointmentCard
                  key={index}
                  headerBg={true}
                  doctorName={name}
                  patientIssue={patientIssue}
                  diseaseName={diseaseName}
                  appointmentDate={appointmentDate}
                  appointmentTime={appointmentTime}
                  footerContent={
                    <div className="flex justify-between gap-4">
                      <NHButton
                        size={"small"}
                        className={"w-full"}
                        onClick={() => handleJoinCall(data)}
                      >
                        Join Call
                      </NHButton>
                      <NHButton
                        size={"small"}
                        icon={Icons.CalenderIcon}
                        className={"w-full"}
                        onClick={() => setSelectedAppointment(data)}
                      >
                        Reschedule
                      </NHButton>
                    </div>
                  }
                  className="border border-slate-200"
                />
              );
            })}
          </div>
        </NHCard>
      ),
    },
    {
      key: "previous",
      label: "Previous Appointment",
      children: (
        <NHCard
          rootClass={"p-0"}
          title="Previous Appointment"
          headerContent={
            <>
              <NHButton variant="default" className="text-black bg-white">
                {Icons.CalenderIcon}2 March,2022 - 13 March, 2022
                {Icons.CloseCircle}
              </NHButton>
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {patientData.map((data, index) => {
              const {
                name,
                patientIssue,
                diseaseName,
                appointmentDate,
                appointmentTime,
              } = data;
              return (
                <AppointmentCard
                  key={index}
                  headerBg={true}
                  doctorName={name}
                  patientIssue={patientIssue}
                  diseaseName={diseaseName}
                  appointmentDate={appointmentDate}
                  appointmentTime={appointmentTime}
                  footerContent={
                    <div className="flex justify-between gap-4">
                      <NHButton
                        size={"small"}
                        className={"w-full"}
                        onClick={() => handleJoinCall(data)}
                      >
                        Join Call
                      </NHButton>
                      <NHButton
                        size={"small"}
                        icon={Icons.CalenderIcon}
                        className={"w-full"}
                        onClick={() => setSelectedAppointment(data)}
                      >
                        Reschedule
                      </NHButton>
                    </div>
                  }
                  className="border border-slate-200"
                />
              );
            })}
          </div>
        </NHCard>
      ),
    },
    {
      key: "cancel",
      label: "Cancel Appointment",
      children: (
        <NHCard
          rootClass={"p-0"}
          title="Cancel Appointment"
          headerContent={
            <>
              <NHButton variant="default" className="text-black bg-white">
                {Icons.CalenderIcon}2 March,2022 - 13 March, 2022
                {Icons.CloseCircle}
              </NHButton>
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {patientData.map((data, index) => {
              const {
                name,
                patientIssue,
                diseaseName,
                appointmentDate,
                appointmentTime,
              } = data;
              return (
                <AppointmentCard
                  key={index}
                  headerBg={true}
                  doctorName={name}
                  patientIssue={patientIssue}
                  diseaseName={diseaseName}
                  appointmentDate={appointmentDate}
                  appointmentTime={appointmentTime}
                  footerContent={
                    <div className="flex justify-between gap-4">
                      <NHButton
                        size={"small"}
                        className={"w-full"}
                        onClick={() => handleJoinCall(data)}
                      >
                        Join Call
                      </NHButton>
                      <NHButton
                        size={"small"}
                        icon={Icons.CalenderIcon}
                        className={"w-full"}
                        onClick={() => setSelectedAppointment(data)}
                      >
                        Reschedule
                      </NHButton>
                    </div>
                  }
                  className="border border-slate-200"
                />
              );
            })}
          </div>
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
        <NHTabs items={tabItems} defaultActiveKey="upcoming" />
      </NHCard>

      <PatientDetailModal
        isModalOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        handleClose={() => setIsModalOpen(false)}
        Title="Patient Details"
        handleOk={() => setIsModalOpen(false)}
        patientData={selectedPatient}
      />
      <NHModal
        title={
          <div className="flex items-center justify-between">
            <h3>Reminder</h3>
            <button
              onClick={() => setPatientModel(false)}
              className="hover:opacity-80"
            >
              {Icons.CloseCircle}
            </button>
          </div>
        }
        open={isSelectedPatientModel}
        onCancel={() => setPatientModel(false)}
        footer={null}
        width={350}
        className="patient-details-modal"
      >
        {selectedPatientData && (
          <AppointmentCard
            key={selectedPatientData.name}
            patientName={selectedPatientData.name}
            patientIssue={selectedPatientData.patientIssue}
            diseaseName={selectedPatientData.diseaseName}
            appointmentTime={selectedPatientData.appointmentTime}
            reminder={"You have a meeting with him in 15 minutes"}
            footerContent={
              <div className="flex justify-between gap-4">
                <NHButton
                  size={"small"}
                  className={"w-full"}
                  onClick={() => setPatientModel(false)}
                >
                  Cancel
                </NHButton>
                <NHButton
                  size={"small"}
                  className={"w-full"}
                  onClick={() => setSelectedAppointment(data)}
                >
                  Join
                </NHButton>
              </div>
            }
            className="p-0 "
          />
        )}
      </NHModal>
    </>
  );
};
