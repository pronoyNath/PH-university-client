import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartSchema } from "../../../schemas/academicManagement.schema";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";

const CreateAcademicDepartment = () => {
  const { data: facultyData } = useGetAcademicFacultyQuery(undefined);
  const modifiedFacultyData = facultyData?.data?.map((item) => ({
    label: item?.name,
    value: item?.name,
  }));

  const handleCreateDepartment = (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={handleCreateDepartment}
          resolver={zodResolver(academicDepartSchema)}
        >
          <PHSelect
            options={modifiedFacultyData!}
            name="academicFaculty"
            label="Academic Faculty:"
          />
          <Button size="large" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
