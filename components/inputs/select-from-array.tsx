import { Select } from "antd";

const { Option } = Select;

export interface TypeOption<TIdentifier extends string> {
  id: TIdentifier;
  title: string;
}

type SelectFromArray<TIdentifier extends string>  = {
  handleOnChangeSelect: (val: TIdentifier | TIdentifier[]) => any;
  arrayOptions: TypeOption<TIdentifier>[];
  mode?: "multiple" | "tags";
} 

export const SelectFromArray = <TIdentifier extends string>({
  arrayOptions,
  handleOnChangeSelect,
  mode
}: SelectFromArray<TIdentifier>): React.ReactElement => {
  const handleChange = (option: TIdentifier) => {
    handleOnChangeSelect(option);
  };
  return (
    <Select onChange={handleChange} mode={mode} >
      {arrayOptions.map((el, index) => (
        <Option key={index} value={el.id}>
          {el.title}
        </Option>
      ))}
    </Select>
  );
};
 