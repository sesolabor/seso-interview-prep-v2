import dayjs, { Dayjs } from "dayjs";
import TimePicker from "./time-picker-input";

import type { GenericTimePickerProps } from "antd/es/date-picker/generatePicker/interface";

interface TimePickerWithMinutesProps extends Omit<GenericTimePickerProps<Dayjs>, "picker" | "onChange" | "value"> {
  onChange?: (value: number) => void;
  value?: number;
}

const TimePickerWithMinutes = (props: TimePickerWithMinutesProps) => {
  const onTimePickerChange = (value: Dayjs) => {
    const minutes = value.diff(value.clone().startOf("day"), "minute");
    props.onChange(minutes);
  };
  const value = props.value !== null ? dayjs().startOf("day").add(props.value, "minute") : null;
  return (
    <TimePicker
      {...props}
      onSelect={(time) => {
        onTimePickerChange(time);
      }}
      onChange={onTimePickerChange}
      value={value}
    />
  );
};
export default TimePickerWithMinutes;
