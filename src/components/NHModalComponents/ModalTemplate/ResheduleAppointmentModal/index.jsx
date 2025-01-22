import { NHButton, NHDatePicker, NHModal, NHSelect } from "@/components";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export const RescheduleAppointmentModal = ({
  handleOk,
  handleClose,
  Title,
  loading = false,
  rescheduleAppo,
  initialDate = null,
  initialTime = "",
  timeSlote = { morningSlots: [], eveningSlots: [] },
}) => {
  const [selectedDate, setSelectedDate] = useState(
    initialDate ? dayjs(initialDate) : null
  );
  const [selectedTime, setSelectedTime] = useState(initialTime);

  // Reset state when modal closes
  useEffect(() => {
    if (!rescheduleAppo) {
      setSelectedDate(null);
      setSelectedTime("");
    }
  }, [rescheduleAppo]);

  // Handle confirm button click
  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      handleOk(formattedDate, selectedTime);
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Filter and format available time slots
  const getAvailableTimeSlots = () => {
    const filterAvailableSlots = (slots) => {
      if (!Array.isArray(slots)) return [];
      return slots.filter((slot) => slot.available);
    };

    const morningSlots = filterAvailableSlots(timeSlote.morningSlots).map(
      (slot) => ({
        label: `${slot.start} - ${slot.end}`,
        value: slot.start,
      })
    );

    const eveningSlots = filterAvailableSlots(timeSlote.eveningSlots).map(
      (slot) => ({
        label: `${slot.start} - ${slot.end}`,
        value: slot.start,
      })
    );
    console.log(morningSlots, eveningSlots);
    return [
      {
        label: "Morning Slots",
        options: morningSlots,
      },
      {
        label: "Evening Slots",
        options: eveningSlots,
      },
    ];
  };

  const availableSlots = getAvailableTimeSlots();

  const handleDateChange = (date) => {
    setSelectedDate(dayjs(date));
  };

  return (
    <NHModal
      title={Title}
      open={rescheduleAppo}
      handleClose={handleClose}
      disabledButton={false}
      confirmLoading={loading}
    >
      <div>
        <div>
          {/* Date Picker Section */}
          <div className="date pb-5">
            <NHDatePicker
              label={"Select Date"}
              value={selectedDate}
              onChange={(value) => handleDateChange(value)}
              format="YYYY-MM-DD"
              style={{ padding: "10px" }}
            />
          </div>

          {/* Time Picker Section */}
          <div className="time pb-5">
            <NHSelect
              label="Available Time Slots"
              options={availableSlots}
              value={selectedTime}
              onChange={(time) => setSelectedTime(time)}
              placeholder="Select a time slot"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="btn flex justify-between pt-5">
          <NHButton
            className="bg-white text-[#141414] w-[48%]"
            onClick={handleClose}
          >
            Cancel
          </NHButton>
          <NHButton
            className="bg-[#0EABEB] text-white w-[48%]"
            onClick={handleConfirm}
          >
            Reschedule
          </NHButton>
        </div>
      </div>
    </NHModal>
  );
};
