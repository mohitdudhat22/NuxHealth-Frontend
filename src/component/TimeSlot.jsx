import PropTypes from "prop-types";

const TimeSlot = ({ day, time, onClick }) => {
  // Example: Custom styling conditions
  const slotLabel =
    day === "Mon 18" && time === "09 AM"
      ? "Not Available"
      : time === "01 PM"
        ? "Lunch Time"
        : "No Schedule";

  const slotClass =
    slotLabel === "Not Available"
      ? "slot not-available"
      : slotLabel === "Lunch Time"
        ? "slot lunch-time"
        : "slot no-schedule";

  return (
    <div className={slotClass} onClick={onClick}>
      {slotLabel}
    </div>
  );
};

TimeSlot.propTypes = {
  day: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default TimeSlot;
