import { NHInput, NHModal } from "@/components/";

export const PaymentProcessModal = ({
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
            title={"Cash Payment"}
            open={isModalOpen}
            handleClose={handleClose}
            IsFooter
            disabledButton={false}
            handleContent={"Pay"}
            confirmLoading={loading}
            paymentData
            {...rest}
        >
            <form>
                <div className="">
                    <NHInput
                        label="Enter Amount"
                        placeholder="0000"
                    />
                </div>
            </form>
        </NHModal>
    )
}