import { InputProps } from "antd";
import FormattedInput from "./formatted-input";

export const enforceNumeric = (event) => {
  // See: https://stackoverflow.com/questions/30058927/format-a-phone-number-as-a-user-types-using-pure-javascript
  const key = event.keyCode;
  const isNumericInput =
    (key >= 48 && key <= 57) || // Allow number line
    (key >= 96 && key <= 105);
  const isModifierKey =
    event.shiftKey === true ||
    key === 35 ||
    key === 36 || // Allow Shift, Home, End
    key === 8 ||
    key === 9 ||
    key === 13 ||
    key === 46 || // Allow Backspace, Tab, Enter, Delete
    (key > 36 && key < 41) || // Allow left, up, right, down
    // Allow Ctrl/Command + A,C,V,X,Z
    ((event.ctrlKey === true || event.metaKey === true) &&
      (key === 65 || key === 67 || key === 86 || key === 88 || key === 90));
  // Input must be of a valid number format or a modifier key, and not longer than ten digits
  if (!isNumericInput && !isModifierKey) {
    event.preventDefault();
  }
};
const formatToPhone = (_value) => {
  let value = _value.replace(/\D/g, "").substring(0, 10); // First ten digits of input only
  const areaCode = value.substring(0, 3);
  const middle = value.substring(3, 6);
  const last = value.substring(6, 10);

  if (value.length > 6) {
    value = `(${areaCode}) ${middle} - ${last}`;
  } else if (value.length > 3) {
    value = `(${areaCode}) ${middle}`;
  } else if (value.length > 0) {
    value = `(${areaCode}`;
  }
  return value;
};

const PhoneNumberInput: React.FC<InputProps> = (props) => {
  return <FormattedInput {...props} formatEnforcer={formatToPhone} />;
};
export default PhoneNumberInput;
