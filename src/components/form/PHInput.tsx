import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
type TPHInput = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const PHInput = ({ type, name, label, disabled }: TPHInput) => {
  return (
    <div style={{ marginBottom: "0px" }}>
      <Controller //"Controller" for use react-hook logic on atnd
        name={name} //alternative of "register of react-hook"
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input disabled={disabled} type={type} id={name} {...field} size="large" />
            {error && <small style={{color: "red"}}>{error?.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
