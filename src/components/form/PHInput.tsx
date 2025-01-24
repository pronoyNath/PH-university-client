import { useFormContext } from "react-hook-form";
type TPHInput = {
  type: string;
  name: string;
  label?: string;
};

const PHInput = ({ type, name, label }: TPHInput) => {
  const { register } = useFormContext(); //react hook form context
  return (
    <>
      {label ? label : null}
      <input type={type} id={name} {...register(name)} />
    </>
  );
};

export default PHInput;
