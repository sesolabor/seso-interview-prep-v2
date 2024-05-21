import React from "react";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import generatePicker from "antd/lib/date-picker/generatePicker";

import type { Dayjs } from "dayjs";
import type { GenericTimePickerProps } from "antd/es/date-picker/generatePicker/interface";

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
export interface TimePickerProps extends Omit<GenericTimePickerProps<Dayjs>, "picker"> {}
// https://ant.design/docs/react/replace-moment#TimePicker.tsx
const TimePicker = React.forwardRef<any, TimePickerProps>((props, ref) => {
  return <DatePicker {...props} picker="time" mode={undefined} ref={ref} />;
});

TimePicker.displayName = "TimePicker";

export default TimePicker;
