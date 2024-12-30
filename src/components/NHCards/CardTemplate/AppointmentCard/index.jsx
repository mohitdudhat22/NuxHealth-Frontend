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
  patientIssue,
  patientAge,
  gender,
  diseaseName,
  footerContent,
  className,
  headerBg
}) => {
  const renderField = (label, value, valueClass = "text-[#4F4F4F]") => {
    return (
      value && (
        <p>
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
      {renderField("Appointment Type", appointmentType, "text-[#FFC313]")}
      {renderField("Hospital Name", hospitalName)}
      {renderField("Appointment Date", appointmentDate)}
      {renderField("Appointment Cancel Date", appointmentCancelDate)}
      {renderField("Appointment Time", appointmentTime)}
      {renderField("Patient Issue", patientIssue)}
      {renderField("Patient Age", patientAge)}
      {renderField("Patient Gendar", gender)}
      {renderField("Disease Name", diseaseName)}

      {/* Footer Section */}
      {footerContent && (
        <div className="pt-4 mt-4">{footerContent}</div>
      )}
    </NHCard>
  );
};
