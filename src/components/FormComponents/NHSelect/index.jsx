import { Select } from "antd";
import Icons from "@/constants/Icons";
import clsx from "clsx";
import styles from "./NHSelect.module.css";

export const NHSelect = ({
  id,
  name,
  size,
  label,
  value,
  placeholder,
  options,
  onChange,
  disabled,
  isInvalid,
  allowClear = true,
  errorMessage,
  rootClassName,
  parentClassName,
  labelClassName,
  mode,
  require,
  key = "select",
  ...rest
}) => {
  return (
    <div className={clsx(styles.parent, parentClassName)} key={key}>
      {label && (
        <label
          htmlFor={id}
          className={clsx(styles.label, "flex", labelClassName)}
        >
          {label} {require && <span className="d-block clr-danger">*</span>}
        </label>
      )}
      <Select
        id={id}
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        status={isInvalid && "error"}
        className={clsx(styles.select, "w-full", rootClassName)}
        placeholder={placeholder ? placeholder : '"Select a value"'}
        mode={mode}
        popupClassName={styles.selectPopup}
        suffixIcon={<span className="clr-black">{Icons.AltArrowDown}</span>}
        disabled={disabled}
        {...rest}
      />
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
};