import { DatePicker } from "antd";
import clsx from "clsx";
import styles from "./NHDatePicker.module.css";

export const NHDatePicker = ({
  id,
  value,
  label,
  format,
  onChange,
  isInvalid,
  placeholder,
  errorMessage,
  name,
  suffix = false,
  allowClear = true,
  parentClassName,
  ...rest
}) => {
  return (
    <div className={clsx(styles.datepickerWrap, parentClassName)}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <DatePicker
        id={id}
        name={name}
        value={value}
        format={format}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(styles.datepicker, "p-4 mt-1 rounded-2xl")}
        status={isInvalid && "error"}
        {...rest}
      />
      {errorMessage && (
        <div className={clsx(styles.errorMessage)}>{errorMessage}</div>
      )}
    </div>
  );
};