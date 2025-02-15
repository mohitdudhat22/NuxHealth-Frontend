import React from 'react'
import { NHModal } from '@/components'

export const ReminderJoinModal = ({
    handleOk,
    onCancel,
    children,
    handleClose,
    Title,
    loading = false,
    reminderJoin,
    paymentData,
    ...rest
}) => {
    return (
        <NHModal
            title={"Reminder"}
            open={reminderJoin}
            handleClose={handleClose}
            disabledButton={false}
            IsFooter
            handleContent={"Join"}
            confirmLoading={loading}
            {...rest}

        >
            <div>
                <ul className=''>
                    <li className='flex bg-[#ffc31326] rounded-lg items-center  py-3 px-3 mb-3'>
                        <div className="icon pr-3">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.75 6.25V4.375C18.75 3.87772 18.5525 3.40081 18.2008 3.04917C17.8492 2.69754 17.3723 2.5 16.875 2.5H14.375V1.875C14.375 1.70924 14.3092 1.55027 14.1919 1.43306C14.0747 1.31585 13.9158 1.25 13.75 1.25C13.5842 1.25 13.4253 1.31585 13.3081 1.43306C13.1908 1.55027 13.125 1.70924 13.125 1.875V2.5H6.875V1.875C6.875 1.70924 6.80915 1.55027 6.69194 1.43306C6.57473 1.31585 6.41576 1.25 6.25 1.25C6.08424 1.25 5.92527 1.31585 5.80806 1.43306C5.69085 1.55027 5.625 1.70924 5.625 1.875V2.5H3.125C2.62772 2.5 2.15081 2.69754 1.79917 3.04917C1.44754 3.40081 1.25 3.87772 1.25 4.375V6.25H18.75ZM1.25 7.5V16.875C1.25 17.3723 1.44754 17.8492 1.79917 18.2008C2.15081 18.5525 2.62772 18.75 3.125 18.75H16.875C17.3723 18.75 17.8492 18.5525 18.2008 18.2008C18.5525 17.8492 18.75 17.3723 18.75 16.875V7.5H1.25ZM13.5312 11.0994L9.15625 14.8494C9.03666 14.9516 8.88292 15.005 8.7257 14.9989C8.56849 14.9927 8.41937 14.9275 8.30813 14.8162L6.43313 12.9412C6.31928 12.8234 6.25628 12.6655 6.2577 12.5016C6.25913 12.3378 6.32486 12.181 6.44074 12.0651C6.55662 11.9492 6.71338 11.8835 6.87725 11.8821C7.04112 11.8807 7.199 11.9437 7.31687 12.0575L8.78313 13.5238L12.7206 10.1488C12.7826 10.0929 12.8551 10.05 12.9339 10.0226C13.0127 9.99524 13.0962 9.98391 13.1795 9.98931C13.2627 9.9947 13.3441 10.0167 13.4187 10.054C13.4933 10.0913 13.5597 10.1432 13.6139 10.2066C13.6682 10.27 13.7092 10.3436 13.7345 10.4231C13.7599 10.5026 13.769 10.5863 13.7615 10.6694C13.754 10.7525 13.7299 10.8332 13.6907 10.9069C13.6515 10.9805 13.5979 11.0455 13.5331 11.0981L13.5312 11.0994Z" fill="#FFC313" />
                            </svg>
                        </div>
                        <div className="details">
                            <p className='text-[#FFC313] text-[14px] font-bold'>This patient wants to meet you</p>
                        </div>
                    </li>

                    <li className='flex items-center justify-between py-3'>
                        <div className="title">
                            <p className='text-[#4F4F4F] text-[16px] font-normal'>Patient Name</p>
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
                            <p className='text-[#4F4F4F] text-[16px] font-normal'>Disease Name</p>
                        </div>
                        <div className="details">
                            <p className='text-[#030229] text-[16px] font-normal px-[20px]'>Viral Infection</p>
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
                </ul>
            </div>
        </NHModal>
    )
}