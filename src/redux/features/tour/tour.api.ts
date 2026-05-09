import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourPackage } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTour: builder.mutation({
      query: (tourData) => ({
        url: "/tour/create",
        method: "POST",
        data: tourData,
      }),
      invalidatesTags: ["TOUR"],
    }),

    addTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tourtype/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags: ["TOURTYPE"],
    }),

    deleteTourType: builder.mutation({
      query: ({ id, tourTypeName }) => ({
        url: `/tourtype/tour-types/${id}`,
        method: "DELETE",
        data: tourTypeName,
      }),
      invalidatesTags: ["TOURTYPE"],
    }),

    getTourTypes: builder.query({
      query: (params) => ({
        url: "/tourtype/tour-types",
        method: "GET",
        params: params
      }),
      providesTags: ["TOURTYPE"],
      // transformResponse: (response) => response.data,
    }),

    getAllTours: builder.query<IResponse<ITourPackage[]>, unknown>({
      query: (params) => ({
        url: "/tour",
        method: "GET",
        params: params
      }),
      providesTags: ["TOUR"],
      // transformResponse: (response : IResponse<ITourPackage[]> ) => response.data,
    }),
  }),
});

export const {
  useAddTourTypeMutation,
  useGetTourTypesQuery,
  useDeleteTourTypeMutation,
  useAddTourMutation,
  useGetAllToursQuery,
} = tourApi;
