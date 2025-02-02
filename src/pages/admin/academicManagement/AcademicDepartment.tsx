import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicDepartment = () => {
  const { data: departmentData } = useGetAcademicDepartmentsQuery(undefined);
  console.log("Fac", departmentData);
  return (
    <div>
      {departmentData?.data?.map((item) => (
        <ul>
          <li>{item.name}</li>
        </ul>
      ))}
    </div>
  );
};

export default AcademicDepartment;
