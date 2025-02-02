import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Flex } from "antd";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";

const CreateAcademicFaculty = () => {
  const [createFaculty] = useCreateAcademicFacultyMutation(undefined);
  const handleCreateFaculty: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");
    console.log(data);
    try {
      const res = (await createFaculty(data)) as TResponse;
      console.log(res)
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
        onSubmit={handleCreateFaculty}
        resolver={zodResolver(academicFacultySchema)} 
        >
          <PHInput label={"Faculty Name: "} name={"name"} type={"text"} />
          <Button htmlType="submit">Create</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
