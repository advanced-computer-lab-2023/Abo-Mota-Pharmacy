import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/pharmaApi/admin`,
  }),
  endpoints(builder) {
    return {
      fetchPatients: builder.query({
        query: () => ({
          url: "/patients",
          method: "GET",
        }),
      }),
      fetchApplications: builder.query({
        providesTags: (result, error) => {
          const tags = result.map((p) => {
            return { type: "Application", id: p._id };
          });
          tags.push({ type: "AdminApplication", id: 123 });
          return tags;
        },
        query: () => {
          return {
            url: "/applications",
            method: "GET",
          };
        },
      }),
      handleApplication: builder.mutation({
        invalidatesTags: (result, error, application) => {
          return [
            { type: "Application", id: application.id },
            { type: "AdminPharmacist", id: 456 },
          ];
        },
        query: (application) => {
          return {
            url: `/applications/${application.id}`,
            body: application,
            method: "PATCH",
          };
        },
      }),
      addAdmin: builder.mutation({
        query: (admin) => {
          return {
            url: "/admins",
            body: admin,
            method: "POST",
          };
        },
      }),
      removeAdmin: builder.mutation({
        query: (admin) => {
          return {
            url: "/admins",
            body: admin,
            method: "DELETE",
          };
        },
      }),
      removePatient: builder.mutation({
        query: (patient) => {
          return {
            url: "/patients",
            body: patient,
            method: "DELETE",
          };
        },
      }),
      removePharmacist: builder.mutation({
        query: (pharmacist) => {
          return {
            url: "/pharmacists",
            body: pharmacist,
            method: "DELETE",
          };
        },
      }),
      fetchPharmacists: builder.query({
        providesTags: (result, error) => {
          const tags = result.map((p) => {
            return { type: "Pharmacist", id: p._id };
          });
          tags.push({ type: "AdminPharmacist", id: 456 });
          return tags;
        },
        query: () => {
          return {
            url: "/pharmacists",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchPatientsQuery,
  useFetchApplicationsQuery,
  useRemoveAdminMutation,
  useRemovePharmacistMutation,
  useRemovePatientMutation,
  useAddAdminMutation,
  useFetchPharmacistsQuery,
  useFetch,
  useHandleApplicationMutation,
} = adminApi;
export { adminApi };
