import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartSchema } from "../../../schemas/academicManagement.schema";
import PHSelect from "../../../components/form/PHSelect";
import {
  useCreateAcademicDepartmentMutation,
  useGetAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {
  const { data: facultyData } = useGetAcademicFacultyQuery(undefined);
  const [createDepartment] = useCreateAcademicDepartmentMutation();
  const modifiedFacultyData = facultyData?.data?.map((item) => ({
    label: item?.name,
    value: item?._id,
  }));
console.log(modifiedFacultyData,",mm")
  const handleCreate: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");
    console.log(data);
    try {
      const res = (await createDepartment(data)) as TResponse;
      console.log(res);
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      }
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={handleCreate}
          resolver={zodResolver(academicDepartSchema)}
        >
          <PHSelect
            options={modifiedFacultyData!}
            name="academicFaculty"
            label="Academic Faculty:"
          />
          <PHInput label={"Department Name: "} name={"name"} type={"text"} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
