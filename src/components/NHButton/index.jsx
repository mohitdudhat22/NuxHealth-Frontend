import Icons from "@/constants/icons";
import { Button } from "antd";
import clsx from "clsx";

export const NHButton = ({
  size,
  type,
  icon,
  className,
  children,
  onClick,
  isEdit,
  isView,
  isDelete,
  isCancel,
  isReschedule,
  id,
  name,
  variant,
  shape,
  title,
  ...rest
}) => {
  if (isEdit || isView || isDelete || isCancel || isReschedule) {
    variant = "primary";
    size = "small";
  }

  if (isView) {
    icon = Icons?.Eye;
  }

  if (isDelete) {
    icon = Icons?.Delete;
  }

  if (isCancel) {
    icon = Icons?.cancelCalendar;
  }

  if (isReschedule) {
    icon = Icons?.ReScheduleCalendar;
  }

  return (
    <Button
      id={id}
      name={name}
      shape={shape}
      size={size}
      icon={icon}
      htmlType={type}
      type={variant}
      onClick={onClick}
      title={title}
      danger={isDelete || isCancel}
      className={clsx(
        className,
        "shadow-none inline-flex items-center justify-center min-h-[40px] gap-md button",
        {
          "bg-[#F6F8FB]":
            isView || isEdit || isDelete || isCancel || isReschedule,
          "text-success": isEdit,
          "text-primary": isView,
          "text-[#49bfef]": isReschedule,
        }
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};
