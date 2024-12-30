import React from 'react'
import { NHModal } from  '@/components'
import { NHInput } from '@/components/FormComponents'

export const AppointmentBookingModal = ({
    handleOk,
    onCancel,
    children,
    handleClose,
    Title,
    loading = false,
    appoBooking,
    paymentData,
    ...rest
}) => {
    return (
        <NHModal
            title={"Appointment"}
            open={appoBooking}
            handleClose={handleClose}
            disabledButton={false}
            IsFooter
            handleContent={"Book Appointment"}
            confirmLoading={loading}
            {...rest}

        >
            <div>
                <ul className='bg-[#F6F8FB] p-[10px] rounded-xl'>
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
                            <p className='text-[#4F4F4F] text-[16px] font-normal'>Patient Name</p>
                        </div>
                        <div className="details">
                            <p className='text-[#030229] text-[16px] font-normal px-[20px]'>John deo</p>
                        </div>
                    </li>

                    <li className='flex items-center justify-between py-3'>
                        <div className="title">
                            <p className='text-[#4F4F4F] text-[16px] font-normal'>Appointment Date</p>
                        </div>
                        <div className="details">
                            <p className='text-[#030229] text-[16px] font-normal px-[20px]'>19 June, 2022</p>
                        </div>
                    </li>

                    <li className='flex items-center justify-between py-3'>
                        <div className="title">
                            <p className='text-[#4F4F4F] text-[16px] font-normal'>Appointment Time</p>
                        </div>
                        <div className="details">
                            <p className='text-[#030229] text-[16px] font-normal px-[20px]'>11:00AM - 12:00 PM</p>
                        </div>
                    </li>
                </ul>

                <div className="input-box">
                    <div className="py-4">
                        <NHInput
                            label={"Patient Issue"}
                            placeholder={"Enter Patient issue"}
                        />
                    </div>

                    <div className="py-4">
                        <NHInput
                            label={"Disease Name (Optional)"}
                            placeholder={"Enter  Disease Name"}
                        />
                    </div>
                </div>

            </div>
        </NHModal>
    )
}
