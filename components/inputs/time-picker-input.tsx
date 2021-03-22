import React from "react";
import type { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import generatePicker, { PickerTimeProps } from "antd/lib/date-picker/generatePicker";

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
export interface TimePickerProps extends Omit<PickerTimeProps<Dayjs>, "picker"> {}
// https://ant.design/docs/react/replace-moment#TimePicker.tsx
const TimePicker = React.forwardRef<any, TimePickerProps>((props, ref) => {
  return <DatePicker {...props} picker="time" mode={undefined} ref={ref} />;
});

TimePicker.displayName = "TimePicker";

export default TimePicker;
