import React from 'react'
import { NHModal } from '../..'

export const CancelOnlineAppointmentModal = ({
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
            open={isModalOpen}
            handleClose={handleClose}
            disabledButton={false}
            handleContent={"Payment Return"}
            IsFooter
            confirmLoading={loading}
            {...rest}
        >
            <div>
                <div className="time flex justify-center items-center gap-x-4">
                    <div className="icon bg-[red] w-[60px] h-[60px] rounded-full flex justify-center items-center">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.9378 4.45V2.5C20.9378 1.9875 20.5128 1.5625 20.0003 1.5625C19.4878 1.5625 19.0628 1.9875 19.0628 2.5V4.375H10.9378V2.5C10.9378 1.9875 10.5128 1.5625 10.0003 1.5625C9.48779 1.5625 9.06279 1.9875 9.06279 2.5V4.45C5.68779 4.7625 4.05029 6.775 3.80029 9.7625C3.77529 10.125 4.07529 10.425 4.42529 10.425H25.5753C25.9378 10.425 26.2378 10.1125 26.2003 9.7625C25.9503 6.775 24.3128 4.7625 20.9378 4.45Z" fill="white" />
                            <path d="M25 12.3008H5C4.3125 12.3008 3.75 12.8633 3.75 13.5508V21.2508C3.75 25.0008 5.625 27.5008 10 27.5008H16.1625C17.025 27.5008 17.625 26.6633 17.35 25.8508C17.1 25.1258 16.8875 24.3258 16.8875 23.7508C16.8875 19.9633 19.975 16.8758 23.7625 16.8758C24.125 16.8758 24.4875 16.9008 24.8375 16.9633C25.5875 17.0758 26.2625 16.4883 26.2625 15.7383V13.5633C26.25 12.8633 25.6875 12.3008 25 12.3008ZM11.5125 22.1383C11.275 22.3633 10.95 22.5008 10.625 22.5008C10.4625 22.5008 10.3 22.4633 10.15 22.4008C10 22.3383 9.8625 22.2508 9.7375 22.1383C9.5125 21.9008 9.375 21.5883 9.375 21.2508C9.375 21.0883 9.4125 20.9258 9.475 20.7758C9.5375 20.6133 9.625 20.4883 9.7375 20.3633C9.8625 20.2508 10 20.1633 10.15 20.1008C10.6 19.9008 11.1625 20.0133 11.5125 20.3633C11.625 20.4883 11.7125 20.6133 11.775 20.7758C11.8375 20.9258 11.875 21.0883 11.875 21.2508C11.875 21.5883 11.7375 21.9008 11.5125 22.1383ZM11.5125 17.7633C11.275 17.9883 10.95 18.1258 10.625 18.1258C10.4625 18.1258 10.3 18.1008 10.15 18.0258C10 17.9633 9.8625 17.8758 9.7375 17.7633C9.5125 17.5258 9.375 17.2008 9.375 16.8758C9.375 16.7133 9.4125 16.5508 9.475 16.4008C9.5375 16.2508 9.625 16.1133 9.7375 15.9883C9.8625 15.8758 10 15.7883 10.15 15.7258C10.6 15.5383 11.1625 15.6383 11.5125 15.9883C11.625 16.1133 11.7125 16.2508 11.775 16.4008C11.8375 16.5508 11.875 16.7133 11.875 16.8758C11.875 17.2008 11.7375 17.5258 11.5125 17.7633ZM16.15 17.3508C16.0875 17.5008 16 17.6383 15.8875 17.7633C15.7625 17.8758 15.625 17.9633 15.475 18.0258C15.325 18.1008 15.1625 18.1258 15 18.1258C14.675 18.1258 14.35 17.9883 14.1125 17.7633C14 17.6383 13.9125 17.5008 13.85 17.3508C13.7875 17.2008 13.75 17.0383 13.75 16.8758C13.75 16.5508 13.8875 16.2258 14.1125 15.9883C14.4625 15.6383 15.0125 15.5258 15.475 15.7258C15.625 15.7883 15.7625 15.8758 15.8875 15.9883C16.1125 16.2258 16.25 16.5508 16.25 16.8758C16.25 17.0383 16.225 17.2008 16.15 17.3508Z" fill="white" />
                            <path d="M23.75 18.75C20.9875 18.75 18.75 20.9875 18.75 23.75C18.75 26.5125 20.9875 28.75 23.75 28.75C26.5125 28.75 28.75 26.5125 28.75 23.75C28.75 20.9875 26.5125 18.75 23.75 18.75ZM25.75 25.8C25.5625 25.9875 25.325 26.075 25.0875 26.075C24.85 26.075 24.6125 25.9875 24.425 25.8L23.7625 25.1375L23.075 25.825C22.8875 26.0125 22.65 26.1 22.4125 26.1C22.175 26.1 21.9375 26.0125 21.75 25.825C21.3875 25.4625 21.3875 24.8625 21.75 24.5L22.4375 23.8125L21.775 23.15C21.4125 22.7875 21.4125 22.1875 21.775 21.825C22.1375 21.4625 22.7375 21.4625 23.1 21.825L23.7625 22.5L24.3875 21.875C24.75 21.5125 25.35 21.5125 25.7125 21.875C26.075 22.2375 26.075 22.8375 25.7125 23.2L25.0875 23.825L25.75 24.4875C26.1125 24.85 26.1125 25.4375 25.75 25.8Z" fill="white" />
                        </svg>
                    </div>
                </div>

                <div className="content pt-3">
                    <p className='text-[#030229] text-[24px] font-extrabold	text-center'>Cancel Online Appointment ?</p>
                    <span className='text-center block'>If you cancel appointment you have to return payment.</span>
                </div>
            </div>

        </NHModal>
    )
}
