import { NHModal } from "../..";

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
    <NHModal
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
    </NHModal>
  );
};
