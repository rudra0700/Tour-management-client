import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDivision: builder.mutation({
      query: (divisionName) => ({
        url: "/division/create",
        method: "POST",
        data: divisionName,
      }),
      invalidatesTags: ["DIVISION"],
    }),   
    

    getDivision: builder.query({
      query: (params) => ({
        url: "/division",
        method: "GET",
        params: params
      }),
      providesTags: ["DIVISION"],
    }),
  }),
});

export const { useCreateDivisionMutation, useGetDivisionQuery } = tourApi;