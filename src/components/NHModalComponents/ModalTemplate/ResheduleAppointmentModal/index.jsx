import { NHButton, NHDatePicker, NHInput, NHModal } from "@/components";
import React, { useEffect, useState } from "react";

export const RescheduleAppointmentModal = ({
    handleOk,
    handleClose,
    Title,
    loading = false,
    rescheduleAppo,
    initialDate = null,
    initialTime = "",
}) => {
    const [selectedDate, setSelectedDate] = useState(initialDate);
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
        handleOk(selectedDate, selectedTime);
      } else {
        alert("Please fill in all fields.");
      }
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
            <div className="date pb-5">
              <NHDatePicker
                label={"Select Date"}
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                style={{ padding: "10px" }}
              />
            </div>
  
            <div className="time pb-5">
              <NHInput
                label={"Select Time"}
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
          </div>
  
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
