import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { semesterStatusOptions } from "../../../config/constants/semester";
import PHInput from "../../../components/form/PHInput";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const RegisteredSemester = () => {
  const [addRegisteredSemester] = useAddRegisteredSemesterMutation();
  const { data: semesterData } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);
  const modifiedSData = semesterData?.data?.map((item) => ({
    label: `${item?.name} ${item.year}`,
    value: item?._id,
  }));

  const handleCreate: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    // console.log(semesterData);
    try {
      console.log(semesterData);
      const res = (await addRegisteredSemester(semesterData)) as TResponse<any>;
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      }
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId });
      }
      console.log("res", res);
    } catch (err) {
      toast.error("Something went wrong!", { id: toastId });
      console.log(err);
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={handleCreate}>
          <PHSelect
            options={modifiedSData}
            name="academicSemester"
            label="Academic Semester:"
          />
          <PHSelect
            options={semesterStatusOptions}
            name="status"
            label="Semester Status:"
          />
          <PHDatePicker label={"Start Date: "} name={"startDate"} />
          <PHDatePicker label={"End Date: "} name={"endDate"} />
          <PHInput label={"Min Credit:"} name={"minCredit"} type={"text"} />
          <PHInput label={"Max Credit:"} name={"maxCredit"} type={"text"} />
          <Button size="large" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default RegisteredSemester;
