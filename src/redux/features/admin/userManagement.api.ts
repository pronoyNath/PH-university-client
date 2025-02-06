import { TQueryParam, TResponseRedux, TStudentData } from "../../../types";
import baseApi from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudentData: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (res: TResponseRedux<TStudentData[]>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),
    getStudentData: builder.query({
      query: (studentId) => {
        return {
          url: `/students/${studentId}`,
          method: "GET",
        };
      },
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllStudentDataQuery, useGetStudentDataQuery,useAddStudentMutation } =
  userManagementApi;
