import { NHButton, NHDatePicker, NHModal } from '@/components'
import React from 'react'

export const CustomDateModal = ({
    handleOk,
    onCancel,
    handleClose,
    Title,
    loading = false,
    customDate,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
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
                            value={fromDate}
                            onChange={setFromDate} // Update fromDate
                        />
                    </div>

                    <div className="date w-[48%]">
                        <NHDatePicker
                            label={"To Date"}
                            value={toDate}
                            onChange={setToDate} // Update toDate
                        />
                    </div>
                </div>

                <div className="btn flex justify-between pt-5">
                    <NHButton
                        className="bg-white text-[#141414] w-[48%]"
                        onClick={() => {
                            setFromDate(null); // Reset fromDate
                            setToDate(null); // Reset toDate
                        }}
                    >
                        Reset
                    </NHButton>
                    <NHButton
                        className="bg-[#0EABEB] text-white w-[48%]"
                        onClick={handleOk} // Apply the date filter
                    >
                        Apply
                    </NHButton>
                </div>
            </div>
        </NHModal>
    );
};
