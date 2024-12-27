import { Button } from "antd";
import clsx from "clsx";

export const NHButton = ({
  size,
  type,
  icon,
  className,
  children,
  onClick,
  id,
  name,
  variant,
  shape,
  ...rest
}) => {
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
      className={clsx(className, "shadow-none inline-flex items-center justify-center min-h-[40px] gap-md button")}
      {...rest}
    >
      {children}
    </Button>
  );
};