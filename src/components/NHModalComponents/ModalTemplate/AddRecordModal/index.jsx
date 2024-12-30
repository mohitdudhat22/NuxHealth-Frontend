import React from 'react'
import { NHButton, NHDatePicker, NHInput, NHModal, } from '@/components'

export const AddRecordModal = ({
    handleOk,
    onCancel,
    children,
    handleClose,
    Title,
    loading = false,
    addRecord,
    paymentData,
    ...rest
}) => {
    return (
        <NHModal
            title={"Add Record"}
            open={addRecord}
            handleClose={handleClose}
            disabledButton={false}
            IsFooter
            handleContent={"Save"}
            confirmLoading={loading}
            {...rest}
        >
            <div>
                <div>
                    <div className="file pb-5">
                        Upload File baki chhe
                    </div>

                    <div className="time pb-5">
                        <NHInput
                            label={"Description"}
                            placeholder={"Enter Description"}
                        />
                    </div>
                </div>
            </div>
        </NHModal>
    )
}
