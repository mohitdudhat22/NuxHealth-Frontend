import { Dropdown } from "antd";
import clsx from "clsx";
import { NHButton } from "@/components/";
import styles from "./NHDropdown.module.css";

export const NHDropdown = ({
  onClick,
  dropdownMenu,
  children,
  className,
  rootClassName,
  placement,
  trigger,
  expandIcon,
  ...rest
}) => {
  return (
    <Dropdown
      menu={{
        items: dropdownMenu,
        // expandIcon: expandIcon ? expandIcon : Icons.DropdownArrowRight,
        onClick: onClick,
        className: styles.dropdownMenu,
        rootClassName: styles.dropdownSubMenu,
      }}
      trigger={trigger}
      className={className}
      rootClassName={clsx(styles.dropdown, rootClassName)}
      {...rest}
      placement={placement}
    >
      <NHButton>{children}</NHButton>
    </Dropdown>
  );
};