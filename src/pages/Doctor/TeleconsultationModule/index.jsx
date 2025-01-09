import {
  AppointmentCard,
  NHButton,
  NHCard,
  NHInput,
  NHModal,
  NHTable,
  NHTabs,
} from "@/components";
import Icons from "@/constants/icons";
import { Space, Tag } from "antd";
import { PatientDetailModal } from "@/components/NHModalComponents/ModalTemplate/PatientDetailModal";
import { useState } from "react";
import { CustomDateModal } from "@/components/NHModalComponents/ModalTemplate/CustomDateModal";
import { useCancleTeleconsultation, usePrivousTeleconsultation, useTodayTeleconsultation, useUpcomingTeleconsultation } from "@/hook/Doctor";
import { useNavigate } from "react-router-dom";

export const Teleconsultation = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectedPatientModel, setPatientModel] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [isReshceduleModal, setIsReshceduleModal] = useState(false);


  const { data: privousTeleconsultation, loading: privousLoader } = usePrivousTeleconsultation();
  const { data: upcomingTeleconsultation, loading: upcomingLoader } = useUpcomingTeleconsultation()
  const { data: todayTeleconsultation, loading: todayLoader } = useTodayTeleconsultation()
  const { data: cancleTeleconsultation, loading: cancleLoader } = useCancleTeleconsultation()

  const handleViewBill = (record) => {
    setSelectedPatient(record);
    setIsModalOpen(true);
  };

  const handleJoinCall = (patient) => {
    setSelectedPatientData(patient);
    setPatientModel(true);
  };

  const handelReschedule = () => {
    setIsReshceduleModal(true);
    console.log("Reschedule");
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

  // const patientData = appointments.appointments || [];

  const tabItems = [
    {
      key: "today",
      label: "Teleconsultation Module",
      children: (
        <>
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
              {privousTeleconsultation.map((data, index) => {
                const {
                  name,
                  patientIssue,
                  diseaseName,
                  appointmentDate,
                  appointmentTime,
                  date,
                  patientName,
                  doctorId,
                  hospitalId,
                  patientId

                } = data;
                return (
                  <AppointmentCard
                    key={index}
                    headerBg={true}
                    title={<span className="font-semibold text-[18px]">{patientName}</span>}
                    patientIssue={patientIssue}
                    diseaseName={diseaseName}
                    appointmentDate={appointmentDate || date}
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
                          onClick={() => handelReschedule()}
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
          <CustomDateModal
            open={isReshceduleModal}
            handleClose={() => setIsReshceduleModal(false)}
          />
        </>
      ),
    },
    {
      key: "upcoming",
      label: "Upcoming Appointment",
      children: (
        <NHCard
          title="Upcoming Appointment"
          rootClass={"p-0"}
          headerContent={
            <>
              <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
              <NHButton variant="default" className="text-black bg-white">
                {Icons.CalenderIcon}2 March,2022 - 13 March, 2022
                {Icons.CloseCircle}
              </NHButton>
            </>
          }
        >
          <NHTable columns={columns} dataSource={upcomingTeleconsultation} loading={upcomingLoader} showPagination={true} />
        </NHCard>
      ),
    },
    {
      key: "previous",
      label: "Previous Appointment",
      children: (
        <NHCard
          title="Previous Appointment"
          rootClass={"p-0"}
          headerContent={
            <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
          }
        >
          <NHTable columns={columns} dataSource={privousTeleconsultation} loading={privousLoader} showPagination={true} />
        </NHCard>
      ),
    },
    {
      key: "cancel",
      label: "Cancel Appointment",
      children: (
        <NHCard
          title="Cancel Appointment"
          rootClass={"p-0"}
          headerContent={
            <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
          }
        >
          <NHTable columns={columns} dataSource={cancleTeleconsultation} loading={cancleLoader} showPagination={true} />
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
                  onClick={() => navigate('videoCall?room='+selectedPatientData.key)}
                >{console.log(selectedPatientData)}
                  Join
                  {console.log(selectedPatientData._id)}
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