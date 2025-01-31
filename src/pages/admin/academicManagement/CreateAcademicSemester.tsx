import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
const options = [
  {
    value: "01",
    label: "Autumn",
  },
  {
    value: "02",
    label: "Summer",
  },
  {
    value: "03",
    label: "Fall",
  },
];


const CreateAcademicSemester = () => {

  const handleCreate: SubmitHandler<FieldValues> = (data) => {
    const name = options[Number(data?.name - 1)].label;
    const code = options[Number(data?.name - 1)].value;

    const semesterData = {
      name: name,
      code: code
    }
    console.log(semesterData);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={handleCreate} >
          <PHSelect options={options} name="name" label="Name:" />
          <PHSelect options={options} name="year" label="Year:" />
          <PHSelect options={options} name="startMonth" label="Start Month:" />
          <PHSelect options={options} name="endMonth" label="End Month:" />
          <Button size="large"  htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
