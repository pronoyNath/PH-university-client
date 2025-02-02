import { useGetAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicFaculty = () => {
  const {data: facultyData} = useGetAcademicFacultyQuery(undefined);
  console.log("Fac",facultyData)
  return (
    <div>
      {facultyData?.data?.map((item)=>(
        <ul>
          <li>{item.name}</li>
        </ul>
      ))}
    </div>
  );
};

export default AcademicFaculty;