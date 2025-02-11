import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import {
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { TRegisteredSemester, TResponse } from "../../../types";
import { useState } from "react";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
type TableDataType = Pick<
  TRegisteredSemester,
  "startDate" | "endDate" | "status"
> & { key: string };

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const RegisteredSemester = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>([]);
  const [semesterID, setSemesterID] = useState<string | undefined>(undefined);

  const [updateSemesterStatus] = useUpdateRegisteredSemesterMutation();

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

  const handleStatusUpdate: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating...");
    const updateData = {
      id: semesterID,
      data: {
        status: data.key,
      },
    };
    updateSemesterStatus(updateData);
    try {
      const res = (await updateSemesterStatus(updateData)) as TResponse<any>;
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

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

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
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterID(item.key)}>Update</Button>
          </Dropdown>
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
