import { NHCard } from "@/components";
import classNames from "classnames";
import { useMemo } from "react";

export const AppointmentCard = ({
  title,
  headerContent,
  footerContent,
  headerBg,
  children,
  className,
  reminder,
  ...props
}) => {
  // Memoize the renderFields function to prevent unnecessary re-renders
  const renderFields = useMemo(() => {
    return Object.entries(props).map(([key, value]) => {
      if (!value) return null; // Skip undefined or null values

      // Format the key into a user-friendly label
      const label = key
        .replace(/([A-Z])/g, " $1") // Add space before capital letters
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter

      return (
        <p key={key} className="mb-3">
          <span className="text-xl inline text-[#818194]">{label} </span>
          <span className="float-right text-xl font-bold text-[#4F4F4F]">
            {value}
          </span>
        </p>
      );
    });
  }, [props]);

  return (
    <NHCard
      title={title}
      rootClass={className}
      headerBg={headerBg}
      headerContent={headerContent}
    >
      {/* Reminder Section */}
      {reminder && (
        <div className="bg-yellow-100 p-4 text-[#FFC313] rounded text-lg mb-3">
          {reminder}
        </div>
      )}

      {/* Dynamically Render Fields */}
      {renderFields}

      {/* Footer Section */}
      {children && <div className={classNames(className)}>{children}</div>}
      {footerContent && <div className="pt-4 mt-4">{footerContent}</div>}
    </NHCard>
  );
};
