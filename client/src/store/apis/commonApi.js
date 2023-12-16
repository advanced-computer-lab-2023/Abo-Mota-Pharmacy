import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/pharmaApi/common`,
    credentials: 'include'
  }),

  endpoints(builder) {
    return {

      sendNotification: builder.mutation({
    
        query: (data) => {
          return {
            url: "/notification",
            body: data,
            method: "POST",
          };
        },
      }),

      fetchNotification: builder.query({

        query: () => {
          return {
            url: "/notifications",
            method: "GET",
          };
        },
      }),

      sendEmail: builder.mutation({

        query: (data) => {
          return {
            url: "/send-email",
            body: data,
            method: "POST",
          };
        },
      }),
    }
  },
});

export const {
  useSendNotificationMutation,
  useFetchNotificationQuery,
  useSendEmailMutation,
} = commonApi;

export { commonApi };
