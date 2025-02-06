import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import {
  bloodGroupOptions,
  genderOptions,
} from "../../../config/constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAcademicDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

const studentDummyData = {
  password: "student123",
  student: {
    name: {
      firstName: "I am ",
      middleName: "Student",
      lastName: "Number 1",
    },
    gender: "male",
    dateOfBirth: "1990-01-01",
    contactNo: "1235678",
    bloogGroup: "A+",

    email: "student2@gmail.com",
    emergencyContactNo: "987-654-3210",
    presentAddress: "123 Main St, Cityville",
    permanentAddress: "456 Oak St, Townsville",

    guardian: {
      fatherName: "James Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "111-222-3333",
      motherName: "Mary Doe",
      motherOccupation: "Teacher",
      motherContactNo: "444-555-6666",
    },

    localGuardian: {
      name: "Alice Johnson",
      occupation: "Doctor",
      contactNo: "777-888-9999",
      address: "789 Pine St, Villageton",
    },

    admissionSemester: "65b0104110b74fcbd7a25d92",
    academicDepartment: "65b00fb010b74fcbd7a25d8e",
  },
};

const defatultData = {
  name: {
    firstName: "Anthokhiya",
    middleName: "Nath",
    lastName: "Pronoy",
  },
  gender: "male",
  contactNo: "1235678",
  bloogGroup: "A+",

  email: "nath@gmail.com",
  emergencyContactNo: "987-654-3210",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",

  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "111-222-3333",
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContactNo: "444-555-6666",
  },

  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "777-888-9999",
    address: "789 Pine St, Villageton",
  },
};
const CreateStudent = () => {
  const { data: semesterData, isLoading } = useGetAllSemestersQuery(undefined);
  const { data: departmentData, isLoading: isDeptLoading } =
    useGetAcademicDepartmentsQuery(undefined);
  const [addStudent] = useAddStudentMutation();

  const modifiedSData = semesterData?.data?.map((item) => ({
    label: `${item?.name} ${item.year}`,
    value: item?._id,
  }));
  const modifiedDeptData = departmentData?.data?.map((item) => ({
    label: item?.name,
    value: item?._id,
  }));

  const handleAddStudent: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("creating...");

    const studentData = {
      password: "student123",
      student: data,
    };
    // cause backend need form data.
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data?.profileImg);
    //! only for dev perpose
    console.log(Object.fromEntries(formData));

    try {
      const res = await addStudent(formData);
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
    <Row>
      <Col span={24}>
        <PHForm onSubmit={handleAddStudent} >
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"First Name: "}
                name={"name.firstName"}
                type={"text"}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"Middle Name: "}
                name={"name.middleName"}
                type={"text"}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"Last Name: "}
                name={"name.lastName"}
                type={"text"}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender:" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker label={"Date Of Birth: "} name={"dateOfBirth"} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"Contact No: "}
                name={"contactNo"}
                type={"text"}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloogGroup"
                label="Blood Group:"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture: ">
                    <Input
                      type="file"
                      value={value?.firstName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                      size="large"
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput label={"Email: "} name={"email"} type={"email"} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"Emergency Contact No: "}
                name={"emergencyContactNo"}
                type={"text"}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"Present Address: "}
                name={"presentAddress"}
                type={"text"}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"Permanent Address: "}
                name={"permanentAddress"}
                type={"text"}
              />
            </Col>
          </Row>
          <Divider>Gurdian Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"Father Name: "}
                name={"guardian.fatherName"}
                type={"text"}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"Father Occupation: "}
                name={"guardian.fatherOccupation"}
                type={"text"}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"Father ContactNo: "}
                name={"guardian.fatherContactNo"}
                type={"text"}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"Mother Name"}
                name={"guardian.motherName"}
                type={"text"}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"Mother Occupation"}
                name={"guardian.motherOccupation"}
                type={"text"}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"Mother ContactNo"}
                name={"guardian.motherContactNo"}
                type={"text"}
              />
            </Col>
          </Row>
          <Divider>Local Gurdian Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"Name: "}
                name={"localGuardian.name"}
                type={"text"}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"Occupation:"}
                name={"localGuardian.occupation"}
                type={"text"}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"ContactNo: "}
                name={"localGuardian.contactNo"}
                type={"text"}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label={"Address"}
                name={"localGuardian.address"}
                type={"text"}
              />
            </Col>
            <Divider>Academic Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label={"Admission Semeter:"}
                name={"admissionSemester"}
                disabled={isLoading}
                options={modifiedSData}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label={"Academic Department:"}
                name={"academicDepartment"}
                disabled={isDeptLoading}
                options={modifiedDeptData}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
