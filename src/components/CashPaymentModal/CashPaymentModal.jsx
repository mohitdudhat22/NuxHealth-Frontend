import React from 'react';
import { NHButton, NHInput } from "@/components";
import "./CashPaymentModal.css";

export const CashPaymentModal = ({ open, handleClose, handlePay }) => {
  if (!open) return null;

  return (
    <div className="modal-bg">
      <div className="bg-white p-6 rounded-2xl w-full md:w-[410px]">
        <div className="border-b border-solid border-[#F4F4F4] mb-4 pb-4">
          <h2 className="text-lg font-semibold">Cash Payment</h2>
        </div>
        <div className="space-y-4">
          <NHInput
            label="Amount"
            placeholder="Enter amount"
          />
        </div>
        <div className="flex justify-end mt-6 space-x-4 w-full">
          <NHButton
            type="default"
            className={"w-full !text-[#141414] hover:!text-white !bg-transparent hover:!bg-[#0EABEB] !border !border-solid !border-[#D3D3D3] !rounded-xl"}
            onClick={handleClose}
          >
            Cancel
          </NHButton>
          <NHButton
            type="primary"
            className={"w-full !text-white hover:!text-[#141414] !bg-[#0EABEB] hover:!bg-transparent hover:!border hover:!border-solid hover:!border-[#D3D3D3] !rounded-xl"}
            onClick={handlePay}
          >
            Pay
          </NHButton>
        </div>
      </div>
    </div>
  );
};