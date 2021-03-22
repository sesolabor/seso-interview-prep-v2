import { useState } from "react";
import log from "@/lib/log";
import { Button } from "@/components/inputs";


const BoolRadioButton = ({ onChange = (_) => {}, value }: { onChange?: (val: boolean) => void; value?: boolean }) => {
  const [val, setVal] = useState(value);
  const toggleState = (newVal) => {
    setVal(newVal);
    onChange(newVal);
  };
  if (value === null) log.error("BoolRadioButton value is null");
  return (
    <div>
      <Button
        onClick={() => toggleState(true)}
        className={`boolean-radio-button open-sans-600${val ? " selected" : ""}`}
      >
        Yes
      </Button>
      <Button
        onClick={() => toggleState(false)}
        className={`boolean-radio-button open-sans-600${!val ? " selected" : ""}`}
      >
        No
      </Button>
    </div>
  );
};

export default BoolRadioButton;
