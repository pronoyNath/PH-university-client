import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademinSemester = () => {
  const {data} = useGetAllSemestersQuery(undefined);
console.log("data",data)
  return (
    <div>
      academic semester
    </div>
  );
};

export default AcademinSemester;