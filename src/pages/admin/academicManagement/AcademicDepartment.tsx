import { Table, TableColumnsType } from "antd";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";

type TableDataType = {
  facultyName: string;
  departmentName: string;
};

type TModifiedData = {
  departmentName: string;
  facultyName: string;
};

const AcademicDepartment = () => {
  const { data: departmentData, isFetching } =
    useGetAcademicDepartmentsQuery(undefined);
  // console.log("Fac", departmentData);
  const modifiedDeptData = departmentData?.data?.map((item) => ({
    facultyName: item?.academicFaculty?.name,
    departmentName: item?.name,
  }));

  const columns: TableColumnsType<TableDataType> = [
    {
      title: "Faculty Name",
      dataIndex: "facultyName",
    },
    {
      title: "Department Name",
      dataIndex: "departmentName",
    },
  ];
  return (
    <div>
      <Table<TableDataType>
        loading={isFetching}
        columns={columns}
        dataSource={modifiedDeptData}
        // onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default AcademicDepartment;
