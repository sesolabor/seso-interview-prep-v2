import dayjs, { Dayjs } from "dayjs";
import { PickerTimeProps } from "antd/lib/date-picker/generatePicker";
import TimePicker from "./time-picker-input";

interface TimePickerWithMinutesProps extends Omit<PickerTimeProps<Dayjs>, "picker" | "onChange" | "value"> {
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
