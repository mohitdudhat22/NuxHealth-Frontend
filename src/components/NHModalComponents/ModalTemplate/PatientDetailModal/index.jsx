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
      width={patientData ? 400 : 800}
      className="patient-details-modal"
      {...rest}
    >
      {patientData ? (
        <AppointmentCard
          key={patientData.name}
          appointmentDate={patientData.appointmentDate}
          appointmentTime={patientData.appointmentTime}
          patientName={patientData.patientName}
          patientPhoneNumber={patientData.phoneNumber}
          patientAge={<>{patientData.age} Years</>}
          patientGender={patientData.gender}
          patientIssue={patientData.issue}
          diseaseName={patientData.diseaseName}
          patientDoctorName={patientData.doctorName}
          patientAddress={patientData.address}
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