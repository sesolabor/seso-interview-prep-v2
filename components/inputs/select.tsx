import { useContext } from "react";
import { Select, SelectProps } from "antd";
import type { SelectValue } from "antd/lib/select";
import { H2aContractFormReadonlyContext } from "@/components/contexts";
const SelectWrap = (props: SelectProps<SelectValue>) => {
  const isReadonly = useContext(H2aContractFormReadonlyContext);
  return (
    <Select disabled={isReadonly} {...props}>
      {props.children}
    </Select>
  );
};
SelectWrap.Option = Select.Option;
SelectWrap.OptGroup = Select.OptGroup;
export default SelectWrap;
