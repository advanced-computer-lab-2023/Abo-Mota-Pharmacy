import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const pharmacistApi = createApi({
    reducerPath: 'pharmacistApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${process.env.REACT_APP_API_URL}/pharmaApi/pharmacist` ,
        credentials: "include",
        prepareHeaders: (headers, { getState, endpoint }) => {
            if (endpoint === "medicine") {
                headers.delete("Content-Type");
              }
            return headers;
          },
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
                    return [{type:'PharmacistMedicine',val:"ID"}]
                },
                query: ({name, description, price, activeIngredients, quantity, medicinalUse, medicineImage}) => {
                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append("description", description);
                    formData.append("price", price);
                    activeIngredients.forEach((ingredient) => {
                        formData.append("activeIngredients", ingredient);
                    });                    
                    formData.append("quantity", quantity);
                    formData.append("medicinalUse", medicinalUse);
                    formData.append("medicineImage", medicineImage);
                    return {
                        url: '/medicine',
                        method: 'POST',
                        body: formData,
                    }
                    
                },
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