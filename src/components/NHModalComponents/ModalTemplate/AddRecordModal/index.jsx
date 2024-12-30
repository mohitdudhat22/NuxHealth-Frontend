import React from 'react'
import { NHButton, NHDatePicker, NHInput, NHModal, } from '@/components'
import { NHProfilePicUploader } from '@/components/FormComponents/NHProfilePicUploader'

export const AddRecordModal = ({
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
            title={"Add Record"}
            open={isModalOpen}
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
