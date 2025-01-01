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
import { usePreviousTeleconsultationModule } from "@/hook/Patients/TeleconsultationModule/PreviousTeleconsultationModule";
import { useTodaysTeleconsultationModule } from "@/hook/Patients/TeleconsultationModule/TodaysTeleconsultationModule";
import { useUpcomingTeleconsultationModule } from "@/hook/Patients/TeleconsultationModule/UpcomingTeleconsultationModule";
import { useCancelTeleconsultationModule } from "@/hook/Patients/TeleconsultationModule/CancelTeleconsultationModule";

export const TeleconsultationModule = () => {
  const { data: previous } = usePreviousTeleconsultationModule();
  const { data: todays } = useTodaysTeleconsultationModule();
  const { data: upcoming } = useUpcomingTeleconsultationModule();
  const { data: cancle } = useCancelTeleconsultationModule();
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

  const tabItems = [
    {
      key: "schedule",
      label: "Schedule Appointment",
      children: (
        <NHCard
          rootClass={"p-0"}
          title="Schedule Appointment"
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
            {todays?.map((data, index) => {
              const {
                name,
                patient_issue,
                dieseas_name,
                date,
                appointmentTime,
                patientId,
              } = data;
              return (
                <AppointmentCard
                  key={index}
                  headerBg={true}
                  doctorName={patientId.fullName}
                  patientIssue={patient_issue}
                  diseaseName={dieseas_name}
                  appointmentDate={date}
                  appointmentTime={appointmentTime}
                  headerContent={    <button
                    className="p-2 bg-white rounded-xl hover:bg-gray-300"
                    aria-label="View Details"
                  >
                    {Icons.ViewBillIcon}
                  </button>}
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
            {upcoming?.map((data, index) => {
              const {
                name,
                patient_issue,
                dieseas_name,
                date,
                appointmentTime,
                patientId,
              } = data;
              return (
                <AppointmentCard
                  key={index}
                  headerBg={true}
                  doctorName={patientId.fullName}
                  patientIssue={patient_issue}
                  diseaseName={dieseas_name}
                  appointmentDate={date}
                  appointmentTime={appointmentTime}
                  headerContent={    <button
                    className="p-2 bg-white rounded-xl hover:bg-gray-300"
                    aria-label="View Details"
                  >
                    {Icons.ViewBillIcon}
                  </button>}
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
            {previous?.map((data, index) => {
              const {
                name,
                patient_issue,
                dieseas_name,
                date,
                appointmentTime,
                patientId,
              } = data;
              return (
                <AppointmentCard
                  key={index}
                  headerBg={true}
                  doctorName={patientId.fullName}
                  patientIssue={patient_issue}
                  diseaseName={dieseas_name}
                  appointmentDate={date}
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
      key: "pending",
      label: "Pending Appointment",
      children: (
        <NHCard
          rootClass={"p-0"}
          title="Pending Appointment"
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
            {cancle?.map((data, index) => {
              const {
                name,
                patient_issue,
                dieseas_name,
                date,
                appointmentTime,
                patientId,
              } = data;
              return (
                <AppointmentCard
                  key={index}
                  headerBg={true}
                  doctorName={patientId.fullName}
                  patientIssue={patient_issue}
                  diseaseName={dieseas_name}
                  appointmentDate={date}
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
