import log from "@/lib/log";
import { Checkbox } from "@/components/inputs";

const BoolCheckbox = ({
  onChange = (_) => {},
  value,
  children,
  style = {},
}: {
  onChange?: (val: boolean) => void;
  value?: boolean;
  children: React.ReactNode;
  style?: object;
}) => {
  if (value === null) log.error("BoolCheckBox value is null");
  const isChecked = !!value;
  const onCheckboxChange = (e) => onChange(e.target.checked);
  return (
    <Checkbox style={style} checked={isChecked} onChange={onCheckboxChange}>
      {children}
    </Checkbox>
  );
};

export default BoolCheckbox;
