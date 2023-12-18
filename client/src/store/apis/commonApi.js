import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/pharmaApi/common`,
    credentials: 'include'
  }),

  endpoints(builder) {
    return {
      fetchLoggedIn: builder.query({
        query: () => {
          return {
            url: "/loggedIn",
            method: "GET",
          };
        },
      }),

      sendMessage: builder.mutation({
        // invalidatesTags: (result, error, p) => {
        //   return ["contactsDetails"];
        // },
        query: (data) => {
          return {
            url: "/message",
            body: data,
            method: "POST",
          };
        },
      }),

      sendNotification: builder.mutation({
        query: (data) => {
          return {
            url: "/notification",
            body: data,
            method: "POST",
          };
        },
      }),

      fetchMessages: builder.query({
        providesTags: (result, error, recipient) => {
          return ["messages"];
        },

        query: (recipient) => {
          return {
            url: `/message?contact=${recipient}`,
            method: "GET",
          };
        },
      }),

      fetchContact: builder.query({
        query: (contact) => {
          return {
            url: `/contact?contact=${contact}`,
            method: "GET",
          };
        },
      }),

      fetchContactsDetails: builder.query({
        providesTags: (result, error, contactIds) => {
          return ["contactsDetails"];
        },

        query: () => {
          return {
            url: `/contacts`,
            method: "GET",
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

      invalidateMessages: builder.mutation({
        invalidatesTags: (result, error, p) => {
          return ["messages"];
        },

        query: (data) => {
          return {
            url: "/nil",
            method: "POST",
          };
        },
      }),

      invalidateContactDetails: builder.mutation({
        invalidatesTags: (result, error, p) => {
          return ["contactsDetails"];
        },

        query: (data) => {
          return {
            url: "/nil",
            method: "POST",
          };
        }
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

      readMessage: builder.mutation({
        query: (data) => {
          return {
            url: "/readMessage",
            body: data,
            method: "POST",
          };
        }
      }),
    }
  },
});

export const {
  useFetchLoggedInQuery,
  useSendMessageMutation,
  useFetchMessagesQuery,
  useFetchContactQuery,
  useFetchContactsDetailsQuery,
  useInvalidateMessagesMutation,
  useInvalidateContactDetailsMutation,
  useSendNotificationMutation,
  useFetchNotificationQuery,
  useSendEmailMutation,
  useReadMessageMutation
} = commonApi;

export { commonApi };
