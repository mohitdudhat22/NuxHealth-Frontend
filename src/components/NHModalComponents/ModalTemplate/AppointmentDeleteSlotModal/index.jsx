import React from 'react'
import { NHModal } from '@/components'

export const AppointmentDeleteSlotModal = ({
    handleOk,
    onCancel,
    children,
    handleClose,
    Title,
    loading = false,
    appoDeleteSlot,
    paymentData,
    ...rest
}) => {
    return (
        <NHModal
            open={appoDeleteSlot}
            handleClose={handleClose}
            disabledButton={false}
            handleContent={"Yes"}
            IsFooter
            confirmLoading={loading}
            {...rest}
        >
            <div>
                <div className="Delete flex justify-center items-center gap-x-4">
                    <div className="icon bg-[red] w-[60px] h-[60px] rounded-full flex justify-center items-center">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.3371 6.5375C24.3246 6.3375 22.3121 6.1875 20.2871 6.075V6.0625L20.0121 4.4375C19.8246 3.2875 19.5496 1.5625 16.6246 1.5625H13.3496C10.4371 1.5625 10.1621 3.2125 9.96209 4.425L9.69959 6.025C8.53709 6.1 7.37459 6.175 6.21209 6.2875L3.66209 6.5375C3.13709 6.5875 2.76209 7.05 2.81209 7.5625C2.86209 8.075 3.31209 8.45 3.83709 8.4L6.38709 8.15C12.9371 7.5 19.5371 7.75 26.1621 8.4125C26.1996 8.4125 26.2246 8.4125 26.2621 8.4125C26.7371 8.4125 27.1496 8.05 27.1996 7.5625C27.2371 7.05 26.8621 6.5875 26.3371 6.5375Z" fill="white" />
                            <path d="M24.0377 10.175C23.7377 9.8625 23.3252 9.6875 22.9002 9.6875H7.10018C6.67518 9.6875 6.25018 9.8625 5.96268 10.175C5.67518 10.4875 5.51268 10.9125 5.53768 11.35L6.31268 24.175C6.45018 26.075 6.62518 28.45 10.9877 28.45H19.0127C23.3752 28.45 23.5502 26.0875 23.6877 24.175L24.4627 11.3625C24.4877 10.9125 24.3252 10.4875 24.0377 10.175ZM17.0752 22.1875H12.9127C12.4002 22.1875 11.9752 21.7625 11.9752 21.25C11.9752 20.7375 12.4002 20.3125 12.9127 20.3125H17.0752C17.5877 20.3125 18.0127 20.7375 18.0127 21.25C18.0127 21.7625 17.5877 22.1875 17.0752 22.1875ZM18.1252 17.1875H11.8752C11.3627 17.1875 10.9377 16.7625 10.9377 16.25C10.9377 15.7375 11.3627 15.3125 11.8752 15.3125H18.1252C18.6377 15.3125 19.0627 15.7375 19.0627 16.25C19.0627 16.7625 18.6377 17.1875 18.1252 17.1875Z" fill="white" />
                        </svg>

                    </div>
                </div>

                <div className="content pt-3">
                    <p className='text-[#030229] text-[24px] font-extrabold	text-center'>Delete Time Slot ?</p>
                    <span className='text-center block'>This slot is to be deleted ?</span>
                </div>
            </div>

        </NHModal>
    )
}
