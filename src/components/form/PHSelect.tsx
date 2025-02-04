import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
type TPHSelect = {
  name: string;
  label?: string;
  options: { label: string; value: string; disabled?: boolean }[] | undefined;
} ;
const PHSelect = ({ name, label, options }: TPHSelect) => {
  // console.log("opt", options);
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
          />
          {error && <small style={{ color: "red" }}>{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
