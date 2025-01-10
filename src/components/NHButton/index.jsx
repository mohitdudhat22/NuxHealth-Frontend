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
  id,
  name,
  variant,
  shape,
  ...rest
}) => {
  if (isEdit || isView || isDelete) {
    variant = "primary";
    size = "small";
  }

  if (isView) {
    icon = Icons?.Eye;
  }

  if (isDelete) {
    icon = Icons?.Delete;
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
      danger={isDelete}
      className={clsx(
        className,
        "shadow-none inline-flex items-center justify-center min-h-[40px] gap-md button",
        {
          "bg-[#F6F8FB]": isView || isEdit || isDelete,
          "text-success": isEdit,
          "text-primary": isView,
        }
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};
