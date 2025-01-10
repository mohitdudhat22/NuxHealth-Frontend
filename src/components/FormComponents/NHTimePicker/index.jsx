import React from "react";
import { TimePicker } from "antd";
import clsx from "clsx";
import styles from "../NHInput/NHInput.module.css";

export const NHTimePicker = ({
  id,
  label,
  isRange,
  allowClear,
  format,
  value,
  onChange,
  disabled,
  isInvalid,
  placeholder,
  errorMessage,
  parentClassName,
  labelClassName,
  rootClassName,
  required,
  ...rest
}) => {
  return (
    <div className={clsx(parentClassName, "position-relative flex flex-col")}>
      {label && (
        <label
          htmlFor={id}
          className={clsx(styles.label, "mb-xs flex", labelClassName)}
        >
          {label} {required && <span className="d-block text-danger">*</span>}
        </label>
      )}
      {isRange ? (
        <TimePicker.RangePicker
          id={id}
          allowClear={allowClear}
          className={clsx(
            styles.inputWrap,
            styles.timeRangePicker,
            rootClassName,
            "focus:shadow-none h-full py-md px-sm"
          )}
          onChange={(time, timeString) => onChange(time, timeString)}
          disabled={disabled}
          status={isInvalid && "error"}
          placeholder={placeholder}
          {...rest}
        />
      ) : (
        <TimePicker
          id={id}
          allowClear={allowClear}
          className={clsx(
            styles.inputWrap,
            styles.timePicker,
            rootClassName,
            "focus:shadow-none h-full py-md px-sm"
          )}
          onChange={(time, timeString) => onChange(time, timeString)}
          disabled={disabled}
          status={isInvalid && "error"}
          placeholder={placeholder}
          {...rest}
        />
      )}
      {errorMessage && (
        <div className={clsx(styles.errorMessage)}>{errorMessage}</div>
      )}
    </div>
  );
};
