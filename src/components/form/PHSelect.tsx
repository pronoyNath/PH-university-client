import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
type TPHSelect = {
  name: string;
  label?: string;
  options: { label: string; value: string; disabled?: boolean }[];
};
const PHSelect = ({ name, label, options }: TPHSelect) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
          />
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
