import { AppointmentCard, NHModal } from "@/components/";
import Icons from "@/constants/icons";
import { Tag } from "antd";

export const PatientDetailModal = ({
  handleOk,
  onCancel,
  handleClose,
  Title,
  loading = false,
  isModalOpen,
  patientData,
  ...rest
}) => {
  return (
    <NHModal
      title={
        <div className="flex items-center justify-between">
          <h3>{Title}</h3>
          <button
            onClick={onCancel}
            className="hover:opacity-80"
          >
            {Icons.CloseCircle}
          </button>
        </div>
      }
      open={isModalOpen}
      onCancel={onCancel}
      handleClose={handleClose}
      footer={null}
      width={400}
      className="patient-details-modal"
      {...rest}
    >
      {/* <AppointmentCard
        key={index}
        headerContent={
          <>
            <Tag color={appointment.status === "New" ? "blue" : "green"}>
              {appointment.status}
            </Tag>
            <span
              onClick={() => handlePatientDetails(appointment)}
              className="cursor-pointer"
            >
              {Icons.ViewBillIcon}
            </span>
          </>
        }
        doctorName={appointment.name}
        appointmentType={appointment.appointmentType}
        patientAge={appointment.patientAge}
        gender={appointment.patientGender}
        appointmentTime={appointment.appointmentTime}
        footerContent={
          <NHButton
            size={"large"}
            className={"w-full"}
            onClick={() => setSelectedAppointment(appointment)}
          >
            Create Prescription
          </NHButton>
        }
        className="border border-slate-200"
      /> */}
      {/* <div className="px-5 py-3 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[#666666] text-md">Appointment Type</span>
          <span className="text-[#F5A623] text-md">{patientData?.appointmentType}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#666666] text-md">Appointment Date</span>
          <span className="text-[#111111] text-md">{patientData?.appointmentDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#666666] text-md">Appointment Time</span>
          <span className="text-[#111111] text-md">{patientData?.appointmentTime}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#666666] text-md">Patient Name</span>
          <span className="text-[#111111] text-md">{patientData?.patientName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#666666] text-md">Patient Phone Number</span>
          <span className="text-[#111111] text-md">{patientData?.phoneNumber}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#666666] text-md">Patient Age</span>
          <span className="text-[#111111] text-md">{patientData?.age} Years</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#666666] text-md">Patient Gender</span>
          <span className="text-[#111111] text-md">{patientData?.gender}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#666666] text-md">Patient Issue</span>
          <span className="text-[#111111] text-md">{patientData?.issue}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#666666] text-md">Disease Name</span>
          <span className="text-[#111111] text-md">{patientData?.diseaseName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#666666] text-md">Doctor Name</span>
          <span className="text-[#111111] text-md">{patientData?.doctorName}</span>
        </div>
        <div className="flex items-start justify-between">
          <span className="text-[#666666] text-md">Patient Address</span>
          <span className="text-[#111111] text-md text-right max-w-[60%]">{patientData?.address}</span>
        </div>
      </div> */}
    </NHModal>
  );
};
