import React from 'react'
import { NHModal } from '../..'
import Icons from '@/constants/icons'

export const AppointmentModal = ({
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
            title={"Scheduled Appointment"}
            open={isModalOpen}
            handleClose={handleClose}
            disabledButton={false}
            confirmLoading={loading}
            {...rest}

        >
            <div>
                <ul className=''>
                    <li className='flex items-center justify-between py-3'>
                        <div className="title">
                            <p className='text-[#4F4F4F] text-[16px] font-normal'>Appointment Type</p>
                        </div>
                        <div className="details">
                            <p className='bg-[#FFC3131A] text-[#FFC313] text-[16px] font-semibold py-[6px] px-[20px] rounded-[30px]'>Online</p>
                        </div>
                    </li>

                    <li className='flex items-center justify-between py-3'>
                        <div className="title">
                            <p className='text-[#4F4F4F] text-[16px] font-normal'>Appointment Date</p>
                        </div>
                        <div className="details">
                            <p className='text-[#030229] text-[16px] font-normal px-[20px]'>2 Jan, 2022</p>
                        </div>
                    </li>

                    <li className='flex items-center justify-between py-3'>
                        <div className="title">
                            <p className='text-[#4F4F4F] text-[16px] font-normal'>Appointment Time</p>
                        </div>
                        <div className="details">
                            <p className='text-[#030229] text-[16px] font-normal px-[20px]'>4:30 PM</p>
                        </div>
                    </li>

                    <li className='flex items-center justify-between py-3'>
                        <div className="title">
                            <p className='text-[#4F4F4F] text-[16px] font-normal'>Hospital Name</p>
                        </div>
                        <div className="details">
                            <p className='text-[#030229] text-[16px] font-normal px-[20px]'>Marcus Phillips</p>
                        </div>
                    </li>

                    <li className='flex items-center justify-between py-3'>
                        <div className="title">
                            <p className='text-[#4F4F4F] text-[16px] font-normal'>Patient Issue</p>
                        </div>
                        <div className="details">
                            <p className='text-[#030229] text-[16px] font-normal px-[20px]'>Stomach ache</p>
                        </div>
                    </li>

                    <li className='flex items-center justify-between py-3'>
                        <div className="title">
                            <p className='text-[#4F4F4F] text-[16px] font-normal'>Doctor Name</p>
                        </div>
                        <div className="details">
                            <p className='text-[#030229] text-[16px] font-normal px-[20px]'>Dr. Mathew Best</p>
                        </div>
                    </li>
                </ul>
            </div>
        </NHModal>
    )
}
