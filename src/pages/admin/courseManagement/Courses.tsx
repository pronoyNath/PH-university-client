import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { TCourse, TQueryParam } from "../../../types";
type TableDataType = Pick<
  TCourse,
  "title" | "code" 
> & {
  key: string;
};

const Courses = () => {
  const { data: coursesData, isFetching } = useGetAllCoursesQuery(undefined);
  // const [params, setParams] = useState<TQueryParam[]>([]);
  // const [page, setPage] = useState(1);
  // const { data: studentData, isFetching } = useGetAllStudentDataQuery([
  //   { name: "limit", value: 3 },
  //   { name: "page", value: page },
  //   { name: "sort", value: "id" },
  //   ...params,
  // ]);

  const metaData = coursesData?.meta;
  console.log("metaData", metaData);
  const tableData = coursesData?.data?.map(
    ({ _id, title, code }) => ({
      key: _id,
      title,
      code,
    })
  );

  const columns: TableColumnsType<TableDataType> = [
    {
      title: "Title",
      dataIndex: "title",
      showSorterTooltip: { target: "full-header" },
      
    },
    {
      title: "Code",
      dataIndex: "code",
    },
   
    {
      title: "Action",
      key: "x",
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Button>Assign Faculty</Button>
          </Space>
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
    <>
      <Table<TableDataType>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
        pagination={false}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      {/* <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit ? Number(metaData?.limit) : 0}
        total={metaData?.total}
      /> */}
    </>
  );
};

export default Courses;