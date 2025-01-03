import { Input } from "antd";
import clsx from "clsx";
import styles from "./NHInput.module.css";
import Icons from "@/constants/icons";

export const NHInput = ({
  id,
  name,
  size,
  type = "text",
  label,
  value,
  suffix,
  prefix,
  onChange,
  disabled,
  isInvalid,
  allowClear = false,
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
          className={clsx(styles.label, "mb-xl", labelClassName)}
        >
          {label} {required && <span className="d-block text-danger">*</span>}
        </label>
      )}
      <Input
        id={id}
        name={name}
        type={type}
        size={size}
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(styles.inputWrap, rootClassName, "focus:shadow-none")}
        status={isInvalid && "error"}
        prefix={prefix}
        suffix={suffix}
        allowClear={allowClear}
        {...rest}
      />
      {errorMessage && (
        <div className={clsx(styles.errorMessage)}>{errorMessage}</div>
      )}
    </div>
  );
};

export const NHPasswordInput = ({
  id,
  size,
  label,
  value,
  suffix,
  prefix,
  onChange,
  disabled,
  isInvalid,
  className,
  placeholder,
  errorMessage,
  parentClassName,
  labelClassName,
  rootClassName,
  require,
  ...rest
}) => {
  return (
    <div className={clsx(parentClassName, "position-relative flex flex-col")}>
      {label && (
        <label
          htmlFor={id}
          className={clsx(styles.label, "mb-2", labelClassName)}
        >
          {label} {require && <span className="d-block clr-danger">*</span>}
        </label>
      )}
      <Input.Password
        id={id}
        size={size}
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(styles.inputWrap, rootClassName, "focus:shadow-none")}
        status={isInvalid && "error"}
        prefix={prefix}
        suffix={suffix}
        {...rest}
      />
      {errorMessage && (
        <div className={clsx(styles.errorMessage)}>{errorMessage}</div>
      )}
    </div>
  );
};

export const NHInputOtp = ({
  id,
  size,
  value,
  onChange,
  disabled,
  isInvalid,
  formatter,
  placeholder,
  errorMessage,
  className,
  defaultValue,
  mask,
  ...rest
}) => {
  return (
    <div className={clsx(styles.inputOtp, className, "position-relative")}>
      <Input.OTP
        id={id}
        size={size}
        formatter={formatter}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        status={isInvalid && "error"}
        mask={mask}
        {...rest}
      />
      {errorMessage && (
        <div className={clsx(styles.errorMessage)}>{errorMessage}</div>
      )}
    </div>
  );
};

export const NHNumberInput = ({
  id,
  min,
  max,
  size = "large",
  label,
  value,
  suffix,
  prefix,
  parser,
  disabled,
  onChange,
  formatter,
  isInvalid,
  className,
  allowClear,
  placeholder,
  errorMessage,
  defaultValue,
  parentClassName,
  ...rest
}) => {
  return (
    <div className={clsx(parentClassName, "flex flex-col")}>
      {label && (
        <label htmlFor={id} className={clsx(styles.label, mb-2)}>
          {label}
        </label>
      )}
      <InputNumber
        id={id}
        size={size}
        value={value}
        type="number"
        defaultValue={defaultValue}
        prefix={prefix}
        suffix={suffix}
        parser={parser}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(styles.inputWrap, rootClassName, "focus:shadow-none")}
        formatter={formatter}
        status={isInvalid && "error"}
        // allowClear={
        //   allowClear && {
        //     clearIcon: <span className="clr-black"> {Icons.CloseCircle} </span>,
        //   }
        // }
        {...rest}
      />
      {errorMessage && (
        <div className={clsx(styles.errorMessage)}>{errorMessage}</div>
      )}
    </div>
  );
};

const { TextArea } = Input;

export const NHTextArea = ({
  id,
  label,
  value,
  suffix,
  prefix,
  autoSize,
  onChange,
  disabled,
  isInvalid,
  className,
  allowClear = true,
  placeholder,
  errorMessage,
  parentClassName,
  labelClassName,
  ...rest
}) => {
  return (
    <div className={clsx(parentClassName, "flex")}>
      {label && (
        <label htmlFor={id} className={clsx(styles.label, labelClassName)}>
          {label}
        </label>
      )}
      <TextArea
        placeholder={placeholder}
        id={id}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={clsx(styles.inputWrap, className, "focus:shadow-none")}
        status={isInvalid && "error"}
        prefix={prefix}
        suffix={suffix}
        autoSize={autoSize}
        minLength={3}
        {...rest}
      />
      {errorMessage && (
        <div className={clsx(styles.errorMessage)}>{errorMessage}</div>
      )}
    </div>
  );
};
