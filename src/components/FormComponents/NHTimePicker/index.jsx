import { TimePicker } from 'antd';
import clsx from 'clsx';
import styles from '../NHInput/NHInput.module.css';

export const NHTimePicker = ({ isRange, allowClear, format, value, onChange, ...rest }) => {
  return (
    <>
      {isRange ? (
        <TimePicker.RangePicker
          allowClear={allowClear}
          className={clsx(styles.inputWrap, styles.timeRangePicker)}
          onChange={(time, timeString) => onChange(time, timeString)}
          {...rest}
        />
      ) : (
        <TimePicker
          allowClear={allowClear}
          className={clsx(styles.inputWrap, styles.timePicker)}
          onChange={(time, timeString) => onChange(time, timeString)}
          {...rest}
        />
      )}
    </>
  );
};