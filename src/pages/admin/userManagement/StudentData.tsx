import { useState } from "react";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { TQueryParam, TStudentData } from "../../../types";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllStudentDataQuery } from "../../../redux/features/admin/userManagement.api";

type TableDataType =
  | (Pick<TStudentData, "_id" | "name" | "id"> & {
      key: string;
    })
  | undefined;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>([]);
  const { data: studentData, isFetching } = useGetAllStudentDataQuery(params);

  console.log("student", studentData);

  const tableData = studentData?.data?.map(({ _id, fullName, id }) => ({
    key: _id,
    fullName,
    id,
  }));

  const columns: TableColumnsType<TableDataType> = [
    {
      title: "Name",
      dataIndex: "fullName",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summer",
          value: "Summer",
        },
      ],
    },
    {
      title: "Roll No.",
      dataIndex: "id",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: '1%',
    },
  ];

  const onChange: TableProps<TableDataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };
  return (
    <Table<TableDataType>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default StudentData;
