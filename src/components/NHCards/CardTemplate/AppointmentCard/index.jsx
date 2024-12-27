import { NHButton, NHCard } from "@/components";
import Icons from "@/constants/icons";

export const AppointmentCard = ({
  doctorName,
  appointmentType,
  hospitalName,
  appointmentDate,
  appointmentCancelDate,
  appointmentTime,
  patientIssue,
  diseaseName,
  footerContent,
  className,
  headerBg
}) => {
  return (
    <NHCard
      title={doctorName}
      rootClass={className}
      headerBg={headerBg}
      headerContent={Icons.ViewBillIcon}
    >
      {/* Appointment Details */}
      <p>
        <span className="text-xl text-[#818194]">Appointment Type:</span>
        <span className="float-right text-xl font-bold text-[#FFC313]">
          {appointmentType}
        </span>
      </p>
      <p>
        <span className="text-xl text-[#818194]">Hospital Name:</span>
        <span className="float-right text-xl font-bold text-[#4F4F4F]">
          {hospitalName}
        </span>
      </p>
      <p>
        <span className="text-xl text-[#818194]">Appointment Date:</span>
        <span className="float-right text-xl font-bold text-[#4F4F4F]">
          {appointmentDate}
        </span>
      </p>
      {appointmentCancelDate && (
        <p>
          <span className="text-xl text-[#818194]">
            Appointment Cancel Date:
          </span>
          <span className="float-right text-xl font-bold text-[#4F4F4F]">
            {appointmentCancelDate}
          </span>
        </p>
      )}
      <p>
        <span className="text-xl text-[#818194]">Appointment Time:</span>
        <span className="float-right text-xl font-bold text-[#4F4F4F]">
          {appointmentTime}
        </span>
      </p>
      <p>
        <span className="text-xl text-[#818194]">Patient Issue:</span>
        <span className="float-right text-xl font-bold text-[#4F4F4F]">
          {patientIssue}
        </span>
      </p>
      {diseaseName && (
        <p>
          <span className="text-xl text-[#818194]">Disease Name:</span>
          <span className="float-right text-xl font-bold text-[#4F4F4F]">
            {diseaseName}
          </span>
        </p>
      )}

      {/* Footer Section */}
      {footerContent && (
        <div className="pt-4 mt-4 border-t border-gray-300">
          {footerContent}
        </div>
      )}
    </NHCard>
  );
};
