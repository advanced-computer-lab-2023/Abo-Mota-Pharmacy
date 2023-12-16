import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pharmacistApi = createApi({
  reducerPath: "pharmacistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/pharmaApi/pharmacist`,
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      getPharmacist: builder.query({
        // providesTags:(result,error)=>{
        //     return [{type:'PharmacistMedicine',id:result._id}];
        // },
        query: () => ({
          url: "/",
          method: "GET",
        }),
      }),
      
      getAllMedicines: builder.query({
        providesTags: (result, error) => {
          const tags = result.map((medicine) => {
            return { type: "Medicine", val: medicine.name };
          });
          tags.push({ type: "PharmacistMedicine", val: "ID" });
          // console.log(tags);
          return tags;
        },
        query: () => ({
          url: "/medicine",
          method: "GET",
        }),
      }),
      addMedicine: builder.mutation({
        invalidatesTags: (result, error, medicine) => {
          return [{ type: "PharmacistMedicine", val: "ID" }];
        },
        query: ({
          name,
          description,
          price,
          activeIngredients,
          quantity,
          medicinalUse,
          medicineImage,
          isOverTheCounter,
        }) => {
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
          formData.append("isOverTheCounter", isOverTheCounter);
          return {
            url: "/medicine",
            method: "POST",
            body: formData,
          };
        },
      }),
      editMedicine: builder.mutation({
        invalidatesTags: (result, error, medicine) => {
          return [{ type: "Medicine", val: medicine.name }];
        },
        query: ({ name, dataBaseValues }) => {
          const formData = new FormData();
          if (dataBaseValues.description)
            formData.append("description", dataBaseValues.description);
          if (dataBaseValues.price) formData.append("price", dataBaseValues.price);
          if (dataBaseValues.activeIngredients)
            dataBaseValues.activeIngredients.forEach((ingredient) => {
              formData.append("activeIngredients", ingredient);
            });

          formData.append("isOverTheCounter", dataBaseValues.isOverTheCounter);
          if (dataBaseValues.quantity) formData.append("quantity", dataBaseValues.quantity);
          if (dataBaseValues.medicinalUse)
            formData.append("medicinalUse", dataBaseValues.medicinalUse);
          if (dataBaseValues.medicineImage)
            formData.append("medicineImage", dataBaseValues.medicineImage);
          return {
            url: `/medicine/${name}`,
            method: "PATCH",
            body: formData,
          };
        },
      }),

      changePharmacistPassword: builder.mutation({
        query: (data) => {
          return {
            url: "/changePassword",
            method: "PATCH",
            body: data,
          };
        },
      }),

      getSalesReports: builder.query({
        query: () => ({
          url: "/salesReport",
          method: "GET",
        }),
      }),

      archiveMedicine: builder.mutation({
        invalidatesTags: (result, error, medicine) => {
          return [{ type: "Medicine", val: medicine.name }];
        },
        query: (name) => ({
          url: "/archive",
          method: "PATCH",
          body: name,
        }),
      }),

      unarchiveMedicine: builder.mutation({
        invalidatesTags: (result, error, medicine) => {
          return [{ type: "Medicine", val: medicine.name }];
        },
        query: (name) => ({
          url: "/unarchive",
          method: "PATCH",
          body: name,
        }),
      }),
    };
  },
});

export const {
  useGetPharmacistQuery,
  useGetAllMedicinesQuery,
  useAddMedicineMutation,
  useEditMedicineMutation,
  useChangePharmacistPasswordMutation,
  useGetSalesReportsQuery,
  useArchiveMedicineMutation,
  useUnarchiveMedicineMutation,
} = pharmacistApi;
export { pharmacistApi };
