import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const pharmacistApi = createApi({
    reducerPath: 'pharmacistApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${process.env.REACT_APP_API_URL}/pharmaApi/pharmacist` 
    }),
    endpoints(builder)  {
        return {
            getPharmacist: builder.query({
                // providesTags:(result,error)=>{
                //     return [{type:'PharmacistMedicine',id:result._id}];
                // },
                query: () => ({
                    url: '/',
                    method: 'GET',
                }),
            }),
            getAllMedicines: builder.query({
                providesTags:(result,error)=>{
                    const tags = result.map((medicine)=>{
                        return {type:'Medicine', val:medicine.name}
                    });
                    tags.push({type:'PharmacistMedicine',val:"ID"});
                    // console.log(tags);
                    return tags;
                },
                query: () => ({
                    url:'/medicine',
                    method: 'GET'
                }),
            }),
            addMedicine: builder.mutation({
                invalidatesTags:(result,error,medicine)=>{
                    // console.log([{type:'PharmacistMedicine', id:id}]);
                    return [{type:'PharmacistMedicine',val:"ID"}]
                },
                query: (medicine) => ({
                    url: '/medicine',
                    method: 'POST',
                    body: medicine,
                }),
            }),
            editMedicine: builder.mutation({
                invalidatesTags:(result,error,medicine)=>{
                    return [{type:'Medicine', val:medicine.name}]
                },
                query: (medicine) => ({
                    url: `/medicine/${medicine.name}`,
                    method: 'PATCH',
                    body: medicine.dataBaseValues,
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