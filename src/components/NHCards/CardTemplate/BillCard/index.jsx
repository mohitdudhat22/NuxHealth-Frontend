import { NHButton, NHCard } from "@/components";
import Icons from "@/constants/icons";

export const BillCard = ({
  doctorName,
  title,
  headerContent,
  appointmentType,
  hospitalName,
  date,
  totalAmount,
  time,
  patientName,
  footerContent,
  className,
  reminder,
  headerBg,
  children,
}) => {
  const renderField = (label, value, valueClass = "text-[#4F4F4F]") => {
    return (
      (value || value == 0) && (
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
      title={
        <span className="text-[#030229] text-[18px] font-medium">
          {patientName || doctorName || title}
        </span>
      }
      rootClass={className}
      headerBg={headerBg}
      headerContent={headerContent}
    >
      {/* Appointment Details */}
      {reminder && (
        <div className="bg-yellow-100 p-4 text-[#FFC313] rounded text-lg mb-3">
          {reminder}
        </div>
      )}
      {renderField("Appointment Type", appointmentType, "text-[#FFC313]")}
      {renderField("Hospital Name", hospitalName)}
      {renderField("Bill Date", date)}
      {renderField("Bill Amount", totalAmount)}
      {renderField("Bill Time", time)}

      {/* {renderField("Bill Id", billId )}
      {renderField("Bill Number", billNumber)}
      {renderField("Status", status)} */}

      {/* Footer Section */}
      {children && <div className={className}>{children}</div>}
      {footerContent && <div className="pt-4 mt-4">{footerContent}</div>}
    </NHCard>
  );
};
