import { Button, Table, TableColumnsType, Tag } from "antd";
import { useGetAllRegisteredSemesterQuery } from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { TRegisteredSemester } from "../../../types";
type TableDataType = Pick<
  TRegisteredSemester,
  "startDate" | "endDate" | "status"
> & { key: string };

const RegisteredSemester = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>([]);
  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemesterQuery(undefined);

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester?.name} - ${academicSemester?.year}`,
      startDate: moment(new Date(startDate)).format("Do MMM YY"),
      endDate: moment(new Date(endDate)).format("Do MMM YY"),
      status,
    })
  );

  const columns: TableColumnsType<TableDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color;
        if (status === "ONGOING") {
          color = "green";
        } else if (status === "UPCOMING") {
          color = "blue";
        } else if (status === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        console.log(item);
        return (
          <div>
            <Button type="primary">Edit</Button>
            <Button type="primary" danger>
              Delete
            </Button>
          </div>
        );
      },
      width: "1%",
    },
  ];

  // const onChange: TableProps<TableDataType>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParam[] = [];
  //     filters.name?.forEach((item) =>
  //       queryParams.push({ name: "name", value: item })
  //     );
  //     filters.year?.forEach((item) =>
  //       queryParams.push({ name: "year", value: item })
  //     );
  //     setParams(queryParams);
  //   }
  // };
  return (
    <Table<TableDataType>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default RegisteredSemester;
