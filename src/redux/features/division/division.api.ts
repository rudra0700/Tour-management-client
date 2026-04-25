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
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      providesTags: ["DIVISION"],
    }),
  }),
});

export const { useCreateDivisionMutation, useGetDivisionQuery } = tourApi;