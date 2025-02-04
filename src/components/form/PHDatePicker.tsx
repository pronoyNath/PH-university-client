import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";
type TPHDate = {
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TPHDate) => {
  return (
    <div style={{ marginBottom: "0px" }}>
      <Controller //"Controller" for use react-hook logic on atnd
        name={name} //alternative of "register of react-hook"
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
           <DatePicker {...field} size="large" style={{width:'100%'}}/>
           {error && <small style={{color: "red"}}>{error?.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
