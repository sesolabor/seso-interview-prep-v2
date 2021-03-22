import { useContext } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import generatePicker from "antd/lib/date-picker/generatePicker";

export interface DatePickerProps {
  className?: string;
  format?: string;
  onChange?: (value: Dayjs, dateString: string) => void;
  style?: object;
  value?: string;
  disabledDate?: (date: Dayjs) => boolean;
  defaultValue?: Dayjs | null;
  disabled?: boolean;
}

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
export default ({
  className,
  format,
  onChange,
  style,
  value,
  disabledDate,
  defaultValue,
  disabled,
}: DatePickerProps) => {
  return (
    <DatePicker
      defaultValue={defaultValue}
      disabledDate={disabledDate}
      disabled={disabled}
      style={style}
      format={format}
      className={className}
      onChange={(value) => {
        const finalVal = value.startOf("date");
        return onChange(finalVal, finalVal.toISOString());
      }}
      value={value ? dayjs(value).startOf("day") : null}
    />
  );
};
