import { AppointmentCard, NHButton, NHModal, PrescriptionCard } from "@/components/";
import Icons from "@/constants/icons";

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
      {patientData ? (
        <AppointmentCard
          key={patientData.name}
          appointmentDate={patientData.appointmentDate}
          patientAddress={patientData.address}
          patientPhoneNumber={patientData.phoneNumber}
          patientAge={patientData.age}
          gender={patientData.gender}
          patientDoctorName={patientData.doctorName}
          patientName={patientData.patientName}
          patientIssue={patientData.issue}
          diseaseName={patientData.diseaseName}
          appointmentTime={patientData.appointmentTime}
          className="p-0"
          footerContent={
            <div className="p-10"></div>
          }
        />

      ) :
        <PrescriptionCard />
      }

    </NHModal>
  );
};
