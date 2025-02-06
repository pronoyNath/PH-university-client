import { useParams } from "react-router-dom";
import { useGetStudentDataQuery } from "../../../redux/features/admin/userManagement.api";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  bloodGroupOptions,
  genderOptions,
} from "../../../config/constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { Controller } from "react-hook-form";

const StudentUpdate = () => {
  const { studentId } = useParams();
  const { data } = useGetStudentDataQuery(studentId);
  // console.log("upd==?", data);
  const defatultData = data?.data;
  console.log("dd",defatultData)
  const handleUpdate = (data) => {
    console.log(data);
  };
  if(!defatultData){
    return <div>loading...</div>
  }
  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={handleUpdate} defaultValues={defatultData}>
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
            {/* <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
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
            </Col> */}
          </Row>
          <Button htmlType="submit">Update</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default StudentUpdate;
