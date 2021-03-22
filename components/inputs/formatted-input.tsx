import React from "react";
import { InputProps } from "antd";
import { Input } from "@/components/inputs";

export default function FormattedInput({
  formatEnforcer,
  onChange,
  placeholder,
  ...rest
}: {
  formatEnforcer: (value: any) => any;
  onChange?: (_: any) => void;
  placeholder?: string;
  rest?: InputProps;
}) {
  return (
    <Input
      {...rest}
      placeholder={placeholder}
      onChange={(e) => {
        e.target.value = formatEnforcer(e.target.value);
        onChange(e);
      }}
    />
  );
}
