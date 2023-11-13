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
                query: (data) => {
                    return {
                        url: "/payByWallet",
                        method: "PATCH",
                        body: data,
                    };
                },
            }),


        }
    },
});

export const {
    useGetPatientQuery,
    useGetMedicinesQuery,
    usePayByWalletMutation,
} = patientApi;
export { patientApi };