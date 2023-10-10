import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${process.env.REACT_APP_API_URL}/pharmaApi/admin` 
    }),
    endpoints(builder) {
        return{
            getMedicines: builder.query({
                query: () => ({
                    url:'/medicines',
                    method: 'GET',
                }),
            }),
            fetchApplications : builder.query({
                query : () => {
                  return {
                    url: "/applications",
                    method: "GET",
                  };
                },
              }),
              addAdmin : builder.mutation({
                query: (admin)=>{
                  return {
                    url: '/admins',
                    body: admin,
                    method: 'POST'
                  }
                }
              }),
              removeAdmin : builder.mutation({
                query : (admin)=>{
                  return{
                    url:'/admins',
                    body:admin,
                    method: 'DELETE'
                  }
                }
              }),
              removePatient : builder.mutation({
                query: (patient)=>{
                  return {
                    url: '/patients',
                    body: patient,
                    method: 'DELETE'
                  }
                }
              }),
              removePharmacist: builder.mutation({
                query: (pharmacist)=>{
                  return{
                    url: '/doctors',
                    body: pharmacist,
                    method: 'DELETE'
                  }
                }
            }),
            fetchPharmacist: builder.query({
                query : (pharmacist)=>{
                    return {
                        url:'/pharmacists',
                        method: 'GET'

                    }
                }
            })

        }
    },
});

export const{ 
    useFetchPharmacistQuery,
useFetchApplicationsQuery } = adminApi;
export { adminApi };