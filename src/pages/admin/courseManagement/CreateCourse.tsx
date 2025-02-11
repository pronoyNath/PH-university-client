import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const CreateCourse = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);
  const [addCourse] = useAddCourseMutation();

  const coursesOptions = courses?.data?.map((item) => ({
    label: item?.title,
    value: item?._id,
  }));

  const handleCreate: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");
    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses.map((item: string) => ({
        course: item,
        isDeleted: false,
      })),
    };
    try {
      const res = (await addCourse(courseData)) as TResponse<any>;
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
        <PHForm onSubmit={handleCreate}>
          <PHInput label={"Title:"} name={"title"} type={"text"} />
          <PHInput label={"Prefix:"} name={"prefix"} type={"text"} />
          <PHInput label={"Code:"} name={"code"} type={"text"} />
          <PHInput label={"Credits:"} name={"credits"} type={"text"} />
          <PHSelect
            label="Pre Requisite Courses:"
            name="preRequisiteCourses"
            options={coursesOptions}
            mode="multiple"
          />
          <Button size="large" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
