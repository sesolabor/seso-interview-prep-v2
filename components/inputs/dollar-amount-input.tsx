import * as R from "ramda";
import { Input } from "@/components/inputs";

export default function DollarAmountInput({
  onChange,
  placeholder = "$0.00",
  className = null,
  value,
}: {
  onChange?: (phoneNumber: any) => void;
  placeholder?: string;
  className?: string;
  value?: number;
}) {
  return (
    <Input
      min={0}
      // Note: Money is stored as an integer in the db.
      // Meaning, it arrives as a number. The input requires a string, so we coerce in the beginning.
      value={R.isNil(value) ? value : formatToDollar(String(value))}
      className={className}
      // See: https://stackoverflow.com/questions/30058927/format-a-phone-number-as-a-user-types-using-pure-javascript
      onKeyDown={enforceNumericOrDecimal}
      placeholder={placeholder}
      onChange={(e) => {
        formatCurrency(e);
        onChange(e);
      }}
    />
  );
}

function formatNumber(n) {
  // format number  1234567 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatToDollar(_inputVal) {
  let inputVal = _inputVal.replace(/[,\$\.]/g, "");
  inputVal = inputVal.replace(/^\$\./g, "");
  inputVal = inputVal.replace(/^0*/g, "");
  inputVal = inputVal === "" ? 0 : inputVal;
  inputVal = new Number(parseFloat(String(inputVal)) / 100).toFixed(2);
  const [left, right] = String(inputVal).split(".");
  inputVal = "$" + formatNumber(left) + "." + (right || "00");

  return inputVal;
}
function formatCurrency(event) {
  if (event.target.value === "") return;
  // get input value
  const input = event.target;
  const original_len = input.value.length;
  let caret_pos = input.selectionStart;
  let inputVal = formatToDollar(input.value);
  if (input.value === inputVal) return;

  input.value = inputVal;
  // put caret back in the right position
  const updated_len = inputVal.length;
  caret_pos = updated_len - original_len + caret_pos;
  input.setSelectionRange(caret_pos, caret_pos);
}

const modifierKeys = [35, 36, 8, 9, 13, 46];
const AorCorVorXorZorR = [65, 67, 86, 88, 90, 82];
function isNumericOrDecimal(event) {
  // See: https://stackoverflow.com/questions/30058927/format-a-phone-number-as-a-user-types-using-pure-javascript
  const key = event.keyCode;
  const isDecimal = key === 190;
  const alreadHasDecimal = event.target.value.includes(".");

  if (isDecimal && alreadHasDecimal) return false;

  const isNumericInput =
    (key >= 48 && key <= 57) || // Allow number line
    (key >= 96 && key <= 105);
  const isModifierKey =
    event.shiftKey === true ||
    modifierKeys.includes(key) || // Allow Backspace, Tab, Enter, Delete
    (key > 36 && key < 41) || // Allow left, up, right, down
    // Allow Ctrl/Command + A,C,V,X,Z,R
    ((event.ctrlKey === true || event.metaKey === true) && AorCorVorXorZorR.includes(key));
  // Input must be of a valid number format or a modifier key, and not longer than ten digits
  const isNumOrDec = isNumericInput || isModifierKey || isDecimal;
  return isNumOrDec;
}

function enforceNumericOrDecimal(event) {
  return isNumericOrDecimal(event) ? null : event.preventDefault();
}
