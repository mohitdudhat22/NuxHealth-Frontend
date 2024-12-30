import { NHButton, NHDatePicker, NHInput, NHModal } from '@/components'
import React from 'react'

export const CustomDateModal = ({
    handleOk,
    onCancel,
    children,
    handleClose,
    Title,
    loading = false,
    customDate,
    paymentData,
    ...rest
}) => {
    return (
        <NHModal
            title={"Custom Date "}
            open={customDate}
            handleClose={handleClose}
            disabledButton={false}
            confirmLoading={loading}
            {...rest}
        >
            <div>
                <div className="flex justify-between">
                    <div className="date w-[48%]">
                        <NHDatePicker
                            label={"From Date"}
                        />
                    </div>

                    <div className="date w-[48%]">
                        <NHDatePicker
                            label={"To Date"}
                        />
                    </div>
                </div>

                <div className="btn flex justify-between pt-5">
                    <NHButton
                        className="bg-white text-[#141414] w-[48%]"
                    >
                        Reset
                    </NHButton>
                    <NHButton
                        className="bg-[#0EABEB] text-white w-[48%]"
                    >
                        Apply
                    </NHButton>
                </div>
            </div>
        </NHModal>
    )
}
