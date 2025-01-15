import { NHButton, NHDatePicker, NHModal } from '@/components';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

export const CustomDateModal = ({
  handleOk,
  onCancel,
  handleClose,
  Title,
  loading = false,
  isRescheduleModal,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  ...rest
}) => {
  const [selectedFromDate, setSelectedFromDate] = useState(fromDate);
  const [selectedToDate, setSelectedToDate] = useState(toDate);

  // Reset state when modal closes
  useEffect(() => {
    if (!isRescheduleModal) {
      setSelectedFromDate(null);
      setSelectedToDate(null);
    }
  }, [isRescheduleModal]);

  // Handle confirm button click
  const handleConfirm = () => {
    if (selectedFromDate && selectedToDate) {
      handleOk(selectedFromDate, selectedToDate);
    } else {
      alert("Please fill in both date fields.");
    }
  };

  return (
    <NHModal
      title={Title || "Custom Date"}
      open={isRescheduleModal}
      handleClose={handleClose}
      disabledButton={false}
      confirmLoading={loading}
      {...rest}
    >
      <div>
        <div className="flex justify-between">
          <div className="date w-[48%]">
            <NHDatePicker
              label={"From Date"}
              value={selectedFromDate ? moment(selectedFromDate) : null} // Ensure Moment object
              onChange={(date) => setSelectedFromDate(date)} // Update selectedFromDate
              style={{ padding: "10px" }}
            />
          </div>

          <div className="date w-[48%]">
            <NHDatePicker
              label={"To Date"}
              value={selectedToDate ? moment(selectedToDate) : null} // Ensure Moment object
              onChange={(date) => setSelectedToDate(date)} // Update selectedToDate
              style={{ padding: "10px" }}
            />
          </div>
        </div>

        <div className="btn flex justify-between pt-5">
          <NHButton
            className="bg-white text-[#141414] w-[48%]"
            onClick={() => {
              setSelectedFromDate(null); // Reset fromDate
              setSelectedToDate(null); // Reset toDate
            }}
          >
            Reset
          </NHButton>
          <NHButton
            className="bg-[#0EABEB] text-white w-[48%]"
            onClick={handleConfirm} // Apply the date filter
          >
            Apply
          </NHButton>
        </div>
      </div>
    </NHModal>
  );
};
