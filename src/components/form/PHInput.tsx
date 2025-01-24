import { Input } from "antd";
import { Controller } from "react-hook-form";
type TPHInput = {
  type: string;
  name: string;
  label?: string;
};

const PHInput = ({ type, name, label }: TPHInput) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label ? label : null}
      <Controller //"Controller" for use react-hook logic on atnd
        name={name} //alternative of "register of react-hook"
        render={({ field }) => <Input type={type} id={name} {...field} />}
      />
    </div>
  );
};

export default PHInput;
