import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
type TPHInput = {
  type: string;
  name: string;
  label?: string;
};

const PHInput = ({ type, name, label }: TPHInput) => {
  return (
    <div style={{ marginBottom: "0px" }}>
      <Controller //"Controller" for use react-hook logic on atnd
        name={name} //alternative of "register of react-hook"
        render={({ field }) => (
          <Form.Item label={label}>
            <Input type={type} id={name} {...field} size="large"/>
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
