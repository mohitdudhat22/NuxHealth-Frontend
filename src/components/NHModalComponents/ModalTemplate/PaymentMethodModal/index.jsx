import React from 'react'
import { NHModal } from '../..'

export const PaymentMethodModal = ({
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
            title={"Payment Method"}
            open={isModalOpen}
            handleClose={handleClose}
            IsFooter
            disabledButton={false}
            handleContent={"Pay Now"}
            confirmLoading={loading}
            {...rest}
        >
            <form>
                <div className="">
                    <div className="py-3">
                        <div className="flex justify-between items-center border border-[#A7A7A7] py-[12px] px-[14px] rounded-2xl">
                            <div className="left flex justify-between items-center ">
                                <div className="icon">
                                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.51473 15.0806C11.4332 15.0806 14.6097 11.904 14.6097 7.98559C14.6097 4.06715 11.4332 0.890625 7.51473 0.890625C3.59629 0.890625 0.419762 4.06715 0.419762 7.98559C0.419762 11.904 3.59629 15.0806 7.51473 15.0806Z" fill="#FF6041" />
                                    </svg>
                                </div>
                                <div className="details pl-3">
                                    <p className='text-[#141414] text-[18px] font-bold'>Master Card</p>
                                </div>
                            </div>
                            <div className="right flex">
                                <input type="radio" className='h-[18px] w-[18px]' />
                            </div>
                        </div>
                    </div>

                    <div className="py-3">
                        <div className="flex justify-between items-center border border-[#A7A7A7] py-[12px] px-[14px] rounded-2xl">
                            <div className="left flex justify-between items-center ">
                                <div className="icon">
                                    <svg width="26" height="10" viewBox="0 0 26 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.87203 0.944547L6.46862 9.06579H4.24724L2.57359 2.58524C2.47056 2.18559 2.3825 2.04015 2.07355 1.87044C1.56746 1.59683 0.735008 1.34018 0 1.18032L0.0514414 0.944597H3.62537C4.08119 0.944597 4.49099 1.24862 4.59403 1.77274L5.47899 6.47315L7.66482 0.944597L9.87203 0.944547ZM18.5732 6.41308C18.583 4.27082 15.6089 4.15423 15.6303 3.19583C15.6361 2.90328 15.9134 2.59372 16.5206 2.51557C16.8222 2.47545 17.652 2.44605 18.5925 2.87784L18.9611 1.15646C18.4551 0.972781 17.8046 0.796875 16.9962 0.796875C14.9198 0.796875 13.458 1.90132 13.4457 3.48158C13.4321 4.65016 14.4886 5.30229 15.2855 5.69148C16.1038 6.0897 16.3774 6.34397 16.3745 6.70111C16.3692 7.2462 15.7216 7.48441 15.1176 7.49512C14.0611 7.51158 13.4483 7.20963 12.959 6.98173L12.5786 8.76227C13.0688 8.98733 13.9764 9.18274 14.9156 9.19427C17.1225 9.19417 18.5662 8.1015 18.5732 6.41308ZM24.0565 9.06584H26L24.3042 0.944597H22.51C22.1069 0.944597 21.767 1.17972 21.6155 1.53991L18.465 9.06584H20.6702L21.1079 7.85298H23.8035L24.0565 9.06584ZM21.7122 6.18842L22.8186 3.13901L23.455 6.18842H21.7122ZM12.8743 0.944547L11.1361 9.06579H9.0348L10.7734 0.944547H12.8743Z" fill="#1A2ADF" />
                                    </svg>
                                </div>
                                <div className="details pl-3">
                                    <p className='text-[#141414] text-[18px] font-bold'>Visa Card</p>
                                </div>
                            </div>
                            <div className="right flex">
                                <input type="radio" className='h-[18px] w-[18px]' />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </NHModal>
    )
}
