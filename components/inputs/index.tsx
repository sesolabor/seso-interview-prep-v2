import { useContext } from "react";
import type { InputProps, InputNumberProps, ButtonProps, CheckboxProps } from "antd";
import { InputNumber as _InputNumber, Input as _Input, Button as _Button, Checkbox as _Checkbox } from "antd";
import { TextAreaProps } from "antd/lib/input/TextArea";
import { H2aContractFormReadonlyContext } from "@/components/contexts";
import _DatePicker, { DatePickerProps } from "./date-picker-input";
import _TimePicker, { TimePickerProps } from "./time-picker-input";

// https://dev.to/aexol/typescript-tutorial-infer-keyword-2cn
const ReadOnlyContextHOC = <T extends object>(InputComponent) => {
  return (props: T) => {
    const isReadonly = useContext(H2aContractFormReadonlyContext);
    return <InputComponent disabled={isReadonly} {...props} />;
  };
};

export { default as TimePickerWithMinutes } from "./time-picker-with-minutes";
export { default as PhoneNumberInput } from "./phone-number-input";
export { default as BoolRadioButton } from "./bool-radio-button-input";
export { default as BoolCheckbox } from "./bool-checkbox";
export { default as DollarAmountInput } from "./dollar-amount-input";
export { default as PlacesAutocompleteInput } from "./places-autocomplete";
export { default as FormattedInput } from "./formatted-input";
export { default as Select } from "./select";

export const TextArea = ReadOnlyContextHOC<TextAreaProps>(_Input.TextArea);
export const InputNumber = ReadOnlyContextHOC<InputNumberProps>(_InputNumber);
export const Input = ReadOnlyContextHOC<InputProps>(_Input);
export const Button = ReadOnlyContextHOC<ButtonProps>(_Button);
export const Checkbox = ReadOnlyContextHOC<CheckboxProps>(_Checkbox);
export const DatePicker = ReadOnlyContextHOC<DatePickerProps>(_DatePicker);
export const TimePicker = ReadOnlyContextHOC<TimePickerProps>(_TimePicker);
