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

  const dummyPatientData = {
    appointmentType: "Online",
    appointmentDate: "2023-10-15",
    appointmentTime: "10:00 AM",
    patientName: "John Doe",
    phoneNumber: "123-456-7890",
    age: 30,
    gender: "Male",
    issue: "Fever",
    diseaseName: "Common Cold",
    doctorName: "Dr. Smith",
    address: "123 Main St, City, Country",
  };

  const displayPatientData = {
    ...dummyPatientData,
    ...patientData,
  };

  return (
    <NHModal
      title={
        <div className="flex items-center justify-between">
          <h3>{Title}</h3>
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
          key={displayPatientData.name}
          appointmentType={displayPatientData.appointmentType}
          appointmentDate={displayPatientData.appointmentDate}
          appointmentTime={displayPatientData.appointmentTime}
          patientName={displayPatientData.patientName}
          patientPhoneNumber={displayPatientData.phoneNumber}
          patientAge={<>{displayPatientData.age} Years</>}
          patientGender={displayPatientData.gender}
          patientIssue={displayPatientData.issue}
          diseaseName={displayPatientData.diseaseName}
          patientDoctorName={displayPatientData.doctorName}
          patientAddress={displayPatientData.address}
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