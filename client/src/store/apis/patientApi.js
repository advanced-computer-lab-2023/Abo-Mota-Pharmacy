import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const patientApi = createApi({
    reducerPath: 'patientApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}/pharmaApi/patient`,
        credentials: "include"

    }),
    endpoints(builder) {
        return {
            getPatient: builder.query({
                providesTags: (result, error) => {
                    return ["Patient"];
                },

                query: () => ({
                    url: '/',
                    method: 'GET',
                }),
            }),

            getMedicines: builder.query({
                query: () => ({
                    url: '/medicines',
                    method: 'GET',
                }),
            }),

            payByWallet: builder.mutation({
                invalidatesTags: (result, error, arg) => {
                    return ["Patient"];
                },

                query: (data) => {
                    return {
                        url: "/payByWallet",
                        method: "PATCH",
                        body: data,
                    };
                },
            }),

            createOrder: builder.mutation({
                invalidatesTags: (result, error, arg) => {
                    return ["orders"];
                },

                query: (data) => {
                    return {
                        url: "/createOrder",
                        method: "POST",
                        body: data,
                    };
                },
            }),

            addToCart: builder.mutation({
                invalidatesTags: (result, error, arg) => {
                    return ["Patient"];
                },

                query: (data) => {
                    return {
                        url: "/medicines",
                        method: "POST",
                        body: data,
                    };
                },
            }),

            removeFromCart: builder.mutation({
                invalidatesTags: (result, error, arg) => {
                    return ["Patient"];
                },

                query: (data) => {
                    return {
                        url: "/medicines",
                        method: "DELETE",
                        body: data,
                    };
                },
            }),

            addDeliveryAddress: builder.mutation({
                invalidatesTags: (result, error, arg) => {
                    return ["Patient"];
                },

                query: (data) => {
                    return {
                        url: "/deliveryAddress",
                        method: "PATCH",
                        body: data,
                    };
                },
            }),

            getOrders: builder.query({
                providesTags: (result, error) => {
                    return ["orders"];
                },

                query: () => ({
                    url: '/orders',
                    method: 'GET',
                }),
            }),

        }
    },
});

export const {
    useGetPatientQuery,
    useGetMedicinesQuery,
    usePayByWalletMutation,
    useCreateOrderMutation,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useAddDeliveryAddressMutation,
    useGetOrdersQuery,
} = patientApi;
export { patientApi };