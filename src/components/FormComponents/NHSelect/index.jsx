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
  timeSlote,
  ...rest
}) => {
  // Merge morning and evening time slots into dropdown options
  const timeSlotOptions = [
    ...(timeSlote?.morningSlots?.map(({ start }) => ({
      label: `Morning: ${start}`,
      value: start,
    })) || []),
    ...(timeSlote?.eveningSlots?.map(({ start }) => ({
      label: `Evening: ${start}`,
      value: start,
    })) || []),
  ];

  return (
    <div className={clsx(styles.parent, parentClassName, "w-full")} key={key}>
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
        options={options || timeSlotOptions}
        value={value}
        onChange={onChange}
        status={isInvalid && "error"}
        className={clsx(styles.select, "w-full", rootClassName)}
        placeholder={placeholder || "Select a time slot"}
        mode={mode}
        allowClear={allowClear}
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
