import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const guestApi = createApi({
  reducerPath: "guestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/pharmaApi/guest`,
    credentials: "include",
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (endpoint !== "registerPharmacist") {
        headers.set("Content-Type", "application/json");
      }
      // Set other headers as needed
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      registerPharmacist: builder.mutation({
        query: (pharmacist) => {
          const formData = new FormData();

          // Add file fields to FormData
          formData.append("nationalId", pharmacist.nationalId);
          formData.append("medicalLicense", pharmacist.medicalLicense);
          formData.append("medicalDegree", pharmacist.medicalDegree);

          Object.keys(pharmacist).forEach((key) => {
            if (key !== "nationalId" && key !== "medicalLicense" && key !== "medicalDegree") {
              formData.append(key, pharmacist[key]);
            }
          });
          return {
            url: "/registerPharmacist",
            body: formData,
            method: "POST",
          };
        },
      }),
      registerPatient: builder.mutation({
        query: (patient) => {
          return {
            url: "/registerPatient",
            body: patient,
            method: "POST",
          };
        },
      }),
      login: builder.mutation({
        query: (user) => {
          return {
            url: "/login",
            body: user,
            method: "POST",
          };
        },
      }),
      logout: builder.mutation({
        query: () => {
          return {
            url: "/logout",
            method: "POST",
          };
        },
      }),
    };
  },
});

export const {
  useRegisterPharmacistMutation,
  useRegisterPatientMutation,
  useLoginMutation,
  useLogoutMutation,
} = guestApi;
export { guestApi };
