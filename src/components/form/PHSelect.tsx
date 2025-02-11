import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
type TPHSelect = {
  name: string;
  label?: string;
  options: { label: string; value: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
} ;
const PHSelect = ({ name, label, options, disabled, mode }: TPHSelect) => {
  // console.log("opt", options);
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
