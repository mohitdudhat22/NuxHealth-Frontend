import React from "react";
import { NHModal } from "@/components";

export const ReminderModal = ({
  handleOk,
  onCancel,
  children,
  handleClose,
  Title,
  loading = false,
  reminder,
  paymentData,
  ...rest
}) => {
  return (
    <NHModal
      title={"Reminder"}
      open={reminder}
      handleClose={handleClose}
      disabledButton={false}
      IsFooter
      handleContent={"Reschedule"}
      confirmLoading={loading}
      {...rest}
    >
      <div>
        <ul className="">
          <li className="flex bg-[#ffc31326] rounded-lg items-center  py-3 px-3 mb-3">
            <div className="icon pr-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.35 15.57C16.21 15.81 15.96 15.94 15.7 15.94C15.57 15.94 15.44 15.91 15.32 15.83L12.22 13.98C11.45 13.52 10.88 12.51 10.88 11.62V7.52C10.88 7.11 11.22 6.77 11.63 6.77C12.04 6.77 12.38 7.11 12.38 7.52V11.62C12.38 11.98 12.68 12.51 12.99 12.69L16.09 14.54C16.45 14.75 16.57 15.21 16.35 15.57Z"
                  fill="#FFC313"
                />
              </svg>
            </div>
            <div className="details">
              <p className="text-[#FFC313] text-[14px] font-bold">
                You have a meeting with him in 15 minutes
              </p>
            </div>
          </li>

          <li className="flex items-center justify-between py-3">
            <div className="title">
              <p className="text-[#4F4F4F] text-[16px] font-normal">
                Patient Name
              </p>
            </div>
            <div className="details">
              <p className="text-[#030229] text-[16px] font-normal px-[20px]">
                Marcus Phillips
              </p>
            </div>
          </li>

          <li className="flex items-center justify-between py-3">
            <div className="title">
              <p className="text-[#4F4F4F] text-[16px] font-normal">
                Patient Issue
              </p>
            </div>
            <div className="details">
              <p className="text-[#030229] text-[16px] font-normal px-[20px]">
                Stomach ache
              </p>
            </div>
          </li>

          <li className="flex items-center justify-between py-3">
            <div className="title">
              <p className="text-[#4F4F4F] text-[16px] font-normal">
                Disease Name
              </p>
            </div>
            <div className="details">
              <p className="text-[#030229] text-[16px] font-normal px-[20px]">
                Viral Infection
              </p>
            </div>
          </li>

          <li className="flex items-center justify-between py-3">
            <div className="title">
              <p className="text-[#4F4F4F] text-[16px] font-normal">
                Appointment Time
              </p>
            </div>
            <div className="details">
              <p className="text-[#030229] text-[16px] font-normal px-[20px]">
                4:30 PM
              </p>
            </div>
          </li>
        </ul>
      </div>
    </NHModal>
  );
};
