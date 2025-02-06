import { useParams } from "react-router-dom";
import { useGetStudentDataQuery } from "../../../redux/features/admin/userManagement.api";

const StudentDetails = () => {
  const { studentId } = useParams();
  const { data } = useGetStudentDataQuery(studentId);
  console.log("stu==?", data);
  return <div>student details</div>;
};

export default StudentDetails;
