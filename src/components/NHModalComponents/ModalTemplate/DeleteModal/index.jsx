import { DSModal } from "@/components/";

export const DeleteModal = ({
  handleOk,
  onCancel,
  children,
  handleClose,
  Title,
  loading = false,
  isModalOpen,
  ...rest
}) => {
  return (
    <DSModal
      title={Title}
      open={isModalOpen}
      handleOk={handleOk}
      onCancel={onCancel}
      handleClose={handleClose}
      IsFooter
      disabledButton={false}
      handleContent={"Delete"}
      danger={true}
      confirmLoading={loading}
      {...rest}
    >
      <h6 className="lh-base clr-gray fw-normal">{children}</h6>
    </DSModal>
  );
};
