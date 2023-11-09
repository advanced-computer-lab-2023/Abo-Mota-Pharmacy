import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const guestApi = createApi({
    reducerPath: 'guestApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}/pharmaApi/guest`,
        credentials: "include"
    }),
    endpoints(builder){
       return {
        registerPharmacist: builder.mutation({
            query : (pharmacist)=>{
                return {
                    url: '/registerPharmacist',
                    body: pharmacist,
                    method :'POST' 
                }
            }
        }),
        registerPatient: builder.mutation({
            query : (patient)=>{
                return {
                    url: '/registerPatient',
                    body: patient,
                    method :'POST' 
                }
            }
        }),
       } 
    }
})

export const {
    useRegisterPharmacistMutation,
    useRegisterPatientMutation,
    useLoginMutation
} = guestApi;
export { guestApi } ;