import { Modal } from "antd";
import { clsx } from "clsx";
import { NHButton } from "@/components";
import Icons from "@/constants/Icons";
import styles from "./NHModal.module.css";

export const NHModal = ({
  open,
  title,
  width,
  children,
  className,
  handleClose,
  handleOk,
  contentClassName,
  closeOnOutsideClick,
  handleCancel,
  handleContent,
  danger,
  loading,
  IsBtnLoading,
  IsCloseIcon = true,
  IsFooter = false,
  disabledButton = true,
  ...rest
}) => {
  const finalClassName = {
    body: styles.body,
    content: clsx(styles.content, contentClassName),
    header: styles.header,
    footer: styles.footer,
    mask: styles.mask,
  };

  return (
    <Modal
      classNames={finalClassName}
      rootClassName={styles.modalParent}
      open={open}
      className={clsx(styles.modal, className)}
      title={<h3>{title}</h3>}
      onCancel={handleCancel}
      maskClosable={closeOnOutsideClick}
      width={width}
      loading={loading}
      footer={
        IsFooter &&
        (() => (
          <div
            className={clsx(
              styles.Footer,
              "flex items-center justify-content-center"
            )}
          >
            <NHButton block onClick={handleClose}>
              Cancel
            </NHButton>
            <NHButton
              block
              onClick={handleOk}
              disabled={disabledButton}
              variant={disabledButton == false ? "primary" : ""}
              danger={danger}
              loading={IsBtnLoading}
              type="submit"
            >
              {handleContent}
            </NHButton>
          </div>
        ))
      }
      closeIcon={
        IsCloseIcon && (
          <div
            onClick={handleClose}
            className={clsx(styles.closeBtn, "clr-black flex items-center")}
          >
            {Icons.CloseCircle}
          </div>
        )
      }
      centered
      {...rest}
    >
      {children}
    </Modal>
  );
};
