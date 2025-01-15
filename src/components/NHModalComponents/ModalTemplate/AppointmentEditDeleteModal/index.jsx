import React from 'react'
import { NHModal, NHButton } from '@/components'

export const AppointmentEditDeleteModal = ({
    handleOk,
    onCancel,
    children,
    handleClose,
    Title,
    loading = false,
    isModalOpen,
    paymentData,
    ...rest
}) => {
    return (
        <NHModal
            title={"Not Available"}
            open={isModalOpen}
            handleClose={handleClose}
            disabledButton={false}
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

                <div className="nots flex gap-x-4 pt-5">
                    <div className="icon">
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.75 0.56V2C13.75 2.41 13.41 2.75 13 2.75C12.59 2.75 12.25 2.41 12.25 2V0.5H5.75V2C5.75 2.41 5.41 2.75 5 2.75C4.59 2.75 4.25 2.41 4.25 2V0.56C1.3 0.83 0 2.73 0 5.5V14C0 17 1.5 19 5 19H13C16.5 19 18 17 18 14V5.5C18 2.73 16.7 0.83 13.75 0.56ZM9 13.75H5C4.59 13.75 4.25 13.41 4.25 13C4.25 12.59 4.59 12.25 5 12.25H9C9.41 12.25 9.75 12.59 9.75 13C9.75 13.41 9.41 13.75 9 13.75ZM13 8.75H5C4.59 8.75 4.25 8.41 4.25 8C4.25 7.59 4.59 7.25 5 7.25H13C13.41 7.25 13.75 7.59 13.75 8C13.75 8.41 13.41 8.75 13 8.75Z" fill="#4F4F4F" />
                        </svg>

                    </div>
                    <div className="content">
                        <p className='text-[#030229] text-[16px] font-normal	'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt at ut possimus molestiae doloribus magni consectetur in, cupiditate optio ea.</p>
                    </div>
                </div>

                <div className="btn flex justify-between pt-5">
                    <NHButton
                        className="bg-[#39973D] text-white w-[48%]"
                    >
                        Edit
                    </NHButton>
                    <NHButton
                        className="bg-[#E11D29] text-white w-[48%]"
                    >
                        Delete
                    </NHButton>
                </div>
            </div>
        </NHModal>
    )
}