import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const pharmacistApi = createApi({
    reducerPath: 'pharmacistApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${process.env.REACT_APP_API_URL}/pharmaApi/pharmacist` 
    }),
    endpoints(builder)  {
        return {
            getPharmacist: builder.query({
                providesTags:(result,error)=>{
                    return [{type:'PharmacistMedicine',id:result._id}];
                },
                query: () => ({
                    url: '/',
                    method: 'GET',
                }),
            }),
            getAllMedicines: builder.query({
                providesTags:(result,error,pharmacist)=>{
                    const tags = result.map((medicine)=>{
                        return {type:'Medicine', id:medicine._id}
                    });
                    tags.push({type:'PharmacistMedicine',id:pharmacist._id});
                    console.log(tags);
                    return tags;
                },
                query: (pharmacist) => ({
                    url:'/medicine',
                    method: 'GET'
                }),
            }),
            addMedicine: builder.mutation({
                invalidatesTags:(result,error,{ id })=>{
                    console.log([{type:'PharmacistMedicine', id:id}]);
                    return [{type:'PharmacistMedicine', id:id}]
                },
                query: ({ medicine }) => ({
                    url: '/medicine',
                    method: 'POST',
                    body: medicine,
                }),
            }),
            editMedicine: builder.mutation({
                invalidatesTags:(result,error,medicine)=>{
                    return [{type:'Medicine', id:medicine._id}]
                },
                query: (medicine) => ({
                    url: `/medicine/${medicine._id}`,
                    method: 'PATCH',
                    body: medicine,
                }),
            }),
        };
    },
});

export const {
    useGetPharmacistQuery, 
    useGetAllMedicinesQuery, 
    useAddMedicineMutation, 
    useEditMedicineMutation 
} = pharmacistApi;
export { pharmacistApi };