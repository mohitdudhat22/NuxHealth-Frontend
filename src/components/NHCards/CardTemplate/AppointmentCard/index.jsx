import { NHCard } from "@/components";
import Icons from "@/constants/icons";

export const AppointmentCard = ({
  doctorName,
  headerContent,
  appointmentType,
  hospitalName,
  appointmentDate,
  appointmentCancelDate,
  appointmentTime,
  patientName,
  patientIssue,
  patientAge,
  patientAddress,
  patientPhoneNumber,
  patientDoctorName,
  gender,
  diseaseName,
  footerContent,
  className,
  reminder,
  headerBg
}) => {
  const renderField = (label, value, valueClass = "text-[#4F4F4F]") => {
    return (
      value && (
        <p className="mb-2">
          <span className="text-xl text-[#818194]">{label}:</span>
          <span className={`float-right text-xl font-bold ${valueClass}`}>
            {value}
          </span>
        </p>
      )
    );
  };

  return (
    <NHCard
      title={doctorName}
      rootClass={className}
      headerBg={headerBg}
      headerContent={headerContent}
    >
      {/* Appointment Details */}
      {reminder && <div className="bg-yellow-100 p-4 text-[#FFC313] rounded text-lg mb-3">{reminder}</div>}
      {renderField("Appointment Type", appointmentType, "text-[#FFC313]")}
      {renderField("Hospital Name", hospitalName)}
      {renderField("Appointment Date", appointmentDate)}
      {renderField("Appointment Cancel Date", appointmentCancelDate)}
      {renderField("Appointment Time", appointmentTime)}
      {renderField("Patient Name", patientName)}
      {renderField("Patient Issue", patientIssue)}
      {renderField("Patient Age", patientAge)}
      {renderField("Patient Gendar", gender)}
      {renderField("Patient Phone-Number", patientPhoneNumber)}
      {renderField("Disease Name", diseaseName)}
      {renderField("Doctor Name", patientDoctorName)}
      {renderField("Patient Address", patientAddress)}

      {/* Footer Section */}
      {footerContent && (
        <div className="pt-4 mt-4">{footerContent}</div>
      )}
    </NHCard>
  );
};
