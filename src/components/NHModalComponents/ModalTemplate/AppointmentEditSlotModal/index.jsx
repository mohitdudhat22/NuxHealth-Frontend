import { NHInput } from '@/components/FormComponents'
import React from 'react'
import { NHModal } from '@/components'

export const AppointmentEditSlotModal = ({
    handleOk,
    onCancel,
    children,
    handleClose,
    Title,
    loading = false,
    appoEditSlot,
    paymentData,
    ...rest
}) => {
    return (
        <NHModal
            title={"Edit Slot"}
            open={appoEditSlot}
            handleClose={handleClose}
            disabledButton={false}
            handleContent={"Save"}
            IsFooter
            confirmLoading={loading}
            {...rest}
        >
            <div>
                <div className="time flex gap-x-4">
                    <div className="icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.35 15.57C16.21 15.81 15.96 15.94 15.7 15.94C15.57 15.94 15.44 15.91 15.32 15.83L12.22 13.98C11.45 13.52 10.88 12.51 10.88 11.62V7.52C10.88 7.11 11.22 6.77 11.63 6.77C12.04 6.77 12.38 7.11 12.38 7.52V11.62C12.38 11.98 12.68 12.51 12.99 12.69L16.09 14.54C16.45 14.75 16.57 15.21 16.35 15.57Z" fill="#4F4F4F" />
                        </svg>

                    </div>
                    <div className="content">
                        <p className='text-[#030229] text-[16px] font-normal	'>Monday,18 June,2022  09:00 AM - 10:00 AM</p>
                    </div>
                </div>
                <div className="input pt-5">
                    <NHInput
                        label={"Add Note "}
                        placeholder={"Write a Note"}
                        type='text'
                    />
                </div>
            </div>

        </NHModal>
    )
}