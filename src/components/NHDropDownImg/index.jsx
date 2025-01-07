import { Avatar, Dropdown } from "antd";
import clsx from "clsx";
import styles from "./NHDropDownImg.module.css";

export const NHDropDownImg = ({
  items,
  name,
  image,
  position,
  imageAlt,
  onClick,
}) => {
  return (
    <Dropdown
      menu={{
        items,
        onClick,
      }}
      placement="bottomLeft"
      arrow
      overlayClassName={styles.customDropdown}
      className={styles.dropDwn}
    >
      <button
        className={clsx(styles.dropDwnButton, "flex items-center")}
      >
        <div className={clsx(styles.dropdownImgContainer)}>
          <Avatar src={image} size={48} alt={imageAlt} className="flex" />
        </div>
        <div className={styles.dropDwnContent}>
          <h5 className={"block fw-bold leading-normal mb-xs"}>
            {name}
          </h5>
          <p className={clsx(styles.dropDwnSubTitle, "text-start leading-normal")}>
            {position}
          </p>
        </div>
      </button>
    </Dropdown>
  );
};
