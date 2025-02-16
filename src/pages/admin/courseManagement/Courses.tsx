import {
  Button,
  Modal,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useAddFacultiesMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { TCourse, TResponse } from "../../../types";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
type TableDataType =
  | (Pick<TCourse, "title" | "code" | "prefix"> & {
      key: string;
    })
  | undefined;

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
  // console.log("metaData", metaData);
  const tableData = coursesData?.data?.map(({ _id, title, code, prefix }) => ({
    key: _id,
    title,
    code: prefix + code,
  }));

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
        // console.log("lks", item);
        return (
          <Space>
            <AddFacutlyModal item={item} />
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

const AddFacutlyModal = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [addFaculties] = useAddFacultiesMutation();
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const facultiesOptions = facultiesData?.data?.map((value) => ({
    label: value?.fullName,
    value: value?._id,
  }));

  const handleSumbmit : SubmitHandler<FieldValues> = async (data) => {
    console.log(item)
    const toastId = toast.loading("creating...");
    const facultiesData = {
      courseId: item.key,
      data: data
    };
    console.log("facultiesData", facultiesData);
    try {
      const res = (await addFaculties(facultiesData)) as TResponse<any>;
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Assign Faculty</Button>
      <Modal title="Assign Faculty" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <PHForm onSubmit={handleSumbmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOptions}
            name="faculties"
            label="Faculty"
          />
          <Button size="large" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
