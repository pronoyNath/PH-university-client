import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../config/constants/semester";
import { monthOptions } from "../../../config/constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const handleCreate: SubmitHandler<FieldValues> = (data) => {
    const name = semesterOptions[Number(data?.name - 1)]?.label;

    const semesterData = {
      name: name,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };
    console.log(semesterData);
  };
 
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={handleCreate}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect options={semesterOptions} name="name" label="Name:" />
          <PHSelect options={yearOptions} name="year" label="Year:" />
          <PHSelect
            options={monthOptions}
            name="startMonth"
            label="Start Month:"
          />
          <PHSelect options={monthOptions} name="endMonth" label="End Month:" />
          <Button size="large" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
