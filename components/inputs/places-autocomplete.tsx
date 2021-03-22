import { useContext, useCallback } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { Input, AutoComplete } from "antd";
import { H2aContractFormReadonlyContext } from "@/components/contexts";

interface IPlace {
  description: string;
  placeId: string;
}
export const usePlacesAutocompleteValidatorRule = (errorMessage: string) => {
  return useCallback(
    ({ getFieldValue }) => ({
      validator(_, val: IPlace) {
        if (val.description && val.placeId) {
          return Promise.resolve();
        }
        return Promise.reject(errorMessage);
      },
    }),
    [errorMessage]
  );
};

const PlacesAutocompleteInput = ({
  value,
  onChange,
  onBlur,
}: {
  onChange?: (val: IPlace) => void;
  value?: any;
  onBlur?;
}) => {
  const isReadonly = useContext(H2aContractFormReadonlyContext);
  const actualValue = (value ? value : { description: "" }).description;
  if (isReadonly) {
    return <Input disabled={true} value={actualValue} />;
  }
  return (
    <PlacesAutocomplete
      onChange={(description) => {
        onChange({ description, placeId: null });
      }}
      onSelect={(description, placeId, c) => {
        onChange({
          description,
          placeId,
        });
      }}
      value={actualValue}
    >
      {({ getInputProps, suggestions, loading }) => {
        const { onBlur: inputPropBlur, ...inputProps } = getInputProps();
        return (
          <AutoComplete
            options={suggestions.map((s, i) => ({
              key: s.description,
              label: s.description,
              value: s.description,
              meta: {
                placeId: s.placeId,
                description: s.description,
              },
            }))}
            onSelect={(
              stringValue: string,
              actualObjValue: { label: string; value: string; meta: { description: string; placeId: string } }
            ) => {
              return onChange(actualObjValue.meta);
            }}
            value={inputProps.value}
          >
            <Input
              onBlur={(e) => {
                inputPropBlur(e);
                onBlur && onBlur(e);
              }}
              {...inputProps}
            />
          </AutoComplete>
        );
      }}
    </PlacesAutocomplete>
  );
};
export default PlacesAutocompleteInput;
