import { NHButton, NHModal } from '@/components'
import React from 'react'

export const JoinCallModal = ({
    handleOk,
    onCancel,
    children,
    handleClose,
    Title,
    loading = false,
    joinCall,
    paymentData,
    ...rest
}) => {
    return (
        <NHModal
            title={"Join Call"}
            open={joinCall}
            handleClose={handleClose}
            disabledButton={false}
            confirmLoading={loading}
            {...rest}
        >
            <div>

                <div className="pb-6">
                    <div className="content bg-[#F6F8FB] py-10 rounded-xl">
                        <div className="img-box w-[70px] h-[70px] bg-[#D9D9D9] rounded-full border border-[#DFE0EB] m-auto">
                            <img src="https://i.pravatar.cc/300" alt="" className='w-[150px] rounded-full' />
                        </div>
                        <div className="name">
                            <p className='text-[#030229] text-[20px] font-medium	text-center	'>Marcus Phillips Wants to Join Call.</p>
                        </div>
                    </div>
                </div>

                <div className="btn flex justify-between pt-5">
                    <NHButton
                        className="bg-[#E11D29] text-white w-[48%]"
                    >
                        Deny
                    </NHButton>

                    <NHButton
                        className="bg-[#39973D] text-white w-[48%]"
                    >
                        Admin
                    </NHButton>
                </div>
            </div>
        </NHModal>
    )
}